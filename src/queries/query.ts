/**
 * Collection of GraphQL queries used for OpenSea API interactions
 */

/**
 * Query to fetch item details for a specific NFT
 */
export const ITEM_VIEW_MODAL_QUERY = `query ItemViewModalQuery($identifier: ItemIdentifierInput!) {
  itemByIdentifier(identifier: $identifier) {
    __typename
    ... on Item {
      id
      ...ItemView
      ...ItemViewModal
      __typename
    }
  }
}
fragment ItemView on Item {
  chain {
    identifier
    arch
    __typename
  }
  contractAddress
  isFungible
  tokenId
  ...ItemAttributes
  ...ItemAbout
  ...ItemActivity
  ...ItemStats
  ...ItemDetails
  ...ItemPageMedia
  ...ItemSocial
  ...ItemAction
  ...itemUrl
  ...ItemTabs
  ...ItemTitle
  ...ItemOrders
  ...ItemMetadataChips
  ...itemIdentifier
  enforcement {
    isDisabled
    __typename
  }
  version
  __typename
}
fragment ItemAttributes on ItemIdentifier {
  ...itemIdentifier
  __typename
}
fragment itemIdentifier on ItemIdentifier {
  chain {
    identifier
    __typename
  }
  tokenId
  contractAddress
  __typename
}
fragment ItemStats on Item {
  tokenId
  isFungible
  totalSupply
  rarity {
    rank
    __typename
  }
  bestOffer {
    pricePerItem {
      usd
      ...TokenPrice
      __typename
    }
    __typename
  }
  bestListing {
    pricePerItem {
      usd
      ...TokenPrice
      __typename
    }
    __typename
  }
  collection {
    id
    slug
    floorPrice {
      pricePerItem {
        usd
        ...TokenPrice
        __typename
      }
      __typename
    }
    __typename
  }
  lastSale {
    ...TokenPrice
    __typename
  }
  ...isItemRarityDisabled
  ...RarityTooltip
  __typename
}
fragment TokenPrice on Price {
  usd
  token {
    unit
    symbol
    contractAddress
    chain {
      identifier
      __typename
    }
    __typename
  }
  __typename
}
fragment isItemRarityDisabled on Item {
  collection {
    id
    slug
    __typename
  }
  __typename
}
fragment RarityTooltip on Item {
  rarity {
    category
    rank
    totalSupply
    __typename
  }
  ...isItemRarityDisabled
  __typename
}
fragment ItemAbout on Item {
  id
  tokenId
  contractAddress
  chain {
    name
    identifier
    arch
    __typename
  }
  standard
  description
  collection {
    description
    __typename
  }
  details {
    name
    value
    __typename
  }
  __typename
}
fragment ItemActivity on Item {
  id
  contractAddress
  tokenId
  chain {
    identifier
    __typename
  }
  isFungible
  __typename
}
fragment ItemDetails on Item {
  name
  contractAddress
  tokenId
  chain {
    identifier
    __typename
  }
  owner {
    address
    ...AccountLockup
    ...profileUrl
    __typename
  }
  isFungible
  ...ItemCollection
  ...ItemSocial
  ...RefreshItemMetadataButton
  ...itemUrl
  __typename
}
fragment ItemCollection on Item {
  collection {
    slug
    imageUrl
    isVerified
    name
    ...collectionUrl
    __typename
  }
  __typename
}
fragment collectionUrl on CollectionIdentifier {
  slug
  __typename
}
fragment ItemSocial on Item {
  chain {
    identifier
    __typename
  }
  contractAddress
  tokenId
  externalUrl
  collection {
    externalUrl
    discordUrl
    instagramUsername
    twitterUsername
    __typename
  }
  __typename
}
fragment RefreshItemMetadataButton on ItemIdentifier {
  ...itemIdentifier
  __typename
}
fragment AccountLockup on ProfileIdentifier {
  address
  displayName
  imageUrl
  ...profileUrl
  __typename
}
fragment profileUrl on ProfileIdentifier {
  address
  __typename
}
fragment itemUrl on ItemIdentifier {
  chain {
    identifier
    arch
    __typename
  }
  tokenId
  contractAddress
  __typename
}
fragment ItemPageMedia on Item {
  ...ItemMedia
  __typename
}
fragment ItemMedia on Item {
  imageUrl
  animationUrl
  backgroundColor
  __typename
}
fragment ItemAction on Item {
  id
  isFungible
  version
  ...itemIdentifier
  __typename
}
fragment ItemTitle on Item {
  name
  ...EnforcementBadge
  __typename
}
fragment EnforcementBadge on EnforcedEntity {
  __typename
  enforcement {
    isCompromised
    isDisabled
    __typename
  }
}
fragment ItemTabs on Item {
  isFungible
  collection {
    slug
    __typename
  }
  __typename
}
fragment ItemOrders on Item {
  contractAddress
  tokenId
  collection {
    slug
    __typename
  }
  chain {
    identifier
    __typename
  }
  isFungible
  ...ItemOrdersDepthChart
  ...ItemOrdersFeed
  __typename
}
fragment ItemOrdersDepthChart on Item {
  contractAddress
  tokenId
  chain {
    identifier
    __typename
  }
  __typename
}
fragment ItemOrdersFeed on Item {
  tokenId
  collection {
    slug
    __typename
  }
  ...ItemOffersTable
  __typename
}
fragment ItemOffersTable on Item {
  isFungible
  ...itemIdentifier
  ...useAcceptOffers
  __typename
}
fragment useAcceptOffers on Item {
  chain {
    identifier
    arch
    __typename
  }
  contractAddress
  tokenId
  collection {
    isTradingEnabled
    __typename
  }
  bestOffer {
    pricePerItem {
      token {
        unit
        address
        __typename
      }
      __typename
    }
    maker {
      address
      __typename
    }
    __typename
  }
  enforcement {
    isCompromised
    __typename
  }
  __typename
}
fragment ItemMetadataChips on Item {
  ...ItemMetadataChip
  __typename
}
fragment ItemMetadataChip on Item {
  ...ItemChainChip
  ...ItemRarityChip
  ...ItemTokenIdChip
  ...ItemStandardChip
  ...ItemTopOfferChip
  ...ItemOwnersChip
  __typename
}
fragment ItemChainChip on Item {
  chain {
    ...ChainChip
    __typename
  }
  __typename
}
fragment ChainChip on Chain {
  identifier
  name
  __typename
}
fragment ItemRarityChip on Item {
  rarity {
    rank
    category
    __typename
  }
  __typename
}
fragment ItemTokenIdChip on Item {
  tokenId
  __typename
}
fragment ItemStandardChip on Item {
  standard
  __typename
}
fragment ItemTopOfferChip on Item {
  bestOffer {
    pricePerItem {
      ...TokenPrice
      __typename
    }
    __typename
  }
  enforcement {
    isCompromised
    __typename
  }
  ...EnforcementBadge
  __typename
}
fragment ItemOwnersChip on Item {
  ...ItemOwnersModal
  ...ItemOwnersCount
  isFungible
  __typename
}
fragment ItemOwnersModal on Item {
  ...ItemOwnersModalContent
  __typename
}
fragment ItemOwnersModalContent on Item {
  ...ItemOwnersTable
  __typename
}
fragment ItemOwnersTable on Item {
  tokenId
  chain {
    identifier
    __typename
  }
  contractAddress
  __typename
}
fragment ItemOwnersCount on Item {
  tokenId
  chain {
    identifier
    __typename
  }
  contractAddress
  __typename
}
fragment ItemViewModal on Item {
  name
  __typename
}`;

/**
 * Query to fetch listing flow data for an NFT
 */
export const LISTING_FLOW_QUERY = `query ListingFlowQuery($identifiers: [ItemIdentifierInput!]!, $address: Address) {
  itemsByIdentifiers(identifiers: $identifiers) {
    id
    tokenId
    contractAddress
    chain {
      identifier
      __typename
    }
    isTradingDisabled
    ...ListingFlowBase
    __typename
  }
}
fragment ListingFlowBase on Item {
  id
  imageUrl
  chain {
    identifier
    __typename
  }
  collection {
    id
    fees {
      totalCreatorFee {
        feeBasisPoints
        isRequired
        __typename
      }
      openseaFee {
        feeBasisPoints
        __typename
      }
      __typename
    }
    floorPrice {
      id
      pricePerItem {
        token {
          unit
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  chain {
    listingCurrency {
      symbol
      __typename
    }
    __typename
  }
  isFungible
  ownership(address: $address) {
    quantity
    __typename
  }
  lowestListingForOwner(address: $address) {
    pricePerItem {
      token {
        unit
        __typename
      }
      __typename
    }
    __typename
  }
  ...ListingFlowForm_item
  ...ListingFlowDone_item
  ...ListingFlowReview_item
  ...useLiveUpdateItemsBestOrders
  ...readItemHighestTraitFloor
  __typename
}
fragment ListingFlowForm_item on Item {
  id
  collection {
    chain {
      identifier
      nativeCurrency {
        address
        __typename
      }
      listingCurrency {
        address
        symbol
        __typename
      }
      __typename
    }
    fees {
      openseaFee {
        feeBasisPoints
        __typename
      }
      __typename
    }
    ...CreateOrdersSummary
    __typename
  }
  chain {
    listingCurrency {
      symbol
      __typename
    }
    __typename
  }
  lowestListingForOwner(address: $address) {
    __typename
  }
  isFungible
  ...ListingFlowItemsTable
  __typename
}
fragment ListingFlowItemsTable on Item {
  id
  ...ListingFlowItemsTableRow
  __typename
}
fragment ListingFlowItemsTableRow on Item {
  id
  tokenId
  name
  imageUrl
  isFungible
  lastSale {
    token {
      unit
      symbol
      __typename
    }
    __typename
  }
  bestOffer {
    id
    pricePerItem {
      token {
        unit
        symbol
        __typename
      }
      __typename
    }
    __typename
  }
  chain {
    listingCurrency {
      symbol
      __typename
    }
    __typename
  }
  collection {
    id
    floorPrice {
      id
      pricePerItem {
        token {
          unit
          symbol
          __typename
        }
        __typename
      }
      __typename
    }
    fees {
      openseaFee {
        feeBasisPoints
        __typename
      }
      totalCreatorFee {
        feeBasisPoints
        __typename
      }
      __typename
    }
    __typename
  }
  ...RarityBadge
  ...readItemHighestTraitFloor
  __typename
}
fragment RarityBadge on Item {
  rarity {
    category
    rank
    totalSupply
    __typename
  }
  __typename
}
fragment readItemHighestTraitFloor on Item {
  __typename
  attributes {
    floorPrice {
      token {
        unit
        symbol
        __typename
      }
      __typename
    }
    __typename
  }
}
fragment CreateOrdersSummary on Collection {
  floorPrice {
    pricePerItem {
      usd
      __typename
    }
    __typename
  }
  fees {
    totalCreatorFee {
      feeBasisPoints
      __typename
    }
    openseaFee {
      feeBasisPoints
      __typename
    }
    __typename
  }
  __typename
}
fragment ListingFlowDone_item on Item {
  chain {
    identifier
    __typename
  }
  contractAddress
  tokenId
  name
  imageUrl
  collection {
    id
    name
    slug
    __typename
  }
  __typename
}
fragment ListingFlowReview_item on Item {
  id
  name
  tokenId
  imageUrl
  contractAddress
  ...convertItemsAndPricingToListings
  ...ListingFlowItemsTable
  collection {
    chain {
      identifier
      nativeCurrency {
        address
        __typename
      }
      listingCurrency {
        address
        symbol
        __typename
      }
      __typename
    }
    ...CreateOrdersSummary
    __typename
  }
  __typename
}
fragment convertItemsAndPricingToListings on Item {
  id
  name
  tokenId
  contractAddress
  chain {
    identifier
    listingCurrency {
      address
      symbol
      __typename
    }
    __typename
  }
  collection {
    id
    fees {
      openseaFee {
        feeBasisPoints
        isRequired
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}
fragment useLiveUpdateItemsBestOrders on Item {
  id
  tokenId
  contractAddress
  chain {
    identifier
    __typename
  }
  __typename
}`;

/**
 * Query to create a listing on OpenSea
 */
