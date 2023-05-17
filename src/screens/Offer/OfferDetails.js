import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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

const OfferDetails = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    // const paddingToBottom = 30;
    const paddingToBottom = SIZES.width + 200;
    // ShowConsoleLogMessage('paddingToBottom -> ' + paddingToBottom);
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const [showDown, setShowDown] = useState(false);

  const isFocused = useIsFocused();

  const [intentCause, setIntentCause] = useState(false);
  const [fav, setFav] = useState(false);

  const [receivedData, setReceivedData] = useState({});

  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);

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
          price: price,
          telephone: telephone,
        });
      }
    }
  };

  const [userData, setUserData] = useState({});
  const [telephone, setTelephone] = useState('');

  useEffect(() => {
    let {item} = route?.params;
    getUserFromStorage(item);
  }, []);

  useEffect(() => {
    getisFocusedUserFromStorage();
  }, [isFocused]);

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
  }, [isFocused]);

  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([]);

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
  useEffect(() => {
    (async function () {
      let {item} = route.params;

      if (item?.intentFromNotification) {
        ShowConsoleLogMessage('insdie -> ' + JSON.stringify(item));

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
          getSearchOfferList(item?.id_offer);
          let is_offer_save = await isOfferSaved(
            item?.id_offer || item?.offer_id,
          );
          setFavorite(is_offer_save);
        } else {
          setReceivedData(item);
          // ShowConsoleLogMessage('item details ->? ' + JSON.stringify(item));
          var res = [];

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
          setImageUrl(item?.images['0']['560_560'].url);
          setPrice(item?.offer_value + '');

          setOriginalPrice(item?.offer_value);

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
      await AsyncStorage.setItem('notification', '');
    })();
  }, [isFocused]);
  const getSearchOfferList = offer_ids => {
    setLoading(true);
    let body = {
      latitude: STRING.CURRENT_LAT + '',
      longitude: STRING.CURRENT_LONG + '',
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

    // ShowConsoleLogMessage(JSON.stringify(body));

    ApiCall('post', body, API_END_POINTS.API_GET_OFFERS, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // ShowConsoleLogMessage('response 0> ' + JSON.stringify(response?.data));

        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
          let result = Object.values(response.data?.result);

          setReceivedData(result[0]);
          setImageUrl(result[0]?.images['0']['560_560'].url);
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

  const bigPhotoRef = useRef();
  const smallPhotoRef = useRef();

  const [activeIndex, setActiveIndex] = useState(0);
  const [diffWillStart, setDiffWillStart] = useState(0);
  const [diffWillEnd, setDiffWillEnd] = useState(0);
  const [offerUpTo, setOfferUpTo] = useState('');

  const renderBigPhotoItems = ({item, index}) => {
    return (
      <View
        key={item}
        activeOpacity={1.0}
        onPress={() => {}}
        style={{
          height: 300,
          width: Dimensions.get('window').width,
          alignItems: 'center',
        }}>
        <Image
          style={{
            height: 300,
            width: Dimensions.get('window').width,
            resizeMode: 'stretch',
          }}
          source={{uri: item}}
          PlaceholderContent={
            <ActivityIndicator color={COLORS.white} size="large" />
          }
        />
      </View>
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
                marginBottom: 'auto',
                marginTop: 'auto',
              }}>
              <FlatList
                data={images}
                ref={bigPhotoRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                initialScrollIndex={activeIndex}
                // onMomentumScrollBegin={ev => {
                //   scrollToActiveIndex(
                //     Math.floor(ev.nativeEvent.contentOffset.x / SIZES.width),
                //   );
                // }}
                // onMomentumScrollEnd={ev => {
                //   scrollToActiveIndex(
                //     Math.floor(ev.nativeEvent.contentOffset.x / 2),
                //   );
                // }}
                // onScrollEndDrag={ev => {
                //   scrollToActiveIndex(
                //     Math.floor(ev.nativeEvent.contentOffset.x / SIZES.width),
                //   );
                // }}
                // remove the following statement
                // onViewableItemsChanged={(info) =>console.log(info)}

                // 3. add the following statement, instead of the one above
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
                    .0
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
        scrollEventThrottle={8}>
        <SafeAreaView style={GlobalStyle1.mainContainerwhiteColor}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              closeImageModal();
            }}>
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

            {/* <View
              style={[
                GlobalStyle1.price,
                {
                  alignSelf: 'flex-end',
                  backgroundColor: 'red',
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
              {receivedData?.purchase_counter > 0 ? (
                <Text
                  style={{
                    backgroundColor: COLORS.colorAccent,
                    paddingHorizontal: 15,
                    fontFamily: 'Montserrat-Medium',
                    paddingVertical: 6,
                    color: COLORS.white,
                    fontSize: 11,
                  }}>
                  +{receivedData?.purchase_counter} sold
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
              {receivedData?.distance != null ? (
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
                    {/*{receivedData?.distance}km*/}
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
              ) : null}
            </View>
          </TouchableOpacity>

          <View
            style={[
              GlobalStyle1.product_amount,
              {
                justifyContent: 'center',
              },
            ]}>
            <Text style={[GlobalStyle1.amount_text]}>
              {receivedData?.currency
                ? receivedData?.currency?.symbol +
                  '' +
                  receivedData?.offer_value +
                  '.0'
                : null}
            </Text>
          </View>
          <Text
            style={[
              FONTS.h5,
              {
                textAlign: 'center',
                marginTop: 20,
                color: COLORS.black,
                fontFamily: 'Montserrat-SemiBold',
              },
            ]}>
            {/* {offerUpTo} */}
            DEAL ENDS ON
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
              backgroundColor: COLORS.colorCountdownView,
              marginHorizontal: 26,
              marginTop: 15,
              borderRadius: 5,
              flex: 1,
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
              showSeparator={true}
              digitTxtStyle={{
                color: 'white',
                fontFamily: 'Montserrat-Medium',
              }}
            />
          </View>
          <View
            style={{
              marginHorizontal: 10,
              paddingBottom: 15,
              marginTop: 25,
            }}>
            <Text
              style={[
                {
                  textAlign: 'center',
                  color: COLORS.black,
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 18,
                },
              ]}>
              {receivedData?.name}
            </Text>
            <Text
              style={[
                FONTS.body4,
                {
                  color: 'grey',
                  marginHorizontal: 18,
                },
              ]}>
              {receivedData?.description?.replace(/<\/?[^>]+(>|$)/g, '\n')}
            </Text>
            <Text
              style={[
                FONTS.h5,
                {
                  textAlign: 'center',
                  marginTop: 40,
                  color: COLORS.black,
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
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name={'storefront-outline'}
                size={15}
                color={COLORS.colorAccent}
                style={{
                  marginTop: 5,
                  marginStart: 15,
                }}
              />
              <Text style={[GlobalStyle1.accentColorTextUnderline]}>
                {receivedData?.store_name}
              </Text>
            </TouchableOpacity>
            <Text
              style={[
                FONTS.h5,
                {
                  textAlign: 'center',
                  marginTop: 30,
                  color: COLORS.black,
                  marginBottom: 5,
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
                  textAlign: 'center',
                  marginTop: 30,
                  color: COLORS.black,
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
            <BunchDealCommonBtn
              height={50}
              width={'50%'}
              backgroundColor={COLORS.colorPromo}
              marginHorizontal={0}
              text={
                receivedData?.currency?.symbol +
                '' +
                receivedData?.offer_value +
                '.0'
              }
              textStyle={{
                fontFamily: 'Montserrat-SemiBold',
              }}
              onPress={() => {}}
              textColor={COLORS.white}
              borderRadius={1}
              textSize={16}
            />

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

export default OfferDetails;
/** change in coutdown componet - react-na */
