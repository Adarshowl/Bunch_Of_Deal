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
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import {Rating, AirbnbRating} from 'react-native-elements';

import {Image} from 'react-native-elements';
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
import {COLORS} from '../../constants/Colors';
import {FONTS, SIZES} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle from '../../styles/GlobalStyle';
import GlobalStyle1 from '../../styles/GlobalStyle1';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import {STRING} from '../../constants';
import BunchDealEditText from '../../utils/EditText/BunchDealEditText';

// import {ShowToastMessage} from '../../../utils/Utility';

const TestStoreDetail = ({navigation, route}) => {
  const [changeOne, setChangeOne] = useState(true);
  const [changeTwo, setChangeTwo] = useState(false);
  const [changeThree, setChangeThree] = useState(false);

  const [imageUrl, setImageUrl] = useState('');

  const [catImageUrl, setCatImageUrl] = useState('');
  const [receivedData, setReceivedData] = useState({});
  const [haveContactPermission, setHaveContactPermission] = useState({});

  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserFromStorage();
  }, []);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            // ShowConsoleLogMessage(value);
            setUserData(JSON.parse(value));
          } else {
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const triggerCall = () => {
    let m = receivedData?.telephone + '';
    // if (m.includes('+91')) {
    //   m.replace('+91');
    // } else {
    //   m.replace('+91');
    // }
    // ShowConsoleLogMessage(m);
    try {
      Linking.openURL(`tel:${m}`);
    } catch (error) {}
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
      Alert.alert(error.message);
    }
  };

  const getStoreList = val => {
    let body = {
      limit: '1',
      store_id: val,
    };

    ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_USER_GET_STORES, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          ShowConsoleLogMessage(JSON.stringify(response?.data));
          let result = Object.values(response.data?.result);
          setReceivedData(result[0]);
          setImageUrl(result[0]?.images['0']['560_560'].url);

          var res = [];

          try {
            Object.values(result[0]?.images).forEach((key, index) => {
              res.push(key['560_560' || 'full']?.url + '');
            });
          } catch (err) {}

          setImages(res);

          setCatImageUrl(result[0]?.images['0']['560_560'].url);
        } else {
        }
      })
      .catch(err => {
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };
  const [favorite, setFavorite] = useState(false);

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
          ShowToastMessage('Saved');
        } else {
          setFavorite(false);
        }
      })
      .catch(err => {
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
          ShowToastMessage('Unsaved');
        } else {
          setFavorite(false);
        }
      })
      .catch(err => {
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  useEffect(() => {
    let {item} = route.params;
    // ShowConsoleLogMessage(item);
    if (item?.intentFromNotification) {
      getStoreList(item?.store_id);
      getOfferList(item?.store_id);
      getReviewList(item?.store_id);
      getGalleryList(item?.store_id);
    } else {
      if (item?.store_id != undefined || null) {
        getStoreList(item?.store_id);
        getOfferList(item?.store_id);
        getReviewList(item?.store_id);
        getGalleryList(item?.store_id);
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
        } catch (err) {}
        // console.log(res, ' -> res');
        setImages(res);

        setImageUrl(item?.images['0']['560_560'].url);
        setCatImageUrl(item?.images['0']['200_200'].url);
      }
    }
  }, []);

  // 1. Define a function outside the component:
  const onViewableItemsChanged = info => {
    // console.log('onViewableItemsChanged => ', info?.viewableItems[0]?.index);
    setActiveIndex(info?.viewableItems[0]?.index + 1);
  };

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // console.log('use effect active index -> ', activeIndex);
  }, [activeIndex]);

  // 2. create a reference to the function (above)
  const viewabilityConfigCallbackPairs = useRef([{onViewableItemsChanged}]);

  const [images, setImages] = useState([]);
  const bigPhotoRef = useRef();

  const [showImageModal, setShowImageModal] = useState('');

  const closeImageModal = () => {
    setShowImageModal(!showImageModal);
    if (showImageModal) {
      setActiveIndex(0);
    }
  };

  const renderBigPhotoItems = ({item, index}) => {
    return (
      <View
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
            <TouchableOpacity
              onPress={() => {
                // closeImageModal();
              }}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
              }}>
              <AntDesign
                name="close"
                size={25}
                color={COLORS.white}
                style={{
                  marginHorizontal: 20,
                  // marginTop: 60,
                  opacity: 0.0,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                color: COLORS.white,
                textAlign: 'center',
                marginTop: 30,
                fontFamily: 'Montserrat-Medium',
              }}>
              {images.length > 1 ? `${activeIndex}/${images.length}` : ''}
            </Text>
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
  const openMap = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${receivedData?.latitude},${receivedData?.longitude}`;
    const label = receivedData?.name;
    // const label = 'Open Google Map';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  const [scrollHeight, setScrollHeight] = useState(0);
  const windowHeight = Dimensions.get('window').height;

  const handleScrollLayout = event => {
    const {height} = event.nativeEvent.layout;
    setScrollHeight(height);
  };

  /**offer page code start */
  const [offerListData, setOfferListData] = useState([]);
  const getOfferList = val => {
    let body = {
      store_id: val,
      page: '1',
      limit: '7',
      date: moment().format('yyyy-MM-dd H:m:s'),
      // timezone: '',
    };

    ShowConsoleLogMessage(JSON.stringify(body));

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
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  const renderOfferItem = ({item}) => {
    // ShowConsoleLogMessage(item);
    // let imageUrl = item.images['0']['560_560'].url;
    return (
      <TouchableOpacity
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
            flex: 1,
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

  const addReview = () => {
    if (parseInt(rate) > 0) {
      let body = {
        store_id: receivedData?.id_store,
        rate: rate.toString(),
        review: password,
        guest_id: '1',
        user_id: userData?.id_user,
        pseudo: userData?.username,
        token: 'fjksdjfksdfkdsjflsdjflsdkj',
        mac_adr: '02:00:00:00:00:00',
      };

      ShowConsoleLogMessage(JSON.stringify(body));

      // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
      ApiCall('post', body, API_END_POINTS.API_RATING_STORE, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      })
        .then(response => {
          ShowConsoleLogMessage(JSON.stringify(response));
          if (response?.data?.success == 1) {
            getReviewList(receivedData?.id_store);
          } else {
            ShowConsoleLogMessage('Unable to add review');
          }
        })
        .catch(err => {
          ShowConsoleLogMessage(
            'Error in get offer recent api call: ' + err.message,
          );
        })
        .finally(() => {});
    } else {
      ShowToastMessage('Please select from 1 star to 5 star');
    }
  };

  function ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
    setRate(rating);
  }
  const [password, setPassword] = useState('');

  const [rate, setRate] = useState(3);

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
              onPress={() => {
                addReview();
                closeAddReviewModal();
              }}
              marginTop={40}
              borderRadius={1}
              textSize={14}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const renderReviewItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          GlobalStyle1.StoreBOX,
          {
            marginHorizontal: 5,
          },
        ]}>
        <BunchDealImageLoader
          defaultImg={images.def_logo}
          source={item?.image}
          styles={{
            width: 50,
            height: 50,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: COLORS.lightGrey,
            marginTop: 5,
          }}
        />
        <View
          style={{
            marginTop: 5,
            marginEnd: 15,
            marginStart: 10,
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                {
                  color: COLORS.black,
                  fontSize: 14,
                  fontFamily: 'Montserrat-Regular',
                  flex: 1,
                },
              ]}
              numberOfLines={2}>
              {item?.pseudo}
            </Text>
            <AirbnbRating
              count={5}
              isDisabled={true}
              showRating={false}
              defaultRating={parseInt(item?.rate)}
              size={15}
            />
          </View>
          <Text
            style={[
              {
                color: COLORS.shimmer_loading_color_darker,
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
              },
            ]}>
            {item?.review}
          </Text>
        </View>
      </TouchableOpacity>
      // <Text>hi</Text>
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
          // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
          let result = Object.values(response.data?.result);
          // ShowConsoleLogMessage(JSON.stringify(result));
          setGalleryListData(result);
        } else {
          setGalleryListData([]);
        }
      })
      .catch(err => {
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  const renderGalleryItem = ({item}) => {
    // ShowConsoleLogMessage(item);
    let imageUrl = item['200_200'].url;
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <BunchDealImageLoader
          defaultImg={images.def_logo}
          source={imageUrl}
          styles={[
            {
              width: SIZES.width / 4.6,
              height: 80,
              alignSelf: 'center',
              marginVertical: 3,
              marginHorizontal: 3,
            },
          ]}
        />
      </TouchableOpacity>
    );
  };

  /** gallery end */

  return (
    <SafeAreaView
      style={GlobalStyle1.mainContainerBgColor}
      showsVerticalScrollIndicator={false}>
      <ScrollView
        // contentContainerStyle={{
        //   flexGrow: 1,
        // }}
        nestedScrollEnabled={true}>
        <View style={{}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              closeImageModal();
            }}>
            <BunchDealImageLoader
              defaultImg={images.def_logo}
              source={imageUrl + ''}
              styles={GlobalStyle1.store_image}
            />
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
                }}></View>
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
        {/* <View
          style={{
            // marginHorizontal: 8,
            // backgroundColor: COLORS.white,
            // paddingVertical: 5,
            // marginTop: 12,
            // minHeight: 350,
            // flexGrow: 1,
            // flex: 1,
            marginHorizontal: 8,
            backgroundColor: COLORS.white,
            paddingVertical: 5,
            marginTop: 12,
            flexGrow: 1,
            flex: 1,
          }}>
          <TopTabBar
            tabBarOptions={{style: {height: tabBarHeight}}}
            items={receivedData}
          />
        </View> */}
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
              key={route.name}
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
                backgroundColor: changeOne ? COLORS.white : COLORS.colorAccent,
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
              key={route.name}
              accessibilityRole="button"
              onPress={onPress => {
                setChangeTwo(true);
                setChangeThree(false);
                setChangeOne(false);
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 45,
                backgroundColor: changeTwo ? COLORS.white : COLORS.colorAccent,
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

            <TouchableOpacity
              key={route.name}
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
                renderItem={renderOfferItem}
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
                  renderItem={renderReviewItem}
                />
              </ScrollView>
              <BunchDealCommonBtn
                height={40}
                backgroundColor={COLORS.colorPrimary}
                marginHorizontal={5}
                text={STRING.add_review}
                textStyle={FONTS.body3}
                textColor={COLORS.white}
                onPress={() => {
                  closeAddReviewModal();
                }}
                marginTop={25}
                borderRadius={1}
                textSize={16}
              />
            </View>
          ) : null}
          {changeThree ? (
            <View
              style={{
                justifyContent: 'center',
              }}>
              <FlatList
                data={galleryListData}
                style={{
                  marginTop: 5,
                }}
                // data={[
                //   'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
                //   'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
                //   'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
                //   'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg',
                //   'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg',
                //   'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg',
                //   'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg',
                // ]}
                keyExtractor={item => item?.id_store}
                renderItem={renderGalleryItem}
                numColumns={4}
              />
            </View>
          ) : null}
        </View>
        <View
          style={{
            flex: 1,
            marginTop: changeTwo ? (reviewListData?.length > 5 ? 100 : 30) : 20,
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
              onPress={() => {
                openMap();
              }}
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
                if (favorite) {
                  unSaveOnline();
                } else {
                  doSaveOnline();
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
                paddingHorizontal: 15,
              },
            ]}>
            <Text
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
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                marginBottom: 15,
              },
            ]}>
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
                showsMyLocationButton={false}
                zoomEnabled={true}
                region={{
                  latitude: parseFloat(receivedData?.latitude) || 0.0,
                  longitude: parseFloat(receivedData?.longitude) || 0.0,
                  latitudeDelta: 0,
                  longitudeDelta: 0,
                }}>
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
          <View
            style={{
              padding: 10,
            }}></View>
        </View>
      </ScrollView>

      <LinearGradient
        colors={['#00000090', '#00000090', COLORS.transparent]}
        style={GlobalStyle.offerDetailToolBar}>
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
              // marginHorizontal: 15,
            }}
            onPress={() => {
              onShare();
            }}
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

      {renderImageModal()}
      {renderAddReviewModal()}
    </SafeAreaView>
  );
};

export default TestStoreDetail;
const styles = StyleSheet.create({
  container: {
    height: SIZES.width,
    flex: 1,
  },
  mapcontainer: {
    flex: 1,
    width: SIZES.width,
    height: SIZES.height,
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
    height: SIZES.width - 120,
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