export const LISTING_FLOW_TIMELINE_QUERY = `query ListingFlowTimelineQuery($listings: [ItemListingInput!]!, $address: Address!, $useCreatorFee: Boolean!, $taker: Address) {
  createListings(
    listings: $listings
    address: $address
    useCreatorFee: $useCreatorFee
    taker: $taker
  ) {
    actions {
      __typename
      ... on CreateListingsAction {
        items {
          chain {
            identifier
            __typename
          }
          __typename
        }
        orders {
          ...seaportOrder
          __typename
        }
        __typename
      }
      ...ActionTimeline
    }
    __typename
  }
}
fragment ActionTimeline on BlockchainAction {
  __typename
  ... on TransactionAction {
    transactionSubmissionData {
      __typename
    }
    __typename
  }
  ...useScheduler_action
  ...ActionTimelineItem
}
fragment useScheduler_action on BlockchainAction {
  __typename
  ... on BlurAuthAction {
    chain {
      identifier
      __typename
    }
    expiresOn
    hmac
    signatureRequest {
      message
      ...useScheduler_signatureRequest
      __typename
    }
    __typename
  }
  ... on RefreshAction {
    message
    __typename
  }
  ... on SignatureRequestAction {
    signatureRequest {
      ...useScheduler_signatureRequest
      __typename
    }
    __typename
  }
  ... on TransactionAction {
    transactionSubmissionData {
      chain {
        networkId
        identifier
        blockExplorer {
          name
          transactionUrlTemplate
          __typename
        }
        __typename
      }
      ...useScheduler_transactionSubmissionData
      __typename
    }
    __typename
  }
  ... on GaslessCancelOrdersAction {
    signatureRequest {
      ...useScheduler_signatureRequest
      __typename
    }
    __typename
  }
  ... on SwapAssetsAction {
    isCrossChain
    __typename
  }
}
fragment useScheduler_signatureRequest on SignatureRequest {
  __typename
  message
  ... on SignTypedDataRequest {
    chain {
      networkId
      __typename
    }
    __typename
  }
}
fragment useScheduler_transactionSubmissionData on TransactionSubmissionData {
  to
  data
  value
  chain {
    networkId
    __typename
  }
  __typename
}
fragment ActionTimelineItem on BlockchainAction {
  ... on BuyItemAction {
    __typename
    items {
      imageUrl
      id
      __typename
    }
  }
  ... on AcceptOfferAction {
    __typename
    items {
      id
      __typename
    }
  }
  ... on ItemApprovalAction {
    __typename
    item {
      collection {
        name
        imageUrl
        __typename
      }
      __typename
    }
  }
  ... on PaymentApprovalAction {
    __typename
    currency {
      id
      symbol
      __typename
    }
  }
  ... on CreateListingsAction {
    items {
      id
      __typename
    }
    __typename
  }
  ... on UnwrapAction {
    __typename
    transactionSubmissionData {
      to
      chain {
        identifier
        nativeCurrency {
          symbol
          __typename
        }
        wrappedNativeCurrency {
          symbol
          __typename
        }
        __typename
      }
      __typename
    }
  }
  ... on WrapAction {
    __typename
    transactionSubmissionData {
      to
      chain {
        identifier
        nativeCurrency {
          symbol
          __typename
        }
        wrappedNativeCurrency {
          symbol
          __typename
        }
        __typename
      }
      __typename
    }
  }
  __typename
}
fragment seaportOrder on SeaportOrderComponents {
  offerer
  zone
  offer {
    itemType
    token
    identifierOrCriteria
    startAmount
    endAmount
    __typename
  }
  consideration {
    itemType
    token
    identifierOrCriteria
    startAmount
    endAmount
    recipient
    __typename
  }
  orderType
  startTime
  endTime
  zoneHash
  salt
  conduitKey
  counter
  __typename
}`;

/**
 * Mutation to create listings on OpenSea after signing
 */
export const CREATE_ORDER_MUTATION = `mutation ListingsFlowTimelineMutation($chain: ChainIdentifier!, $orders: [SeaportOrderComponentsInput!]!, $signature: String!) {
  createListingsV2(chain: $chain, orders: $orders, signature: $signature) {
    ...readOrderCreationError
    __typename
  }
}
fragment readOrderCreationError on OrderCreationMutationResponse {
  __typename
  ... on OrderCreationErrorResponse {
    errors {
      ... on TransactionError {
        message
        __typename
      }
      __typename
    }
    __typename
  }
}`;

