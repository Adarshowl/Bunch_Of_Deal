import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {AirbnbRating, Image} from 'react-native-elements';
import crashlytics from '@react-native-firebase/crashlytics';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {Marker} from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypofrom from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS, SIZES} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle from '../../styles/GlobalStyle';
import GlobalStyle1 from '../../styles/GlobalStyle1';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import BunchDealEditText from '../../utils/EditText/BunchDealEditText';
import {
  doDeleteStoreOffline,
  doSaveStoreOffline,
  doSaveStoreReview,
  isStoreReviewSaved,
  isStoreSaved,
} from '../../utils/RealmUtility';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';

import RenderOfferItem from './RenderOfferItem';
import RenderReviewItem from './RenderReviewItem';
import RenderGalleryItem from './RenderGalleryItem';
import BunchDealProgressBar from '../../utils/BunchDealProgressBar';
import {markAsRead} from '../CampaignController';
import {useSelector} from 'react-redux';

const StoreDetails = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);

  let userLat = useSelector(state => state?.state?.latitude);
  let userLong = useSelector(state => state?.state?.longitude);
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    // const paddingToBottom = 30;
    const paddingToBottom = SIZES.width - 50;
    // ShowConsoleLogMessage('paddingToBottom -> ' + paddingToBottom);
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const formatDistance = distance => {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(0)} km`;
    } else {
      return `${distance.toFixed(2)} m`;
    }
  };

  // const { item } = route.params;
  // console.log("ajajajajajajaja",item)
  // useEffect(() => {
  //   let { item } = route?.params;
  //   console.log("recived data ", item)
  //   getUserFromStorage(item);
  // }, []);

  // useEffect(() => {
  //   getisFocusedUserFromStorage();
  // }, [isFocused]);
  const isFocused = useIsFocused();

  const deltaValue = 0.02;
  // const latitude = 46.152424377523; // New York City
  // const longitude = 46.152424377523;

  const [showDown, setShowDown] = useState(false);

  const [changeOne, setChangeOne] = useState(true);
  const [changeTwo, setChangeTwo] = useState(false);
  const [changeThree, setChangeThree] = useState(false);

  const [imageUrl, setImageUrl] = useState('');
  const [imageUrl200, setImageUrl200] = useState('');

  useEffect(() => {
    convertImageToBase(imageUrl200).then(r => {});
  }, [imageUrl200]);
  const [base64Data, setBase64Data] = useState('');

  const convertImageToBase = async imageUrl => {
    try {
      if (imageUrl != null && imageUrl !== '') {
        const fs = RNFetchBlob.fs;
        let imagePath = imageUrl;
        RNFetchBlob.config({
          fileCache: true,
        })
          .fetch('GET', imagePath)
          .then(response => {
            imagePath = response.path();
            return response.readFile('base64');
          })
          .then(async base64 => {
            var base64D = `data:image/jpeg;base64,` + base64;
            setBase64Data(base64D);
            // Delay to give time for data processing and avoid flickering
            return fs.unlink(imagePath);
          });
      } else {
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const [catImageUrl, setCatImageUrl] = useState('');
  const [receivedData, setReceivedData] = useState({});
  const [haveContactPermission, setHaveContactPermission] = useState({});

  const [userData, setUserData] = useState({});

  useEffect(() => {
    let {item} = route?.params;
    getUserFromStorage(item);
  }, []);

  const getUserFromStorage = async item => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            // ShowConsoleLogMessage(value);
            setUserData(JSON.parse(value));

            if (item?.cid != undefined || null) {
              markAsRead(item?.cid, JSON.parse(value)?.id_user);
            }
          } else {
          }
        }
      });
    } catch (err) {
      crashlytics().recordError(err);

      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  useEffect(() => {
    getisFocusedUserFromStorage();
  }, [isFocused]);

  const getisFocusedUserFromStorage = async item => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            setUserData(JSON.parse(value));
          } else {
          }
        }
      });
    } catch (err) {
      crashlytics().recordError(err);

      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const triggerCall = () => {
    let m = receivedData?.telephone + '';

    try {
      Linking.openURL(`tel:${m}`);
    } catch (error) {
      crashlytics().recordError(error);
    }
  };

  const generateDeepLinkURL = StoreId => {
    // Replace 'myapp' with your actual app's URL scheme
    return `myapp://offer/${StoreId}`;
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          receivedData?.name +
          ' - Only on Bunch of Deals \n https://play.google.com/store/apps/details?id=com.bunch.of.deals',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      crashlytics().recordError(error);

      Alert.alert(error.message);
    }
  };

  const getStoreList = val => {
    setLoading(true);
    let body = {
      limit: '1',
      store_id: val,
      latitude: userLat,
      longitude: userLong,
    };

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_USER_GET_STORES, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(JSON.stringify(response?.data));
          let result = Object.values(response?.data?.result);
          setReceivedData(result[0]);
          setImageUrl(result[0]?.images?.['0']?.['560_560']?.url);
          setImageUrl200(result[0]?.images?.['0']?.['200_200']?.url);

          var res = [];

          try {
            Object.values(result[0]?.images).forEach((key, index) => {
              res.push(key['560_560' || 'full']?.url + '');
            });
          } catch (err) {
            crashlytics().recordError(err);
          }

          setImages(res);

          setCatImageUrl(result[0]?.images['0']['560_560']?.url);
        } else {
        }
      })
      .catch(err => {
        crashlytics().recordError(err);

        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [favorite, setFavorite] = useState(false);
  const [reviewAdded, setReviewAdded] = useState(false);

  const doSaveOnline = val => {
    let body = {
      user_id: userData?.id_user,
      store_id: receivedData?.id_store,
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_SAVE_STORE, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // ShowConsoleLogMessage(response);
        if (response?.data?.success == 1) {
          setFavorite(!favorite);
          ShowToastMessage('Added to favorite');
        } else {
          setFavorite(false);
        }
      })
      .catch(err => {
        crashlytics().recordError(err);

        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  const unSaveOnline = val => {
    let body = {
      user_id: userData?.id_user + '',
      store_id: receivedData?.id_store + '',
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_REMOVE_STORE, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // ShowConsoleLogMessage(response);
        if (response?.data?.success == 1) {
          setFavorite(!favorite);
          // ShowToastMessage('Unsaved');
          ShowToastMessage('Removed from favorite');
        } else {
          setFavorite(false);
        }
      })
      .catch(err => {
        crashlytics().recordError(err);

        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  // useEffect(() => {
  //   (async function () {
  //     let { item } = route.params;
  //     ShowConsoleLogMessage("dtatat for store detils",item);
  //     if (item?.intentFromNotification) {
  //       // ShowConsoleLogMessage('insdie -> ' + JSON.stringify(item));

  //       getStoreList(item?.store_id);
  //       getOfferList(item?.store_id);
  //       getReviewList(item?.store_id);
  //       getGalleryList(item?.store_id);
  //       let is_store_save = await isStoreSaved(
  //         item?.store_id || item?.id_store,
  //       );
  //       setFavorite(is_store_save);
  //       let is_store_review = await isStoreReviewSaved(
  //         item?.store_id || item?.id_store,
  //       );
  //       setReviewAdded(is_store_review);
  //     } else {
  //       if (item?.store_id != undefined || null) {
  //         getStoreList(item?.store_id);
  //         getOfferList(item?.store_id);
  //         getReviewList(item?.store_id);
  //         getGalleryList(item?.store_id);

  //         let is_store_save = await isStoreSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         setFavorite(is_store_save);
  //         let is_store_review = await isStoreReviewSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         setReviewAdded(is_store_review);
  //       } else {
  //         setReceivedData(item);
  //         ShowConsoleLogMessage(item);
  //         getOfferList(item?.id_store);
  //         getReviewList(item?.id_store);
  //         getGalleryList(item?.id_store);

  //         var res = [];

  //         try {
  //           Object.values(item?.images).forEach((key, index) => {
  //             res.push(key['560_560' || 'full']?.url + '');
  //           });
  //         } catch (err) {
  //           crashlytics().recordError(err);
  //         }
  //         setImages(res);

  //         setImageUrl(item?.images?.['0']?.['560_560']?.url);
  //         setCatImageUrl(item?.images['0']['200_200']?.url);

  //         let is_store_save = await isStoreSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         setFavorite(is_store_save);

  //         let is_store_review = await isStoreReviewSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         // ShowConsoleLogMessage(is_store_review + ' << isStoreReviewSaved');
  //         setReviewAdded(is_store_review);
  //       }
  //     }
  //     await AsyncStorage.setItem('notification', '');
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async function () {
  //     let { item } = route.params;
  //     if (item) {
  //       if (item.intentFromNotification) {
  //         // Code to execute when item is from notification
  //         ShowConsoleLogMessage('Inside notification -> ' + JSON.stringify(item));
  //         getSearchOfferList(item?.id_store);

  //         getStoreList(item?.store_id);
  //         getOfferList(item?.store_id);
  //         getReviewList(item?.store_id);
  //         getGalleryList(item?.store_id);
  //         let is_store_save = await isStoreSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         setFavorite(is_store_save);
  //         let is_store_review = await isStoreReviewSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         setReviewAdded(is_store_review);
  //       } else if (item.store_id) {
  //         // Code to execute when item has a store_id property
  //         getSearchOfferList(item?.id_store);
  //         getStoreList(item?.store_id);
  //         getOfferList(item?.store_id);
  //         getReviewList(item?.store_id);
  //         getGalleryList(item?.store_id);
  //         let is_store_save = await isStoreSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         setFavorite(is_store_save);
  //         let is_store_review = await isStoreReviewSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         setReviewAdded(is_store_review);
  //       } else if (item.intentFromGeo && item.store_id) {
  //         // Code to execute when item has intentFromGeo true and id_offer defined
  //         getSearchOfferList(item?.id_store);
  //         let is_offer_save = await isOfferSaved(
  //           item?.id_offer || item?.offer_id,
  //         );
  //         setFavorite(is_offer_save);
  //       } else {
  //         // Code to execute when item doesn't meet the above conditions
  //         setReceivedData(item);
  //         ShowConsoleLogMessage(JSON.stringify(item));
  //         getOfferList(item?.id_store);
  //         getReviewList(item?.id_store);
  //         getGalleryList(item?.id_store);

  //         var res = [];

  //         try {
  //           Object.values(item?.images).forEach((key, index) => {
  //             res.push(key['560_560' || 'full']?.url + '');
  //           });
  //         } catch (err) {
  //           crashlytics().recordError(err);
  //         }
  //         setImages(res);

  //         setImageUrl(item?.images['0']['560_560']?.url);
  //         setCatImageUrl(item?.images['0']['200_200']?.url);

  //         let is_store_save = await isStoreSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         setFavorite(is_store_save);

  //         let is_store_review = await isStoreReviewSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         setReviewAdded(is_store_review);
  //       }

  //       await AsyncStorage.setItem('notification', '');
  //     }
  //   })();
  // }, [isFocused]);

  // useEffect(() => {
  //   (async function () {
  //     let { item } = route.params;
  //     // ShowConsoleLogMessage(item);
  //     if (item?.intentFromNotification) {
  //       ShowConsoleLogMessage('insdie -> ' + JSON.stringify(item));

  //       getStoreList(item?.store_id);
  //       getOfferList(item?.store_id);
  //       getReviewList(item?.store_id);
  //       getGalleryList(item?.store_id);
  //       let is_store_save = await isStoreSaved(
  //         item?.store_id || item?.id_store,
  //       );
  //       setFavorite(is_store_save);
  //       let is_store_review = await isStoreReviewSaved(
  //         item?.store_id || item?.id_store,
  //       );
  //       setReviewAdded(is_store_review);
  //     } else {
  //       if (item?.store_id != undefined || null) {
  //         getStoreList(item?.store_id);
  //         getOfferList(item?.store_id);
  //         getReviewList(item?.store_id);
  //         getGalleryList(item?.store_id);

  //         let is_store_save = await isStoreSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         setFavorite(is_store_save);
  //         let is_store_review = await isStoreReviewSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         setReviewAdded(is_store_review);
  //       } else {
  //         setReceivedData(item);
  //         ShowConsoleLogMessage(item);
  //         getOfferList(item?.id_store);
  //         getReviewList(item?.id_store);
  //         getGalleryList(item?.id_store);

  //         var res = [];

  //         try {
  //           Object.values(item?.images).forEach((key, index) => {
  //             res.push(key['560_560' || 'full']?.url + '');
  //           });
  //         } catch (err) {
  //           crashlytics().recordError(err);
  //         }
  //         setImages(res);

  //         setImageUrl(item?.images['0']['560_560']?.url);
  //         setCatImageUrl(item?.images['0']['200_200']?.url);

  //         let is_store_save = await isStoreSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         setFavorite(is_store_save);

  //         let is_store_review = await isStoreReviewSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         // ShowConsoleLogMessage(is_store_review + ' << isStoreReviewSaved');
  //         setReviewAdded(is_store_review);
  //       }
  //     }
  //     await AsyncStorage.setItem('notification', '');
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async function () {
  //     let { item } = route.params;

  //     // Check if the intent comes from a notification
  //     if (item?.intentFromNotification) {
  //       ShowConsoleLogMessage('inside -> ' + JSON.stringify(item));

  //       // Fetch data related to the store from the notification
  //       getStoreList(item?.store_id);
  //       getOfferList(item?.store_id);
  //       getReviewList(item?.store_id);
  //       getGalleryList(item?.store_id);

  //       // Check if the store is saved as a favorite
  //       let is_store_save = await isStoreSaved(
  //         item?.store_id || item?.id_store,
  //       );
  //       setFavorite(is_store_save);

  //       // Check if a review has been added for the store
  //       let is_store_review = await isStoreReviewSaved(
  //         item?.store_id || item?.id_store,
  //       );
  //       setReviewAdded(is_store_review);
  //     } else {
  //       // Check if item has a store_id defined
  //       if (item?.store_id != undefined || null) {
  //         // Fetch data related to the store
  //         getStoreList(item?.store_id);
  //         getOfferList(item?.store_id);
  //         getReviewList(item?.store_id);
  //         getGalleryList(item?.store_id);

  //         // Check if the store is saved as a favorite
  //         let is_store_save = await isStoreSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         setFavorite(is_store_save);

  //         // Check if a review has been added for the store
  //         let is_store_review = await isStoreReviewSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         setReviewAdded(is_store_review);
  //       } else {
  //         // Check if the intent comes from geolocation
  //         if (item?.intentFromGeo) {
  //           // Check if the store is saved as a favorite
  //           if (item?.store_id != undefined || null) {
  //             let is_store_save = await isStoreSaved(
  //               item?.store_id || item?.id_store,
  //             );
  //             setFavorite(is_store_save);
  //           }
  //         } else {
  //           // Handle the case when item doesn't match any condition above
  //           setReceivedData(item);
  //           var res = [];

  //           try {
  //             // Extract image URLs from item.images and add them to res array
  //             Object.values(item?.images).forEach((key, index) => {
  //               res.push(key['560_560' || 'full']?.url + '');
  //             });
  //           } catch (err) {
  //             crashlytics().recordError(err);
  //           }

  //           // Update component state with image URLs and other data
  //           setImages(res);
  //           setImageUrl(item?.images['0']['560_560']?.url);
  //           setCatImageUrl(item?.images['0']['200_200']?.url);

  //           // Check if the store is saved as a favorite
  //           let is_store_save = await isStoreSaved(
  //             item?.store_id || item?.id_store,
  //           );
  //           setFavorite(is_store_save);

  //           // Check if a review has been added for the store
  //           let is_store_review = await isStoreReviewSaved(
  //             item?.store_id || item?.id_store,
  //           );
  //           ShowConsoleLogMessage(is_store_review + ' << isStoreReviewSaved');
  //           setReviewAdded(is_store_review);
  //         }
  //       }
  //     }

  //     // Clear the 'notification' key from AsyncStorage
  //     await AsyncStorage.setItem('notification', '');
  //   })();
  // }, [isFocused]);

  // useEffect(() => {
  //   (async function () {
  //     let { item } = route.params;
  //     ShowConsoleLogMessage('insdie  store-> ' + JSON.stringify(item));

  //     if (item?.intentFromNotification) {
  //       // ... (same as your original code)
  //       // getSearchOfferList(item?.id_store)
  //       getSearchOfferList(item?.store_id)
  //           getStoreList(item?.id_store);
  //           getOfferList(item?.id_store);
  //           getReviewList(item?.id_store);
  //           getGalleryList(item?.id_store);

  //     } else {
  //       if (item?.store_id != undefined && item?.store_id !== null) {
  //         // ... (same as your original code)
  //         // getSearchOfferList(item?.id_store)

  //         getSearchOfferList(item?.store_id)
  //         getStoreList(item?.id_store);
  //         getOfferList(item?.id_store);
  //         getReviewList(item?.id_store);
  //         getGalleryList(item?.id_store);

  //       } else {
  //         if (item?.intentFromGeo) {
  //           if (item?.store_id != undefined && item?.store_id !== null) {
  //             // ... (same as your original code)
  //             // getSearchOfferList(item?.store_id)

  //             getSearchOfferList(item?.store_id)
  //           getStoreList(item?.store_id);
  //           getOfferList(item?.store_id);
  //           getReviewList(item?.store_id);
  //           getGalleryList(item?.store_id);
  //           }
  //         } else {
  //           // Handle the case when item doesn't match any condition above
  //           setReceivedData(item);
  //           var res = [];

  //           try {
  //             // Check if 'item.images' is defined and not empty
  //             if (item?.images && Object.keys(item.images).length > 0) {
  //               Object.values(item.images).forEach((key, index) => {
  //                 // Check if 'key' and 'key['560_560']' are defined before accessing 'url'
  //                 if (key && key['560_560'] && key['560_560'].url) {
  //                   res.push(key['560_560'].url);
  //                 }
  //               });
  //             }
  //           } catch (err) {
  //             crashlytics().recordError(err);
  //           }

  //           // Update component state with image URLs and other data
  //           // getSearchOfferList(item?.id_store)
  //           getStoreList(item?.id_store);
  //           getOfferList(item?.id_store);
  //           getReviewList(item?.id_store);
  //           getGalleryList(item?.id_store);
  //           setImages(res);
  //           setImageUrl(res.length > 0 ? res[0] : ''); // Set the first image URL or an empty string
  //           setCatImageUrl(item?.images['0']?.['200_200']?.url);

  //           let is_store_save = await isStoreSaved(
  //             item?.store_id || item?.id_store,
  //           );
  //           setFavorite(is_store_save);

  //           let is_store_review = await isStoreReviewSaved(
  //             item?.store_id || item?.id_store,
  //           );
  //           ShowConsoleLogMessage(is_store_review + ' << isStoreReviewSaved');
  //           setReviewAdded(is_store_review);
  //         }
  //       }
  //     }

  //     // Clear the 'notification' key from AsyncStorage
  //     await AsyncStorage.setItem('notification', '');
  //   })();
  // }, [isFocused]);

  // useEffect(() => {
  //   (async function () {
  //     let { item } = route.params;
  //     ShowConsoleLogMessage('Item: ' + JSON.stringify(item));

  //     if (item?.intentFromNotification) {
  //       // getSearchOfferList(item?.store_id);
  //       getStoreList(item?.store_id);
  //       getOfferList(item?.store_id);
  //       getReviewList(item?.store_id);
  //       getGalleryList(item?.store_id);
  //       let is_store_save = await isStoreSaved(item?.store_id || item?.id_store);
  //       setFavorite(is_store_save);
  //       let is_store_review = await isStoreReviewSaved(
  //         item?.store_id || item?.id_store,
  //       );
  //       ShowConsoleLogMessage(is_store_review + ' << isStoreReviewSaved');
  //       setReviewAdded(is_store_review);
  //     } else {
  //       if (item?.store_id !== undefined && item?.store_id !== null) {
  //         // getSearchOfferList(item?.store_id);
  //         getStoreList(item?.store_id);
  //         getOfferList(item?.store_id);
  //         getReviewList(item?.store_id);
  //         getGalleryList(item?.store_id);
  //         let is_store_save = await isStoreSaved(item?.store_id || item?.id_store);
  //         setFavorite(is_store_save);
  //         let is_store_review = await isStoreReviewSaved(
  //           item?.store_id || item?.id_store,
  //         );
  //         ShowConsoleLogMessage(is_store_review + ' << isStoreReviewSaved');
  //         setReviewAdded(is_store_review);
  //       } else {
  //         if (item?.intentFromGeo) {
  //           if (item?.store_id !== undefined && item?.store_id !== null) {
  //             // getSearchOfferList(item?.store_id);
  //             getStoreList(item?.store_id);
  //             let is_store_save = await isStoreSaved(item?.store_id || item?.id_store);
  //             setFavorite(is_store_save);
  //             getOfferList(item?.store_id);
  //             getReviewList(item?.store_id);
  //             getGalleryList(item?.store_id);
  //           }
  //         } else {
  //           // Handle the case when item doesn't match any condition above
  //           setReceivedData(item);

  //           var res = [];

  //           try {
  //             Object.values(item?.images).forEach((key, index) => {
  //               let temp = Object.keys(key);
  //               // console.log('key -??? ?? >>> ', temp[index], index);
  //               // console.log('key -??? ?? >>> ', key['560_560' || 'full']?.url);
  //               res.push(key['560_560' || 'full']?.url + '');
  //             });
  //             // console.log('image -> > \n\n\n => ', res);
  //           } catch (err) {
  //             crashlytics().recordError(err);
  //           }
  //           // try {
  //           //   if (item?.images && Object.keys(item.images).length > 0) {
  //           //     Object.values(item.images).forEach((key, index) => {
  //           //       if (key && key['560_560'] && key['560_560'].url) {
  //           //         res.push(key['560_560'].url);
  //           //       }
  //           //     });
  //           //   }
  //           // } catch (err) {
  //           //   crashlytics().recordError(err);
  //           // }

  //           // Update component state with image URLs and other data
  //           // getStoreList(item?.store_id);
  //           // getOfferList(item?.store_id);
  //           // getReviewList(item?.store_id);
  //           // getGalleryList(item?.store_id);
  //           setImages(res);
  //           // setImageUrl(res.length > 0 ? res[0] : '');
  //           setImageUrl(item?.images?.['0']?.['560_560']?.url);

  //           setCatImageUrl(item?.images['0']?.['200_200']?.url);

  //           let is_store_save = await isStoreSaved(item?.store_id || item?.id_store);
  //           setFavorite(is_store_save);

  //           let is_store_review = await isStoreReviewSaved(item?.store_id || item?.id_store);
  //           ShowConsoleLogMessage(is_store_review + ' << isStoreReviewSaved');
  //           setReviewAdded(is_store_review);
  //         }
  //       }
  //     }

  //     // Clear the 'notification' key from AsyncStorage
  //     await AsyncStorage.setItem('notification', '');
  //   })();
  // }, [isFocused]);

  //   useEffect(() => {
  //     (async function () {
  //       let { item } = route.params;
  //       ShowConsoleLogMessage('Item: ' + JSON.stringify(item));

  //       if (item?.intentFromNotification) {
  //         console.log("data stttktkkt")
  //         await handleNotificationItem(item);
  //       } else {
  //         if (item?.store_id !== undefined && item?.store_id !== null) {
  //           console.log("data aaaaaaaaaa")

  //           await handleValidStoreId(item.store_id);
  //         } else if (item?.intentFromGeo) {
  //           console.log("data bbbbbbbbbb")

  //           await handleIntentFromGeo(item);
  //         } else {
  //           console.log("data ccccccccccc")

  //           setReceivedData(item);
  //           var res = [];

  //             try {
  //               console.log("data eeeeeeeeee")

  //               Object.values(item?.images).forEach((key, index) => {
  //                 let temp = Object.keys(key);
  //                 // console.log('key -??? ?? >>> ', temp[index], index);
  //                 // console.log('key -??? ?? >>> ', key['560_560' || 'full']?.url);
  //                 res.push(key['560_560' || 'full']?.url + '');
  //               });
  //               // console.log('image -> > \n\n\n => ', res);
  //             } catch (err) {
  //               console.log("wwwwwwwww")

  //               crashlytics().recordError(err);
  //             }
  //             // try {
  //             //   if (item?.images && Object.keys(item.images).length > 0) {
  //             //     Object.values(item.images).forEach((key, index) => {
  //             //       if (key && key['560_560'] && key['560_560'].url) {
  //             //         res.push(key['560_560'].url);
  //             //       }
  //             //     });
  //             //   }
  //             // } catch (err) {
  //             //   crashlytics().recordError(err);
  //             // }

  //             // getStoreList(item?.id_store);
  //             // getOfferList(item?.id_store);
  //             // getReviewList(item?.id_store);
  //             // getGalleryList(item?.id_store);
  //             setImages(res);
  //             // setImageUrl(res.length > 0 ? res[0] : '');
  //             setImageUrl(item?.images?.['0']?.['560_560']?.url);
  // // create meeting ok
  //             setCatImageUrl(item?.images['0']?.['200_200']?.url);
  //             console.log("data adkfdffmksdm")

  //           // Fetch additional data based on item
  //           await fetchDataBasedOnItem(item);

  //           // Clear the 'notification' key from AsyncStorage
  //           await AsyncStorage.setItem('notification', '');
  //         }
  //       }
  //     })();
  //   }, [isFocused]);

  useEffect(() => {
    (async function () {
      let {item} = route.params;
      ShowConsoleLogMessage('insdie -> ' + JSON.stringify(item));

      // ShowConsoleLogMessage(item);
      if (item?.intentFromNotification) {
        getStoreList(item?.store_id);
        getOfferList(item?.store_id);
        getReviewList(item?.store_id);
        getGalleryList(item?.store_id);
        let is_store_save = await isStoreSaved(
          item?.store_id || item?.id_store,
        );
        setFavorite(is_store_save);
        let is_store_review = await isStoreReviewSaved(
          item?.store_id || item?.id_store,
        );
        setReviewAdded(is_store_review);
      } else {
        if (item?.store_id != undefined || null) {
          getStoreList(item?.store_id);
          getOfferList(item?.store_id);
          getReviewList(item?.store_id);
          getGalleryList(item?.store_id);

          let is_store_save = await isStoreSaved(
            item?.store_id || item?.id_store,
          );
          setFavorite(is_store_save);
          let is_store_review = await isStoreReviewSaved(
            item?.store_id || item?.id_store,
          );
          setReviewAdded(is_store_review);
        } else {
          setReceivedData(item);
          ShowConsoleLogMessage(item);
          getOfferList(item?.id_store);
          getReviewList(item?.id_store);
          getGalleryList(item?.id_store);

          var res = [];

          try {
            Object.values(item?.images).forEach((key, index) => {
              res.push(key['560_560' || 'full']?.url + '');
            });
          } catch (err) {
            crashlytics().recordError(err);
          }
          setImages(res);

          setImageUrl(item?.images['0']['560_560']?.url);
          setImageUrl200(item?.images['0']['200_200']?.url);
          setCatImageUrl(item?.images['0']['200_200']?.url);

          let is_store_save = await isStoreSaved(
            item?.store_id || item?.id_store,
          );
          setFavorite(is_store_save);

          let is_store_review = await isStoreReviewSaved(
            item?.store_id || item?.id_store,
          );
          // ShowConsoleLogMessage(is_store_review + ' << isStoreReviewSaved');
          setReviewAdded(is_store_review);
        }
      }
      await AsyncStorage.setItem('notification', '');
    })();
  }, []);

  const handleNotificationItem = async item => {
    await getSearchOfferList(item.id_store);
    await getStoreList(item.id_store);
    await getOfferList(item.id_store);
    await getReviewList(item.id_store);
    await getGalleryList(item.id_store);
  };

  const handleValidStoreId = async storeId => {
    await getSearchOfferList(storeId);
    await getStoreList(storeId);
    await getOfferList(storeId);
    await getReviewList(storeId);
    await getGalleryList(storeId);
  };

  const handleIntentFromGeo = async item => {
    if (item?.store_id !== undefined && item?.store_id !== null) {
      await getSearchOfferList(item.store_id);
      await getStoreList(item.store_id);
      await getOfferList(item.store_id);
      await getReviewList(item.store_id);
      await getGalleryList(item.store_id);
    }
  };

  const fetchDataBasedOnItem = async item => {
    // Fetch data based on item, set states, and handle other logic
    // Example: setReceivedData, setImages, setImageUrl, setCatImageUrl, setFavorite, setReviewAdded, etc.
  };

  const getSearchOfferList = val => {
    console.warn('odfdddddddddd idsdar', val);
    setLoading(true);
    let body = {
      latitude: userLat + '',
      longitude: userLong + '',
      order_by: 'nearby',
      offer_ids: val,
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      limit: '30',
      page: '1',
      search: '',
      category_id: '',
      radius: '',
      date: moment().format('yyyy-MM-dd H:m:s'),
    };

    ShowConsoleLogMessage('Body', JSON.stringify(body));
    console.log('aaaaaaaa', body);
    ApiCall('post', body, API_END_POINTS.API_USER_GET_STORES, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // ShowConsoleLogMessage('response 0> ' + JSON.stringify(response?.data));

        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(JSON.stringify(response?.data));
          let result = Object.values(response?.data?.result);
          setReceivedData(result[0]);
          setImageUrl(result[0]?.images?.['0']?.['560_560']?.url);
          setImageUrl200(result[0]?.images?.['0']?.['200_200']?.url);

          var res = [];

          try {
            Object.values(result[0]?.images).forEach((key, index) => {
              res.push(key['560_560' || 'full']?.url + '');
            });
          } catch (err) {
            crashlytics().recordError(err);
          }

          setImages(res);

          setCatImageUrl(result[0]?.images['0']['560_560']?.url);
        } else {
        }
      })
      .catch(err => {
        crashlytics().recordError(err);

        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getStoreByIdTelePhone = val => {
    let body = {
      limit: '1',
      store_id: val,
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_USER_GET_STORES, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          ShowConsoleLogMessage('bodyResponse -> ' + JSON.stringify(response));
          let result = Object.values(response.data?.result);
          setTelephone(result[0]?.telephone);
          // ShowConsoleLogMessage(result[0]?.telephone + ' => telephone ');
        } else {
        }
      })
      .catch(err => {})
      .finally(() => {});
  };
  // 1. Define a function outside the component:
  const onViewableItemsChanged = info => {
    // console.log('onViewableItemsChanged => ', info?.viewableItems[0]?.index);
    setActiveIndex(info?.viewableItems[0]?.index + 1);
  };

  const [activeIndex, setActiveIndex] = useState(0);

  // const [galleryActiveIndex, setGalleryActiveIndex] = useState(0);

  useEffect(() => {
    // console.log('use effect active index -> ', activeIndex);
  }, [activeIndex]);

  // 2. create a reference to the function (above)
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  const [images, setImages] = useState([]);
  const bigPhotoRef = useRef();
  const bigGalleryPhotoRef = useRef();

  const [showImageModal, setShowImageModal] = useState(false);
  const [showGalleryImageModal, setShowGalleryImageModal] = useState(false);

  const closeImageModal = () => {
    setShowImageModal(!showImageModal);
    if (showImageModal) {
      setActiveIndex(0);
    }
  };
  const closeGalleryImageModal = () => {
    console.log('i am claled ');
    setShowGalleryImageModal(!showGalleryImageModal);
  };

  const renderBigPhotoItems = ({item, index}) => {
    if (galleryItemClick) {
      ShowConsoleLogMessage('\n\n\n\n\n\n\n\n');
      ShowConsoleLogMessage('renderBigPhotoItems =>' + JSON.stringify(item));
      ShowConsoleLogMessage('\n\n\n\n\n\n\n\n');

      let imageUrl = item?.['560_560']?.url;
      return (
        // <View
        //   key={imageUrl}
        //   activeOpacity={1.0}
        //   onPress={() => {}}
        //   style={{
        //     height: 300,
        //     width: Dimensions.get('window').width,
        //     alignItems: 'center',
        //   }}>
        //   <Image
        //     style={{
        //       height: 300,
        //       width: Dimensions.get('window').width,
        //       resizeMode: 'stretch',
        //     }}
        //     source={{uri: imageUrl}}
        //     PlaceholderContent={
        //       <ActivityIndicator color={COLORS.white} size="large" />
        //     }
        //   />
        // </View>
        <Image
          style={{
            // height: 300,
            height: '100%',
            width: Dimensions.get('window').width,
          }}
          resizeMode={'contain'}
          source={{uri: imageUrl}}
          PlaceholderContent={
            <ActivityIndicator color={COLORS.white} size="large" />
          }
        />
      );
    } else {
      return (
        // <View
        //   activeOpacity={1.0}
        //   key={item}
        //   style={{
        //     height: 300,
        //     width: Dimensions.get('window').width,
        //     alignItems: 'center',
        //   }}>
        //   <Image
        //     style={{
        //       height: 300,
        //       width: Dimensions.get('window').width,
        //       resizeMode: 'stretch',
        //     }}
        //     source={{uri: item}}
        //     PlaceholderContent={
        //       <ActivityIndicator color={COLORS.white} size="large" />
        //     }
        //   />
        // </View>
        <Image
          style={{
            // height: 300,
            height: '100%',
            width: Dimensions.get('window').width,
          }}
          resizeMode={'contain'}
          source={{uri: item}}
          PlaceholderContent={
            <ActivityIndicator color={COLORS.white} size="large" />
          }
        />
      );
    }
  };

  const renderBigGalleryPhotoItems = ({item, index}) => {
    let imageUrl = item['560_560']?.url;
    return (
      // <View
      //   key={index}
      //   activeOpacity={1.0}
      //   onPress={() => { }}
      //   style={{
      //     height: 700,
      //     width: Dimensions.get('window').width,
      //     alignItems: 'center',

      //   }}>
      <Image
        style={{
          height: '95%',
          width: Dimensions.get('window').width,
          // resizeMode: 'cover' ,
        }}
        resizeMode={'contain'}
        source={{uri: imageUrl}}
        PlaceholderContent={
          <ActivityIndicator color={COLORS.white} size="large" />
        }
      />
    );
  };

  const renderImageModal = () => {
    return (
      <Modal
        visible={showImageModal}
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        onRequestClose={() => closeImageModal()}
        style={{flexGrow: 1}}>
        <View
          style={{
            backgroundColor: COLORS.black,
            flexGrow: 1,
            // justifyContent: 'flex-end',
          }}>
          <View
            style={[
              {
                height: SIZES.height,
                backgroundColor: COLORS.black,
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  closeImageModal();
                }}
                activeOpacity={0.8}
                style={{
                  marginHorizontal: 20,
                }}>
                <AntDesign
                  name="close"
                  size={25}
                  color={COLORS.white}
                  onPress={() => {
                    closeImageModal();
                  }}
                  style={{
                    marginTop: 60,
                    //   opacity: 0.0,
                  }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.white,
                  textAlign: 'center',
                  marginTop: 60,
                  fontFamily: 'Montserrat-Medium',
                }}>
                {images.length > 1 ? `${activeIndex}/${images.length}` : ''}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.white,
                  textAlign: 'center',
                  marginTop: 60,
                  fontFamily: 'Montserrat-Medium',
                  marginHorizontal: 20,
                }}
              />
            </View>
            <View
              style={{
                marginBottom: 'auto',
                flex: 1,
                marginTop: 'auto',
              }}>
              <FlatList
                data={images}
                ref={bigPhotoRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                initialScrollIndex={activeIndex}
                viewabilityConfigCallbackPairs={
                  viewabilityConfigCallbackPairs.current
                }
                onScrollToIndexFailed={info => {
                  const wait = new Promise(resolve => setTimeout(resolve, 500));
                  wait.then(() => {
                    bigPhotoRef.current?.scrollToIndex({
                      index: info.index,
                      animated: true,
                    });
                  });
                }}
                renderItem={renderBigPhotoItems}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderGalleryImageModal = () => {
    return (
      <Modal
        visible={showGalleryImageModal}
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        onRequestClose={() => closeGalleryImageModal()}
        style={{flex: 1}}>
        <View
          style={{
            backgroundColor: COLORS.black,
            flexGrow: 1,

            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={[
              {
                // height: SIZES.height,
                // backgroundColor: COLORS.black,
              },
            ]}>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.white,
                textAlign: 'center',
                marginTop: 30,
                fontFamily: 'Montserrat-Medium',
              }}
            />
            <View
              style={{
                marginBottom: 'auto',
                marginTop: 'auto',
              }}>
              <FlatList
                data={galleryListData}
                ref={bigGalleryPhotoRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                // initialScrollIndex={galleryActiveIndex}
                onScrollToIndexFailed={info => {
                  const wait = new Promise(resolve => setTimeout(resolve, 500));
                  wait.then(() => {
                    bigGalleryPhotoRef.current?.scrollToIndex({
                      index: info.index,
                      animated: true,
                    });
                  });
                }}
                renderItem={renderBigGalleryPhotoItems}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              closeGalleryImageModal();
            }}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              position: 'absolute',
              top: 40,
              left: 25,
              //backgroundColor:'yellow'
            }}>
            <AntDesign
              name="close"
              size={30}
              color={COLORS.white}
              style={
                {
                  // marginHorizontal: 20,
                  // paddingTop: 60,
                  //opacity: 0.0,
                }
              }
              onPress={() => {
                closeGalleryImageModal();
              }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const handleZoomIn = () => {
    // Increase latitudeDelta and longitudeDelta to zoom in
    // You can adjust the values as needed to control the zoom level
    const zoomInFactor = 0.02;
    const newLatitudeDelta = receivedData?.latitudeDelta - zoomInFactor;
    const newLongitudeDelta = receivedData?.longitudeDelta - zoomInFactor;

    // Update the region with new latitudeDelta and longitudeDelta
    setReceivedData(prevData => ({
      ...prevData,
      latitudeDelta: newLatitudeDelta,
      longitudeDelta: newLongitudeDelta,
    }));
  };

  const handleZoomOut = () => {
    // Decrease latitudeDelta and longitudeDelta to zoom out
    // You can adjust the values as needed to control the zoom level
    const zoomOutFactor = 0.02;
    const newLatitudeDelta = receivedData?.latitudeDelta + zoomOutFactor;
    const newLongitudeDelta = receivedData?.longitudeDelta + zoomOutFactor;

    // Update the region with new latitudeDelta and longitudeDelta
    setReceivedData(prevData => ({
      ...prevData,
      latitudeDelta: newLatitudeDelta,
      longitudeDelta: newLongitudeDelta,
    }));
  };

  // const openMap = () => {  // 19 sep 3:2 pm
  //   if (receivedData?.longitude && receivedData?.latitude) {
  //     const scheme = Platform.select({
  //       ios: 'maps:0,0?q=',
  //       android: 'geo:0,0?q=',
  //     });
  //     const latLng = `${receivedData?.latitude},${receivedData?.longitude}`;
  //     const label = receivedData?.name;
  //     // const label = 'Open Google Map';
  //     const url = Platform.select({
  //       ios: `${scheme}${label}@${latLng}`,
  //       android: `${scheme}${latLng}(${label})`,
  //     });
  //     Linking.openURL(url);
  //   } else {
  //     ShowToastMessage('Something went wrong.');
  //   }
  // };

  const openMap = () => {
    if (receivedData?.longitude && receivedData?.latitude) {
      if (Platform.OS == 'android') {
        const scheme = Platform.select({
          ios: 'maps:0,0?q=',
          android: 'geo:0,0?q=',
        });
        const latLng = `${receivedData?.latitude},${receivedData?.longitude}`;
        const label = receivedData?.name;
        // const label = 'Open Google Map';
        const url = Platform.select({
          ios: `${scheme}${label}@${latLng}`,
          android: `${scheme}${latLng}(${label})`,
        });
        Linking.openURL(url);
      } else {
        // var scheme =
        //   Platform.OS === 'ios' ? 'http://maps.apple.com/?ll=' : 'geo:';
        var scheme = Platform.OS === 'ios' ? 'maps:0,0?q=' : 'geo:';
        var url =
          scheme + `${receivedData?.latitude},${receivedData?.longitude}`;
        ShowConsoleLogMessage(url);
        Linking.openURL(url);
      }
    } else {
      ShowToastMessage('Something went wrong.');
    }
  };

  // const openMap = () => {
  //   const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  //   const label = receivedData?.name || 'Destination'; // Use a default label if the receivedData name is not available

  //   if (Platform.OS === 'android') {
  //     // Request location permission for Android
  //     PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //     ).then((granted) => {
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         // Permission granted, get user's current location
  //         Geolocation.getCurrentPosition(
  //           (position) => {
  //             const { latitude, longitude } = position.coords;
  //             const url = `${scheme}${latitude},${longitude}(${label})`;
  //             Linking.openURL(url).catch((error) =>
  //               console.error('Error opening map:', error)
  //             );
  //           },
  //           (error) => console.log('Error getting current location:', error),

  //         );
  //       } else {
  //         console.log('Location permission denied');
  //       }
  //     });
  //   } else {
  //     // For iOS, no need to request permission, directly get the location
  //     Geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         const url = `${scheme}${label}@${latitude},${longitude}`;
  //         Linking.openURL(url).catch((error) =>
  //           console.error('Error opening map:', error)
  //         );
  //       },
  //       (error) => console.log('Error getting current location:', error),
  //       // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //     );
  //   }
  // };

  const [scrollHeight, setScrollHeight] = useState(0);
  const windowHeight = Dimensions.get('window').height;

  const handleScrollLayout = event => {
    const {height} = event.nativeEvent.layout;
    setScrollHeight(height);
  };

  /**offer page code start */
  const [offerListData, setOfferListData] = useState([]);
  const [offerListLoading, setOfferListLoading] = useState(false);

  const getOfferList = val => {
    setOfferListLoading(true);
    let body = {
      store_id: val,
      page: '1',
      limit: '7',
      latitude: userLat,
      longitude: userLong,
      date: moment().format('yyyy-MM-dd H:m:s'),
      // timezone: '',
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_GET_OFFERS, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
          let result = Object.values(response.data?.result);
          // ShowConsoleLogMessage(JSON.stringify(result.length));
          setOfferListData(result);
        } else {
          setOfferListData([]);
        }
      })
      .catch(err => {
        crashlytics().recordError(err);

        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {
        setOfferListLoading(false);
      });
  };

  const renderOfferItem = ({item}) => {
    ShowConsoleLogMessage(item);
    let imageUrl = item?.images?.['0']?.['560_560']?.url;
    return (
      <TouchableOpacity
        key={imageUrl}
        activeOpacity={0.8}
        style={[GlobalStyle1.StoreBOX]}
        onPress={() => {
          navigation.navigate('OfferDetails', {item: item});
        }}>
        <BunchDealImageLoader
          defaultImg={images.def_logo}
          source={imageUrl}
          styles={GlobalStyle1.Storeimages}
        />
        <View
          style={{
            marginTop: 5,
            marginStart: 10,
          }}>
          <Text
            style={[
              {
                color: COLORS.black,
                fontSize: 14,
                fontFamily: 'Montserrat-Regular',
              },
            ]}>
            {item?.name}
          </Text>
          <Text
            style={[
              {
                color: 'grey',
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
              },
            ]}
            numberOfLines={1}>
            {item?.description?.replace(/<\/?[^>]+(>|$)/g, '\n')}
          </Text>
        </View>
        <View
          style={[
            GlobalStyle1.price_BOX,
            {
              paddingHorizontal: 10,
              paddingVertical: 2,
              marginEnd: 10,
            },
          ]}>
          <Text
            style={[
              {
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 11,
                textAlignVertical: 'center',
                textAlign: 'center',
                color: COLORS.white,
              },
            ]}>
            {item?.currency?.symbol + '' + item?.offer_value}
            .0
          </Text>
        </View>
      </TouchableOpacity>
      // <Text>hi</Text>
    );
  };

  /**offer page code end */

  /** review start */
  const [reviewListData, setReviewListData] = useState([]);

  const getReviewList = val => {
    let body = {
      store_id: val,
      offset: '',
      limit: '',
      page: '',
      mac_adr: '',
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_USER_GET_REVIEWS, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          let result = Object.values(response.data?.result);

          setReviewListData(result);
        } else {
          setReviewListData([]);
        }
      })
      .catch(err => {
        crashlytics().recordError(err);

        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  const closeAddReviewModal = () => {
    setShowAddReviewModal(!showAddReviewModal);
  };

  const addReview = async () => {
    if (parseInt(rate) > 0 && password != '') {
      let body = {
        store_id: receivedData?.id_store + '',
        rate: rate.toString() + '',
        review: password + '',
        guest_id: userData?.id_user + '',
        user_id: userData?.id_user + '',
        pseudo: userData?.username + '',
        token: 'token',
        mac_adr: '02:00:00:00:00:00',
      };

      // ShowConsoleLogMessage('\n\n\n\n\n\\n\n\n\n');
      // ShowConsoleLogMessage(JSON.stringify(body));
      // ShowConsoleLogMessage('\n\n\n\n\n\\n\n\n\n');

      // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
      ApiCall('post', body, API_END_POINTS.API_RATING_STORE, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      })
        .then(async response => {
          ShowConsoleLogMessage(JSON.stringify(response));
          if (response?.data?.success == 1) {
            closeAddReviewModal();
            ShowToastMessage(STRING.thank_you);
            getReviewList(receivedData?.id_store);
            doSaveStoreReview(receivedData?.id_store);
            setPassword('');
            setRate(0);
          } else {
            closeAddReviewModal();
            doSaveStoreReview(receivedData?.id_store);
            let is_store_review = await isStoreReviewSaved(
              receivedData?.id_store,
            );
            // ShowConsoleLogMessage(is_store_review + ' <<< isStoreReviewSaved');
            setReviewAdded(is_store_review);
            ShowConsoleLogMessage('Unable to add review');
          }
        })
        .catch(err => {
          crashlytics().recordError(err);

          ShowConsoleLogMessage(
            'Error in get offer recent api call: ' + err.message,
          );
        })
        .finally(() => {});
    } else if (password == '') {
      ShowToastMessage('Please write your review');
    } else {
      ShowToastMessage('Please select from 1 star to 5 star');
    }
    let is_store_review = await isStoreReviewSaved(receivedData?.id_store);
    ShowConsoleLogMessage(is_store_review + ' <<< isStoreReviewSaved');
    setReviewAdded(is_store_review);
  };

  function ratingCompleted(rating) {
    // console.log('Rating is: ' + rating);
    setRate(rating);
  }

  const [password, setPassword] = useState('');

  const [rate, setRate] = useState(0);

  const generateLink = async (StoreId, imageUrl) => {
    console.log(StoreId);

    try {
      // const longDynamicLink = `https://bunchofdeals123.page.link/qbvQ?offerDetails%2F${StoreId}`;
      const longDynamicLink = `https://bunchofdeals123.page.link/?link=https%3A%2F%2Fyour-actual-link-here.com%2FStoreDetails%2F${StoreId}`;

      const link = await dynamicLinks().buildShortLink(
        {
          link: longDynamicLink,
          domainUriPrefix: 'https://bunchofdeals123.page.link',
          ios: {
            appStoreId: '1572404530',
            bundleId: 'com.bunchodDeals',
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT,
      );

      console.log('link:', link);
      return link;
    } catch (error) {
      console.log('Generating Link Error:', error);
    }
  };

  // const newShareOption = async (imageUrl,StoreId,short_description,name) => {
  //   setLoading(true);

  //   const link = await generateLink(StoreId,imageUrl)

  //   if (imageUrl != null && imageUrl != '') {
  //     const fs = RNFetchBlob.fs;
  //     let imagePath =imageUrl;
  //     RNFetchBlob.config({
  //       fileCache: true,
  //     })
  //       .fetch('GET', imagePath)
  //       .then((response) => {
  //         imagePath = response.path();
  //         return response.readFile('base64');
  //       })
  //       .then(async (base64) => {
  //         // console.log('BASE64 IMAG -> ', 'data:image/jpeg;base64,' + base64);
  //         var base64Data = `data:image/png;base64,` + base64;
  //         if (Platform.OS == 'android') {
  //           setLoading(false);

  //           const shareOptions = {
  //             // title: item?.title ? item?.title : item?.date_added,
  //             message: `Bunch of Deal - Check this offer:\n${name ? `${short_description}\n` : ''}${link}`,
  //             url: `data:image/jpeg;base64,${base64Data}`,
  //             // url: imagePath,
  //           };
  //           try {
  //             await Share.open(shareOptions);
  //           } catch (error) {
  //             console.log(error);
  //           }
  //         } else {
  //           setLoading(false);

  //           const shareOptions = {
  //             // title: item?.title ? item?.title : item?.date_added,

  //             message: `dsanjfnjdnj`,
  //           };
  //           try {
  //             await Share.open(shareOptions);
  //           } catch (error) {
  //             console.log(error);
  //           }
  //         }
  //         setLoading(false);

  //         return fs.unlink(imagePath);
  //       });
  //   } else {
  //     if (Platform.OS == 'android') {
  //       setLoading(false);

  //       const shareOptions = {
  //         // title: item?.title ? item?.title : item?.date_added,
  //         message: `
  //        \nVideo:`,
  //       };
  //       try {
  //         await Share.open(shareOptions);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       setLoading(false);

  //       const shareOptions = {
  //       //   title: item?.title ? item?.title : item?.date_added,

  //       //   message: `${item?.title ? item?.title : item?.date_added}
  //       //  \nVideo: ${item?.replay_url}`,
  //       };
  //       try {
  //         await Share.open(shareOptions);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  // };
  // const newShareOption = async (imageUrl, StoreId, short_description, name) => {
  //   setLoading(true); // Set loading state to true when starting the operation

  //   try {
  //     // setLoading(true); // Set loading state to true when starting the operation

  //     const link = await generateLink(StoreId);
  //     console.log(link);

  //     if (imageUrl != null && imageUrl !== '') {
  //       const fs = RNFetchBlob.fs;
  //       let imagePath = imageUrl;
  //       RNFetchBlob.config({
  //         fileCache: true,
  //       })
  //         .fetch('GET', imagePath)
  //         .then((response) => {
  //           imagePath = response.path();
  //           return response.readFile('base64');
  //         })
  //         .then(async (base64) => {
  //           var base64Data = `data:image/png;base64,` + base64;

  //           // Delay to give time for data processing and avoid flickering
  //           await new Promise((resolve) => setTimeout(resolve, 500));

  //           if (Platform.OS == 'android') {
  //             const shareOptions = {
  //               message: `Bunch of Deal - Check this offer:\n${name ? `${short_description}` : ''}\n${link}`,
  //               url: `data:image/jpeg;base64,${base64}`,
  //             };
  //             await Share.open(shareOptions);
  //           } else {
  //             const shareOptions = {
  //               message: `Bunch of Deal - Check this offer:\n${name ? `${short_description}` : ''}\n${link}`,
  //               url: `data:image/jpeg;base64,${base64}`,
  //             };
  //             await Share.open(shareOptions);
  //           }

  //           setLoading(false); // Set loading state to false when the operation is complete
  //           return fs.unlink(imagePath);
  //         });
  //     } else {
  //       if (Platform.OS == 'android') {
  //         const shareOptions = {
  //           message: `Bunch of Deal - Check this offer:\n${name ? `${short_description}` : ''}\n${link}`,
  //           url: `data:image/jpeg;base64,${base64}`,
  //         };
  //         await Share.open(shareOptions);
  //       } else {
  //         const shareOptions = {
  //           message: `Bunch of Deal - Check this offer:\n${name ? `${short_description}` : ''}\n${link}`,
  //           url: `data:image/jpeg;base64,${base64}`,
  //         };
  //         await Share.open(shareOptions);
  //       }

  //       setLoading(false); // Set loading state to false when the operation is complete
  //     }
  //   } catch (error) {
  //     console.log('Error:', error);
  //     setLoading(false); // Set loading state to false in case of an error
  //   }
  // };
  const newShareOption = async (
    imageUrl,
    StoreId,
    short_description,
    name,
    category_name,
  ) => {
    try {
      const link = await generateLink(StoreId);
      console.log(link);

      if (imageUrl != null && imageUrl !== '') {
        if (Platform.OS === 'android') {
          const shareOptions = {
            message: `Bunch of Deals - checkout this store...\n\n${receivedData?.name}\n\n${receivedData?.address}\n\n${link}`,
            url: base64Data,
          };

          await Share.open(shareOptions);
        } else {
          const shareOptions = {
            message: `Bunch of Deals - checkout this store...\n\n${receivedData?.name}\n\n${receivedData?.address}\n\n${link}`,
            url: base64Data,
            urls: [base64Data],
          };

          await Share.open(shareOptions);
        }
      } else {
        if (Platform.OS == 'android') {
          const shareOptions = {
            message: `Bunch of Deals - checkout this store...\n\n${receivedData?.name}\n\n${receivedData?.address}\n\n${link}`,
          };
          await Share.open(shareOptions);
        } else {
          const shareOptions = {
            message: `Bunch of Deals - checkout this store...\n\n${receivedData?.name}\n\n${receivedData?.address}\n\n${link}`,
          };
          await Share.open(shareOptions);
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const generateOfferLink = async (StoreId, short_description, imageUrl) => {
    try {
      const link = await dynamicLinks().buildLink({
        link: `https://bunchofdealscom13.page.link/u9DC/OfferDetails?StoreId=${StoreId}`,
        domainUriPrefix: 'https://bunchofdealscom13.page.link/u9DC',
        analytics: {
          campaign: 'offer_share',
        },
        social: {
          link: `https://bunchofdealscom13.page.link/u9DC/OfferDetails?StoreId=${StoreId}`,
          description: short_description, // Offer description
          imageUrl: imageUrl, // Offer image URL
        },
      });
      return link;
    } catch (error) {
      console.error('Error building dynamic link:', error);
      return null;
    }
  };

  const renderAddReviewModal = () => {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={showAddReviewModal}
        onRequestClose={() => {
          closeAddReviewModal();
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <View style={{}}>
              <AirbnbRating
                size={30}
                showRating={false}
                onFinishRating={ratingCompleted}
                starContainerStyle={{
                  marginTop: 20,
                }}
                defaultRating={rate}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                marginTop: 10,
              }}>
              <BunchDealEditText
                borderBottomWidth={1}
                placeholder={'Pseudo'}
                style={FONTS.body3}
                value={userData?.username}
                onChangeText={val => {}}
                editable={false}
              />
              <BunchDealEditText
                borderBottomWidth={1}
                placeholder={'Write review...'}
                style={FONTS.body3}
                value={password}
                onChangeText={val => {
                  setPassword(val);
                }}
                multiLine={true}
              />
            </View>
            <BunchDealCommonBtn
              height={40}
              width={'97%'}
              backgroundColor={COLORS.colorPrimary}
              marginHorizontal={5}
              text={STRING.add_review}
              textStyle={FONTS.body3}
              textColor={COLORS.white}
              onPress={async () => {
                let is_store_review = await isStoreReviewSaved(
                  receivedData?.store_id || receivedData?.id_store,
                );
                setReviewAdded(is_store_review);

                if (is_store_review) {
                  ShowToastMessage(STRING.you_ve_already_reviewd);
                } else {
                  addReview();
                  // closeAddReviewModal();
                  let is_store_review = await isStoreReviewSaved(
                    receivedData?.store_id || receivedData?.id_store,
                  );
                  setReviewAdded(is_store_review);
                }
              }}
              marginTop={25}
              borderRadius={1}
              textSize={14}
            />
          </View>
        </View>
      </Modal>
    );
  };

  /** review end */

  /** gallery start */
  const [galleryListData, setGalleryListData] = useState([]);

  const getGalleryList = val => {
    let body = {
      module_id: val,
      module: 'store',
      limit: '20',
      page: '1',
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_GET_GALLERY, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          let result = Object.values(response.data?.result);
          setGalleryListData(result);
        } else {
          setGalleryListData([]);
        }
      })
      .catch(err => {
        crashlytics().recordError(err);

        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  const [galleryItemClick, setGalleryItemClick] = useState(false);

  /** gallery end */

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <BunchDealProgressBar loading={loading} />

      <ScrollView
        nestedScrollEnabled={true}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            setShowDown(true);
          } else {
            setShowDown(false);
          }
        }}
        scrollEventThrottle={100}>
        <SafeAreaView style={GlobalStyle1.mainContainerwhiteColor}>
          <View style={{}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (galleryItemClick) {
                  setGalleryItemClick(!galleryItemClick);
                }
                closeImageModal();
              }}>
              <BunchDealImageLoader
                defaultImg={images.def_logo}
                source={imageUrl + ''}
                styles={GlobalStyle1.store_image}
              />
              {/*<LinearGradient
      colors={[ "#00000090","#00000090",COLORS.transparent]}
      style={[{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
       backgroundColor: COLORS.transparent,
        padding: 10,
      position:'absolute'

      }]}>
      <BunchDealVectorIcon
        title={Ionicons}
        name={'arrow-back'}
        color={COLORS.colorAccent}
        size={25}
        style={{}}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={{
          flexGrow: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',

        }}>
        <Entypofrom
          name="share"
          size={22}
          color={COLORS.colorAccent}
          style={{
            marginHorizontal: 5,

          }}
          onPress={() => {
            onShare();
          }}
        />

      </View>

    </LinearGradient>
        */}

              {/* <View
            style={[
              GlobalStyle1.price,
              {
                alignSelf: 'flex-end',
                // backgroundColor: 'red',
                // flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 0,
              },
            ]}>
            <Text
              style={[
                FONTS.body5,
                GlobalStyle1.Pricetext,
                {
                  fontFamily: 'MontSerrat-SemiBold',
                },
              ]}>
              +100 km
            </Text>
          </View> */}

              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  flexDirection: 'row',
                  height: 35,
                  alignItems: 'center',
                  backgroundColor: COLORS.colorAccent,
                }}>
                <View
                  style={{
                    alignSelf: 'flex-start',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                />
                {images.length > 1 ? (
                  <Text
                    style={{
                      backgroundColor: COLORS.colorAccent,
                      paddingHorizontal: 15,
                      fontFamily: 'Montserrat-Bold',
                      paddingVertical: 6,
                      color: COLORS.white,
                      fontSize: 13,
                    }}>
                    <FontAwesome name="camera" color={COLORS.white} />
                    {images.length > 1 ? `  ${images.length}` : ''}
                  </Text>
                ) : null}
                {/*<Text*/}
                {/*  style={{*/}
                {/*    paddingHorizontal: 15,*/}
                {/*    fontFamily: 'Montserrat-Medium',*/}
                {/*    paddingVertical: 6,*/}
                {/*    color: COLORS.white,*/}
                {/*    fontSize: 11,*/}
                {/*    backgroundColor: COLORS.colorAccent,*/}
                {/*  }}>*/}
                {/*  +100km*/}
                {/*</Text>*/}
                {/* {receivedData?.distance != null ? (
              receivedData?.distance >= 100 ? (
                <Text
                  style={{
                    paddingHorizontal: 15,
                    fontFamily: 'Montserrat-Medium',
                    paddingVertical: 6,
                    color: COLORS.white,
                    fontSize: 11,
                    backgroundColor: COLORS.colorAccent,
                  }}>
                  +100km
                </Text>
              ) : receivedData?.distance < 100 ? (
                <Text
                  style={{
                    paddingHorizontal: 15,
                    fontFamily: 'Montserrat-Medium',
                    paddingVertical: 6,
                    color: COLORS.white,
                    fontSize: 11,
                    backgroundColor: COLORS.colorAccent,
                  }}>
                  {receivedData?.distance}km
                </Text>
              ) : null
            ) : null} */}
              </View>
            </TouchableOpacity>
            <View style={{}}>
              <BunchDealImageLoader
                defaultImg={images.def_logo}
                source={catImageUrl}
                styles={[
                  GlobalStyle1.storeimage,
                  {
                    opacity: 1,
                  },
                ]}
                viewStyle={{
                  opacity: 0.2,
                }}
              />
              <Text
                style={[
                  {
                    textAlign: 'center',
                    color: COLORS.black,
                    position: 'absolute',
                    // bottom: 0,
                    top: 25,
                    right: 0,
                    left: 0,
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 20,
                  },
                ]}>
                {receivedData?.category_name}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 8,
              backgroundColor: COLORS.white,
              paddingVertical: 5,
              marginTop: 12,
              maxHeight: 350,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                key={'Offers'}
                accessibilityRole="button"
                onPress={onPress => {
                  setChangeOne(true);
                  setChangeThree(false);
                  setChangeTwo(false);
                }}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 45,
                  backgroundColor: changeOne
                    ? COLORS.white
                    : COLORS.colorAccent,
                  paddingHorizontal: 10,
                  borderColor: COLORS.white,
                  borderWidth: 0.5,
                  flexDirection: 'row',
                }}>
                <MaterialIcons
                  name="local-offer"
                  color={changeOne ? COLORS.colorPrimary : COLORS.white}
                  size={18}
                  style={{
                    marginEnd: 10,
                  }}
                />
                <Animated.Text
                  style={{
                    color: changeOne ? COLORS.colorPrimary : COLORS.white,
                    fontFamily: 'Montserrat-Medium',
                    textTransform: 'uppercase',
                    fontSize: 12,
                  }}>
                  Offers
                </Animated.Text>
              </TouchableOpacity>
              <TouchableOpacity
                key={'Reviews'}
                onPress={onPress => {
                  // if (userData?.id_user == null) {
                  //   navigation.navigate('Auth', {
                  //     screen: 'Login',
                  //     params: {
                  //       screen: 'Login',
                  //     },
                  //   });
                  // } else {
                  setChangeTwo(true);
                  setChangeThree(false);
                  setChangeOne(false);
                  // }
                }}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 45,
                  backgroundColor: changeTwo
                    ? COLORS.white
                    : COLORS.colorAccent,
                  paddingHorizontal: 10,
                  borderColor: COLORS.white,
                  borderWidth: 0.5,
                  flexDirection: 'row',
                }}>
                <Ionicons
                  name="chatbox-sharp"
                  color={changeTwo ? COLORS.colorAccent : COLORS.white}
                  size={18}
                  style={{
                    marginEnd: 10,
                  }}
                />
                <Animated.Text
                  style={{
                    color: changeTwo ? COLORS.colorPrimary : COLORS.white,
                    fontFamily: 'Montserrat-Medium',
                    textTransform: 'uppercase',
                    fontSize: 12,
                  }}>
                  Reviews
                </Animated.Text>
              </TouchableOpacity>

              {galleryListData?.length > 0 ? (
                <TouchableOpacity
                  key={'Gallery'}
                  accessibilityRole="button"
                  onPress={onPress => {
                    setChangeThree(true);
                    setChangeOne(false);
                    setChangeTwo(false);
                  }}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 45,
                    backgroundColor: changeThree
                      ? COLORS.white
                      : COLORS.colorAccent,
                    paddingHorizontal: 10,
                    borderColor: COLORS.white,
                    borderWidth: 0.5,
                    flexDirection: 'row',
                  }}>
                  <MaterialCommunityIcons
                    name="view-gallery"
                    color={changeThree ? COLORS.colorPrimary : COLORS.white}
                    size={18}
                    style={{
                      marginEnd: 10,
                    }}
                  />
                  <Animated.Text
                    style={{
                      color: changeThree ? COLORS.colorPrimary : COLORS.white,
                      fontFamily: 'Montserrat-Medium',
                      textTransform: 'uppercase',
                      fontSize: 12,
                    }}>
                    Gallery
                  </Animated.Text>
                </TouchableOpacity>
              ) : null}
            </View>
            {changeOne ? (
              <ScrollView
                nestedScrollEnabled={true}
                style={{
                  backgroundColor: COLORS.white,
                }}>
                <FlatList
                  data={offerListData}
                  keyExtractor={item => item?.id_store}
                  // renderItem={renderOfferItem}
                  renderItem={({item}) => {
                    return (
                      <RenderOfferItem item={item} navigation={navigation} />
                    );
                  }}
                  ListEmptyComponent={() => {
                    return offerListLoading ? null : (
                      <Text
                        style={{
                          color: COLORS.editTextBorder,
                          fontSize: 16,
                          fontFamily: 'Montserrat-Regular',
                          textAlign: 'center',
                          paddingVertical: 10,
                        }}>
                        No data found
                      </Text>
                    );
                  }}
                />
              </ScrollView>
            ) : null}
            {changeTwo ? (
              <View>
                <ScrollView
                  nestedScrollEnabled={true}
                  style={{
                    backgroundColor: COLORS.white,
                  }}>
                  {/* {reviewListData?.map(item => {
              return renderReviewItem(item);
            })} */}
                  <FlatList
                    data={reviewListData}
                    keyExtractor={item => item?.id_store}
                    // renderItem={renderReviewItem}
                    renderItem={({item}) => {
                      return <RenderReviewItem item={item} />;
                    }}
                    ListEmptyComponent={() => {
                      return (
                        <Text
                          style={{
                            color: COLORS.editTextBorder,
                            fontSize: 16,
                            fontFamily: 'Montserrat-Regular',
                            textAlign: 'center',
                            paddingVertical: 10,
                          }}>
                          No data found
                        </Text>
                      );
                    }}
                  />
                </ScrollView>
                <BunchDealCommonBtn
                  height={40}
                  backgroundColor={COLORS.colorPrimary}
                  marginHorizontal={5}
                  text={STRING.add_review}
                  textStyle={FONTS.body3}
                  textColor={COLORS.white}
                  onPress={async () => {
                    if (userData?.id_user == null) {
                      navigation.navigate('Auth', {
                        screen: 'Login',
                        params: {
                          screen: 'Login',
                        },
                      });
                    } else {
                      let is_store_review = await isStoreReviewSaved(
                        receivedData?.store_id || receivedData?.id_store,
                      );
                      setReviewAdded(is_store_review);
                      if (is_store_review) {
                        ShowToastMessage(STRING.you_ve_already_reviewd);
                      } else {
                        closeAddReviewModal();
                      }
                    }
                  }}
                  marginTop={25}
                  borderRadius={1}
                  textSize={16}
                />
              </View>
            ) : null}
            {galleryListData?.length > 0 ? (
              changeThree ? (
                <View
                  style={{
                    justifyContent: 'center',
                  }}>
                  <FlatList
                    data={galleryListData}
                    style={{
                      marginTop: 5,
                      // padding:30
                    }}
                    keyExtractor={item => item?.id_store}
                    // renderItem={renderGalleryItem}
                    renderItem={({item, index}) => {
                      return (
                        <RenderGalleryItem
                          bigGalleryPhotoRef={bigGalleryPhotoRef}
                          closeGalleryImageModal={() => {
                            closeGalleryImageModal();
                          }}
                          bigGallery={() => {
                            // ShowConsoleLogMessage('big gallery called 1');
                            bigGalleryPhotoRef.current?.scrollToIndex({
                              animated: true,
                              index: index,
                            });
                            // ShowConsoleLogMessage('big gallery called 2');
                          }}
                          item={item}
                        />
                      );
                    }}
                    numColumns={4}
                    ListEmptyComponent={() => {
                      return (
                        <Text
                          style={{
                            color: COLORS.editTextBorder,
                            fontSize: 16,
                            fontFamily: 'Montserrat-Regular',
                            textAlign: 'center',
                            paddingVertical: 10,
                          }}>
                          No data found
                        </Text>
                      );
                    }}
                  />
                </View>
              ) : null
            ) : null}
          </View>
          <View
            style={{
              flex: 1,
              marginTop: changeTwo
                ? reviewListData?.length >= 5
                  ? 100
                  : 30
                : 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                marginHorizontal: 10,
                marginBottom: 15,
                backgroundColor: COLORS.white,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  // let res = requestContactPermission();
                  // ShowConsoleLogMessage(
                  //   JSON.stringify(res) + ' Permission granted',
                  // );
                  // setHaveContactPermission(res);
                  // if (haveContactPermission) {
                  // }
                  triggerCall();
                }}
                style={[GlobalStyle1.iconBOX, {}]}>
                <FontAwesome
                  name="phone"
                  size={20}
                  color={COLORS.white}
                  style={{
                    marginVertical: 10,
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={openMap}
                style={[GlobalStyle1.iconBOX, {}]}>
                <MaterialCommunityIcons
                  name="directions"
                  size={20}
                  color={COLORS.white}
                  style={{
                    marginVertical: 10,
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (userData?.id_user == null || '') {
                    navigation.navigate('Auth', {
                      screen: 'Login',
                      params: {
                        screen: 'Login',
                      },
                    });
                  } else {
                    if (favorite) {
                      unSaveOnline();
                      doDeleteStoreOffline(
                        receivedData?.id_store || receivedData?.store_id,
                      );
                    } else {
                      doSaveOnline();
                      doSaveStoreOffline(
                        receivedData?.id_store || receivedData?.store_id,
                      );
                    }
                  }
                }}
                style={[GlobalStyle1.iconBOX, {}]}>
                <FontAwesome
                  name={favorite ? 'heart' : 'heart-o'}
                  size={20}
                  color={COLORS.white}
                  style={{
                    marginVertical: 10,
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={[
                GlobalStyle1.StoreBOX1,
                {
                  paddingBottom: 10,
                  paddingHorizontal: 6,
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '62%',
                  justifyContent: 'space-between',
                }}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[
                    {
                      color: COLORS.black,
                      marginTop: 10,
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 16,
                    },
                  ]}>
                  {receivedData?.name}
                </Text>
                <View>
                  {receivedData?.distance != null ? (
                    receivedData?.distance >= 100 ? (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 12,
                        }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            textAlign: 'center',
                            textAlignVertical: 'center',

                            marginStart: 5,
                            color: COLORS.shimmer_loading_color_darker,
                            fontSize: 14,
                            fontFamily: 'Montserrat-Medium',
                          }}>
                          {/* {`\u25CF ${formatDistance(receivedData.distance)}`} Away */}
                          {`\u25CF ${receivedData?.distance_km} ${receivedData?.distance_by}`}
                        </Text>
                      </View>
                    ) : receivedData?.distance < 100 ? (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            marginStart: 5,
                            color: COLORS.shimmer_loading_color_darker,
                            fontSize: 14,
                            fontFamily: 'Montserrat-Medium',
                          }}>
                          {`\u25CF ${receivedData?.distance_km} ${receivedData?.distance_by}`}

                          {/* {`\u25CF ${formatDistance(receivedData.distance)}`} Away */}
                        </Text>
                      </View>
                    ) : null
                  ) : null}
                </View>
              </View>

              <Text
                style={[
                  FONTS.body5,
                  {
                    color: 'grey',

                    fontFamily: 'Montserrat-Regular',
                    fontSize: 13,
                  },
                ]}>
                {receivedData?.detail}
                {/* n publishing and graphic design,
            Lorem ipsum is a placeholder text commonly used to demonstrate the
            visual form of a document or a typeface */}
              </Text>
            </View>

            <View
              style={[
                GlobalStyle1.StoreBOX2,
                {
                  paddingHorizontal: 10,
                  marginBottom: 15,
                },
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Ionicons
                  name="md-location-sharp"
                  size={18}
                  color={COLORS.colorAccent}
                  style={{}}
                />
                <Text
                  style={[
                    FONTS.body4,
                    {
                      marginStart: 10,
                      color: COLORS.black,
                      flex: 1,
                    },
                  ]}>
                  Store Location
                </Text>
              </View>
              <Text
                style={[
                  FONTS.body4,
                  {
                    color: 'grey',
                    flex: 1,
                  },
                ]}>
                {receivedData?.address}
              </Text>
            </View>
            {receivedData?.latitude ? (
              <View style={styles.container}>
                <MapView
                  style={styles.mapcontainer}
                  showsUserLocation={true}
                  mapType={'standard'}
                  showsMyLocationButton={false}
                  zoomEnabled={true}
                  scrollEnabled={true}
                  showsScale={true}
                  region={{
                    latitude: parseFloat(receivedData?.latitude) || 0.0,
                    longitude: parseFloat(receivedData?.longitude) || 0.0,
                    // latitudeDelta: 9,
                    // longitudeDelta: 9,
                    latitudeDelta: receivedData?.latitudeDelta || 0.2, // Set a default value for latitudeDelta
                    longitudeDelta: receivedData?.longitudeDelta || 0.2, // Set a default value for longitudeDelta
                  }}>
                  {/* <Marker
                coordinate={{ latitude: latitude, longitude: longitude }}
                title="Marker Title" // Replace this with your desired marker title
                description="Marker Description" // Replace this with your desired marker description
              /> */}

                  <Marker.Animated
                    coordinate={{
                      latitude: parseFloat(receivedData?.latitude) || 0.0,
                      longitude: parseFloat(receivedData?.longitude) || 0.0,
                      latitudeDelta: 0,
                      longitudeDelta: 0,
                    }}
                    title={receivedData?.name}
                  />
                </MapView>
              </View>
            ) : null}

            {/* <View style={styles.zoomButtonsContainer}>
      <TouchableOpacity onPress={handleZoomIn}>
        <Text>Zoom In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleZoomOut}>
        <Text>Zoom Out</Text>
      </TouchableOpacity>
    </View> */}
            <View
              style={{
                padding: 10,
              }}
            />
          </View>
        </SafeAreaView>
      </ScrollView>

      {!showDown ? (
        <LinearGradient
          colors={['#00000090', '#00000090', COLORS.transparent]}
          style={[
            GlobalStyle.offerDetailToolBar,
            {
              // top:StatusBar.currentHeight<=10 ? 45:StatusBar.currentHeight
            },
          ]}>
          <BunchDealVectorIcon
            title={Ionicons}
            name={'arrow-back'}
            color={COLORS.colorAccent}
            size={25}
            style={{}}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <View
            style={{
              flexGrow: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              //backgroundColor: COLORS.black,
            }}>
            <Entypofrom
              name="share"
              size={22}
              color={COLORS.colorAccent}
              style={{
                marginHorizontal: 5,
                // marginHorizontal: 15,
              }}
              onPress={() => {
                // console.log("final apk data",receivedData)
                const StoreId = receivedData?.id_store; // Replace with the actual offer's ID
                const short_description = receivedData?.detail;
                const name = receivedData?.name;
                const category_name = receivedData?.category_name;

                // shareProduct(offerId);
                newShareOption(
                  base64Data,
                  StoreId,
                  short_description,
                  name,
                  category_name,
                );
              }}
              // onPress={() => {
              //   onShare();
              // }}
            />
            {/* <FontAwesome
          name="heart-o"
          size={22}
          color={COLORS.colorAccent}
          style={{
            marginHorizontal: 5,
          }}
          onPress={() => {
            doSaveOnline();
          }}
        /> */}
          </View>
          {/* </View> */}
        </LinearGradient>
      ) : (
        <View
          style={[
            GlobalStyle.offerDetailToolBar,
            {
              // top:StatusBar.currentHeight<=10 ? 45:StatusBar.currentHeight
              elevation: 10,
              backgroundColor: COLORS.white,
            },
          ]}>
          <BunchDealVectorIcon
            title={Ionicons}
            name={'arrow-back'}
            color={COLORS.colorAccent}
            size={25}
            style={{}}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Montserrat-Regular',
              color: COLORS.colorAccent,
              marginStart: 7,
              marginEnd: 3,
              flex: 1,
            }}
            numberOfLines={1}>
            {receivedData?.name}
          </Text>
          <View
            style={{
              // flexGrow: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <Entypofrom
              name="share"
              size={22}
              color={COLORS.colorAccent}
              style={{
                marginHorizontal: 5,
                // marginHorizontal: 15,
              }}
              onPress={() => {
                console.log('final apk data', receivedData);
                const StoreId = receivedData?.id_store; // Replace with the actual offer's ID
                const short_description = receivedData?.detail;
                const name = receivedData?.name;
                const category_name = receivedData?.category_name;

                // shareProduct(offerId);
                newShareOption(
                  base64Data,
                  StoreId,
                  short_description,
                  name,
                  category_name,
                );
              }}
              // onPress={() => {
              //   onShare();
              // }}
            />
          </View>
        </View>
      )}

      {renderImageModal()}
      {renderGalleryImageModal()}
      {renderAddReviewModal()}
    </SafeAreaView>
  );
};

export default StoreDetails;
const styles = StyleSheet.create({
  container: {
    height: SIZES.width,
    flex: 1,
  },
  mapcontainer: {
    flex: 1,
    // width: SIZES.width,
    // height: SIZES.height,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    minHeight: SIZES.width - 120,
    paddingBottom: 10,
    paddingHorizontal: 5,
    width: SIZES.width - 80,
    // paddingHorizontal: 20,
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 75,
  },
});
