import Bottleneck from "bottleneck";
import { BigNumber, constants, Contract, ethers, providers, Wallet } from "ethers";
import fs from "fs"
import path from "path"
import csvParser from "csv-parser";
import { config } from "dotenv"
import PQueue from "p-queue";
import { authLoginV2AuthSimplifiedMutation, challengeLoginMessageQuery, CREATE_ORDER_MUTATION, FulfillActionModalQuery, LISTING_FLOW_QUERY, LISTING_FLOW_TIMELINE_QUERY, OrdersQuery } from "./queries/query";
import axios, { AxiosInstance } from "axios";

config();

const RATE_LIMIT = 2;
const GOLD = '\x1b[33m';
const RESET = '\x1b[0m';
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const NETWORK = "mainnet"
const provider = new providers.AlchemyProvider(NETWORK, ALCHEMY_API_KEY)
const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
const API_KEY = process.env.API_KEY;

const ethersSigner = new Wallet(PRIVATE_KEY, provider);
const bidVariableFile = "token_list.csv";

const queue = new PQueue({
  concurrency: 1.5 * RATE_LIMIT
});

const deviceId = generateUUIDv4();

const floorPrices: { [key: string]: number } = {}

// Clear floor prices every 30 minutes
setInterval(() => {
  console.log('Clearing floor prices cache');
  Object.keys(floorPrices).forEach(key => delete floorPrices[key]);
}, 30 * 60 * 1000);


const CONFIG = {
  X_RAPIDAPI_KEY: 'ed8982d6-7ef1-43f2-8b65-639d30a57f1b',
  OS_BASE_URL: 'https://nfttools.pro/opensea'
};


config()

const limiter = new Bottleneck({
  minTime: 1 / RATE_LIMIT,
});

const axiosInstance: AxiosInstance = axios.create({
  timeout: 300000,
});


async function main() {
  const result: ICollection[] = [];
  fs.createReadStream(path.join(__dirname, `../${bidVariableFile}`))
    .pipe(csvParser())
    .on('data', async (data) => {
      const collection: ICollection = {
        slug: data.slug,
        contractAddress: data.contractAddress,
        tokenId: data.tokenId,
        buyPrice: Number(data.buyPrice),
        margin: Number(data.margin)
      }
      result.push(collection);
    })
    .on('end', async () => {
      console.table(result);
      try {
        await listTokens(result);
      } catch (err: any) {
        console.log(err?.response?.data ?? err);
      }
    });
}

// Function to run the main function repeatedly
async function listSchedule() {
  console.log('Starting automated listing process...');

  // Run immediately on startup
  await main();

  // Then run every 5 seconds, but only after the previous execution completes
  const runNextCycle = async () => {
    try {
      console.log('\n--- Running new cycle ---');
      await main();
    } catch (error) {
      console.error('Error in cycle:', error);
    } finally {
      // Schedule the next run after 5 seconds
      setTimeout(runNextCycle, 1000);
    }
  };

  // Start the cycle
  setTimeout(runNextCycle, 1000);
}

// Start the automated process instead of calling main() directly
listSchedule();

