import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import Fontisto from 'react-native-vector-icons/Fontisto';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle from '../../styles/GlobalStyle';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import Offer from '../Offer';
import SearchDialog from '../Search';
import PlaceChooseLocation from '../Search/PlaceChooseLocation';
import PlacePickerLocation from '../Search/PlacePickerLocation';
import Store from '../Store';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import moment from 'moment';
import notifee, {AndroidImportance} from '@notifee/react-native';

const Home = ({navigation, toolbarTitle}) => {
  // const navigation = useNavigation();
  let userLat = useSelector(state => state?.state?.latitude);
  let userLong = useSelector(state => state?.state?.longitude);
  const handleSearchByTitle = selectedTitle => {
    if (selectedTitle === 'offers') {
      console.log('Performing offer search...');
    } else if (selectedTitle === 'stores') {
      console.log('Performing store search...');
    }
  };

  useEffect(() => {
    let isActive = true;
    const fetchUser = async () => {
      await AsyncStorage.getItem('notification', async (error, value) => {
        ShowConsoleLogMessage(
          'notification home page -> ' + JSON.stringify(value),
        );
        if (error) {
        } else {
          if (value !== null) {
            let temp = JSON.parse(value);
            // let temp = JSON.parse(value);

            // "data":{"module_name":"offer","cam_id":"199","module_id":"111"}
            if (temp?.data?.module_name == 'store') {
              //   4
              // ShowConsoleLogMessage('notification home page if -> ' + value);
              ShowConsoleLogMessage(
                'notification home page else if -> ' +
                  temp?.data?.module_id +
                  ' *** ' +
                  temp?.data?.cam_id,
              );
              navigation.navigate('StoreDetails', {
                item: {
                  store_id: temp?.data?.module_id,
                  // store_id: 4 + '',
                  intentFromNotification: true,
                  cid: temp?.data?.cam_id || '',
                },
              });
            } else if (temp?.data?.module_name == 'offer') {
              //   107
              ShowConsoleLogMessage(
                'notification home page else if -> ' +
                  temp?.data?.module_id +
                  ' *** ' +
                  temp?.data?.cam_id,
              );
              navigation.navigate('OfferDetails', {
                item: {
                  id_offer: temp?.data?.module_id,
                  intentFromNotification: true,
                  cid: temp?.data?.cam_id || '',
                },
              });
            }
          } else {
            ShowConsoleLogMessage('notification home page else -> ' + value);
          }
        }
      });
    };
    // fetchUser();
    return () => {
      isActive = false;
    };
  }, []);

  // useEffect(() => {
  //   // Register event listener for notification clicks
  //   PushNotification.configure({
  //     onNotification: function (notification) {

  //       console.log('Neha Notification clicked!', notification);

  //       alert("hi  click")
  //       if (notification.data) {
  //         console.log('Neha Notification data:', notification.data);
  //       }
  //     },
  //     onNotificationArrived: function (notification) {
  //       // Handle the incoming notification event here
  //       console.log('Notification arrived!', notification);
  //       // Perform any necessary actions based on the incoming notification
  //       alert("hi arrived click")

  //       // (Optional) If the notification has a data payload, you can access it using `notification.data`
  //       if (notification.data) {
  //         console.log('Notification data:', notification.data);
  //       }
  //     },
  //   });

  // const handleNotificationClick = (data) => {
  //   // Handle the notification click event here
  //   // Extract necessary information from the data object
  //   const { module_name, module_id, cam_id } = data;

  //   if (module_name === 'store') {
  //     navigation.navigate('StoreDetails', {
  //       item: {
  //         store_id: module_id,
  //         intentFromNotification: true,
  //         cid: cam_id || '',
  //       },
  //     });
  //   } else if (module_name === 'offer') {
  //     navigation.navigate('OfferDetails', {
  //       item: {
  //         id_offer: module_id,
  //         intentFromNotification: true,
  //         cid: cam_id || '',
  //       },
  //     });
  //   }
  // };

  //  useEffect(() => {
  //     // Register event listener for notification clicks
  //     PushNotification.configure({
  //       onNotification: function (notification) {
  //         console.log('Notification clicked!', notification);
  //         if (notification.data) {
  //           console.log('Notification data:', notification.data);

  //           if (notification.data.module_name === 'store') {
  //             navigation.navigate('StoreDetails', {
  //               store_id: notification.data.module_id,
  //               intentFromNotification: true,
  //               cid: notification.data.cam_id || '',
  //             });
  //           } else if (notification.data.module_name === 'offer') {
  //             navigation.navigate('OfferDetails', {
  //               id_offer: notification.data.module_id,
  //               intentFromNotification: true,
  //               cid: notification.data.cam_id || '',
  //             });
  //           }
  //         }
  //       },
  //       },
  //     );
  //   return () => {
  //     // Clean up the event listener when the component is unmounted
  //     PushNotification.removeListeners();
  //   };
  // }, []);

  const getOfferList = val => {
    let body = {
      latitude: userLat + '',
      longitude: userLong + '',
      order_by: 'recent',
      offer_ids: '0',
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      limit: '30',
      page: '1',
      search: '',
      date: moment().format('yyyy-MM-dd H:m:s'),
      timezone: timeZone,
      // radius:
    };

    ShowConsoleLogMessage('getOfferList kkkk ->>>>' + JSON.stringify(body));
    ShowConsoleLogMessage(
      'getOffer api call ->>>>' + API_END_POINTS.API_GET_OFFERS,
    );

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_GET_OFFERS, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // ShowConsoleLogMessage('response 0> ' + JSON.stringify(response?.data));
        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
          let result = Object.values(response.data?.result);
          // ShowConsoleLogMessage(JSON.stringify(result));
          // let r = result?.forEach(item => {
          //   ShowConsoleLogMessage(JSON.stringify(item?.id_offer));
          // });
          setShowError(result.length <= 0);
          setRecentData(result);
        } else {
          setRecentData([]);
          setShowError(true);
        }
      })
      .catch(err => {
        crashlytics().recordError(err);

        // console.log('error < ', err);
        ShowConsoleLogMessage('Error in get offer recent api call: ' + err);
      })
      .finally(() => {});
  };
  const [toolbarTitleee, setToolbarTitle] = useState('Offers');

  const [percent, setPercent] = useState(true);
  const [storeFront, setStoreFront] = useState(false);

  const [notificationCount, setNotificationCount] = useState(0);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showPlacePickModal, setShowPlacePickModal] = useState(false);
  const [showPlaceChooseModal, setShowPlaceChooseModal] = useState(false);

  const [searchText, setSearchText] = useState('');

  const [categoryId, setCategoryId] = useState('');
  const [changeRadius, setChangeRadius] = useState(false);
  const [radius, setRadius] = useState('');
  const [recentData, setRecentData] = useState([]);

  // const [message, setMessage] = useState(null);

  // const handleNotificationClick = (data) => {
  //   const { module_name, module_id, cam_id } = data;

  //   if (module_name === 'store') {
  //     navigation.navigate('StoreDetails', {
  //       store_id: module_id,
  //       intentFromNotification: true,
  //       cid: cam_id || '',
  //     });
  //   } else if (module_name === 'offer') {
  //     navigation.navigate('OfferDetails', {
  //       id_offer: module_id,
  //       intentFromNotification: true,
  //       cid: cam_id || '',
  //     });
  //   }
  // };

  const closeSearchModal = () => {
    setUpdate(false);
    setStoreUpdate(false);

    setShowSearchModal(!showSearchModal);
  };
  const closePlacePickModal = () => {
    if (showPlaceChooseModal) {
      setShowSearchModal(!showSearchModal);
      setShowPlaceChooseModal(false);
    }
    setShowPlacePickModal(!showPlacePickModal);
    setShowSearchModal(!showSearchModal);
  };
  const closePlaceChooseModal = () => {
    setShowPlaceChooseModal(!showPlaceChooseModal);
    // setShowSearchModal(!showSearchModal);
  };

  const [update, setUpdate] = useState(false);
  const [storeUpdate, setStoreUpdate] = useState(false);
  const handleSearchButtonClick = () => {
    closeSearchModal();
    setUpdate(true);
    setStoreUpdate(false);

    setSearched(true);
  };

  const handleStoreSearchButtonClick = () => {
    closeSearchModal();
    setUpdate(false);
    setStoreUpdate(true);
    setSearched(true);
  };

  const [userData, setUserData] = useState({});

  useEffect(() => {
    // DisplayNotification('were');
    getUserFromStorage();
  }, []);
  const DisplayNotification = async remoteMessage => {
    const channelId = await notifee.createChannel({
      id: 'BUNCH_OF_DEALS',
      name: 'BUNCH_OF_DEALS',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Invoice Downloaded.',
      body: 'BOD_OrderID',

      android: {
        channelId: channelId,
        loopSound: false,
        sound: 'default',
        smallIcon: 'ic_launcher_full_latest',
      },
    });

    notifee.onBackgroundEvent(event => {
      console.log('on background event notifee -=> ' + JSON.stringify(event));
    });
  };
  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem(STRING.isFirstTime, async (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            if (value == 'true') {
              setShowFilterModal(true);
            } else {
              setShowFilterModal(false);
              await AsyncStorage.setItem(STRING.isFirstTime, 'false');
            }
          } else {
          }
        }
      });
      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            // ShowConsoleLogMessage(value);
            setUserData(JSON.parse(value));
            // getNotificationCount(JSON.parse(value)?.id_user); // for now using static
          } else {
          }
        }
      });
    } catch (err) {
      crashlytics().recordError(err);

      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      (async () => {
        await AsyncStorage.getItem('userData', (error, value) => {
          if (error) {
          } else {
            if (value !== null) {
              // setUserData(JSON.parse(value));
              getNotificationCount(JSON.parse(value)?.id_user); // for now using static
            } else {
            }
          }
        });
      })();
    }
  }, [isFocused]);

  const [changeTabOne, setChangeTabOne] = useState(true);
  const [changeTabTwo, setChangeTabTwo] = useState(false);

  const handleTabChange = tabNumber => {
    if (tabNumber === 1) {
      setChangeTabOne(true);
      setChangeTabTwo(false);
      // Optionally, you can perform additional actions here for the "Offers" tab
    } else if (tabNumber === 2) {
      setChangeTabOne(false);
      setChangeTabTwo(true);
      // Optionally, you can perform additional actions here for the "Stores" tab
    }
  };

  // const handleTabChange = () => {
  //   if (!changeTabOne) {
  //     // setPercent(true)
  //     // setStoreFront(false)
  //     setChangeTabOne(true)
  //     setChangeTabTwo(false)
  //   } else if (!changeTabTwo) {
  //     // setPercent(false)
  //     // setStoreFront(true)
  //     setChangeTabOne(false)
  //     setChangeTabTwo(true)
  //   }
  // }

  // const handleSearch = () => {
  //   if (searched) {
  //     // If the user has already searched, clear the search results.
  //     setSearchText(''); // Clear the searchText field
  //   setRadius(''); // Clear the radius value

  //     clearSearchResults();
  //   }

  //   if (changeTabOne) {
  //     setPercent(true);
  //     setStoreFront(false);
  //     handleSearchButtonClick();
  //   } else if (changeTabTwo) {
  //     setPercent(false);
  //     setStoreFront(true);
  //     handleStoreSearchButtonClick();
  //   }
  // };
  const handleSearch = () => {
    // Always clear the searchText field and other relevant fields
    // setSearchText('');
    // setRadius('');
    // clearSearchResults();

    if (changeTabOne) {
      setPercent(true);
      setStoreFront(false);
      // You can also reset other relevant state variables here if needed
      handleSearchButtonClick();
    } else if (changeTabTwo) {
      setPercent(false);
      setStoreFront(true);
      // You can also reset other relevant state variables here if needed
      handleStoreSearchButtonClick();
    }
  };

  // const handleTabChange = () => {
  //   setChangeTabOne((prevValue) => !prevValue);
  //   setChangeTabTwo((prevValue) => !prevValue);
  // };

  const getNotificationCount = val => {
    let body = {
      user_id: val,
      guest_id: '0',
      status: '0', // 0 for getting unread notifications
    };

    ShowConsoleLogMessage(JSON.stringify(body));
    ShowConsoleLogMessage(API_END_POINTS.API_NOTIFICATIONS_COUNT_GET);

    ApiCall('post', body, API_END_POINTS.API_NOTIFICATIONS_GET, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // console.log(
        //   'ERROR IN GET Notification List 4 res=> Shubham ',
        //   JSON.stringify(response),
        // );
        if (response?.data?.status == 1) {
          let count = 0;
          let result = Object.values(response?.data?.result);
          result.forEach(item => {
            if (item?.status == 0) {
              count++;
            }
          });

          setNotificationCount(count);
        } else {
          setNotificationCount(0);
        }

        // if (response?.data?.status == 1) {
        //   let count = 0;
        //   let result = Object.values(response.data?.result);
        //   result.forEach(item => {
        //     if (item?.status == 0) {
        //       count++;
        //     }
        //   });

        //   // Only update the count if there are notifications
        //   if (count > 0) {
        //     console.log("mmnn", count);
        //     setNotificationCount(count);
        //   } else {
        //     setNotificationCount(0); // No notifications, set count to 0
        //   }
      })
      .catch(err => {
        crashlytics().recordError(err);
        setNotificationCount(0);

        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };
  const [searched, setSearched] = useState(false);
  // const [searchText, setSearchText] = useState('');

  const clearSearchResults = () => {
    // Clear the search results and reset other relevant state variables.
    setSearchText('');
    setRadius(''); // Clear the radius value
    // setLocation(''); //
    // Reset other state variables as needed...
    // For example: setRadius(initialRadius), setCategoryId(initialCategoryId)
  };

  // code for privacy popup
  const [showFilterModal, setShowFilterModal] = useState(false);

  const closeFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const renderFilterModal = () => {
    return (
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        onRequestClose={() => closeFilterModal()}
        style={{
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
          // backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-around',
            // backgroundColor: '#00000040',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              width: 340,
              // height: 170,
              backgroundColor: COLORS.white,
              elevation: 20,
              alignSelf: 'center',
              marginVertical: 320,
            }}>
            <View
              style={{
                height: 50,
                backgroundColor: COLORS.colorPrimary,
                // alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  FONTS.body3,
                  {
                    color: COLORS.white,
                    marginStart: 10,
                  },
                ]}>
                Privacy & Policy
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              <Text
                style={[
                  FONTS.body4,
                  {
                    color: COLORS.black,
                    marginTop: 10,
                    paddingHorizontal: 3,
                  },
                ]}>
                By using this App you agree to be bound by the Terms Conditions
                and Privacy Policy
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginTop: 30,
                marginHorizontal: 20,
                marginBottom: 15,
              }}>
              <Text
                onPress={async () => {
                  // await AsyncStorage.setItem(STRING.onBoardComplete, 'false');
                  await AsyncStorage.clear();
                  closeFilterModal();
                  navigation.replace('Auth');
                  BackHandler.exitApp();
                }}
                style={[
                  FONTS.body4,
                  {color: COLORS.colorPrimary, marginHorizontal: 20},
                ]}>
                DECLINE
              </Text>
              <Text
                onPress={async () => {
                  await AsyncStorage.setItem(STRING.isFirstTime, 'false');
                  setRecentData('');
                  closeFilterModal();
                }}
                style={[FONTS.body4, {color: COLORS.colorPrimary}]}>
                ACCEPT
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  };
  // code for privacy popup end

  return (
    <SafeAreaView style={GlobalStyle.mainContainerBgColor}>
      <View style={GlobalStyle.commonToolbarBG}>
        {/*<BunchDealVectorIcon*/}
        {/*  title={Entypo}*/}
        {/*  name={'menu'}*/}
        {/*  color={COLORS.colorPrimary}*/}
        {/*  size={25}*/}
        {/*  style={GlobalStyle.marginHorizontal15}*/}
        {/*  onPress={() => {*/}
        {/*    navigation.toggleDrawer();*/}
        {/*  }}*/}
        {/*/>*/}
        {/* <Button title="Test Crash" onPress={() => crashlytics().crash()} /> */}
        {/* <BunchDealCommonToolBar title={toolbarTitle} /> */}
        <View
          style={[
            // GlobalStyle.commonToolbarBG,
            {
              justifyContent: 'space-between',
              // height: 45,
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            },
          ]}>
          <View
            // style={[
            //   GlobalStyle.commonToolbarBG,
            //   {
            //     justifyContent: 'space-around',
            //     height: 45,
            //   },
            // ]}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // width: 350,
              flex: 1,
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexGrow: 1,
                // height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                marginStart: 10,
              }}
              onPress={() => {
                setPercent(true);
                setStoreFront(false);
                // setToolbarTitle(toolbarTitle);
                setUpdate(false);
                setStoreUpdate(false);
              }}>
              <Text
                style={[
                  FONTS.h6,
                  {
                    color: percent
                      ? COLORS.colorAccent
                      : COLORS.shimmer_loading_color,
                    fontSize: 18,
                  },
                ]}>
                Offers
              </Text>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: COLORS.lightGrey,
                // height: 40,
                width: 0.5,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexGrow: 1,
                // height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                marginEnd: 10,
              }}
              onPress={() => {
                setPercent(false);
                setStoreFront(true);
                // setToolbarTitle(toolbarTitle);
                setStoreUpdate(false);
                setUpdate(false);
              }}>
              <Text
                style={[
                  FONTS.h6,
                  {
                    color: storeFront
                      ? COLORS.colorAccent
                      : COLORS.shimmer_loading_color,
                    fontSize: 18,
                  },
                ]}>
                Stores
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: 0,
            }}>
            <BunchDealVectorIcon
              title={Fontisto}
              name={'search'}
              color={COLORS.colorPrimary}
              size={18}
              style={GlobalStyle.marginHorizontal10}
              onPress={() => {
                // ShowToastMessage('Coming soon!');
                setSearchText('');
                closeSearchModal();
                setChangeRadius(false);
                // navigation.navigate('UniversalSearch');
              }}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notification');
              }}
              activeOpacity={0.9}>
              <BunchDealVectorIcon
                title={MaterialIcons}
                name={'notifications'}
                color={COLORS.colorPrimary}
                size={25}
                style={GlobalStyle.marginHorizontal15}
                onPress={() => {
                  navigation.navigate('Notification');
                }}
              />
              {notificationCount > 0 ? (
                // <Text style={styles.notificationCount}>{notificationCount}</Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Montserrat-Regular',
                    backgroundColor: COLORS.colorPromo,
                    textAlign: 'center',
                    color: COLORS.white,
                    position: 'absolute',
                    right: 8,
                    top: -5,
                    paddingHorizontal: 5,
                    borderRadius: 5,
                  }}>
                  {notificationCount}
                </Text>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: COLORS.lightGrey,
          height: 0.5,
          width: '100%',
        }}
      />
      {percent ? (
        <Offer
          searchText={searchText}
          location={STRING.SEARCH_LOCATION}
          radius={radius}
          changeRadius={changeRadius}
          catId={categoryId}
          dataChange={update}
        />
      ) : null}
      {storeFront ? (
        <Store
          searchText={searchText}
          location={STRING.SEARCH_LOCATION}
          radius={radius}
          changeRadius={changeRadius}
          catId={categoryId}
          dataChange={storeUpdate}
        />
      ) : null}
      {/* <SearchDialog
        show={showSearchModal}
        onPress={handleSearchButtonClick}
        title={percent ? 'offers' : 'stores'}
        onRequestClose={closeSearchModal}
        searchText={searchText}
        onChangeText={val => {
          setSearchText(val);
        }}
        onCurrentLocationPress={() => {
          closeSearchModal();
          closePlacePickModal();
          closePlaceChooseModal();
        }}
        onChangeRadius={val => {
          setRadius(val);
        }}
        onChangeCategoryId={val => {
          setCategoryId(val);
        }}
        onSearchByTitle={handleSearchByTitle} // Pass the function as a prop
      /> */}

      <SearchDialog
        show={showSearchModal}
        onPress={handleSearch}
        // onPress={
        //   // percent ?handleSearchButtonClick  : handleStoreSearchButtonClick
        //   () => {
        //     console.log(changeTabOne + " ----------- changeTabTwo --  " + changeTabTwo)
        //     if (changeTabOne) {
        //       setPercent(true)
        //       setStoreFront(false)
        //       handleSearchButtonClick()
        //     } else if (changeTabTwo) {
        //       setPercent(false)
        //       setStoreFront(true)
        //       handleStoreSearchButtonClick()
        //     }
        //   }
        // }
        title={percent ? 'offers' : 'stores'}
        onRequestClose={closeSearchModal}
        searchText={searchText}
        onChangeText={val => {
          setSearchText(val);
        }}
        onCurrentLocationPress={() => {
          closeSearchModal();
          closePlacePickModal();
          closePlaceChooseModal();
        }}
        // onSearchSelection={(isPercentSelected) => {
        //   setPercent(isPercentSelected);
        //   setStoreFront(!isPercentSelected);
        //   // updateToolbarTitle(isPercentSelected ? 'Offers' : 'Stores'); // Update toolbarTitle
        // }}
        selectedTab={changeTabOne ? 1 : 2} // Pass the selected tab state as a prop
        handleTabChange={handleTabChange}
        onChangeRadius={val => {
          setChangeRadius(true);
          setRadius(val);
        }}
        onchangeLocationdata={val => {}}
        onChangeCategoryId={val => {
          setCategoryId(val);
        }}
        changeOne={changeTabOne}
        changeTwo={changeTabTwo}
      />
      <PlacePickerLocation
        navigation={navigation}
        onRequestClose={closePlacePickModal}
        // onChangeLocation={closePlacePickModal}

        show={showPlacePickModal}
      />

      <PlaceChooseLocation
        navigation={navigation}
        onRequestClose={closePlaceChooseModal}
        onChangeLocation={closePlacePickModal}
        show={showPlaceChooseModal}
      />
      {renderFilterModal()}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