export const FulfillActionModalQuery = "query FulfillActionModalQuery(\n  $orderId: OrderRelayID!\n  $itemFillAmount: BigNumberScalar!\n  $takerAssetsForCriteria: ArchetypeInputType\n  $giftRecipientAddress: AddressScalar\n  $optionalCreatorFeeBasisPoints: Int\n) {\n  order(order: $orderId) {\n    relayId\n    side\n    fulfill(itemFillAmount: $itemFillAmount, takerAssetsForCriteria: $takerAssetsForCriteria, giftRecipientAddress: $giftRecipientAddress, optionalCreatorFeeBasisPoints: $optionalCreatorFeeBasisPoints) {\n      actions {\n        __typename\n        ... on FulfillOrderActionType {\n          giftRecipientAddress\n        }\n        ...BlockchainActionList_data\n      }\n    }\n    id\n  }\n}\n\nfragment AskForDepositAction_data on AskForDepositType {\n  asset {\n    chain {\n      identifier\n    }\n    decimals\n    symbol\n    usdSpotPrice\n    id\n  }\n  minQuantity\n}\n\nfragment AskForSwapAction_data on AskForSwapType {\n  __typename\n  fromAsset {\n    chain {\n      identifier\n    }\n    decimals\n    symbol\n    id\n  }\n  toAsset {\n    chain {\n      identifier\n    }\n    symbol\n    id\n  }\n  minQuantity\n  maxQuantity\n  ...useHandleBlockchainActions_ask_for_asset_swap\n}\n\nfragment AssetApprovalAction_data on AssetApprovalActionType {\n  __typename\n  asset {\n    chain {\n      identifier\n    }\n    ...StackedAssetMedia_assets\n    assetContract {\n      ...CollectionLink_assetContract\n      id\n    }\n    collection {\n      __typename\n      ...CollectionLink_collection\n      id\n    }\n    id\n  }\n  ...useHandleBlockchainActions_approve_asset\n}\n\nfragment AssetBurnToRedeemAction_data on AssetBurnToRedeemActionType {\n  __typename\n  ...useHandleBlockchainActions_burnToRedeem\n  asset {\n    chain {\n      identifier\n    }\n    assetContract {\n      ...CollectionLink_assetContract\n      id\n    }\n    collection {\n      __typename\n      ...CollectionLink_collection\n      id\n    }\n    displayName\n    ...StackedAssetMedia_assets\n    id\n  }\n}\n\nfragment AssetItem_asset on AssetType {\n  chain {\n    identifier\n  }\n  displayName\n  relayId\n  collection {\n    name\n    id\n  }\n  ...StackedAssetMedia_assets\n}\n\nfragment AssetMediaAnimation_asset on AssetType {\n  ...AssetMediaImage_asset\n  ...AssetMediaContainer_asset\n  ...AssetMediaPlaceholderImage_asset\n}\n\nfragment AssetMediaAudio_asset on AssetType {\n  backgroundColor\n  ...AssetMediaImage_asset\n}\n\nfragment AssetMediaContainer_asset on AssetType {\n  backgroundColor\n  ...AssetMediaEditions_asset_1mZMwQ\n  collection {\n    ...useIsRarityEnabled_collection\n    id\n  }\n}\n\nfragment AssetMediaContainer_asset_1LNk0S on AssetType {\n  backgroundColor\n  ...AssetMediaEditions_asset_1mZMwQ\n  collection {\n    ...useIsRarityEnabled_collection\n    id\n  }\n}\n\nfragment AssetMediaEditions_asset_1mZMwQ on AssetType {\n  decimals\n}\n\nfragment AssetMediaImage_asset on AssetType {\n  backgroundColor\n  imageUrl\n  collection {\n    displayData {\n      cardDisplayStyle\n    }\n    id\n  }\n}\n\nfragment AssetMediaPlaceholderImage_asset on AssetType {\n  collection {\n    displayData {\n      cardDisplayStyle\n    }\n    id\n  }\n}\n\nfragment AssetMediaVideo_asset on AssetType {\n  backgroundColor\n  ...AssetMediaImage_asset\n}\n\nfragment AssetMediaWebgl_asset on AssetType {\n  backgroundColor\n  ...AssetMediaImage_asset\n}\n\nfragment AssetMedia_asset on AssetType {\n  animationUrl\n  displayImageUrl\n  imageUrl\n  isDelisted\n  ...AssetMediaAnimation_asset\n  ...AssetMediaAudio_asset\n  ...AssetMediaContainer_asset_1LNk0S\n  ...AssetMediaImage_asset\n  ...AssetMediaPlaceholderImage_asset\n  ...AssetMediaVideo_asset\n  ...AssetMediaWebgl_asset\n}\n\nfragment AssetSwapAction_data on AssetSwapActionType {\n  __typename\n  ...useHandleBlockchainActions_swap_asset\n}\n\nfragment AssetTransferAction_data on AssetTransferActionType {\n  __typename\n  ...useHandleBlockchainActions_transfer_asset\n}\n\nfragment BlockchainActionList_data on BlockchainActionType {\n  __isBlockchainActionType: __typename\n  __typename\n  ... on AssetApprovalActionType {\n    ...AssetApprovalAction_data\n  }\n  ... on AskForDepositType {\n    __typename\n    ...AskForDepositAction_data\n  }\n  ... on AskForSwapType {\n    __typename\n    ...AskForSwapAction_data\n  }\n  ... on AssetSwapActionType {\n    __typename\n    ...AssetSwapAction_data\n  }\n  ... on AssetTransferActionType {\n    __typename\n    ...AssetTransferAction_data\n  }\n  ... on CreateOrderActionType {\n    __typename\n    ...CreateOrderAction_data\n  }\n  ... on CreateBulkOrderActionType {\n    __typename\n    ...CreateBulkOrderAction_data\n  }\n  ... on CreateSwapOrderActionType {\n    __typename\n    ...CreateSwapOrderAction_data\n  }\n  ... on CancelOrderActionType {\n    __typename\n    ...CancelOrderAction_data\n  }\n  ... on CancelSwapOrdersActionType {\n    __typename\n    ...CancelSwapOrdersAction_data\n  }\n  ... on FulfillOrderActionType {\n    __typename\n    ...FulfillOrderAction_data\n  }\n  ... on FulfillSwapOrderActionType {\n    __typename\n    ...FulfillSwapOrderAction_data\n  }\n  ... on BulkAcceptOffersActionType {\n    __typename\n    ...BulkAcceptOffersAction_data\n  }\n  ... on BulkFulfillOrdersActionType {\n    __typename\n    ...BulkFulfillOrdersAction_data\n  }\n  ... on PaymentAssetApprovalActionType {\n    __typename\n    ...PaymentAssetApprovalAction_data\n  }\n  ... on MintActionType {\n    __typename\n    ...MintAction_data\n  }\n  ... on DropContractDeployActionType {\n    __typename\n    ...DeployContractAction_data\n  }\n  ... on DropMechanicsUpdateActionType {\n    __typename\n    ...UpdateDropMechanicsAction_data\n  }\n  ... on SetCreatorFeesActionType {\n    __typename\n    ...SetCreatorFeesAction_data\n  }\n  ... on SetTransferValidatorActionType {\n    __typename\n    ...SetTransferValidatorAction_data\n  }\n  ... on SetRoyaltyInfoActionType {\n    __typename\n    ...SetRoyaltyInfoAction_data\n  }\n  ... on CollectionTokenMetadataUpdateActionType {\n    __typename\n    ...UpdatePreRevealAction_data\n  }\n  ... on AssetBurnToRedeemActionType {\n    __typename\n    ...AssetBurnToRedeemAction_data\n  }\n  ... on MintYourOwnCollectionActionType {\n    __typename\n    ...MintYourOwnCollectionAction_data\n  }\n}\n\nfragment BulkAcceptOffersAction_data on BulkAcceptOffersActionType {\n  __typename\n  maxQuantityToFill\n  offersToAccept {\n    itemFillAmount\n    orderData {\n      chain {\n        identifier\n      }\n      item {\n        __typename\n        ... on AssetQuantityDataType {\n          asset {\n            ...StackedAssetMedia_assets\n            id\n          }\n        }\n        ... on AssetBundleType {\n          assetQuantities(first: 30) {\n            edges {\n              node {\n                asset {\n                  ...StackedAssetMedia_assets\n                  id\n                }\n                id\n              }\n            }\n          }\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      ...useTotalItems_ordersData\n    }\n    criteriaAsset {\n      relayId\n      ...StackedAssetMedia_assets\n      id\n    }\n    ...useTotalPriceOfferDataToAccept_offersToAccept\n    ...readOfferDataToAcceptPrice_offerToAccept\n  }\n  ...useHandleBlockchainActions_bulk_accept_offers\n}\n\nfragment BulkFulfillOrdersAction_data on BulkFulfillOrdersActionType {\n  __typename\n  maxOrdersToFill\n  ordersToFill {\n    itemFillAmount\n    orderData {\n      chain {\n        identifier\n      }\n      item {\n        __typename\n        ... on AssetQuantityDataType {\n          asset {\n            collection {\n              verificationStatus\n              slug\n              id\n            }\n            ...StackedAssetMedia_assets\n            id\n          }\n        }\n        ... on AssetBundleType {\n          collection {\n            verificationStatus\n            slug\n            id\n          }\n          assetQuantities(first: 30) {\n            edges {\n              node {\n                asset {\n                  ...StackedAssetMedia_assets\n                  id\n                }\n                id\n              }\n            }\n          }\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n      ...useTotalItems_ordersData\n    }\n    ...useTotalPriceOrderDataToFill_ordersToFill\n    ...readOrderDataToFillPrices_orderDataToFill\n  }\n  ...useHandleBlockchainActions_bulk_fulfill_orders\n}\n\nfragment CancelOrderActionGaslessContent_action on CancelOrderActionType {\n  ordersData {\n    side\n    orderType\n    item {\n      __typename\n      ... on AssetQuantityDataType {\n        asset {\n          displayName\n          ...StackedAssetMedia_assets\n          id\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    price {\n      unit\n      symbol\n    }\n    orderCriteria {\n      collection {\n        name\n        representativeAsset {\n          ...StackedAssetMedia_assets\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment CancelOrderActionOnChainContent_action on CancelOrderActionType {\n  ordersData {\n    side\n    orderType\n    ...OrderDataHeader_order\n    ...OrdersHeaderData_orders\n  }\n}\n\nfragment CancelOrderAction_data on CancelOrderActionType {\n  __typename\n  ordersData {\n    orderType\n    side\n    item {\n      __typename\n      ... on AssetQuantityDataType {\n        asset {\n          ...GaslessCancellationProcessingModal_items\n          ...GaslessCancellationFailedModal_items\n          id\n        }\n        quantity\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    orderCriteria {\n      collection {\n        representativeAsset {\n          ...GaslessCancellationProcessingModal_items\n          ...GaslessCancellationFailedModal_items\n          id\n        }\n        id\n      }\n      quantity\n    }\n  }\n  method {\n    __typename\n  }\n  ...CancelOrderActionOnChainContent_action\n  ...useHandleBlockchainActions_cancel_orders\n  ...CancelOrderActionGaslessContent_action\n}\n\nfragment CancelSwapOrdersAction_data on CancelSwapOrdersActionType {\n  __typename\n  swapsData {\n    ...SwapDataHeader_swap\n  }\n  ...useHandleBlockchainActions_cancel_swap_orders\n}\n\nfragment CollectionLink_assetContract on AssetContractType {\n  address\n  blockExplorerLink\n}\n\nfragment CollectionLink_collection on CollectionType {\n  name\n  slug\n  verificationStatus\n  ...collection_url\n}\n\nfragment CollectionOfferDetails_collection on CollectionType {\n  representativeAsset {\n    assetContract {\n      ...CollectionLink_assetContract\n      id\n    }\n    ...StackedAssetMedia_assets\n    id\n  }\n  ...CollectionLink_collection\n}\n\nfragment ConfirmationItem_asset on AssetType {\n  chain {\n    displayName\n  }\n  ...AssetItem_asset\n}\n\nfragment ConfirmationItem_asset_item_payment_asset on PaymentAssetType {\n  ...ConfirmationItem_extra_payment_asset\n}\n\nfragment ConfirmationItem_assets on AssetType {\n  ...ConfirmationItem_asset\n}\n\nfragment ConfirmationItem_extra_payment_asset on PaymentAssetType {\n  symbol\n  usdSpotPrice\n}\n\nfragment ConfirmationItem_payment_asset on PaymentAssetType {\n  ...ConfirmationItem_asset_item_payment_asset\n}\n\nfragment CreateBulkOrderAction_data on CreateBulkOrderActionType {\n  __typename\n  orderDatas {\n    item {\n      __typename\n      ... on AssetQuantityDataType {\n        asset {\n          ...StackedAssetMedia_assets\n          id\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    ...useTotalItems_ordersData\n    ...useTotalPriceOrderData_orderData\n  }\n  ...useHandleBlockchainActions_create_bulk_order\n}\n\nfragment CreateOrderAction_data on CreateOrderActionType {\n  __typename\n  orderData {\n    item {\n      __typename\n      ... on AssetQuantityDataType {\n        quantity\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    side\n    isCounterOrder\n    perUnitPrice {\n      unit\n      symbol\n    }\n    ...OrderDataHeader_order\n  }\n  ...useHandleBlockchainActions_create_order\n}\n\nfragment CreateSwapOrderAction_data on CreateSwapOrderActionType {\n  __typename\n  swapData {\n    ...SwapDataHeader_swap\n  }\n  ...useHandleBlockchainActions_create_swap_order\n}\n\nfragment DeployContractAction_data on DropContractDeployActionType {\n  __typename\n  ...useHandleBlockchainActions_deploy_contract\n}\n\nfragment FulfillOrderAction_data on FulfillOrderActionType {\n  __typename\n  orderData {\n    item {\n      __typename\n      ... on AssetQuantityDataType {\n        asset {\n          collection {\n            verificationStatus\n            slug\n            id\n          }\n          id\n        }\n      }\n      ... on AssetBundleType {\n        collection {\n          verificationStatus\n          slug\n          id\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    side\n    ...OrderDataHeader_order\n  }\n  itemFillAmount\n  criteriaAsset {\n    ...OrderDataHeader_criteriaAsset\n    id\n  }\n  ...useHandleBlockchainActions_fulfill_order\n}\n\nfragment FulfillSwapOrderAction_data on FulfillSwapOrderActionType {\n  __typename\n  swapData {\n    ...SwapDataHeader_swap\n  }\n  ...useHandleBlockchainActions_fulfill_swap_order\n}\n\nfragment GaslessCancellationFailedModal_items on ItemType {\n  __isItemType: __typename\n  ...StackedAssetMedia_assets\n}\n\nfragment GaslessCancellationProcessingModal_items on ItemType {\n  __isItemType: __typename\n  ...StackedAssetMedia_assets\n}\n\nfragment MintAction_data on MintActionType {\n  __typename\n  ...useHandleBlockchainActions_mint_asset\n}\n\nfragment MintYourOwnCollectionAction_data on MintYourOwnCollectionActionType {\n  __typename\n  ...useHandleBlockchainActions_mint_your_own_collection\n}\n\nfragment OrderDataHeader_criteriaAsset on AssetType {\n  ...ConfirmationItem_assets\n}\n\nfragment OrderDataHeader_order on OrderDataType {\n  item {\n    __typename\n    ... on AssetQuantityDataType {\n      asset {\n        ...ConfirmationItem_assets\n        id\n      }\n      quantity\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  recipient {\n    address\n    id\n  }\n  side\n  openedAt\n  closedAt\n  perUnitPrice {\n    unit\n  }\n  price {\n    unit\n    symbol\n    usd\n  }\n  payment {\n    ...ConfirmationItem_payment_asset\n    id\n  }\n  englishAuctionReservePrice {\n    unit\n  }\n  isCounterOrder\n  orderCriteria {\n    collection {\n      ...CollectionOfferDetails_collection\n      id\n    }\n    trait {\n      traitType\n      value\n      id\n    }\n    quantity\n  }\n}\n\nfragment OrdersHeaderData_orders on OrderDataType {\n  chain {\n    identifier\n  }\n  item {\n    __typename\n    ... on AssetQuantityDataType {\n      asset {\n        ...StackedAssetMedia_assets\n        id\n      }\n    }\n    ... on AssetBundleType {\n      assetQuantities(first: 20) {\n        edges {\n          node {\n            asset {\n              ...StackedAssetMedia_assets\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n    ... on AssetBundleToBeCreatedType {\n      assetQuantitiesToBeCreated: assetQuantities {\n        asset {\n          ...StackedAssetMedia_assets\n          id\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  orderCriteria {\n    collection {\n      representativeAsset {\n        ...StackedAssetMedia_assets\n        id\n      }\n      id\n    }\n  }\n  orderType\n  side\n}\n\nfragment PaymentAssetApprovalAction_data on PaymentAssetApprovalActionType {\n  __typename\n  asset {\n    chain {\n      identifier\n    }\n    symbol\n    ...StackedAssetMedia_assets\n    id\n  }\n  ...useHandleBlockchainActions_approve_payment_asset\n}\n\nfragment SetCreatorFeesAction_data on SetCreatorFeesActionType {\n  __typename\n  ...useHandleBlockchainActions_set_creator_fees\n}\n\nfragment SetRoyaltyInfoAction_data on SetRoyaltyInfoActionType {\n  __typename\n  ...useHandleBlockchainActions_set_royalty_info\n}\n\nfragment SetTransferValidatorAction_data on SetTransferValidatorActionType {\n  __typename\n  ...useHandleBlockchainActions_set_transfer_validator\n}\n\nfragment StackedAssetMedia_assets on AssetType {\n  relayId\n  ...AssetMedia_asset\n  collection {\n    logo\n    id\n  }\n}\n\nfragment SwapDataHeader_swap on SwapDataType {\n  maker {\n    address\n    displayName\n    id\n  }\n  taker {\n    address\n    displayName\n    id\n  }\n  makerAssets {\n    asset {\n      chain {\n        identifier\n      }\n      id\n    }\n    ...SwapDataSide_assets\n  }\n  takerAssets {\n    ...SwapDataSide_assets\n  }\n}\n\nfragment SwapDataSide_assets on AssetQuantityDataType {\n  asset {\n    relayId\n    displayName\n    symbol\n    assetContract {\n      tokenStandard\n      id\n    }\n    ...StackedAssetMedia_assets\n    id\n  }\n  quantity\n}\n\nfragment TokenPricePayment on PaymentAssetType {\n  symbol\n}\n\nfragment UpdateDropMechanicsAction_data on DropMechanicsUpdateActionType {\n  __typename\n  ...useHandleBlockchainActions_update_drop_mechanics\n}\n\nfragment UpdatePreRevealAction_data on CollectionTokenMetadataUpdateActionType {\n  __typename\n  ...useHandleBlockchainActions_update_drop_pre_reveal\n}\n\nfragment collection_url on CollectionType {\n  slug\n  isCategory\n}\n\nfragment readOfferDataToAcceptPerUnitPrice_offerToAccept on OfferToAcceptType {\n  orderData {\n    perUnitPrice {\n      usd\n      unit\n    }\n    payment {\n      ...TokenPricePayment\n      id\n    }\n  }\n}\n\nfragment readOfferDataToAcceptPrice_offerToAccept on OfferToAcceptType {\n  orderData {\n    perUnitPrice {\n      usd\n      unit\n    }\n    payment {\n      ...TokenPricePayment\n      id\n    }\n  }\n  itemFillAmount\n}\n\nfragment readOrderDataPrices on OrderDataType {\n  perUnitPrice {\n    usd\n    unit\n  }\n  payment {\n    ...TokenPricePayment\n    id\n  }\n  item {\n    __typename\n    ... on AssetQuantityDataType {\n      quantity\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment readOrderDataToFillPrices_orderDataToFill on OrderToFillType {\n  orderData {\n    perUnitPrice {\n      usd\n      unit\n    }\n    payment {\n      ...TokenPricePayment\n      id\n    }\n  }\n  itemFillAmount\n}\n\nfragment useHandleBlockchainActions_approve_asset on AssetApprovalActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n}\n\nfragment useHandleBlockchainActions_approve_payment_asset on PaymentAssetApprovalActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n}\n\nfragment useHandleBlockchainActions_ask_for_asset_swap on AskForSwapType {\n  fromAsset {\n    decimals\n    relayId\n    id\n  }\n  toAsset {\n    relayId\n    id\n  }\n}\n\nfragment useHandleBlockchainActions_bulk_accept_offers on BulkAcceptOffersActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n  offersToAccept {\n    orderData {\n      openedAt\n    }\n  }\n}\n\nfragment useHandleBlockchainActions_bulk_fulfill_orders on BulkFulfillOrdersActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n  ordersToFill {\n    orderData {\n      openedAt\n    }\n  }\n}\n\nfragment useHandleBlockchainActions_burnToRedeem on AssetBurnToRedeemActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n}\n\nfragment useHandleBlockchainActions_cancel_orders on CancelOrderActionType {\n  method {\n    __typename\n    ... on TransactionSubmissionDataType {\n      ...useHandleBlockchainActions_transaction\n    }\n    ... on SignAndPostOrderCancelType {\n      cancelOrderData: data {\n        payload\n        message\n      }\n      serverSignature\n      clientSignatureStandard\n    }\n    ... on GaslessCancelType {\n      orderRelayIds\n    }\n  }\n}\n\nfragment useHandleBlockchainActions_cancel_swap_orders on CancelSwapOrdersActionType {\n  method {\n    __typename\n    ...useHandleBlockchainActions_transaction\n  }\n}\n\nfragment useHandleBlockchainActions_create_bulk_order on CreateBulkOrderActionType {\n  method {\n    clientMessage\n    clientSignatureStandard\n    serverSignature\n    orderDatas\n    chain {\n      identifier\n    }\n  }\n}\n\nfragment useHandleBlockchainActions_create_order on CreateOrderActionType {\n  method {\n    clientMessage\n    clientSignatureStandard\n    serverSignature\n    orderData\n    chain {\n      identifier\n    }\n  }\n}\n\nfragment useHandleBlockchainActions_create_swap_order on CreateSwapOrderActionType {\n  method {\n    clientMessage\n    clientSignatureStandard\n    serverSignature\n    swapData\n    chain {\n      identifier\n    }\n  }\n}\n\nfragment useHandleBlockchainActions_deploy_contract on DropContractDeployActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n}\n\nfragment useHandleBlockchainActions_fulfill_order on FulfillOrderActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n  orderData {\n    openedAt\n  }\n}\n\nfragment useHandleBlockchainActions_fulfill_swap_order on FulfillSwapOrderActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n  swapData {\n    openedAt\n  }\n}\n\nfragment useHandleBlockchainActions_mint_asset on MintActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n  startTime\n}\n\nfragment useHandleBlockchainActions_mint_your_own_collection on MintYourOwnCollectionActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n}\n\nfragment useHandleBlockchainActions_set_creator_fees on SetCreatorFeesActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n}\n\nfragment useHandleBlockchainActions_set_royalty_info on SetRoyaltyInfoActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n}\n\nfragment useHandleBlockchainActions_set_transfer_validator on SetTransferValidatorActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n}\n\nfragment useHandleBlockchainActions_swap_asset on AssetSwapActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n}\n\nfragment useHandleBlockchainActions_transaction on TransactionSubmissionDataType {\n  chain {\n    identifier\n  }\n  ...useTransaction_transaction\n}\n\nfragment useHandleBlockchainActions_transfer_asset on AssetTransferActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n}\n\nfragment useHandleBlockchainActions_update_drop_mechanics on DropMechanicsUpdateActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n}\n\nfragment useHandleBlockchainActions_update_drop_pre_reveal on CollectionTokenMetadataUpdateActionType {\n  method {\n    ...useHandleBlockchainActions_transaction\n  }\n}\n\nfragment useIsRarityEnabled_collection on CollectionType {\n  slug\n  enabledRarities\n}\n\nfragment useTotalItems_ordersData on OrderDataType {\n  item {\n    __typename\n    ... on AssetQuantityDataType {\n      asset {\n        relayId\n        id\n      }\n    }\n    ... on AssetBundleType {\n      assetQuantities(first: 30) {\n        edges {\n          node {\n            asset {\n              relayId\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment useTotalPriceOfferDataToAccept_offersToAccept on OfferToAcceptType {\n  itemFillAmount\n  ...readOfferDataToAcceptPerUnitPrice_offerToAccept\n}\n\nfragment useTotalPriceOrderDataToFill_ordersToFill on OrderToFillType {\n  ...readOrderDataToFillPrices_orderDataToFill\n}\n\nfragment useTotalPriceOrderData_orderData on OrderDataType {\n  ...readOrderDataPrices\n}\n\nfragment useTransaction_transaction on TransactionSubmissionDataType {\n  chain {\n    identifier\n  }\n  source {\n    value\n  }\n  destination {\n    value\n  }\n  value\n  data\n}\n"

