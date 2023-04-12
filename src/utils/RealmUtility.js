import Realm from 'realm';
import {
  SAVE_STORE_SCHEMA,
  SAVE_OFFER_SCHEMA,
  SAVE_STORE_REVIEW_SCHEMA,
  SaveOfferSchema,
  SaveStoreSchema,
  SaveStoreReviewSchema,
} from '../realm/allSchemas';

const saveOfferDatabaseOptions = {
  path: 'saveOfferTable',
  schema: [SaveOfferSchema],
  schemaVersion: 0,
};

const saveStoreDatabaseOptions = {
  path: 'saveStoreTable',
  schema: [SaveStoreSchema],
  schemaVersion: 0,
};

const saveStoreReviewDatabaseOptions = {
  path: 'saveStoreReviewTable',
  schema: [SaveStoreReviewSchema],
  schemaVersion: 0,
};

// realm setup to save offer

export const doSaveOfferOffline = id => {
  try {
    Realm.open(saveOfferDatabaseOptions).then(realm => {
      let obj = {
        id: id + '',
        listID: id + '',
      };
      console.log('saving to realm-> ', obj);
      realm.write(() => {
        realm.create(SAVE_OFFER_SCHEMA, obj);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const isOfferSaved = async id => {
  let isAvail = false;
  await Realm.open(saveOfferDatabaseOptions).then(realm => {
    realm.write(() => {
      var obj = realm.objects(SAVE_OFFER_SCHEMA).filtered(`listID == '${id}'`);
      if (obj?.length == 1) {
        isAvail = true;
      } else {
        isAvail = false;
      }
    });
  });
  return isAvail;
};

export const doDeleteOfferOffline = id => {
  try {
    Realm.open(saveOfferDatabaseOptions).then(realm => {
      realm.write(() => {
        var obj = realm
          .objects(SAVE_OFFER_SCHEMA)
          .filtered(`listID == '${id}'`);
        console.log('Final obj -> ', obj);

        if (obj?.length > 0) {
          realm.delete(obj[0]);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSavedOfferAsString = async () => {
  let ids = '';
  await Realm.open(saveOfferDatabaseOptions).then(realm => {
    if (realm.objects(SAVE_OFFER_SCHEMA).length > 0) {
      realm.objects(SAVE_OFFER_SCHEMA).forEach((obj, index) => {
        // console.log('SAVE_OFFER_SCHEMA -> ', obj?.listID);
        if (index == 0) {
          ids = '' + obj?.listID;
        } else {
          ids = ids + ',' + obj?.listID;
        }
      });
    }
  });
  return ids;
};

// realm setup to save store
export const doSaveStoreOffline = id => {
  try {
    Realm.open(saveStoreDatabaseOptions).then(realm => {
      let obj = {
        id: id + '',
        storeID: id + '',
      };
      console.log('saving to realm-> ', obj);
      realm.write(() => {
        realm.create(SAVE_STORE_SCHEMA, obj);
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const isStoreSaved = async id => {
  let isAvail = false;
  await Realm.open(saveStoreDatabaseOptions).then(realm => {
    realm.write(() => {
      var obj = realm.objects(SAVE_STORE_SCHEMA).filtered(`storeID == '${id}'`);
      if (obj?.length == 1) {
        isAvail = true;
      } else {
        isAvail = false;
      }
    });
  });
  return isAvail;
};

export const doDeleteStoreOffline = id => {
  try {
    Realm.open(saveStoreDatabaseOptions).then(realm => {
      realm.write(() => {
        var obj = realm
          .objects(SAVE_STORE_SCHEMA)
          .filtered(`storeID == '${id}'`);
        console.log('Final obj -> ', obj);

        if (obj?.length > 0) {
          realm.delete(obj[0]);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSavedStoreAsString = async () => {
  let ids = '';
  await Realm.open(saveStoreDatabaseOptions).then(realm => {
    if (realm.objects(SAVE_STORE_SCHEMA).length > 0) {
      realm.objects(SAVE_STORE_SCHEMA).forEach((obj, index) => {
        // console.log('SAVE_OFFER_SCHEMA -> ', obj?.listID);
        if (index == 0) {
          ids = '' + obj?.storeID;
        } else {
          ids = ids + ',' + obj?.storeID;
        }
      });
    }
  });
  return ids;
};

// realm setup to save store
export const doSaveStoreReview = id => {
  try {
    Realm.open(saveStoreReviewDatabaseOptions).then(realm => {
      let obj = {
        id: id + '',
        storeID: id + '',
      };
      console.log('saving to realm-> ', obj);
      realm.write(() => {
        realm.create(SAVE_STORE_REVIEW_SCHEMA, obj);
      });
    });
  } catch (err) {
    console.log(err);
  }
};
export const isStoreReviewSaved = async id => {
  let isAvail = false;
  await Realm.open(saveStoreReviewDatabaseOptions).then(realm => {
    realm.write(() => {
      var obj = realm
        .objects(SAVE_STORE_REVIEW_SCHEMA)
        .filtered(`storeID == '${id}'`);
      if (obj?.length == 1) {
        isAvail = true;
      } else {
        isAvail = false;
      }
    });
  });
  return isAvail;
};