async function listTokens(collections: ICollection[]) {

  await queue.addAll((collections.map((asset) => async () => {
    const floor_Price = await getCollectionStats(asset.slug)

    console.log(`${GOLD}Floor price for ${asset.slug}: ${floor_Price} ETH${RESET}`);


    if (floor_Price === 0) {
      console.log(`${GOLD}No floor price available for ${asset.slug} - skipping${RESET}`);
      return
    }

    const priceMin = asset.buyPrice + (asset.margin || 0.005)

    const orders = await retrieveOrders(asset.slug, asset.contractAddress, asset.tokenId)


    if (orders && orders.length > 0) {
      const gasPrice = await provider.getGasPrice();

      const fulfilmentData = await fulfillActionModalQuery(ethersSigner, orders[0], asset.contractAddress, asset.tokenId, collections.length + 1)
      let gasEstimate: BigNumber | number = await estimateFulfillOfferGas({ to: fulfilmentData?.toAddress, from: fulfilmentData?.fromAddress, value: '0', data: fulfilmentData?.calldata })

      gasEstimate = Number(gasEstimate)
      const bestOffer = orders[0].price

      const gasPriceInEther = Number(ethers.utils.formatEther(gasPrice));
      const gasAmount = Number(gasEstimate)
      const acceptOfferGasFee = gasPriceInEther * gasAmount

      console.log('-------------------------------------------------');
      console.log('GAS DETAILS:');
      console.log({
        gasPriceInEther,
        gasAmount,
        acceptOfferGasFee
      });
      console.log('-------------------------------------------------');

      console.log('-------------------------------------------------');
      console.log('ACCEPT OFFER GAS FEE (ETH): ', acceptOfferGasFee);
      console.log('-------------------------------------------------');

      console.log('-------------------------------------------------');
      console.log('BEST OFFER: ', bestOffer);
      console.log('-------------------------------------------------');

      const marketFee_offer = 0.5
      const creatorfee = 5
      const priceOffer = bestOffer * (1 - (marketFee_offer + creatorfee) / 100) - acceptOfferGasFee
      console.log('-------------------------------------------------');
      console.log('PRICE OFFER: ', priceOffer);
      console.log('-------------------------------------------------');

      console.log('-------------------------------------------------');
      console.log('MINIMUM ACCEPT PRICE: ', priceMin);
      console.log('-------------------------------------------------');
      if (priceOffer > priceMin && gasEstimate > 0) {
        console.log('-------------------------------------------------');
        console.log('ACCEPT OFFER');
        console.log('-------------------------------------------------');

        await acceptOpenseaOffer(ethersSigner, orders[0], asset.contractAddress, asset.tokenId, collections.length + 1)
        return
      }
    }
    console.log('-------------------------------------------------');
    console.log('OPENSEA FLOOR PRICE for ', asset.slug, ': ', floor_Price);
    console.log('-------------------------------------------------');

    if (floor_Price && floor_Price > 0) {
      try {
        let listingPrice = Number((floor_Price - 0.00001).toFixed(5))
        console.log('-------------------------------------------------');
        console.log('OPENSEA LISTING PRICE: ', listingPrice);
        console.log('-------------------------------------------------');

        const previousFloorPrice = floorPrices[asset.slug] || 0

        if (listingPrice < priceMin) {
          console.log('-------------------------------------------------');
          console.log('LISTING PRICE IS LESS THAN MINIMUM ACCEPT PRICE');
          console.log('-------------------------------------------------');
          listingPrice = priceMin
        }


        console.log({ slug: asset.slug, previousFloorPrice, priceMin, floor_Price });


        if (previousFloorPrice.toFixed(5) === priceMin.toFixed(5) || previousFloorPrice.toFixed(5) === floor_Price.toFixed(5)) {
          console.log(`${GOLD}Floor price unchanged for ${asset.slug} at ${floor_Price.toFixed(5)} ETH - skipping${RESET}`);
          return;
        }
        const collectionData = await getCollectionInfoWithRapidApi(
          asset.slug
        );
        const normalizedFees = normalizeCreatorFees(collectionData?.creator_fees);
        console.log({ slug: asset.slug, listingPrice, normalizedFees, enforceCreatorFee: collectionData?.enforceCreatorFee });

        await listOnOpensea(asset.contractAddress, asset.tokenId, Number(listingPrice.toFixed(5)), ethersSigner, (collectionData?.enforceCreatorFee as boolean), normalizedFees);
        // await listOnOpenseaBeta(ethersSigner, Number(listingPrice.toFixed(5)), asset.contractAddress, asset.tokenId)

        floorPrices[asset.slug] = listingPrice

      } catch (error) {
        console.log("Failed to list to OpenSea Pro:", error);
      }
    }
  })))
}

export interface IFee {
  [key: string]: number
}

function normalizeCreatorFees(fees: any): IFee | undefined {
  if (!fees) return undefined;

  // If fees is an object with numeric keys, convert to string keys
  if (typeof fees === 'object') {
    const normalized: IFee = {};
    Object.entries(fees).forEach(([key, value]) => {
      if (key !== 'null' && value !== undefined && typeof value === 'number') {
        normalized[key] = value;
      }
    });
    return normalized;
  }

  return undefined;
}