export const OrdersQuery = "query OrdersQuery(\n  $cursor: String\n  $count: Int = 10\n  $excludeMaker: IdentityInputType\n  $isExpired: Boolean\n  $isValid: Boolean\n  $includeInvalidBids: Boolean\n  $isInactive: Boolean\n  $maker: IdentityInputType\n  $makerArchetype: ArchetypeInputType\n  $makerAssetIsPayment: Boolean\n  $takerArchetype: ArchetypeInputType\n  $takerAssetCollections: [CollectionSlug!]\n  $takerAssetIsOwnedBy: IdentityInputType\n  $takerAssetIsPayment: Boolean\n  $sortAscending: Boolean\n  $sortBy: OrderSortOption\n  $makerAssetBundle: BundleSlug\n  $takerAssetBundle: BundleSlug\n  $expandedMode: Boolean = false\n  $isBid: Boolean = false\n  $filterByOrderRules: Boolean = false\n  $includeCriteriaOrders: Boolean = false\n  $criteriaTakerAssetId: AssetRelayID = \"QXNzZXRUeXBlOi0x\"\n  $includeCriteriaTakerAsset: Boolean = false\n  $isSingleAsset: Boolean = false\n) {\n  ...Orders_data_3IuuqT\n}\n\nfragment AcceptOfferButton_asset on AssetType {\n  relayId\n  acceptOfferDisabled {\n    __typename\n  }\n  ownedQuantity(identity: {})\n  ...AcceptOfferModalContent_criteriaAsset_3z4lq0\n  ...itemEvents_dataV2\n}\n\nfragment AcceptOfferButton_order_4jlDA1 on OrderV2Type {\n  relayId\n  side\n  orderType\n  item {\n    __typename\n    ... on AssetType {\n      acceptOfferDisabled {\n        __typename\n      }\n      collection {\n        statsV2 {\n          floorPrice {\n            eth\n          }\n        }\n        id\n      }\n      chain {\n        identifier\n      }\n      ownedQuantity(identity: {}) @skip(if: $isSingleAsset)\n      ...itemEvents_dataV2\n    }\n    ... on AssetBundleType {\n      bundleCollection: collection {\n        statsV2 {\n          floorPrice {\n            eth\n          }\n        }\n        id\n      }\n      chain {\n        identifier\n      }\n      assetQuantities(first: 30) {\n        edges {\n          node {\n            asset {\n              ownedQuantity(identity: {})\n              id\n            }\n            id\n          }\n        }\n      }\n      ...itemEvents_dataV2\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  maker {\n    address\n    id\n  }\n  perUnitPriceType {\n    eth\n  }\n}\n\nfragment AcceptOfferDisabledWarningIcon_asset on AssetType {\n  acceptOfferDisabled {\n    ...useAcceptOfferDisabledReason_data\n  }\n}\n\nfragment AcceptOfferModalContent_criteriaAsset_3z4lq0 on AssetType {\n  __typename\n  assetContract {\n    address\n    id\n  }\n  chain {\n    identifier\n  }\n  tokenId\n  relayId\n  ownedQuantity(identity: {})\n  isCurrentlyFungible\n  defaultRarityData {\n    rank\n    id\n  }\n  ...ItemOfferDetails_item\n  ...FloorPriceDifference_item\n  ...readOptionalCreatorFees_item\n}\n\nfragment AcceptOffersButton_orders on OrderV2Type {\n  relayId\n  ...readOrderFees_order\n  ...CreatorFeeInputModalContent_orders\n}\n\nfragment AccountLink_data on AccountType {\n  address\n  config\n  isCompromised\n  user {\n    publicUsername\n    id\n  }\n  displayName\n  ...ProfileImage_data\n  ...wallet_accountKey\n  ...accounts_url\n}\n\nfragment AssetMediaAnimation_asset on AssetType {\n  ...AssetMediaImage_asset\n  ...AssetMediaContainer_asset\n  ...AssetMediaPlaceholderImage_asset\n}\n\nfragment AssetMediaAudio_asset on AssetType {\n  backgroundColor\n  ...AssetMediaImage_asset\n}\n\nfragment AssetMediaContainer_asset on AssetType {\n  backgroundColor\n  ...AssetMediaEditions_asset_1mZMwQ\n  collection {\n    ...useIsRarityEnabled_collection\n    id\n  }\n}\n\nfragment AssetMediaContainer_asset_1LNk0S on AssetType {\n  backgroundColor\n  ...AssetMediaEditions_asset_1mZMwQ\n  collection {\n    ...useIsRarityEnabled_collection\n    id\n  }\n}\n\nfragment AssetMediaContainer_asset_4a3mm5 on AssetType {\n  backgroundColor\n  ...AssetMediaEditions_asset_1mZMwQ\n  defaultRarityData {\n    ...RarityIndicator_data\n    id\n  }\n  collection {\n    ...useIsRarityEnabled_collection\n    id\n  }\n}\n\nfragment AssetMediaEditions_asset_1mZMwQ on AssetType {\n  decimals\n}\n\nfragment AssetMediaImage_asset on AssetType {\n  backgroundColor\n  imageUrl\n  collection {\n    displayData {\n      cardDisplayStyle\n    }\n    id\n  }\n}\n\nfragment AssetMediaPlaceholderImage_asset on AssetType {\n  collection {\n    displayData {\n      cardDisplayStyle\n    }\n    id\n  }\n}\n\nfragment AssetMediaVideo_asset on AssetType {\n  backgroundColor\n  ...AssetMediaImage_asset\n}\n\nfragment AssetMediaWebgl_asset on AssetType {\n  backgroundColor\n  ...AssetMediaImage_asset\n}\n\nfragment AssetMedia_asset on AssetType {\n  animationUrl\n  displayImageUrl\n  imageUrl\n  isDelisted\n  ...AssetMediaAnimation_asset\n  ...AssetMediaAudio_asset\n  ...AssetMediaContainer_asset_1LNk0S\n  ...AssetMediaImage_asset\n  ...AssetMediaPlaceholderImage_asset\n  ...AssetMediaVideo_asset\n  ...AssetMediaWebgl_asset\n}\n\nfragment AssetMedia_asset_5MxNd on AssetType {\n  animationUrl\n  displayImageUrl\n  imageUrl\n  isDelisted\n  ...AssetMediaAnimation_asset\n  ...AssetMediaAudio_asset\n  ...AssetMediaContainer_asset_4a3mm5\n  ...AssetMediaImage_asset\n  ...AssetMediaPlaceholderImage_asset\n  ...AssetMediaVideo_asset\n  ...AssetMediaWebgl_asset\n}\n\nfragment BulkPurchaseModal_orders on OrderV2Type {\n  relayId\n  item {\n    __typename\n    relayId\n    chain {\n      identifier\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  payment {\n    relayId\n    symbol\n    id\n  }\n  ...useTotalPrice_orders\n  ...useFulfillingListingsWillReactivateOrders_orders\n}\n\nfragment BuyNowButton_orders on OrderV2Type {\n  ...BulkPurchaseModal_orders\n}\n\nfragment CancelOrderButton_data on OrderV2Type {\n  relayId\n  item {\n    __typename\n    chain {\n      identifier\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  ...useIsGaslessCancellationEnabled_order\n}\n\nfragment CollectionCell_collection on CollectionType {\n  name\n  imageUrl\n  isVerified\n  ...collection_url\n}\n\nfragment CollectionCell_trait on TraitType {\n  traitType\n  value\n}\n\nfragment CollectionLink_assetContract on AssetContractType {\n  address\n  blockExplorerLink\n}\n\nfragment CollectionLink_collection on CollectionType {\n  name\n  slug\n  verificationStatus\n  ...collection_url\n}\n\nfragment CreatorFeeInputModalContent_orders on OrderV2Type {\n  ...readOrderFees_order\n  ...ServiceFeeText_orders\n}\n\nfragment ExpirationDate_data on OrderV2Type {\n  closedAt\n}\n\nfragment FloorPriceDifference_item on ItemType {\n  __isItemType: __typename\n  ... on AssetType {\n    collection {\n      statsV2 {\n        floorPrice {\n          eth\n        }\n      }\n      id\n    }\n  }\n}\n\nfragment ItemAddToCartButton_order on OrderV2Type {\n  maker {\n    address\n    id\n  }\n  taker {\n    address\n    id\n  }\n  item {\n    __typename\n    ... on AssetType {\n      isCurrentlyFungible\n    }\n    ...itemEvents_dataV2\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  openedAt\n  ...ShoppingCartContextProvider_inline_order\n}\n\nfragment ItemCell_data on ItemType {\n  __isItemType: __typename\n  __typename\n  displayName\n  ...item_url\n  ...PortfolioTableItemCellTooltip_item\n  ... on AssetType {\n    ...AssetMedia_asset\n  }\n  ... on AssetBundleType {\n    assetQuantities(first: 30) {\n      edges {\n        node {\n          asset {\n            ...AssetMedia_asset\n            id\n          }\n          relayId\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ItemOfferDetails_item on ItemType {\n  __isItemType: __typename\n  __typename\n  ... on AssetType {\n    displayName\n    collection {\n      ...CollectionLink_collection\n      id\n    }\n    ...StackedAssetMedia_assets\n  }\n  ... on AssetBundleType {\n    displayName\n    bundleCollection: collection {\n      ...CollectionLink_collection\n      id\n    }\n    assetQuantities(first: 18) {\n      edges {\n        node {\n          asset {\n            ...StackedAssetMedia_assets\n            id\n          }\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ItemTrackingContext_item on ItemType {\n  __isItemType: __typename\n  relayId\n  verificationStatus\n  chain {\n    identifier\n  }\n  ... on AssetType {\n    tokenId\n    isReportedSuspicious\n    assetContract {\n      address\n      id\n    }\n  }\n  ... on AssetBundleType {\n    slug\n  }\n}\n\nfragment ListingFeesSupportsCreator_orders on OrderV2Type {\n  side\n  item {\n    __typename\n    ... on AssetType {\n      totalCreatorFee\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  ...readOrderFees_order\n}\n\nfragment OrderListItem_order on OrderV2Type {\n  relayId\n  makerOwnedQuantity\n  item {\n    __typename\n    displayName\n    ... on AssetType {\n      assetContract {\n        ...CollectionLink_assetContract\n        id\n      }\n      collection {\n        ...CollectionLink_collection\n        id\n      }\n      ...AssetMedia_asset\n      ...asset_url\n      ...useItemFees_item\n    }\n    ... on AssetBundleType {\n      assetQuantities(first: 30) {\n        edges {\n          node {\n            asset {\n              displayName\n              relayId\n              assetContract {\n                ...CollectionLink_assetContract\n                id\n              }\n              collection {\n                ...CollectionLink_collection\n                id\n              }\n              ...StackedAssetMedia_assets\n              ...AssetMedia_asset\n              ...asset_url\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n    ...itemEvents_dataV2\n    ...useIsItemSafelisted_item\n    ...ItemTrackingContext_item\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  remainingQuantityType\n  ...OrderPrice\n}\n\nfragment OrderList_orders on OrderV2Type {\n  item {\n    __typename\n    ... on AssetType {\n      __typename\n      relayId\n    }\n    ... on AssetBundleType {\n      __typename\n      assetQuantities(first: 30) {\n        edges {\n          node {\n            asset {\n              relayId\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  relayId\n  ...OrderListItem_order\n  ...useFulfillingListingsWillReactivateOrders_orders\n}\n\nfragment OrderPrice on OrderV2Type {\n  priceType {\n    unit\n  }\n  perUnitPriceType {\n    unit\n  }\n  payment {\n    ...TokenPricePayment\n    id\n  }\n}\n\nfragment OrderStatus_order on OrderV2Type {\n  isValid\n  closedAt\n  invalidationReason\n  payment {\n    symbol\n    id\n  }\n  ...OrderPrice\n}\n\nfragment OrderUsdPrice on OrderV2Type {\n  priceType {\n    usd\n  }\n  perUnitPriceType {\n    usd\n  }\n}\n\nfragment Orders_data_3IuuqT on Query {\n  criteriaTakerAsset: asset(asset: $criteriaTakerAssetId) @include(if: $includeCriteriaTakerAsset) {\n    ownedQuantity(identity: {})\n    decimals\n    isDelisted\n    relayId\n    ...asset_url\n    ...AcceptOfferButton_asset\n    ...AcceptOfferDisabledWarningIcon_asset\n    id\n  }\n  orders(after: $cursor, excludeMaker: $excludeMaker, first: $count, isExpired: $isExpired, isInactive: $isInactive, isValid: $isValid, includeInvalidBids: $includeInvalidBids, maker: $maker, makerArchetype: $makerArchetype, makerAssetIsPayment: $makerAssetIsPayment, takerArchetype: $takerArchetype, takerAssetCollections: $takerAssetCollections, takerAssetIsOwnedBy: $takerAssetIsOwnedBy, takerAssetIsPayment: $takerAssetIsPayment, sortAscending: $sortAscending, sortBy: $sortBy, makerAssetBundle: $makerAssetBundle, takerAssetBundle: $takerAssetBundle, filterByOrderRules: $filterByOrderRules, includeCriteriaOrders: $includeCriteriaOrders) {\n    edges {\n      node {\n        ...Orders_orders_2QKkZK\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment Orders_orders_2QKkZK on OrderV2Type {\n  isValid\n  isCancelled\n  openedAt\n  orderType\n  remainingQuantityType\n  maker {\n    address\n    ...AccountLink_data\n    ...wallet_accountKey\n    id\n  }\n  payment {\n    relayId\n    symbol\n    id\n  }\n  item {\n    __typename\n    relayId\n    chain {\n      identifier\n    }\n    ... on AssetType {\n      ...asset_url\n      decimals\n      ownedQuantity(identity: {}) @skip(if: $isSingleAsset)\n      isDelisted\n      acceptOfferDisabled {\n        __typename\n        ...useAcceptOfferDisabledReason_data @skip(if: $includeCriteriaTakerAsset)\n      }\n      ...AcceptOfferDisabledWarningIcon_asset @skip(if: $includeCriteriaTakerAsset)\n    }\n    ... on AssetBundleType {\n      assetQuantities(first: 30) {\n        edges {\n          node {\n            asset {\n              relayId\n              isDelisted\n              ownedQuantity(identity: {})\n              decimals\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  relayId\n  side\n  taker {\n    address\n    ...AccountLink_data\n    ...wallet_accountKey\n    id\n  }\n  invalidationReason\n  perUnitPriceType {\n    eth\n    usd\n  }\n  ...OrderPrice\n  ...OrderUsdPrice\n  item @include(if: $isBid) {\n    __typename\n    ... on AssetType {\n      collection {\n        statsV2 {\n          floorPrice {\n            eth\n          }\n        }\n        id\n      }\n    }\n    ... on AssetBundleType {\n      bundleCollection: collection {\n        statsV2 {\n          floorPrice {\n            eth\n          }\n        }\n        id\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  criteria @include(if: $isBid) {\n    collection {\n      ...CollectionCell_collection\n      id\n    }\n    trait {\n      ...CollectionCell_trait\n      id\n    }\n  }\n  item @include(if: $expandedMode) {\n    __typename\n    ...ItemCell_data\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  ...CancelOrderButton_data\n  ...ExpirationDate_data\n  ...ItemAddToCartButton_order\n  ...QuickBuyButton_order\n  ...useIsQuickBuyEnabled_order\n  ...AcceptOfferButton_order_4jlDA1\n  ...useFulfillSemiFungibleOrders_orders\n  ...BuyNowButton_orders\n  ...OrderStatus_order\n}\n\nfragment PortfolioTableItemCellTooltip_item on ItemType {\n  __isItemType: __typename\n  __typename\n  ...AssetMedia_asset_5MxNd\n  ...PortfolioTableTraitTable_asset\n  ...asset_url\n}\n\nfragment PortfolioTableTraitTable_asset on AssetType {\n  assetContract {\n    address\n    chain\n    id\n  }\n  isCurrentlyFungible\n  tokenId\n}\n\nfragment ProfileImage_data on AccountType {\n  imageUrl\n}\n\nfragment QuickBuyButton_order on OrderV2Type {\n  maker {\n    address\n    id\n  }\n  taker {\n    address\n    ...wallet_accountKey\n    id\n  }\n  item {\n    __typename\n    chain {\n      identifier\n    }\n    ...itemEvents_dataV2\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  openedAt\n  relayId\n}\n\nfragment RarityIndicator_data on RarityDataType {\n  rank\n  rankPercentile\n  rankCount\n  maxRank\n}\n\nfragment ServiceFeeText_orders on OrderV2Type {\n  ...readOrderFees_order\n}\n\nfragment ShoppingCartContextProvider_inline_order on OrderV2Type {\n  relayId\n  makerOwnedQuantity\n  item {\n    __typename\n    chain {\n      identifier\n    }\n    relayId\n    ... on AssetBundleType {\n      assetQuantities(first: 30) {\n        edges {\n          node {\n            asset {\n              relayId\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  maker {\n    relayId\n    id\n  }\n  taker {\n    address\n    ...wallet_accountKey\n    id\n  }\n  priceType {\n    usd\n  }\n  payment {\n    relayId\n    id\n  }\n  remainingQuantityType\n  ...useTotalItems_orders\n  ...ShoppingCart_orders\n}\n\nfragment ShoppingCartDetailedView_orders on OrderV2Type {\n  relayId\n  item {\n    __typename\n    chain {\n      identifier\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  supportsGiftingOnPurchase\n  ...useTotalPrice_orders\n  ...OrderList_orders\n}\n\nfragment ShoppingCart_orders on OrderV2Type {\n  ...ShoppingCartDetailedView_orders\n  ...BulkPurchaseModal_orders\n}\n\nfragment StackedAssetMedia_assets on AssetType {\n  relayId\n  ...AssetMedia_asset\n  collection {\n    logo\n    id\n  }\n}\n\nfragment TokenPricePayment on PaymentAssetType {\n  symbol\n}\n\nfragment accounts_url on AccountType {\n  address\n  user {\n    publicUsername\n    id\n  }\n}\n\nfragment asset_url on AssetType {\n  assetContract {\n    address\n    id\n  }\n  tokenId\n  chain {\n    identifier\n  }\n}\n\nfragment bundle_url on AssetBundleType {\n  slug\n  chain {\n    identifier\n  }\n}\n\nfragment collection_url on CollectionType {\n  slug\n  isCategory\n}\n\nfragment itemEvents_dataV2 on ItemType {\n  __isItemType: __typename\n  relayId\n  chain {\n    identifier\n  }\n  ... on AssetType {\n    tokenId\n    assetContract {\n      address\n      id\n    }\n  }\n}\n\nfragment item_url on ItemType {\n  __isItemType: __typename\n  __typename\n  ... on AssetType {\n    ...asset_url\n  }\n  ... on AssetBundleType {\n    ...bundle_url\n  }\n}\n\nfragment readOptionalCreatorFees_item on ItemType {\n  __isItemType: __typename\n  __typename\n  ... on AssetType {\n    collection {\n      isCreatorFeesEnforced\n      totalCreatorFeeBasisPoints\n      id\n    }\n  }\n}\n\nfragment readOrderFees_order on OrderV2Type {\n  makerFees(first: 10) {\n    edges {\n      node {\n        basisPoints\n        isOpenseaFee\n        id\n      }\n    }\n  }\n  takerFees(first: 10) {\n    edges {\n      node {\n        basisPoints\n        isOpenseaFee\n        id\n      }\n    }\n  }\n}\n\nfragment useAcceptOfferDisabledReason_data on AcceptOfferDisabledType {\n  until\n}\n\nfragment useFulfillSemiFungibleOrders_orders on OrderV2Type {\n  relayId\n  payment {\n    symbol\n    id\n  }\n  perUnitPriceType {\n    unit\n  }\n  remainingQuantityType\n  ...useOrdersWithValidMakerOwnedQuantity_order\n  ...useTotalPrice_orders\n  ...BuyNowButton_orders\n  ...AcceptOffersButton_orders\n  ...ListingFeesSupportsCreator_orders\n}\n\nfragment useFulfillingListingsWillReactivateOrders_orders on OrderV2Type {\n  ...useTotalItems_orders\n}\n\nfragment useIsGaslessCancellationEnabled_order on OrderV2Type {\n  orderType\n  side\n}\n\nfragment useIsItemSafelisted_item on ItemType {\n  __isItemType: __typename\n  __typename\n  ... on AssetType {\n    collection {\n      slug\n      verificationStatus\n      id\n    }\n  }\n  ... on AssetBundleType {\n    assetQuantities(first: 30) {\n      edges {\n        node {\n          asset {\n            collection {\n              slug\n              verificationStatus\n              id\n            }\n            id\n          }\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment useIsQuickBuyEnabled_order on OrderV2Type {\n  orderType\n  item {\n    __typename\n    ... on AssetType {\n      isCurrentlyFungible\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment useIsRarityEnabled_collection on CollectionType {\n  slug\n  enabledRarities\n}\n\nfragment useItemFees_item on ItemType {\n  __isItemType: __typename\n  __typename\n  ... on AssetType {\n    totalCreatorFee\n    collection {\n      openseaSellerFeeBasisPoints\n      isCreatorFeesEnforced\n      id\n    }\n  }\n  ... on AssetBundleType {\n    bundleCollection: collection {\n      openseaSellerFeeBasisPoints\n      totalCreatorFeeBasisPoints\n      isCreatorFeesEnforced\n      id\n    }\n  }\n}\n\nfragment useOrdersWithValidMakerOwnedQuantity_order on OrderV2Type {\n  makerOwnedQuantity\n  remainingQuantityType\n  side\n  perUnitPriceType {\n    unit\n  }\n  maker {\n    relayId\n    id\n  }\n}\n\nfragment useTotalItems_orders on OrderV2Type {\n  item {\n    __typename\n    relayId\n    ... on AssetBundleType {\n      assetQuantities(first: 30) {\n        edges {\n          node {\n            asset {\n              relayId\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment useTotalPrice_orders on OrderV2Type {\n  relayId\n  perUnitPriceType {\n    usd\n    unit\n  }\n  payment {\n    symbol\n    ...TokenPricePayment\n    id\n  }\n}\n\nfragment wallet_accountKey on AccountType {\n  address\n}\n"

