import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
} from 'react-native';

import dynamicLinks from '@react-native-firebase/dynamic-links';
//import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import CountDown from 'react-native-countdown-component';
import {Image} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  default as Entypo,
  default as Entypofrom,
} from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants/Colors';
import {STRING} from '../../constants/String';
import {FONTS, SIZES} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle from '../../styles/GlobalStyle';
import GlobalStyle1 from '../../styles/GlobalStyle1';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';
import {
  doDeleteOfferOffline,
  doSaveOfferOffline,
  isOfferSaved,
} from '../../utils/RealmUtility';
import {
  getDateDiff,
  ShowConsoleLogMessage,
  ShowToastMessage,
} from '../../utils/Utility';
import {markAsRead} from '../CampaignController';
import crashlytics from '@react-native-firebase/crashlytics';
import BunchDealProgressBar from '../../utils/BunchDealProgressBar';
import {useSelector} from 'react-redux';

const OfferDetails = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  // const { item } = route.params;
  let userLat = useSelector(state => state?.state?.latitude);
  let userLong = useSelector(state => state?.state?.longitude);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    // const paddingToBottom = 30;
    const paddingToBottom = SIZES.width + 200;
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

  const [showDown, setShowDown] = useState(false);

  const isFocused = useIsFocused();

  const [intentCause, setIntentCause] = useState(false);
  const [fav, setFav] = useState(false);

  const [receivedData, setReceivedData] = useState({});
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(0);
  const [order_amount, setorderAmount] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);

  useEffect(() => {
    let {item} = route?.params;

    getUserFromStorage(item);
  }, []);

  useEffect(() => {
    getisFocusedUserFromStorage();
  }, [isFocused]);

  const getSearchOfferList = offer_ids => {
    setLoading(true);
    let body = {
      latitude: userLat + '',
      longitude: userLong + '',
      order_by: 'recent',
      offer_ids: offer_ids,
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      limit: '30',
      page: '1',
      search: '',
      category_id: '',
      radius: '',
      date: moment().format('yyyy-MM-dd H:m:s'),
    };
    console.log('Body Detail' + JSON.stringify(body));
    // ShowConsoleLogMessage(JSON.stringify(body));

    ApiCall('post', body, API_END_POINTS.API_GET_OFFERS, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        //console.log('response .........>>>>>> ' + JSON.stringify(response));

        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
          let result = Object.values(response.data?.result);

          setReceivedData(result[0]);
          setImageUrl(result[0]?.images?.['0']?.['560_560']?.url);
          setImageUrl200(result[0]?.images?.['0']?.['200_200']?.url);
          var res = [];

          try {
            Object.values(result[0]?.images).forEach((key, index) => {
              let temp = Object.keys(key);
              res.push(key['560_560' || 'full']?.url + '');
            });
            // console.log('image -> > \n\n\n => ', res);
          } catch (err) {
            crashlytics().recordError(err);
          }

          setImages(res);
          // setImageUrl(result[0]?.images);

          setPrice(result[0]?.offer_value + '');
          setOriginalPrice(result[0]?.offer_value);

          let start_date = result[0]?.date_start;
          let end_date = result[0]?.date_end;

          let diff_Will_Start = getDateDiff(start_date);

          if (diff_Will_Start > 0) {
            if (result[0]?.is_deal == 1) {
              t = diff_Will_Start;
              setCounterTime(diff_Will_Start);
              setDiffWillStart(diff_Will_Start);
            }
          }
          let diff_will_end = getDateDiff(end_date);

          if (diff_will_end > 0 && diff_Will_Start < 0) {
            t = diff_will_end;
            setCounterTime(diff_will_end);
            setDiffWillEnd(diff_will_end);
          }

          if (diff_Will_Start < 0 && diff_will_end < 0) {
          }
          getStoreByIdTelePhone(result[0]?.store_id);
        } else {
          setReceivedData({});
        }
      })
      .catch(err => {
        crashlytics().recordError(err);

        // console.log('eorir < ', err);
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onOrderClick = () => {
    if (userData?.id_user == null) {
      navigation.navigate('Auth', {
        screen: 'Login',
        params: {
          screen: 'Login',
        },
      });
    } else {
      if (parseInt(receivedData?.qty_enabled) > 0) {
        closeQtyModal();
      } else {
        navigation.navigate('Order', {
          item: receivedData,
          count: count,
          originalPrice: originalPrice,
          order_amount: order_amount,
          price: price,
          telephone: telephone,
        });
      }
    }
  };

  const [userData, setUserData] = useState({});
  const [telephone, setTelephone] = useState('');

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
          let result = Object.values(response.data?.result);
          setTelephone(result[0]?.telephone);
          // ShowConsoleLogMessage(result[0]?.telephone + ' => telephone ');
        } else {
        }
      })
      .catch(err => {})
      .finally(() => {});
  };

  const getUserFromStorage = async item => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            // ShowConsoleLogMessage(value);
            setUserData(JSON.parse(value));
            // ShowConsoleLogMessage(item);
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

  useEffect(() => {
    setCount(1);
    setOriginalPrice(receivedData?.offer_value || 0);
    setPrice(receivedData?.offer_value || 0);
    setorderAmount(receivedData?.offer_value || 0);
  }, [isFocused]);

  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([]);
  const [imageUrl200, setImageUrl200] = useState('');

  useEffect(() => {
    convertImageToBase(imageUrl200).then(r => {});
  }, [imageUrl200]);

  const scrollToActiveIndex = index => {
    // console.log('scrollToActiveIndex =>? ', index);
    setActiveIndex(index);
  };

  // 1. Define a function outside the component:
  const onViewableItemsChanged = info => {
    // console.log('onViewableItemsChanged => ', info?.viewableItems[0]?.index);
    setActiveIndex(info?.viewableItems[0]?.index + 1);
  };

  // 2. create a reference to the function (above)
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  const [counterTime, setCounterTime] = useState(0);
  let t = 0;
  // useEffect(() => {
  //   (async function () {
  //     let { item } = route.params;

  //     if (item?.intentFromNotification) {
  //       ShowConsoleLogMessage('insdie -> ' + JSON.stringify(item));

  //       getSearchOfferList(item?.id_offer);
  //       // getSearchOfferList(107);
  //       // getSearchOfferList('107');
  //       let is_offer_save = await isOfferSaved(
  //         item?.id_offer || item?.offer_id,
  //       );
  //       // ShowConsoleLogMessage(is_offer_save);
  //       setFavorite(is_offer_save);
  //     } else {
  //       if (item?.id_offer == undefined || null) {
  //         getSearchOfferList(item?.id_offer);
  //         let is_offer_save = await isOfferSaved(
  //           item?.id_offer || item?.offer_id,
  //         );
  //         setFavorite(is_offer_save);
  //       } else {
  //         setReceivedData(item);
  //         // ShowConsoleLogMessage('item details ->? ' + JSON.stringify(item));
  //         var res = [];

  //         try {
  //           Object.values(item?.images).forEach((key, index) => {
  //             let temp = Object.keys(key);
  //             // console.log('key -??? ?? >>> ', temp[index], index);
  //             // console.log('key -??? ?? >>> ', key['560_560' || 'full']?.url);
  //             res.push(key['560_560' || 'full']?.url + '');
  //           });
  //           // console.log('image -> > \n\n\n => ', res);
  //         } catch (err) {
  //           crashlytics().recordError(err);
  //         }

  //         setImages(res);
  //         // img.map(x => {
  //         //   console.log(x, 'xxx');
  //         //   let url = x?.url;
  //         //   setImages(...images, url);
  //         // });
  //         setImageUrl(item?.images?.['0']?.['560_560']?.url);
  //         // setPrice(item?.offer_value + '');

  //         setOriginalPrice(item?.offer_value);

  //         let start_date = item?.date_start;
  //         let end_date = item?.date_end;

  //         let diff_Will_Start = getDateDiff(start_date);

  //         if (diff_Will_Start > 0) {
  //           if (item?.is_deal == 1) {
  //             t = diff_Will_Start;
  //             setCounterTime(diff_Will_Start);
  //             setDiffWillStart(diff_Will_Start);
  //           }
  //         }
  //         let diff_will_end = getDateDiff(end_date);

  //         if (diff_will_end > 0 && diff_Will_Start < 0) {
  //           t = diff_will_end;
  //           setCounterTime(diff_will_end);
  //           setDiffWillEnd(diff_will_end);
  //         }

  //         if (diff_Will_Start < 0 && diff_will_end < 0) {
  //         }

  //         let is_offer_save = await isOfferSaved(
  //           item?.id_offer || item?.offer_id,
  //         );
  //         setFavorite(is_offer_save);

  //         // let temp = await getSavedOfferAsString();
  //         // ShowConsoleLogMessage(temp);
  //         getStoreByIdTelePhone(item?.store_id);
  //       }
  //     }
  //     await AsyncStorage.setItem('notification', '');
  //   })();
  // }, [isFocused]);

  useEffect(() => {
    (async function () {
      let {item} = route?.params;

      if (item?.intentFromNotification) {
        getSearchOfferList(item?.id_offer);
        // getSearchOfferList(107);
        // getSearchOfferList('107');
        let is_offer_save = await isOfferSaved(
          item?.id_offer || item?.offer_id,
        );
        // ShowConsoleLogMessage(is_offer_save);
        setFavorite(is_offer_save);
      } else {
        if (item?.id_offer == undefined || null) {
          ShowConsoleLogMessage(
            'insdie inside els 111111e-> ' + JSON.stringify(item),
          );

          getSearchOfferList(item?.id_offer);
          let is_offer_save = await isOfferSaved(
            item?.id_offer || item?.offer_id,
          );
          setFavorite(is_offer_save);
        } else {
          if (item?.intentFromGeo) {
            if (item?.id_offer != undefined || null) {
              getSearchOfferList(item?.id_offer);
              let is_offer_save = await isOfferSaved(
                item?.id_offer || item?.offer_id,
              );
              setFavorite(is_offer_save);
            }
          } else {
            setReceivedData(item);
            // ShowConsoleLogMessage('item details ->? ' + JSON.stringify(item));
            var res = [];
            getSearchOfferList(item?.id_offer);

            try {
              Object.values(item?.images).forEach((key, index) => {
                let temp = Object.keys(key);
                // console.log('key -??? ?? >>> ', temp[index], index);
                // console.log('key -??? ?? >>> ', key['560_560' || 'full']?.url);
                res.push(key['560_560' || 'full']?.url + '');
              });
              // console.log('image -> > \n\n\n => ', res);
            } catch (err) {
              crashlytics().recordError(err);
            }

            setImages(res);
            // img.map(x => {
            //   console.log(x, 'xxx');
            //   let url = x?.url;
            //   setImages(...images, url);
            // });
            setImageUrl(item?.images?.['0']?.['560_560']?.url);
            setImageUrl200(item?.images?.['0']?.['200_200']?.url);
            setPrice(item?.offer_value + '');

            setOriginalPrice(item?.offer_value);
            setorderAmount(item?.offer_value);

            let start_date = item?.date_start;
            let end_date = item?.date_end;

            let diff_Will_Start = getDateDiff(start_date);

            if (diff_Will_Start > 0) {
              if (item?.is_deal == 1) {
                t = diff_Will_Start;
                setCounterTime(diff_Will_Start);
                setDiffWillStart(diff_Will_Start);
              }
            }
            let diff_will_end = getDateDiff(end_date);

            if (diff_will_end > 0 && diff_Will_Start < 0) {
              t = diff_will_end;
              setCounterTime(diff_will_end);
              setDiffWillEnd(diff_will_end);
            }

            if (diff_Will_Start < 0 && diff_will_end < 0) {
            }

            let is_offer_save = await isOfferSaved(
              item?.id_offer || item?.offer_id,
            );
            setFavorite(is_offer_save);

            // let temp = await getSavedOfferAsString();
            // ShowConsoleLogMessage(temp);
            getStoreByIdTelePhone(item?.store_id);
          }
        }
      }
      await AsyncStorage.setItem('notification', '');
    })();
  }, [isFocused]);

  const bigPhotoRef = useRef();
  const smallPhotoRef = useRef();

  const [activeIndex, setActiveIndex] = useState(0);
  const [diffWillStart, setDiffWillStart] = useState(0);
  const [diffWillEnd, setDiffWillEnd] = useState(0);
  const [offerUpTo, setOfferUpTo] = useState('');

  const renderBigPhotoItems = ({item, index}) => {
    return (
      // <View
      //   key={item}
      //   activeOpacity={1.0}
      //   onPress={() => {}}
      //   style={{
      //     height: '100%',
      //     // height: 300,
      //     width: Dimensions.get('window').width,
      //     alignItems: 'center',
      //   }}>
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

      // </View>
    );
  };

  const [selectedImage, setSelectedImage] = useState('');
  const [showImageModal, setShowImageModal] = useState('');

  const closeImageModal = () => {
    setShowImageModal(!showImageModal);
    if (showImageModal) {
      setActiveIndex(0);
    }
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
                marginTop: 'auto',
                marginBottom: 'auto',
                flex: 1,
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
  useEffect(() => {
    setCounterTime(t);
  }, [counterTime]);

  const [showQtyModal, setShowQtyModal] = useState(false);

  const closeQtyModal = () => {
    setShowQtyModal(!showQtyModal);
  };

  const renderQtyModal = () => {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={showQtyModal}
        onRequestClose={() => {
          closeQtyModal();
        }}
        style={{flexGrow: 1}}>
        <View
          style={{
            backgroundColor: '#00000090',
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              closeQtyModal();
            }}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          />
          <View
            style={{
              maxHeight: SIZES.height * 0.7,
            }}>
            <View
              style={[
                {
                  paddingTop: 10,
                  paddingHorizontal: 10,
                  backgroundColor: '#FFF',
                },
              ]}>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  marginHorizontal: 15,
                  flexDirection: 'row',
                  elevation: 10,
                  marginBottom: 5,
                  marginTop: 5,
                  borderRadius: 3,
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: imageUrl,
                  }}
                  style={{
                    width: 115,
                    height: 115,
                    borderRadius: 3,
                  }}
                />
                <View
                  style={{
                    marginStart: 15,
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Montserrat-Regular',
                      color: COLORS.shimmer_loading_color_darker,
                    }}
                    numberOfLines={2}>
                    {receivedData?.name}
                  </Text>

                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Montserrat-Regular',
                      color: COLORS.colorAccent,
                    }}>
                    {receivedData?.currency?.symbol + '' + price}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 15,
                    }}>
                    <BunchDealVectorIcon
                      title={AntDesign}
                      name={'minus'}
                      color={COLORS.shimmer_loading_color_darker}
                      size={20}
                      style={{
                        marginEnd: 15,
                      }}
                      onPress={() => {
                        if (count > 1) {
                          setCount(prev => prev - 1);
                          let p1 = parseInt(price) - parseInt(originalPrice);
                          setPrice(p1);
                        }
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: 'Montserrat-Regular',
                        color: COLORS.shimmer_loading_color_darker,
                      }}>
                      {count}
                    </Text>

                    <BunchDealVectorIcon
                      title={AntDesign}
                      name={'plus'}
                      color={COLORS.shimmer_loading_color_darker}
                      size={20}
                      style={{
                        marginStart: 15,
                      }}
                      onPress={() => {
                        setCount(prev => prev + 1);
                        let p1 = parseInt(price) + parseInt(originalPrice);
                        setPrice(p1);
                      }}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 15,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                }}>
                <Text
                  onPress={() => {
                    closeQtyModal();
                  }}
                  style={{
                    fontSize: 16,
                    fontFamily: 'Montserrat-Regular',
                    color: COLORS.shimmer_loading_color_darker,
                    paddingVertical: 12,
                    paddingHorizontal: 8,
                    borderRadius: 3,
                    marginEnd: 30,
                  }}>
                  CLOSE
                </Text>
                <Text
                  onPress={() => {
                    closeQtyModal();
                    navigation.navigate('Order', {
                      item: receivedData,
                      count: count,
                      price: price,
                      originalPrice: originalPrice,
                      order_amount: order_amount,
                      telephone: telephone,
                    });
                    // ShowToastMessage('Work in progress');
                  }}
                  style={{
                    fontSize: 16,
                    fontFamily: 'Montserrat-Regular',
                    color: COLORS.white,
                    backgroundColor: COLORS.colorPrimary,
                    paddingVertical: 12,
                    paddingHorizontal: 8,
                    borderRadius: 3,
                  }}>
                  CONFIRM
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const [generated, setGenerated] = useState('');

  // const handleDynamicLink = link => {
  //   // Log the actual URL received from the dynamic link
  //   console.log('Received Dynamic Link:', link);

  //   // Extract the path part of the link URL
  //   const path = link?.url?.split('?')[0];

  //   // Compare the extracted path with the expected path
  //   if (path === `${DEEP_LINK_URL}/OfferDetails`) { // Use the constant here
  //     console.log('Dynamic link clicked:', DEEP_LINK_URL); // Use the constant here
  //     // Handle navigation or other logic here
  //   } else {
  //     console.log('Dynamic link clicked, but not matching expected URL');
  //   }
  // };
  // const handleDynamicLink = (link) => {
  //   console.log('Received Dynamic Link:', link);
  //   console.log('Expected URL:', expectedURL);
  //   if (link.url && link  ===  "https://bunchofdealscom13.page.link/u9DC") {
  //     console.log('Dynamic link matched expected URL');

  //     // navigation.navigate('OfferDetails', { /* YourScreenParams */ });
  //   } else {
  //     console.log('Dynamic link clicked, but not matching expected URL');
  //   }
  // };

  // useEffect(() => {
  //   const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
  //   // Unsubscribe from the listener when the component is unmounted
  //   return () => unsubscribe();
  // }, []);

  const expectedURL = 'https://bunchofdeals123.page.link/qbvQ';

  // useEffect(() => {
  //   dynamicLinks()
  //     .getInitialLink()
  //     .then((link) => {
  //       console.log("nnnull",link);

  //       if (link.url && link === 'https://bunchofdealscom13.page.link/u9DC') {

  //       }
  //     });
  // }, []);

  const generateLink = async offerId => {
    console.log(offerId);

    try {
      const longDynamicLink = `https://bunchofdeals123.page.link/qbvQ?offerDetails%2F${offerId}`;

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

  const buildLink = async () => {
    try {
      const link = await dynamicLinks().buildLink({
        link: 'https://bunchofdeals123.page.link/qbvQ',
        domainUriPrefix: 'https://bunchofdeals123.page.link/qbvQ',
        analytics: {
          campaign: 'banner',
        },
      });

      setGenerated(link); // Store the generated link in the state
      console.log('Generated dynamic link:', link);
    } catch (error) {
      console.error('Error building dynamic link:', error);
    }
  };

  const [favorite, setFavorite] = useState(false);
  const [available, setAvailable] = useState(true);

  const doSaveOnline = () => {
    let body = {
      user_id: userData?.id_user + '',
      offer_id: receivedData?.id_offer + '',
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_SAVE_OFFER, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // ShowConsoleLogMessage(response);
        if (response?.data?.success == 1) {
          setFavorite(!favorite);
          // ShowToastMessage('Saved');
          ShowToastMessage('Added to favorite');
        } else {
          setFavorite(false);
        }
      })
      .catch(err => {
        crashlytics().recordError(err);

        ShowConsoleLogMessage('Error in get offer recent api call: ' + err);
      })
      .finally(() => {});
  };
  const unSaveOnline = () => {
    let body = {
      user_id: userData?.id_user + '',
      offer_id: receivedData?.id_offer + '',
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_REMOVE_OFFER, {
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

        ShowConsoleLogMessage('Error in get offer recent api call: ' + err);
      })
      .finally(() => {});
  };

  const newShareOption = async (imageUrl, offerId, short_description, name) => {
    try {
      const link = await generateLink(offerId);
      console.log(link);
      console.log('Image:', imageUrl200);

      if (imageUrl != null && imageUrl !== '') {
        if (Platform.OS === 'android') {
          const shareOptions = {
            message: `Bunch of Deals - checkout this exclusive offer...\n\n${name}\n\n${receivedData?.store_name}\n\n${receivedData?.address}\n\n${link}`,

            url: base64Data,
          };
          await Share.share(shareOptions);
        } else {
          console.log('else part called');
          const shareOptions = {
            //   message: `Bunch of Deals - checkout this exclusive offer...\n\n${name}\n\n${receivedData?.store_name}\n\n${receivedData?.address}\n\n${link}`,
            //   url: base64Data,
            // };
            title: `Bunch of Deals - checkout this exclusive offer...\n\n${name}\n\n${receivedData?.store_name}\n\n${receivedData?.address}\n\n${link}`,
            message: `Bunch of Deals - checkout this exclusive offer...\n\n${name}\n\n${receivedData?.store_name}\n\n${receivedData?.address}\n\n${link}`,
            //text: `Bunch of Deals - checkout this exclusive offer...\n\n${name}\n\n${receivedData?.store_name}\n\n${receivedData?.address}\n\n${link}`,
            // url: base64Data,
            // urls: [base64Data],
            // failOnCancel: false,
            //type: 'image/jpeg',
            //social: Share.Social.WHATSAPP,
          };
          await Share.share(shareOptions);
        }
      } else {
        if (Platform.OS == 'android') {
          const shareOptions = {
            message: `Bunch of Deals - checkout this exclusive offer...\n\n${name}\n\n${receivedData?.store_name}\n\n${receivedData?.address}\n\n${link}`,
          };
          await Share.share(shareOptions);
        } else {
          const shareOptions = {
            message: `Bunch of Deals - checkout this exclusive offer...\n\n${name}\n\n${receivedData?.store_name}\n\n${receivedData?.address}\n\n${link}`,
          };
          await Share.share(shareOptions);
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <BunchDealProgressBar loading={loading} />
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            setShowDown(true);
          } else {
            setShowDown(false);
          }
        }}
        scrollEventThrottle={100}>
        <SafeAreaView style={GlobalStyle1.mainContainerwhiteColor}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              closeImageModal();
            }}
            style={{
              width: '100%',
            }}>
            {/* <View style={styles.container}>
              <FastImage
                source={imageUrl + ''}
                style={styles.image}
              />
            </View> */}

            <BunchDealImageLoader
              // defaultImg={images.def_logo}
              source={imageUrl + ''}
              styles={GlobalStyle1.Product_image}
            />
            {/* <LinearGradient
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
              marginHorizontal: 15,
            }}
            onPress={() => {
              onShare();
            }}
          />
          <FontAwesome
            name={favorite ? 'heart' : 'heart-o'}
            size={22}
            color={COLORS.colorAccent}
            style={{
              marginHorizontal: 5,
            }}
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
                  doDeleteOfferOffline(
                    receivedData?.id_offer || receivedData?.offer_id,
                  );
                } else {
                  doSaveOnline();
                  doSaveOfferOffline(
                    receivedData?.id_offer || receivedData?.offer_id,
                  );
                }
              }
            }}
          />
        </View>

          </LinearGradient>*/}

            {receivedData?.discount > 0 ? (
              <View
                style={{
                  position: 'absolute',
                  marginTop: 40,
                  marginLeft: 10,
                }}>
                <ImageBackground
                  // source={{
                  //   uri:
                  //     'https://w7.pngwing.com/pngs/67/521/png-transparent-computer-icons-offers-text-logo-discount-thumbnail.png',
                  // }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                  imageStyle={{resizeMode: 'cover'}}>
                  <View
                    style={{
                      alignItems: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: COLORS.colorPromo,
                      borderRadius: 100,
                      width: 50,
                      height: 50,
                    }}>
                    <Text
                      style={{
                        fontSize: 11,
                        color: 'white',
                        fontWeight: 'bold',
                        transform: [{rotate: '-20deg'}],
                      }}>
                      {receivedData.discount}%
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        color: 'white',
                        fontWeight: 'bold',
                        transform: [{rotate: '-18deg'}],
                        marginLeft: 5,
                      }}>
                      off
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            ) : null}
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                flexDirection: 'row',
                height: 35,
                alignItems: 'center',
                // backgroundColor: COLORS.colorCountdownView,
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
                    paddingVertical: 4,
                    color: COLORS.white,
                    fontSize: 13,
                    borderRadius: 8,
                  }}>
                  <FontAwesome name="camera" color={COLORS.white} />
                  {images.length > 1 ? `  ${images.length}` : ''}
                </Text>
              ) : null}
              {receivedData?.purchase_counter > 0 ? (
                <Text
                  style={{
                    margin: 5,
                    borderRadius: 5,
                    backgroundColor: COLORS.colorCountdownView,
                    textAlignVertical: 'center',
                    textAlign: 'center',
                    paddingStart: 8,
                    paddingEnd: 8,
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 12,
                    color: COLORS.white,
                    paddingVertical: 5,
                    fontWeight: 'bold',
                    // backgroundColor: COLORS.colorCountdownView,
                    // paddingHorizontal: 15,
                    // fontFamily: 'Montserrat-Medium',
                    // paddingVertical: 6,
                    // color: COLORS.white,
                    // fontSize: 11,
                  }}>
                  +{receivedData?.purchase_counter} sold
                </Text>
              ) : null}
              {/* {receivedData?.discount > 0 ? (
                <Text
                  style={{
                    margin: 5,
                    borderRadius: 5,
                    backgroundColor: COLORS.colorPrimary,
                    textAlignVertical: 'center',
                    textAlign: 'center',
                    paddingStart: 8,
                    paddingEnd: 8,
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 12,
                    color: COLORS.white,
                    paddingVertical: 5,
                    fontWeight: 'bold'
                    // backgroundColor: COLORS.colorCountdownView,
                    // paddingHorizontal: 15,
                    // fontFamily: 'Montserrat-Medium',
                    // paddingVertical: 6,
                    // color: COLORS.white,
                    // fontSize: 11,
                  }}>
                  {receivedData.discount}%
                </Text>
              ) : null} */}
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

          <View
            style={[
              GlobalStyle1.product_amount,
              {
                justifyContent: 'center',
                flexDirection: 'row',
              },
            ]}>
            {/* style={[GlobalStyle1.amount_text]} */}

            {receivedData?.value_type === 'percent' ? (
              <Text style={[GlobalStyle1.amount_text]}>
                {receivedData?.offer_value}% Off
              </Text>
            ) : (
              <Text style={[GlobalStyle1.amount_text]}>
                {receivedData?.currency?.symbol !== undefined
                  ? receivedData?.currency?.symbol
                  : ''}
                {receivedData?.offer_value !== undefined
                  ? ` ${receivedData?.offer_value}`
                  : ''}
                {receivedData?.original_price !== undefined ? (
                  <Text
                    style={[
                      GlobalStyle1.amount_text,
                      {
                        fontSize: 18,
                        color: COLORS.grey_20,
                        textDecorationLine: 'line-through',
                      },
                    ]}>
                    {' ' +
                      (receivedData?.currency?.symbol !== undefined
                        ? receivedData?.currency?.symbol
                        : '')}{' '}
                    {receivedData?.original_price}
                    {/* {' ' +
                      receivedData?.currency?.symbol +
                      '' +
                      receivedData?.original_price +
                      '.0 '} */}
                  </Text>
                ) : null}
              </Text>
            )}

            {/* {receivedData?.original_price != null ? (
              <Text
                style={[
                  GlobalStyle1.amount_text,
                  {
                    fontSize: 18,
                    color: COLORS.grey_20,
                    textDecorationLine: 'line-through',
                  },
                ]}>
                {' ' +
                  receivedData?.currency?.symbol +
                  '' +
                  receivedData?.original_price +
                  '.0 '}
              </Text>
            ) : null} */}
          </View>

          <Text
            style={[
              FONTS.h5,
              {
                textAlign: 'center',
                marginTop: 20,
                color: COLORS.black,
                marginHorizontal: 28,
                color: COLORS.black,
                fontFamily: 'Montserrat-SemiBold',
                // fontWeight:'bold'
              },
            ]}
            // style={{
            //   textAlign: 'center',
            //       color: COLORS.black,
            //       fontFamily: 'Montserrat-SemiBold',
            //       fontSize: 18,
            //       marginTop: 20,
            // }}
            // style={[
            //   FONTS.h5,
            //   {
            //     textAlign: 'center',
            //     marginTop: 20,
            //     color: COLORS.black,
            //     fontFamily: 'Montserrat-SemiBold',
            //   },
            // ]}
          >
            {/* {offerUpTo} */}
            Hurry! This OFFER ends in
          </Text>
          {/* <View
            style={[
              GlobalStyle1.minute,
              {
                marginTop: 12,
                borderRadius: 5,
              },
            ]}>
            <Text
              style={[
                GlobalStyle1.minutetext,
                {
                  marginTop: 10,
                  padding: 10,
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 18,
                },
              ]}>
              105 : 12 : 10 : 10
            </Text>
          </View> */}

          <View
            style={{
              // backgroundColor: COLORS.colorAccent,
              marginHorizontal: 26,
              marginTop: 2,
              borderRadius: 5,
              flex: 1,
              // elevation: 2,
              padding: 20,
            }}>
            <CountDown
              digitStyle={{
                backgroundColor: COLORS.colorCountdownView,
              }}
              until={counterTime}
              // onFinish={() => alert('finished')}
              // onPress={() => alert('hello')}

              timeToShow={['D', 'H', 'M', 'S']}
              // timeToShow={
              //   diffWillEnd > 0 ? ['D', 'H', 'M', 'S'] : ['H', 'M', 'S']
              // }
              size={20}
              // showSeparator={true}
              digitTxtStyle={{
                color: 'white',
                fontFamily: 'Montserrat-Medium',
              }}
            />
          </View>

          <Text
            style={[
              FONTS.h5,
              {
                // textAlign: 'center',
                marginTop: 10,
                color: COLORS.black,
                marginHorizontal: 31,
              },
            ]}
            //  style={{
            //   // textAlign: 'center',
            //   color: COLORS.black,
            //   fontFamily: 'Montserrat-SemiBold',
            //   fontSize: 18,
            //   marginHorizontal: 25,
            //   // fontSize: 20,
            //   // textAlign: 'center',
            //   //   marginTop: 0,
            //   //   color: COLORS.black,
            //   //   fontFamily: 'Montserrat-SemiBold',
            // }}
          >
            {/* {offerUpTo} */}
            About This Offer
          </Text>
          {/* <View style={{
            width:'90%',borderWidth:0.2,justifyContent:'center',
            alignSelf:'center',
            marginTop:20
        }}></View> */}
          <View
            style={{
              marginHorizontal: 10,
              paddingBottom: 5,
              marginTop: 10,
            }}>
            <Text
              style={[
                FONTS.h5,
                {
                  // textAlign: 'center',
                  // marginTop: 40,
                  color: COLORS.black,
                  marginHorizontal: 22,
                },
              ]}
              // style={[
              //   {
              //     // textAlign: 'center',
              //     color: COLORS.black,
              //     fontFamily: 'Montserrat-SemiBold',
              //     fontSize: 18,
              //     marginHorizontal: 16,

              //   },
              // ]}
            >
              {receivedData?.name}
            </Text>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text
                style={[
                  FONTS.body4,
                  {
                    color: 'grey',
                    marginHorizontal: 21,
                  },
                ]}>
                {receivedData?.description?.replace(/<\/?[^>]+(>|$)/g, '\n')}
              </Text>
            </View>
            <Text
              style={[
                FONTS.h5,
                {
                  marginTop: 15,
                  color: COLORS.black,
                  marginBottom: 5,
                  marginHorizontal: 22,

                  // marginTop: 30,
                  color: COLORS.black,
                  // marginHorizontal: 20,
                },
              ]}>
              Store Detail
            </Text>
            <TouchableOpacity
              onPress={() => {
                // console.log(JSON.stringify(receivedData));
                navigation.navigate('StoreDetails', {item: receivedData});
              }}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                //alignItems: 'center',
                paddingHorizontal: 22,

                //width: '60%',
                flexGrow: 1,

                //  backgroundColor: 'pink',
              }}>
              <MaterialCommunityIcons
                name={'storefront-outline'}
                size={15}
                color={COLORS.colorAccent}
                style={{
                  marginTop: 5,
                  //backgroundColor: 'red',
                  //// alignItems: 'flex-start',
                  // marginStart: 15,
                }}
              />
              <View
                style={{
                  flexGrow: 1,
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                }}>
                <Text
                  style={[
                    GlobalStyle1.accentColorTextUnderline,
                    {
                      flex: 1,
                      textAlign: 'left',
                    },
                  ]}>
                  {receivedData?.store_name}
                  <Text
                    style={{
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      marginTop: 5,
                      marginStart: 10,
                      color: COLORS.shimmer_loading_color_darker,
                      fontSize: 14,
                      fontFamily: 'Montserrat-Medium',
                      textDecorationStyle: 'dotted',
                      textDecorationColor: COLORS.white,
                    }}>
                    {/* {'  '} {`\u25CF ${receivedData?.distance_km}`} km away */}
                    {`\u25CF ${receivedData?.distance_km} ${receivedData?.distance_by}`}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
            <Text
              style={[
                FONTS.h5,
                {
                  // textAlign: 'center',
                  marginTop: 30,
                  color: COLORS.black,
                  marginBottom: 5,
                  marginHorizontal: 22,
                },
              ]}>
              Fine Print
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.fine_print_1}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.fine_print_2}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.fine_print_3}
              </Text>
            </View>
            <Text
              style={[
                FONTS.h5,
                {
                  // textAlign: 'center',
                  marginTop: 30,
                  color: COLORS.black,
                  marginHorizontal: 22,
                },
              ]}>
              How to Redeem
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 3,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{
                  marginVertical: -5,
                }}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    fontFamily: 'Montserrat-Regular',
                  },
                ]}>
                {STRING.how_to_red_1}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                  },
                ]}>
                {STRING.how_to_red_2}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.how_to_red_3}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.how_to_red_4}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.how_to_red_5}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.how_to_red_6}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.how_to_red_7}
              </Text>
            </View>

            <View
              style={{
                padding: 5,
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
              //backgroundColor: 'red',
            }}>
            <Entypofrom
              name="share"
              size={22}
              color={COLORS.colorAccent}
              style={{
                //marginHorizontal: 15,
                marginEnd: 5,
                // justifyContent:'flex-end',
                // alignContent:'flex-end',
                //marginStart: 5,
                //backgroundColor: 'red',
              }}
              onPress={() => {
                const offerId = receivedData?.id_offer; // Replace with the actual offer's ID
                const short_description = receivedData?.short_description;
                const name = receivedData?.name;

                // shareProduct(offerId);
                //generateLink();
                newShareOption(base64Data, offerId, short_description, name);
              }}
              // onPress={() => {
              //   buildLink();
              //   // onShare();
              // }}
            />
            <FontAwesome
              name={favorite ? 'heart' : 'heart-o'}
              size={22}
              color={COLORS.colorAccent}
              style={{
                marginHorizontal: 15,
              }}
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
                    doDeleteOfferOffline(
                      receivedData?.id_offer || receivedData?.offer_id,
                    );
                  } else {
                    doSaveOnline();
                    doSaveOfferOffline(
                      receivedData?.id_offer || receivedData?.offer_id,
                    );
                  }
                }
              }}
            />
          </View>
          {/* </View> */}
        </LinearGradient>
      ) : (
        <View
          // colors={[COLORS.white, COLORS.white, COLORS.white]}
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
              // backgroundColor: 'red',
            }}>
            <Entypofrom
              name="share"
              size={22}
              color={COLORS.colorAccent}
              style={{
                marginHorizontal: 15,
              }}
              onPress={() => {
                const offerId = receivedData?.id_offer; // Replace with the actual offer's ID
                const short_description = receivedData?.short_description;
                const name = receivedData?.name;

                // shareProduct(offerId);
                newShareOption(base64Data, offerId, short_description, name);
              }}
              // onPress={() => {
              //   buildLink();
              //   // onShare();
              // }}
            />
            <FontAwesome
              name={favorite ? 'heart' : 'heart-o'}
              size={22}
              color={COLORS.colorAccent}
              style={{
                marginHorizontal: 5,
              }}
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
                    doDeleteOfferOffline(
                      receivedData?.id_offer || receivedData?.offer_id,
                    );
                  } else {
                    doSaveOnline();
                    doSaveOfferOffline(
                      receivedData?.id_offer || receivedData?.offer_id,
                    );
                  }
                }
              }}
            />
          </View>
          {/* </View> */}
        </View>
      )}

      {receivedData?.order_button != null || '' ? (
        !showDown ? (
          <BunchDealCommonBtn
            height={50}
            backgroundColor={COLORS.colorAccent}
            marginHorizontal={0}
            text={receivedData?.order_button?.toUpperCase()}
            textStyle={FONTS.body4}
            onPress={onOrderClick}
            textColor={COLORS.white}
            borderRadius={1}
            textSize={16}
          />
        ) : (
          <View
            style={{
              height: 50,
              width: '100%',
              flexDirection: 'row',
            }}>
            {/*<BunchDealCommonBtn*/}
            {/*  height={50}*/}
            {/*  width={'50%'}*/}
            {/*  backgroundColor={COLORS.colorPromo}*/}
            {/*  marginHorizontal={0}*/}
            {/*  text={*/}
            {/*    receivedData?.currency?.symbol +*/}
            {/*    '' +*/}
            {/*    receivedData?.offer_value +*/}
            {/*    '.0'*/}
            {/*  }*/}
            {/*  textStyle={{*/}
            {/*    fontFamily: 'Montserrat-SemiBold',*/}
            {/*  }}*/}
            {/*  onPress={() => {}}*/}
            {/*  textColor={COLORS.white}*/}
            {/*  borderRadius={1}*/}
            {/*  textSize={16}*/}
            {/*/>*/}
            <TouchableOpacity
              style={{
                height: 50,
                width: '50%',
                backgroundColor: COLORS.colorPromo,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={[GlobalStyle1.amount_text]}>
                {receivedData?.currency
                  ? receivedData?.currency?.symbol +
                    '' +
                    receivedData?.offer_value +
                    ''
                  : null}
              </Text>
              {/* {receivedData?.original_price != null ? (
                <Text
                  style={[
                    GlobalStyle1.amount_text,
                    {
                      fontSize: 18,
                      color: COLORS.grey_20,
                      textDecorationLine: 'line-through',
                    },
                  ]}>
                  {' ' +
                    receivedData?.currency?.symbol +
                    '' +
                    receivedData?.original_price +
                    '.0 '}
                </Text>
              ) : null} */}
            </TouchableOpacity>
            <BunchDealCommonBtn
              width={'50%'}
              height={50}
              backgroundColor={COLORS.colorAccent}
              marginHorizontal={0}
              text={receivedData?.order_button?.toUpperCase()}
              textStyle={FONTS.body4}
              onPress={onOrderClick}
              textColor={COLORS.white}
              borderRadius={1}
              textSize={16}
            />
          </View>
        )
      ) : null}
      {renderQtyModal()}
      {renderImageModal()}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%', // Set the width of the image
    height: 260, // Set the height of the image
    resizeMode: 'cover', // Adjust the resizeMode as needed (e.g., 'contain', 'stretch')
    // borderRadius: 10, // Apply border radius if needed
  },
});
export default OfferDetails;
/** change in coutdown componet - react-na */
