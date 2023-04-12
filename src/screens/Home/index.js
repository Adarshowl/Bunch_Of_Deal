import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  BackHandler,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle from '../../styles/GlobalStyle';
import BunchDealCommonToolBar from '../../utils/BunchDealCommonToolBar';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import Offer from '../Offer';
import SearchDialog from '../Search';
import PlaceChooseLocation from '../Search/PlaceChooseLocation';
import PlacePickerLocation from '../Search/PlacePickerLocation';
import Store from '../Store';

const Home = ({navigation}) => {
  const [toolbarTitle, setToolbarTitle] = useState('Offers');

  const [percent, setPercent] = useState(true);
  const [storeFront, setStoreFront] = useState(false);

  const [notificationCount, setNotificationCount] = useState(0);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showPlacePickModal, setShowPlacePickModal] = useState(false);
  const [showPlaceChooseModal, setShowPlaceChooseModal] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [radius, setRadius] = useState('');
  const closeSearchModal = () => {
    setUpdate(false);
    setStoreUpdate(false);
    setShowSearchModal(!showSearchModal);
  };
  const closePlacePickModal = () => {
    if (showPlaceChooseModal) {
      closePlaceChooseModal();
    }
    setShowPlacePickModal(!showPlacePickModal);
  };
  const closePlaceChooseModal = () => {
    setShowPlaceChooseModal(!showPlaceChooseModal);
  };

  const [update, setUpdate] = useState(false);
  const [storeUpdate, setStoreUpdate] = useState(false);
  const handleSearchButtonClick = () => {
    closeSearchModal();
    setUpdate(true);
  };

  const handleStoreSearchButtonClick = () => {
    closeSearchModal();
    setStoreUpdate(true);
  };
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserFromStorage();
  }, []);

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
            getNotificationCount(JSON.parse(value)?.id_user); // for now using static
          } else {
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const getNotificationCount = val => {
    let body = {
      user_id: val,
      guest_id: '0',
      // auth_type: '', // if login not sent
      // auth_id: '', // if login sent not
      status: '0', // 0 for getting unread notifications
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_NOTIFICATIONS_COUNT_GET);
    ApiCall('post', body, API_END_POINTS.API_NOTIFICATIONS_COUNT_GET, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(response.data);
          // let result = Object.values(response.data?.result);
          setNotificationCount(response?.data?.result);
        } else {
          setNotificationCount(0);
        }
      })
      .catch(err => {
        setNotificationCount(0);

        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
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
              height: 170,
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
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={[
                  FONTS.body4,
                  {
                    color: COLORS.black,
                    marginTop: 10,
                    paddingHorizontal: 3,
                  },
                ]}>
                By using this App you agree to be bound by the Terms_Conditions
                and Privacy_Policy
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginTop: 30,
                marginHorizontal: 20,
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
    <View style={GlobalStyle.mainContainerBgColor}>
      <View style={GlobalStyle.commonToolbarBG}>
        <BunchDealVectorIcon
          title={Entypo}
          name={'menu'}
          color={COLORS.colorPrimary}
          size={25}
          style={GlobalStyle.marginHorizontal15}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
        <BunchDealCommonToolBar title={toolbarTitle} />
        <BunchDealVectorIcon
          title={Fontisto}
          name={'search'}
          color={COLORS.colorPrimary}
          size={18}
          style={GlobalStyle.marginHorizontal10}
          onPress={() => {
            // ShowToastMessage('Coming soon!');
            // closeSearchModal();
            navigation.navigate('UniversalSearch');
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
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
                backgroundColor: COLORS.colorPromo,
                textAlign: 'center',
                color: COLORS.white,
                position: 'absolute',
                right: 10,
                top: -5,
                paddingHorizontal: 5,
                borderRadius: 5,
              }}>
              {notificationCount}
            </Text>
          ) : null}
        </TouchableOpacity>
      </View>

      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            justifyContent: 'space-around',
            height: 45,
          },
        ]}>
        <Text
          style={[
            FONTS.h6,
            {
              color: percent
                ? COLORS.colorAccent
                : COLORS.shimmer_loading_color,
              fontSize: 16,
            },
          ]}
          onPress={() => {
            setPercent(true);
            setStoreFront(false);
            setToolbarTitle('Offers');
            setUpdate(false);
            setStoreUpdate(false);
          }}>
          Offers
        </Text>
        <Text
          style={[
            FONTS.h6,
            {
              color: storeFront
                ? COLORS.colorAccent
                : COLORS.shimmer_loading_color,
              fontSize: 16,
            },
          ]}
          onPress={() => {
            setPercent(false);
            setStoreFront(true);
            setToolbarTitle('Store');
            setStoreUpdate(false);
            setUpdate(false);
          }}>
          Store
        </Text>
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
          catId={categoryId}
          dataChange={update}
        />
      ) : null}
      {storeFront ? (
        <Store
          searchText={searchText}
          location={STRING.SEARCH_LOCATION}
          radius={radius}
          catId={categoryId}
          dataChange={storeUpdate}
        />
      ) : null}
      <SearchDialog
        show={showSearchModal}
        onPress={
          percent ? handleSearchButtonClick : handleStoreSearchButtonClick
        }
        title={percent ? 'offers' : 'stores'}
        onRequestClose={closeSearchModal}
        searchText={searchText}
        onChangeText={val => {
          setSearchText(val);
        }}
        onCurrentLocationPress={() => {
          // closeSearchModal();
          // closePlacePickModal();
          closePlaceChooseModal();
        }}
        onChangeRadius={val => {
          setRadius(val);
        }}
        onChangeCategoryId={val => {
          setCategoryId(val);
        }}
      />
      <PlacePickerLocation
        navigation={navigation}
        onRequestClose={closePlacePickModal}
        show={showPlacePickModal}
      />

      <PlaceChooseLocation
        navigation={navigation}
        onRequestClose={closePlaceChooseModal}
        onChangeLocation={closePlacePickModal}
        show={showPlaceChooseModal}
      />
      {renderFilterModal()}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