export const challengeLoginMessageQuery =
  'query challengeLoginMessageQuery(\n  $address: AddressScalar!\n) {\n  auth {\n    loginMessage(address: $address)\n  }\n}\n';
export const AssetPageQuery =
  'query AssetPageQuery(\n  $tokenId: String!\n  $contractAddress: AddressScalar!\n  $chain: ChainScalar!\n) {\n  ...AssetPage_data_3gcux1\n}\n\nfragment AcceptHighestOfferButton_asset on AssetType {\n  ...AcceptOfferButton_asset\n  ...itemEvents_dataV2\n}\n\nfragment AcceptHighestOfferButton_tradeSummary on TradeSummaryType {\n  bestBid {\n    item {\n      __typename\n      ...itemEvents_dataV2\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    perUnitPriceType {\n      unit\n      symbol\n    }\n    ...AcceptOfferButton_order\n    id\n  }\n}\n\nfragment AcceptOfferButton_asset on AssetType {\n  relayId\n  acceptOfferDisabled {\n    __typename\n  }\n  ownedQuantity(identity: {})\n  ...AcceptOfferModalContent_criteriaAsset_3z4lq0\n  ...itemEvents_dataV2\n}\n\nfragment AcceptOfferButton_order on OrderV2Type {\n  relayId\n  side\n  orderType\n  item {\n    __typename\n    ... on AssetType {\n      acceptOfferDisabled {\n        __typename\n      }\n      collection {\n        statsV2 {\n          floorPrice {\n            eth\n          }\n        }\n        id\n      }\n      chain {\n        identifier\n      }\n      ownedQuantity(identity: {})\n      ...itemEvents_dataV2\n    }\n    ... on AssetBundleType {\n      bundleCollection: collection {\n        statsV2 {\n          floorPrice {\n            eth\n          }\n        }\n        id\n      }\n      chain {\n        identifier\n      }\n      assetQuantities(first: 30) {\n        edges {\n          node {\n            asset {\n              ownedQuantity(identity: {})\n              id\n            }\n            id\n          }\n        }\n      }\n      ...itemEvents_dataV2\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  maker {\n    address\n    id\n  }\n  perUnitPriceType {\n    eth\n  }\n}\n\nfragment AcceptOfferDisabledAlert_asset on AssetType {\n  decimals\n  ownedQuantity(identity: {})\n  acceptOfferDisabled {\n    ...useAcceptOfferDisabledReason_data\n  }\n}\n\nfragment AcceptOfferModalContent_criteriaAsset_3z4lq0 on AssetType {\n  __typename\n  assetContract {\n    address\n    id\n  }\n  chain {\n    identifier\n  }\n  tokenId\n  relayId\n  ownedQuantity(identity: {})\n  isCurrentlyFungible\n  defaultRarityData {\n    rank\n    id\n  }\n  ...ItemOfferDetails_item\n  ...FloorPriceDifference_item\n  ...readOptionalCreatorFees_item\n}\n\nfragment AcceptOffersButton_asset on AssetType {\n  relayId\n  ...readOptionalCreatorFees_item\n  ...CreatorFeeInputModalContent_asset\n}\n\nfragment AcceptOffersButton_orders on OrderV2Type {\n  relayId\n  ...readOrderFees_order\n  ...CreatorFeeInputModalContent_orders\n}\n\nfragment AccountLink_data on AccountType {\n  address\n  config\n  isCompromised\n  user {\n    publicUsername\n    id\n  }\n  displayName\n  ...ProfileImage_data\n  ...wallet_accountKey\n  ...accounts_url\n}\n\nfragment AddToCartAndQuickBuyButton_order on OrderV2Type {\n  ...useIsQuickBuyEnabled_order\n  ...ItemAddToCartButton_order\n  ...QuickBuyButton_order\n}\n\nfragment AssetDealLink_asset on AssetType {\n  assetContract {\n    address\n    id\n  }\n  tokenId\n  chain {\n    identifier\n  }\n  assetOwners(first: 1) {\n    edges {\n      node {\n        owner {\n          address\n          id\n        }\n        id\n      }\n    }\n  }\n  ...useGetDealAssetDisabledReason_asset\n}\n\nfragment AssetDetails_data on AssetType {\n  assetContract {\n    openseaVersion\n    address\n    chain\n    blockExplorerLink\n    tokenStandard\n    id\n  }\n  metadataStatus\n  tokenId\n  isFrozen\n  frozenAt\n  tokenMetadata\n  lastUpdatedAt\n  ...useItemFees_item\n}\n\nfragment AssetListButton_asset on AssetType {\n  ...CreateListingButton_item\n}\n\nfragment AssetMediaAnimation_asset on AssetType {\n  ...AssetMediaImage_asset\n  ...AssetMediaContainer_asset\n  ...AssetMediaPlaceholderImage_asset\n}\n\nfragment AssetMediaAudio_asset on AssetType {\n  backgroundColor\n  ...AssetMediaImage_asset\n}\n\nfragment AssetMediaContainer_asset on AssetType {\n  backgroundColor\n  ...AssetMediaEditions_asset_1mZMwQ\n  collection {\n    ...useIsRarityEnabled_collection\n    id\n  }\n}\n\nfragment AssetMediaContainer_asset_1LNk0S on AssetType {\n  backgroundColor\n  ...AssetMediaEditions_asset_1mZMwQ\n  collection {\n    ...useIsRarityEnabled_collection\n    id\n  }\n}\n\nfragment AssetMediaEditions_asset_1mZMwQ on AssetType {\n  decimals\n}\n\nfragment AssetMediaImage_asset on AssetType {\n  backgroundColor\n  imageUrl\n  collection {\n    displayData {\n      cardDisplayStyle\n    }\n    id\n  }\n}\n\nfragment AssetMediaPlaceholderImage_asset on AssetType {\n  collection {\n    displayData {\n      cardDisplayStyle\n    }\n    id\n  }\n}\n\nfragment AssetMediaVideo_asset on AssetType {\n  backgroundColor\n  ...AssetMediaImage_asset\n}\n\nfragment AssetMediaWebgl_asset on AssetType {\n  backgroundColor\n  ...AssetMediaImage_asset\n}\n\nfragment AssetMedia_asset on AssetType {\n  animationUrl\n  displayImageUrl\n  imageUrl\n  isDelisted\n  ...AssetMediaAnimation_asset\n  ...AssetMediaAudio_asset\n  ...AssetMediaContainer_asset_1LNk0S\n  ...AssetMediaImage_asset\n  ...AssetMediaPlaceholderImage_asset\n  ...AssetMediaVideo_asset\n  ...AssetMediaWebgl_asset\n}\n\nfragment AssetOfferModal_asset on AssetType {\n  relayId\n  chain {\n    identifier\n  }\n}\n\nfragment AssetPageMediaHeader__accountInfo_1mZMwQ on AssetType {\n  isFavorite\n  animationUrl\n  imageUrl\n  imageStorageUrl\n}\n\nfragment AssetPageMediaHeader_item on ItemType {\n  __isItemType: __typename\n  relayId\n  __typename\n  ... on AssetType {\n    chain {\n      identifier\n    }\n    decimals\n    favoritesCount\n    isDelisted\n    isFrozen\n    hasUnlockableContent\n  }\n  ... on AssetBundleType {\n    chain {\n      identifier\n    }\n    assetCount\n  }\n}\n\nfragment AssetPage_data_3gcux1 on Query {\n  nft(tokenId: $tokenId, contractAddress: $contractAddress, chain: $chain) {\n    ...AssetPageMediaHeader_item\n    ...AssetPageMediaHeader__accountInfo_1mZMwQ\n    ...asset_display_name\n    ...ContentAuthenticity_data\n    assetContract {\n      address\n      chain\n      ...CollectionLink_assetContract\n      id\n    }\n    creator {\n      address\n      user {\n        publicUsername\n        id\n      }\n      displayName\n      ...AccountLink_data\n      id\n    }\n    animationUrl\n    backgroundColor\n    collection {\n      description\n      isSensitiveContent\n      displayData {\n        cardDisplayStyle\n      }\n      category {\n        slug\n      }\n      hidden\n      imageUrl\n      name\n      slug\n      ...CollectionLink_collection\n      ...Boost_collection\n      ...Property_collection\n      ...NumericTrait_collection\n      ...SocialBar_data\n      ...useIsLiveUpdatesEnabledForCollection_collection\n      ...useIsRarityEnabled_collection\n      ...CollectionInspiredBy_data\n      id\n    }\n    decimals\n    description\n    imageUrl\n    name\n    numVisitors\n    isDelisted\n    isListable\n    isReportedSuspicious\n    isSensitiveContent\n    isUnderReview\n    isCompromised\n    isBiddingEnabled {\n      value\n      reason\n    }\n    relayId\n    tokenId\n    hasUnlockableContent\n    favoritesCount\n    tradeSummary {\n      bestAsk {\n        closedAt\n        orderType\n        priceType {\n          usd\n        }\n        maker {\n          ...wallet_accountKey\n          id\n        }\n        relayId\n        ...PrivateListingBanner_data\n        id\n      }\n      bestBid {\n        __typename\n        id\n      }\n      ...TradeStation_data\n    }\n    acceptHighestOffer: tradeSummary(excludeAccountAsMaker: true) {\n      ...TradeStation_acceptHighestOffer\n    }\n    traits(first: 100) {\n      edges {\n        node {\n          relayId\n          displayType\n          floatValue\n          intValue\n          traitType\n          value\n          ...Boost_trait\n          ...Property_trait\n          ...NumericTrait_trait\n          ...Date_trait\n          id\n        }\n      }\n    }\n    defaultRarityData {\n      ...RarityIndicator_data\n      id\n    }\n    ...AssetMedia_asset\n    ...Toolbar_asset\n    ...asset_url\n    ...itemEvents_data\n    ...AssetDetails_data\n    ownedQuantity(identity: {})\n    assetOwners(first: 1) {\n      edges {\n        node {\n          quantity\n          owner {\n            ...AccountLink_data\n            id\n          }\n          id\n        }\n      }\n      count\n    }\n    totalQuantity\n    isCurrentlyFungible\n    ...RedeemableItemCard_itemToBurn\n    ...TradeStation_archetype\n    ...OffersPanel_asset\n    ...ListingsPanel_asset\n    ...SemiFungibleTradeStation_asset\n    ...OrderManager_item\n    ...ItemTrackingContext_item\n    activity(first: 11) {\n      edges {\n        node {\n          __typename\n          id\n        }\n      }\n    }\n    id\n  }\n  ...SemiFungibleTradeStation_bestListings_3gcux1\n  ...SemiFungibleTradeStation_bestOffers_3gcux1\n  ...CampaignAnnouncementModal_data\n}\n\nfragment Boost_collection on CollectionType {\n  numericTraits {\n    key\n    value {\n      max\n    }\n  }\n  ...collection_url\n}\n\nfragment Boost_trait on TraitType {\n  displayType\n  floatValue\n  intValue\n  traitType\n}\n\nfragment BulkPurchaseModal_orders on OrderV2Type {\n  relayId\n  item {\n    __typename\n    relayId\n    chain {\n      identifier\n    }\n    ... on AssetType {\n      collection {\n        slug\n        isSafelisted\n        id\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  payment {\n    relayId\n    symbol\n    id\n  }\n  ...useTotalPrice_orders\n  ...useFulfillingListingsWillReactivateOrders_orders\n}\n\nfragment BuyNowButton_orders on OrderV2Type {\n  ...BulkPurchaseModal_orders\n}\n\nfragment CampaignAnnouncementModal_data on Query {\n  campaignAnnouncementModal {\n    campaignId\n    title\n    description\n    overrideUrl\n    ctaText\n    ctaUrl\n    id\n  }\n}\n\nfragment CollectionInspiredBy_data on CollectionType {\n  inspiredBy(first: 2) {\n    edges {\n      node {\n        slug\n        name\n        ...collection_url\n        id\n      }\n    }\n  }\n}\n\nfragment CollectionLink_assetContract on AssetContractType {\n  address\n  blockExplorerLink\n}\n\nfragment CollectionLink_collection on CollectionType {\n  name\n  slug\n  verificationStatus\n  ...collection_url\n}\n\nfragment ContentAuthenticity_data on AssetType {\n  authenticityMetadata {\n    signedOn\n    signedBy\n    producedWith\n    walletAddress\n    id\n  }\n  imageUrl\n  creator {\n    address\n    id\n  }\n  chain {\n    identifier\n  }\n}\n\nfragment ContextualPriceListBestOfferItem_tradeSummary on TradeSummaryType {\n  bestBid {\n    perUnitPriceType {\n      unit\n      symbol\n      usd\n    }\n    id\n  }\n}\n\nfragment ContextualPriceList_tradeSummary on TradeSummaryType {\n  ...ContextualPriceListBestOfferItem_tradeSummary\n}\n\nfragment CreateListingButton_item on ItemType {\n  __isItemType: __typename\n  __typename\n  ... on AssetType {\n    ...CreateQuickSingleListingFlowModal_asset\n  }\n  ...itemEvents_dataV2\n  ...item_sellUrl\n}\n\nfragment CreateQuickSingleListingFlowModal_asset on AssetType {\n  relayId\n  chain {\n    identifier\n  }\n  ...itemEvents_dataV2\n}\n\nfragment CreatorFeeInputModalContent_asset on AssetType {\n  ...ItemOfferDetails_item\n  ...readOptionalCreatorFees_item\n  ...useItemFees_item\n}\n\nfragment CreatorFeeInputModalContent_orders on OrderV2Type {\n  ...readOrderFees_order\n  ...ServiceFeeText_orders\n}\n\nfragment Date_trait on TraitType {\n  traitType\n  floatValue\n  intValue\n}\n\nfragment EditListingButton_item on ItemType {\n  __isItemType: __typename\n  chain {\n    identifier\n  }\n  ...EditListingModal_item\n  ...itemEvents_dataV2\n}\n\nfragment EditListingButton_listing on OrderV2Type {\n  ...EditListingModal_listing\n}\n\nfragment EditListingModal_item on ItemType {\n  __isItemType: __typename\n  __typename\n  ... on AssetType {\n    tokenId\n    assetContract {\n      address\n      id\n    }\n    chain {\n      identifier\n    }\n  }\n}\n\nfragment EditListingModal_listing on OrderV2Type {\n  relayId\n}\n\nfragment FloorPriceDifference_item on ItemType {\n  __isItemType: __typename\n  ... on AssetType {\n    collection {\n      statsV2 {\n        floorPrice {\n          eth\n        }\n      }\n      id\n    }\n  }\n}\n\nfragment ItemAddToCartButton_order on OrderV2Type {\n  maker {\n    address\n    id\n  }\n  taker {\n    address\n    id\n  }\n  item {\n    __typename\n    ... on AssetType {\n      isCurrentlyFungible\n    }\n    ...itemEvents_dataV2\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  openedAt\n  ...ShoppingCartContextProvider_inline_order\n}\n\nfragment ItemOfferDetails_item on ItemType {\n  __isItemType: __typename\n  __typename\n  ... on AssetType {\n    displayName\n    collection {\n      ...CollectionLink_collection\n      id\n    }\n    ...StackedAssetMedia_assets\n  }\n  ... on AssetBundleType {\n    displayName\n    bundleCollection: collection {\n      ...CollectionLink_collection\n      id\n    }\n    assetQuantities(first: 18) {\n      edges {\n        node {\n          asset {\n            ...StackedAssetMedia_assets\n            id\n          }\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ItemTrackingContext_item on ItemType {\n  __isItemType: __typename\n  relayId\n  verificationStatus\n  chain {\n    identifier\n  }\n  ... on AssetType {\n    tokenId\n    isReportedSuspicious\n    assetContract {\n      address\n      id\n    }\n  }\n  ... on AssetBundleType {\n    slug\n  }\n}\n\nfragment ListingFeesSupportsCreator_orders on OrderV2Type {\n  side\n  item {\n    __typename\n    ... on AssetType {\n      totalCreatorFee\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  ...readOrderFees_order\n}\n\nfragment ListingsPanel_asset on AssetType {\n  tokenId\n  isCurrentlyFungible\n  ownedQuantity(identity: {})\n  chain {\n    identifier\n  }\n  assetContract {\n    address\n    id\n  }\n}\n\nfragment MakeAssetOfferButton_asset on AssetType {\n  relayId\n  verificationStatus\n  isBiddingEnabled {\n    value\n    reason\n  }\n  chain {\n    identifier\n  }\n  ...AssetOfferModal_asset\n}\n\nfragment NumericTrait_collection on CollectionType {\n  numericTraits {\n    key\n    value {\n      max\n    }\n  }\n  ...collection_url\n}\n\nfragment NumericTrait_trait on TraitType {\n  floatValue\n  intValue\n  maxValue\n  traitType\n}\n\nfragment OfferModal_tradeSummary on TradeSummaryType {\n  bestAsk {\n    relayId\n    closedAt\n    payment {\n      relayId\n      id\n    }\n    id\n  }\n  ...useOfferModalAdapter_tradeData\n  ...ContextualPriceList_tradeSummary\n}\n\nfragment OffersPanel_asset on AssetType {\n  relayId\n  tokenId\n  isCurrentlyFungible\n  ownedQuantity(identity: {})\n  chain {\n    identifier\n  }\n  assetContract {\n    address\n    id\n  }\n  ...AcceptOfferDisabledAlert_asset\n}\n\nfragment OrderListItem_order on OrderV2Type {\n  relayId\n  makerOwnedQuantity\n  item {\n    __typename\n    displayName\n    ... on AssetType {\n      assetContract {\n        ...CollectionLink_assetContract\n        id\n      }\n      collection {\n        ...CollectionLink_collection\n        id\n      }\n      ...AssetMedia_asset\n      ...asset_url\n      ...useItemFees_item\n    }\n    ... on AssetBundleType {\n      assetQuantities(first: 30) {\n        edges {\n          node {\n            asset {\n              displayName\n              relayId\n              assetContract {\n                ...CollectionLink_assetContract\n                id\n              }\n              collection {\n                ...CollectionLink_collection\n                id\n              }\n              ...StackedAssetMedia_assets\n              ...AssetMedia_asset\n              ...asset_url\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n    ...itemEvents_dataV2\n    ...useIsItemSafelisted_item\n    ...ItemTrackingContext_item\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  remainingQuantityType\n  ...OrderPrice\n}\n\nfragment OrderList_orders on OrderV2Type {\n  item {\n    __typename\n    ... on AssetType {\n      __typename\n      relayId\n    }\n    ... on AssetBundleType {\n      __typename\n      assetQuantities(first: 30) {\n        edges {\n          node {\n            asset {\n              relayId\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  relayId\n  ...OrderListItem_order\n  ...useFulfillingListingsWillReactivateOrders_orders\n}\n\nfragment OrderManager_item on ItemType {\n  __isItemType: __typename\n  __typename\n  chain {\n    isTradingEnabled\n  }\n  tradeSummary {\n    bestAsk {\n      __typename\n      ...EditListingButton_listing\n      id\n    }\n  }\n  ... on AssetType {\n    isEditable {\n      value\n    }\n    ownedQuantity(identity: {})\n    isCurrentlyFungible\n    ...asset_edit_url\n  }\n  ...CreateListingButton_item\n  ...EditListingButton_item\n}\n\nfragment OrderPrice on OrderV2Type {\n  priceType {\n    unit\n  }\n  perUnitPriceType {\n    unit\n  }\n  payment {\n    ...TokenPricePayment\n    id\n  }\n}\n\nfragment OrderUsdPrice on OrderV2Type {\n  priceType {\n    usd\n  }\n  perUnitPriceType {\n    usd\n  }\n}\n\nfragment PrivateListingBanner_data on OrderV2Type {\n  taker {\n    address\n    ...AccountLink_data\n    ...wallet_accountKey\n    id\n  }\n  maker {\n    ...wallet_accountKey\n    id\n  }\n}\n\nfragment ProfileImage_data on AccountType {\n  imageUrl\n}\n\nfragment Property_collection on CollectionType {\n  ...collection_url\n  statsV2 {\n    totalSupply\n  }\n}\n\nfragment Property_trait on TraitType {\n  traitCount\n  traitType\n  value\n}\n\nfragment QuickBuyButton_order on OrderV2Type {\n  maker {\n    address\n    id\n  }\n  taker {\n    address\n    ...wallet_accountKey\n    id\n  }\n  item {\n    __typename\n    chain {\n      identifier\n    }\n    ...itemEvents_dataV2\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  openedAt\n  relayId\n}\n\nfragment RarityIndicator_data on RarityDataType {\n  rank\n  rankPercentile\n  rankCount\n  maxRank\n}\n\nfragment RedeemableItemCard_itemToBurn on AssetType {\n  collection {\n    name\n    id\n  }\n  ...asset_url\n}\n\nfragment SemiFungibleTradeStation_asset on AssetType {\n  ownedQuantity(identity: {})\n  ...TradeStationBuyTab_asset\n  ...TradeStationSellTab_asset\n}\n\nfragment SemiFungibleTradeStation_bestListings_3gcux1 on Query {\n  ...TradeStationBuyTab_bestListings_3gcux1\n}\n\nfragment SemiFungibleTradeStation_bestOffers_3gcux1 on Query {\n  ...TradeStationSellTab_bestOffers_3gcux1\n}\n\nfragment ServiceFeeText_orders on OrderV2Type {\n  ...readOrderFees_order\n}\n\nfragment ShoppingCartContextProvider_inline_order on OrderV2Type {\n  relayId\n  makerOwnedQuantity\n  item {\n    __typename\n    chain {\n      identifier\n    }\n    relayId\n    ... on AssetBundleType {\n      assetQuantities(first: 30) {\n        edges {\n          node {\n            asset {\n              relayId\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  maker {\n    relayId\n    id\n  }\n  taker {\n    address\n    ...wallet_accountKey\n    id\n  }\n  priceType {\n    usd\n  }\n  payment {\n    relayId\n    id\n  }\n  remainingQuantityType\n  ...useTotalItems_orders\n  ...ShoppingCart_orders\n}\n\nfragment ShoppingCartDetailedView_orders on OrderV2Type {\n  relayId\n  item {\n    __typename\n    chain {\n      identifier\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  supportsGiftingOnPurchase\n  ...useTotalPrice_orders\n  ...OrderList_orders\n}\n\nfragment ShoppingCart_orders on OrderV2Type {\n  ...ShoppingCartDetailedView_orders\n  ...BulkPurchaseModal_orders\n}\n\nfragment SocialBar_data on CollectionType {\n  relayId\n  discordUrl\n  externalUrl\n  mediumUsername\n  slug\n  telegramUrl\n  twitterUsername\n  connectedInstagramUsername\n  connectedTwitterUsername\n  assetContracts(first: 2) {\n    edges {\n      node {\n        blockExplorerLink\n        chainData {\n          blockExplorer {\n            name\n            identifier\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment StackedAssetMedia_assets on AssetType {\n  relayId\n  ...AssetMedia_asset\n  collection {\n    logo\n    id\n  }\n}\n\nfragment TokenPricePayment on PaymentAssetType {\n  symbol\n}\n\nfragment Toolbar_asset on AssetType {\n  ...asset_url\n  ...AssetDealLink_asset\n  ...itemEvents_data\n  assetContract {\n    address\n    id\n  }\n  collection {\n    externalUrl\n    id\n  }\n  externalLink\n  relayId\n}\n\nfragment TradeStationBuyTab_asset on AssetType {\n  tradeSummary {\n    bestAsk {\n      ...TradeStationOrderPrice_order\n      id\n    }\n  }\n  ...useFulfillSemiFungibleOrders_asset\n  ...MakeAssetOfferButton_asset\n  ...itemEvents_dataV2\n}\n\nfragment TradeStationBuyTab_bestListings_3gcux1 on Query {\n  nft(tokenId: $tokenId, contractAddress: $contractAddress, chain: $chain) {\n    bestListings(first: 10, forTaker: {}) {\n      edges {\n        node {\n          ...useFulfillSemiFungibleOrders_orders\n          id\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    id\n  }\n}\n\nfragment TradeStationOrderPrice_order on OrderV2Type {\n  ...OrderPrice\n  ...OrderUsdPrice\n}\n\nfragment TradeStationSellTab_asset on AssetType {\n  ownedQuantity(identity: {})\n  tradeSummary {\n    bestBid {\n      ...TradeStationOrderPrice_order\n      id\n    }\n  }\n  ...useFulfillSemiFungibleOrders_asset\n  ...AssetListButton_asset\n  ...itemEvents_dataV2\n}\n\nfragment TradeStationSellTab_bestOffers_3gcux1 on Query {\n  nft(tokenId: $tokenId, contractAddress: $contractAddress, chain: $chain) {\n    bestOffers(first: 10, forTaker: {}) {\n      edges {\n        node {\n          ...useFulfillSemiFungibleOrders_orders\n          id\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    id\n  }\n}\n\nfragment TradeStation_acceptHighestOffer on TradeSummaryType {\n  bestBid {\n    relayId\n    id\n  }\n  ...AcceptHighestOfferButton_tradeSummary\n}\n\nfragment TradeStation_archetype on AssetType {\n  verificationStatus\n  chain {\n    identifier\n    isTradingEnabled\n  }\n  largestOwner {\n    owner {\n      ...wallet_accountKey\n      id\n    }\n    id\n  }\n  isCurrentlyFungible\n  isListable\n  isBiddingEnabled {\n    value\n    reason\n  }\n  relayId\n  acceptOfferDisabled {\n    __typename\n  }\n  isFastPollingEnabled\n  ...AcceptHighestOfferButton_asset\n  ...useFulfillSemiFungibleOrders_asset\n  ...AssetOfferModal_asset\n}\n\nfragment TradeStation_bestAsk on OrderV2Type {\n  closedAt\n  openedAt\n  orderType\n  englishAuctionReservePriceType {\n    unit\n  }\n  relayId\n  maker {\n    address\n    ...wallet_accountKey\n    id\n  }\n  item {\n    __typename\n    verificationStatus\n    relayId\n    chain {\n      identifier\n      isTradingEnabled\n    }\n    ... on AssetType {\n      tokenId\n      isCurrentlyFungible\n      assetContract {\n        address\n        id\n      }\n      collection {\n        slug\n        id\n      }\n    }\n    ...itemEvents_dataV2\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  priceType {\n    unit\n    usd\n  }\n  remainingQuantityType\n  perUnitPriceType {\n    usd\n  }\n  payment {\n    symbol\n    relayId\n    asset {\n      relayId\n      id\n    }\n    ...TokenPricePayment\n    id\n  }\n  taker {\n    ...wallet_accountKey\n    id\n  }\n  ...OrderPrice\n  ...OrderUsdPrice\n  ...AddToCartAndQuickBuyButton_order\n  ...QuickBuyButton_order\n}\n\nfragment TradeStation_bestBid on OrderV2Type {\n  ...OrderPrice\n  ...OrderUsdPrice\n  payment {\n    relayId\n    id\n  }\n  priceType {\n    unit\n  }\n  perUnitPriceType {\n    usd\n  }\n}\n\nfragment TradeStation_data on TradeSummaryType {\n  bestAsk {\n    ...TradeStation_bestAsk\n    ...ListingFeesSupportsCreator_orders\n    id\n  }\n  bestBid {\n    ...TradeStation_bestBid\n    id\n  }\n  ...OfferModal_tradeSummary\n}\n\nfragment accounts_url on AccountType {\n  address\n  user {\n    publicUsername\n    id\n  }\n}\n\nfragment asset_display_name on AssetType {\n  tokenId\n  name\n}\n\nfragment asset_edit_url on AssetType {\n  assetContract {\n    address\n    chain\n    id\n  }\n  tokenId\n  collection {\n    slug\n    id\n  }\n}\n\nfragment asset_url on AssetType {\n  assetContract {\n    address\n    id\n  }\n  tokenId\n  chain {\n    identifier\n  }\n}\n\nfragment collection_url on CollectionType {\n  slug\n  isCategory\n}\n\nfragment itemEvents_data on AssetType {\n  relayId\n  assetContract {\n    address\n    id\n  }\n  tokenId\n  chain {\n    identifier\n  }\n}\n\nfragment itemEvents_dataV2 on ItemType {\n  __isItemType: __typename\n  relayId\n  chain {\n    identifier\n  }\n  ... on AssetType {\n    tokenId\n    assetContract {\n      address\n      id\n    }\n  }\n}\n\nfragment item_sellUrl on ItemType {\n  __isItemType: __typename\n  __typename\n  ... on AssetType {\n    ...asset_url\n  }\n  ... on AssetBundleType {\n    slug\n    chain {\n      identifier\n    }\n    assetQuantities(first: 18) {\n      edges {\n        node {\n          asset {\n            relayId\n            id\n          }\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment price on OrderV2Type {\n  priceType {\n    unit\n  }\n}\n\nfragment readOptionalCreatorFees_item on ItemType {\n  __isItemType: __typename\n  __typename\n  ... on AssetType {\n    collection {\n      isCreatorFeesEnforced\n      totalCreatorFeeBasisPoints\n      id\n    }\n  }\n}\n\nfragment readOrderFees_order on OrderV2Type {\n  makerFees(first: 10) {\n    edges {\n      node {\n        basisPoints\n        isOpenseaFee\n        id\n      }\n    }\n  }\n  takerFees(first: 10) {\n    edges {\n      node {\n        basisPoints\n        isOpenseaFee\n        id\n      }\n    }\n  }\n}\n\nfragment useAcceptOfferDisabledReason_data on AcceptOfferDisabledType {\n  until\n}\n\nfragment useFulfillSemiFungibleOrders_asset on AssetType {\n  relayId\n  totalQuantity\n  ownedQuantity(identity: {})\n  ...AcceptOffersButton_asset\n}\n\nfragment useFulfillSemiFungibleOrders_orders on OrderV2Type {\n  relayId\n  payment {\n    symbol\n    id\n  }\n  perUnitPriceType {\n    unit\n  }\n  remainingQuantityType\n  ...useOrdersWithValidMakerOwnedQuantity_order\n  ...useTotalPrice_orders\n  ...BuyNowButton_orders\n  ...AcceptOffersButton_orders\n  ...ListingFeesSupportsCreator_orders\n}\n\nfragment useFulfillingListingsWillReactivateOrders_orders on OrderV2Type {\n  ...useTotalItems_orders\n}\n\nfragment useGetDealAssetDisabledReason_asset on AssetType {\n  isCompromised\n  isCurrentlyFungible\n  isListable\n  tokenStandard\n  chain {\n    isTradingEnabled\n  }\n  collection {\n    safelistRequestStatus\n    id\n  }\n}\n\nfragment useIsItemSafelisted_item on ItemType {\n  __isItemType: __typename\n  __typename\n  ... on AssetType {\n    collection {\n      slug\n      verificationStatus\n      id\n    }\n  }\n  ... on AssetBundleType {\n    assetQuantities(first: 30) {\n      edges {\n        node {\n          asset {\n            collection {\n              slug\n              verificationStatus\n              id\n            }\n            id\n          }\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment useIsLiveUpdatesEnabledForCollection_collection on CollectionType {\n  statsV2 {\n    hasFungibles\n  }\n}\n\nfragment useIsQuickBuyEnabled_order on OrderV2Type {\n  orderType\n  item {\n    __typename\n    ... on AssetType {\n      isCurrentlyFungible\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment useIsRarityEnabled_collection on CollectionType {\n  slug\n  enabledRarities\n}\n\nfragment useItemFees_item on ItemType {\n  __isItemType: __typename\n  __typename\n  ... on AssetType {\n    totalCreatorFee\n    collection {\n      openseaSellerFeeBasisPoints\n      isCreatorFeesEnforced\n      id\n    }\n  }\n  ... on AssetBundleType {\n    bundleCollection: collection {\n      openseaSellerFeeBasisPoints\n      totalCreatorFeeBasisPoints\n      isCreatorFeesEnforced\n      id\n    }\n  }\n}\n\nfragment useOfferModalAdapter_tradeData on TradeSummaryType {\n  bestAsk {\n    orderType\n    relayId\n    item {\n      __typename\n      verificationStatus\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    payment {\n      relayId\n      id\n    }\n    perUnitPriceType {\n      unit\n    }\n    id\n  }\n  bestBid {\n    relayId\n    payment {\n      relayId\n      id\n    }\n    ...price\n    id\n  }\n}\n\nfragment useOrdersWithValidMakerOwnedQuantity_order on OrderV2Type {\n  makerOwnedQuantity\n  remainingQuantityType\n  side\n  perUnitPriceType {\n    unit\n  }\n  maker {\n    relayId\n    id\n  }\n}\n\nfragment useTotalItems_orders on OrderV2Type {\n  item {\n    __typename\n    relayId\n    ... on AssetBundleType {\n      assetQuantities(first: 30) {\n        edges {\n          node {\n            asset {\n              relayId\n              id\n            }\n            id\n          }\n        }\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment useTotalPrice_orders on OrderV2Type {\n  relayId\n  perUnitPriceType {\n    usd\n    unit\n  }\n  payment {\n    symbol\n    ...TokenPricePayment\n    id\n  }\n}\n\nfragment wallet_accountKey on AccountType {\n  address\n}\n';

  export const authLoginV2AuthSimplifiedMutation =
  'mutation authLoginV2AuthSimplifiedMutation(\n  $address: AddressScalar!\n  $message: String!\n  $deviceId: String!\n  $signature: String!\n  $chain: ChainScalar\n) {\n  AuthTypeV2 {\n    webLoginV2(address: $address, deviceId: $deviceId, message: $message, signature: $signature, chain: $chain) {\n      address\n      isEmployee\n    }\n  }\n}\n';