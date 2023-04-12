export const SAVE_STORE_REVIEW_SCHEMA = 'save_store_review';
export const SAVE_OFFER_SCHEMA = 'save_offer';
export const IS_OFFER_SAVE_SCHEMA = 'is_offer_save';

export const SaveOfferSchema = {
  name: SAVE_OFFER_SCHEMA,
  properties: {
    id: 'string',
    listID: 'string',
  },
  primaryKey: 'id',
};

export const SAVE_STORE_SCHEMA = 'save_store';
export const IS_STORE_SAVE_SCHEMA = 'is_store_save';

export const SaveStoreSchema = {
  name: SAVE_STORE_SCHEMA,
  properties: {
    id: 'string',
    storeID: 'string',
  },
  primaryKey: 'id',
};

export const SaveStoreReviewSchema = {
  name: SAVE_STORE_REVIEW_SCHEMA,
  properties: {
    id: 'string',
    storeID: 'string',
  },
  primaryKey: 'id',
};