export const getCollectionInfoWithRapidApi = async (collectionSlug: string) => {
  try {
    const { data: collection } = await limiter.schedule(() => axiosInstance
      .get(
        `https://nfttools.pro/opensea/api/v2/collections/${collectionSlug}`,
        {
          headers: {
            'X-NFT-API-Key': API_KEY
          }
        }
      ))

    let creator_fees;

    console.table(collection.fees)

    let enforceCreatorFee = false;

    if (collection.fees.length > 1) {
      creator_fees = {
        [collection.fees[1].recipient]: collection.fees[1].fee * 100
      };
      enforceCreatorFee = collection.fees[1].required;
    } else {
      creator_fees = { null: 0 }
    }


    return {
      address: collection.editors[0],
      primary_asset_contracts_address: collection.contracts[0].address,
      creator_fees: creator_fees,
      enforceCreatorFee: enforceCreatorFee
    };
  } catch (error) {
    console.log('🌵💜🐢 error', error);
  }
};


const divider = 10000;
const openseaFee = 50;

const minABI = [
  {
    inputs: [{ internalType: 'address', name: 'offerer', type: 'address' }],
    name: 'getCounter',
    outputs: [{ internalType: 'uint256', name: 'counter', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];



const types = {
  OrderComponents: [
    {
      name: 'offerer',
      type: 'address'
    },
    {
      name: 'zone',
      type: 'address'
    },
    {
      name: 'offer',
      type: 'OfferItem[]'
    },
    {
      name: 'consideration',
      type: 'ConsiderationItem[]'
    },
    {
      name: 'orderType',
      type: 'uint8'
    },
    {
      name: 'startTime',
      type: 'uint256'
    },
    {
      name: 'endTime',
      type: 'uint256'
    },
    {
      name: 'zoneHash',
      type: 'bytes32'
    },
    {
      name: 'salt',
      type: 'uint256'
    },
    {
      name: 'conduitKey',
      type: 'bytes32'
    },
    {
      name: 'counter',
      type: 'uint256'
    }
  ],
  OfferItem: [
    {
      name: 'itemType',
      type: 'uint8'
    },
    {
      name: 'token',
      type: 'address'
    },
    {
      name: 'identifierOrCriteria',
      type: 'uint256'
    },
    {
      name: 'startAmount',
      type: 'uint256'
    },
    {
      name: 'endAmount',
      type: 'uint256'
    }
  ],
  ConsiderationItem: [
    {
      name: 'itemType',
      type: 'uint8'
    },
    {
      name: 'token',
      type: 'address'
    },
    {
      name: 'identifierOrCriteria',
      type: 'uint256'
    },
    {
      name: 'startAmount',
      type: 'uint256'
    },
    {
      name: 'endAmount',
      type: 'uint256'
    },
    {
      name: 'recipient',
      type: 'address'
    }
  ]
};

const domain = {
  name: 'Seaport',
  version: '1.6',
  chainId: '1',
  verifyingContract: '0x0000000000000068f116a894984e2db1123eb395'
};


export const listOnOpensea = async (
  nftAddress: string,
  tokenId: string,
  price: number,
  wallet: ethers.Wallet,
  enforceCreatorFee: boolean,
  creatorFees: IFee | undefined,
) => {

  try {
    await approveNFT(
      nftAddress,
      wallet,
      '0x1E0049783F008A0085193E00003D00cd54003c71'
    );
  } catch (error) {
    console.log(error);
  }

  const listingPayload: any = {
    criteria: {
      collection: {
        slug: 'cool-cats-nft'
      }
    },
    protocol_data: {
      parameters: {
        offerer: '0x85e9C0C52BE6fa83ec02120F419E9874e3707E7E',
        offer: [
          {
            itemType: 1,
            token: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            identifierOrCriteria: 0,
            startAmount: (Date.now() / 1000).toString(),
            endAmount: (Date.now() / 1000 + 100000).toString()
          }
        ],
        consideration: [],
        startTime: '1666480886',
        endTime: '1666680886',
        orderType: 0,
        zone: '0x0000000000000000000000000000000000000000',
        zoneHash:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        conduitKey:
          '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
        totalOriginalConsiderationItems: 2,
        counter: '0'
      },
      signature: '0x0'
    },
    protocol_address: '0x0000000000000068f116a894984e2db1123eb395'
  };

  // Ensure parameters are properly structured to avoid "Cannot set properties of undefined" error
  listingPayload.parameters = listingPayload.protocol_data.parameters;

  const offerPrice = ethers.utils.parseEther(price.toString());
  console.log({ offerPrice, offerPriceString: offerPrice.toString() });

  // Payload data
  listingPayload.parameters.startTime = BigInt(
    Math.floor(Date.now() / 1000)
  ).toString();
  listingPayload.parameters.endTime = BigInt(
    Math.floor(Date.now() / 1000 + 960)
  ).toString();
  const itemType = 2;
  listingPayload.parameters.offerer = wallet.address;
  listingPayload.parameters.offer[0].itemType = itemType;
  listingPayload.parameters.offer[0].token = nftAddress;
  listingPayload.parameters.offer[0].identifierOrCriteria = tokenId;
  listingPayload.parameters.offer[0].startAmount = "1";
  listingPayload.parameters.offer[0].endAmount = "1";

  let totalCreatorFee = 0;
  const creatorFeeConsideration = [];
  // This is the seller fee consideration item
  // Loop through creator fees and add relevant fees to the payload
  listingPayload.parameters.totalOriginalConsiderationItems = 2;
  for (const address in creatorFees) {
    let fee = creatorFees[address];
    // If there are creator fees, loop through and add them all as consideration items
    if (address !== 'null') {
      const consideration_item = {
        itemType: 0,
        token: constants.AddressZero,
        identifierOrCriteria: 0,
        startAmount: offerPrice.mul(fee).div(divider).toString(),
        endAmount: offerPrice.mul(fee).div(divider).toString(),
        recipient: address
      };

      // push consideration item to the payload
      creatorFeeConsideration.push(consideration_item);

      // Add 1 to the consideration items for each fee
      if (enforceCreatorFee) {
        listingPayload.parameters.totalOriginalConsiderationItems += 1;
        totalCreatorFee += fee;
      }
    }
  }

  // assign first consideration item
  const ownerConsideration = {
    itemType: 0,
    token: constants.AddressZero,
    identifierOrCriteria: 0,
    startAmount: offerPrice
      .mul(divider - totalCreatorFee - openseaFee)
      .div(divider)
      .toString(),
    endAmount: offerPrice
      .mul(divider - totalCreatorFee - openseaFee)
      .div(divider)
      .toString(),
    recipient: wallet.address
  };

  // build second consideration item
  // This is the opensea fee
  // console.log(offerPrice.mul(openseaFee).div(divider).toString());
  const openseaConsideration = {
    itemType: 0,
    token: constants.AddressZero,
    identifierOrCriteria: 0,
    startAmount: offerPrice.mul(50).div(divider).toString(),
    endAmount: offerPrice.mul(50).div(divider).toString(),
    recipient: '0x0000a26b00c1F0DF003000390027140000fAa719'
  };

  listingPayload.parameters.consideration = enforceCreatorFee
    ? [
      ownerConsideration,
      openseaConsideration,
      ...creatorFeeConsideration
    ]
    : [
      ownerConsideration,
      openseaConsideration
    ];

  listingPayload.parameters.salt = Math.floor(
    Math.random() * 100_000
  ).toString();

  const seaportContractAddress = '0x00000000000001ad428e4906aE43D8F9852d0dD6';
  const seaportContract = new Contract(seaportContractAddress, minABI, provider);

  // request the value for the counter from the seaport contract and set it in payload
  const counter = await seaportContract.getCounter(wallet.address);
  listingPayload.parameters.counter = counter.toString();

  // sign the offer
  const sigObj = await wallet._signTypedData(
    domain,
    types,
    listingPayload.parameters
  );

  listingPayload.signature = sigObj;
  const openseaRapidEndpoint = 'https://nfttools.pro/opensea/api/v1/'

  const listings = await limiter
    .schedule(() =>
      axiosInstance.request({
        method: 'POST',
        url: `${openseaRapidEndpoint.replace(
          'v1',
          'v2'
        )}orders/ethereum/seaport/listings`,
        headers: {
          'content-type': 'application/json',
          'X-NFT-API-Key': API_KEY
        },
        data: JSON.stringify(listingPayload)
      })
    )
    .then((res) => res.data)
    .catch((err) => {
      return { errors: err?.response?.data ?? err };
    });

  if (listings.errors) {
    console.log('Error: ', JSON.stringify(listings.errors));
  } else {
    console.log('NFT listed successfully on opensea');
  }
};


const approveAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      }
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address'
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool'
      }
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

export async function approveNFT(
  nftAddress: string,
  wallet: Wallet,
  marketContractAddress: string
): Promise<void> {

  const nftContract = new Contract(nftAddress, approveAbi, wallet);

  try {
    const approved: boolean = await nftContract.isApprovedForAll(
      wallet.address,
      marketContractAddress
    );
    console.log({ approved });
    if (!approved) {
      console.log('Approve NFT to', marketContractAddress);
      const tx = await nftContract.setApprovalForAll(
        marketContractAddress,
        true
      );
      await tx.wait();
      console.log('NFT approved successfully');
    }
  } catch (err: any) {
    console.log(err?.reason ?? err?.message);
  }
};


export async function fulfillActionModalQuery(ethersSigner: ethers.Wallet, order: { maker: string, price: number, orderId: string }, contractAddress: string, tokenId: string, retryAttempt: number) {
  try {
    const payload = {
      id: "FulfillActionModalQuery",
      variables: {
        "orderId": order.orderId,
        "itemFillAmount": "1",
        "takerAssetsForCriteria": { "assetContractAddress": contractAddress, "tokenId": tokenId, "chain": "ETHEREUM" },
        "giftRecipientAddress": null,
      }
      ,
      query: FulfillActionModalQuery
    }
    const cookies = await getOSCookies(ethersSigner);
    const { data } = await limiter.schedule(() => axiosInstance.post(
      "https://nfttools.pro/opensea/__api/graphql/",
      payload,
      {
        headers: {
          cookie: cookies,
          'x-nft-api-key': API_KEY,
          'x-auth-address': ethersSigner.address.toLowerCase(),
          "x-signed-query": "7d2dba948e25324e67187a36f5383b3aa40d68c14cd05186ddd91d0da9826741",
        },
      }
    ));
    const nonce = Math.floor(Math.random() * 1000000) + 1;

    const fulfilmentData = {
      calldata: data?.data?.order?.fulfill?.actions[0]?.method?.data,
      chain: data?.data?.order?.fulfill?.actions[0]?.method?.chain?.identifier,
      fromAddress: ethersSigner?.address?.toLowerCase(),
      nonce: nonce,
      toAddress: data?.data?.order?.fulfill?.actions[0]?.method?.destination?.value
    }
    return fulfilmentData
  } catch (error: any) {
    console.log(error);
  }
}

export async function retrieveOrders(slug: string, contractAddress: string, tokenId: string) {

  const payload = {
    id: "OrdersQuery",
    variables: { "cursor": null, "count": 32, "excludeMaker": null, "isExpired": false, "isValid": true, "includeInvalidBids": null, "isInactive": null, "maker": null, "makerArchetype": null, "makerAssetIsPayment": true, "takerArchetype": { "assetContractAddress": contractAddress, "tokenId": tokenId, "chain": "ETHEREUM" }, "takerAssetCollections": null, "takerAssetIsOwnedBy": null, "takerAssetIsPayment": null, "sortAscending": null, "sortBy": "PRICE", "makerAssetBundle": null, "takerAssetBundle": null, "expandedMode": false, "isBid": true, "filterByOrderRules": true, "includeCriteriaOrders": true, "criteriaTakerAssetId": "QXNzZXRUeXBlOjg3MzM0Nzk0Mw==", "includeCriteriaTakerAsset": true, "isSingleAsset": true },
    query: OrdersQuery
  }

  try {
    const { data } = await limiter.schedule(() => axiosInstance.post(
      "https://nfttools.pro/opensea/__api/graphql/",
      payload,
      {
        headers: {
          'X-NFT-API-Key': API_KEY,
          "x-signed-query": "bdca2ec9c8105d73a702913f6360a8fc7f5000aa5c909d186599bb4cc9b2e7c0",
        },
      }
    ));
    const order = data.data.orders.edges
      .filter((item: any) => item.node.payment.symbol.toLowerCase() === 'WETH'.toLowerCase())
      .map((order: any) => ({ maker: order.node.maker.address, price: Number(order.node.perUnitPriceType.eth), orderId: order.node.relayId, payment: order.node.payment.symbol }))
    console.log(`ACTIVE ORDERS FOR ${slug}`);
    console.table(order)
    console.log('---------------------------------------------------------------')
    return order
  } catch (error: any) {
    console.log(error?.response?.data || error);

  }
}


interface ICollection {
  slug: string;
  contractAddress: string;
  tokenId: string;
  buyPrice: number;
  margin: number;
}


async function getOSCookies(ethersSigner: any) {
  const options: any = {
    method: 'POST',
    url: `${CONFIG.OS_BASE_URL}/__api/graphql/`,
    headers: {
      'content-type': 'application/json',
      'x-signed-query':
        'e35fa1b7ede16cf8e95a6867a739cc0002ae8bfde2a8a1926d05d2919170e33a',
      'X-NFT-API-Key': CONFIG.X_RAPIDAPI_KEY
    },
    data: {
      id: 'challengeLoginMessageQuery',
      query: challengeLoginMessageQuery,
      variables: {
        address: ethersSigner.address.toLowerCase()
      }
    }
  };

  try {
    const loginResponse = await limiter.schedule(() => axiosInstance.request(options)) as any
    const message = loginResponse.data.data.auth.loginMessage;
    const signature = await ethersSigner.signMessage(message);
    const postOptions = {
      method: 'POST',
      url: `${CONFIG.OS_BASE_URL}/__api/graphql/`,
      headers: {
        'content-type': 'application/json',
        'x-signed-query':
          'f6b83e92d7ef2ba14a46f695d07198b7eae0403f0e2164270438eff613755981',
        'X-NFT-API-Key': CONFIG.X_RAPIDAPI_KEY
      },
      data: {
        id: 'authLoginV2AuthSimplifiedMutation',
        query: authLoginV2AuthSimplifiedMutation,
        variables: {
          address: ethersSigner.address.toLowerCase(),
          message: message,
          deviceId: deviceId,
          signature: signature,
          chain: 'ETHEREUM'
        }
      }
    };
    const authResponse = await limiter.schedule(() => axiosInstance.request(postOptions));
    if (authResponse.data.errors) return null;
    const cookies: any = authResponse.headers['set-cookie'];
    const combinedCookieHeader = cookies.join('; ');
    getJWTFromCookies(combinedCookieHeader, ethersSigner);
    return combinedCookieHeader;
  } catch (error: any) {
    console.log(error.response.data.errors);
  }
}


export async function estimateFulfillOfferGas(tx: ethers.providers.TransactionRequest): Promise<BigNumber> {
  const maxRetries = 3;
  const delayFactor = 1000;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      if (tx) {
        const data = {
          to: tx.to,
          from: tx.from,
          value: tx.value,
          data: tx.data,
          maxPriorityFeePerGas: 0,
        }
        return await provider.estimateGas(data);
      }
      return BigNumber.from(0);
    } catch (error) {
      if (attempt < maxRetries - 1) {
        const delay = delayFactor * Math.pow(2, attempt);
        console.log(`Retrying in ${delay} ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.log('Max retries reached, stopping...');
        return BigNumber.from(0);
      }
    }
  }
  return BigNumber.from(0);
}


export const acceptOpenseaOffer = async (ethersSigner: ethers.Wallet, order: { maker: string, price: number, orderId: string }, contractAddress: string, tokenId: string, retryAttempt: number) => {
  try {
    const fulfilmentData = await fulfillActionModalQuery(ethersSigner, order, contractAddress, tokenId, retryAttempt)

    if (fulfilmentData) {
      const userTx = await useCreateRequestedTransactionMutation(ethersSigner, fulfilmentData, retryAttempt)

      if (userTx?.data.userTransaction.request.relayId) {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const gasEstimate = await estimateFulfillOfferGas({ to: fulfilmentData.toAddress, from: fulfilmentData.fromAddress, value: '0', data: fulfilmentData.calldata }) || 21000;

        const transaction = {
          to: fulfilmentData.toAddress,
          from: fulfilmentData.fromAddress,
          value: '0',
          data: fulfilmentData.calldata,
          gasLimit: ethers.utils.hexlify(+gasEstimate)
        }
        transaction.gasLimit = ethers.utils.hexlify(+gasEstimate);
        const tx = await ethersSigner.sendTransaction(transaction)
        console.log(GOLD + JSON.stringify(tx) + RESET);
      }
    }

  } catch (error) {
    console.log(error);
  }

}

function generateUUIDv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getJWTFromCookies(cookies: any, ethersSigner: ethers.Wallet) {
  const tokenPrefix = ethersSigner.address.toLowerCase() + '_auth_token=';
  if (!cookies) return null
  const cookieList = cookies.split(';')
  for (const cookie of cookieList) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith(tokenPrefix)) {
      return trimmedCookie.substring(tokenPrefix.length);
    }
  }
}


async function useCreateRequestedTransactionMutation(ethersSigner: ethers.Wallet, fulfilmentData: {
  calldata: string;
  chain: string;
  fromAddress: string;
  nonce: number;
  toAddress: string;
}, retryAttempt: number) {
  try {
    const payload = {
      "id": "useCreateRequestedTransactionMutation",
      "query": "mutation useCreateRequestedTransactionMutation(\n  $calldata: String!\n  $chain: ChainScalar!\n  $fromAddress: AddressScalar!\n  $toAddress: AddressScalar!\n  $nonce: Int!\n  $value: BigIntScalar\n) {\n  userTransaction {\n    request(nonce: $nonce, chain: $chain, fromAddress: $fromAddress, calldata: $calldata, toAddress: $toAddress, value: $value) {\n      relayId\n      id\n    }\n  }\n}\n",
      "variables": {
        "calldata": fulfilmentData.calldata,
        "chain": fulfilmentData.chain,
        "fromAddress": fulfilmentData.fromAddress,
        "toAddress": fulfilmentData.toAddress,
        "nonce": fulfilmentData.nonce,
        "value": "0"
      }
    }

    const cookies = await getOSCookies(ethersSigner);

    const { data } = await limiter.schedule(() => axiosInstance.post(
      "https://nfttools.pro/opensea/__api/graphql/",
      payload,
      {
        headers: {
          cookie: cookies,
          'x-nft-api-key': API_KEY,
          'x-auth-address': ethersSigner.address.toLowerCase(),
          "x-signed-query": "dbe3940673a67aa1993cb66beb246404872fe50c37632904650f0726060ac970",
        },
      }
    ));
    return data
  } catch (error: any) {
    console.log(error.response.data);
  }
}


export async function getCollectionStats(collectionSlug: string) {
  try {
    const { data } = await limiter.schedule(() => axiosInstance.get(
      `https://nfttools.pro/opensea/api/v2/listings/collection/${collectionSlug}/best`,
      {
        headers: { 'X-NFT-API-Key': API_KEY }
      }
    ));
    const listings = data?.listings?.sort((a: any, b: any) => Number(a.price.current.value) - Number(b.price.current.value))
    const floor_price = Number(listings[0]?.price?.current?.value) / 1e18 || 0
    return floor_price;
  } catch (error: any) {
    return 0;
  }
}