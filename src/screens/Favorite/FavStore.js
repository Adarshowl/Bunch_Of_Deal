import crashlytics from '@react-native-firebase/crashlytics';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { STRING } from '../../constants';
import NoResultLogin from '../../utils/NoResultLogin'

import { COLORS } from '../../constants/Colors';
import { FONTS } from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import { API_END_POINTS } from '../../network/ApiEndPoints';
import GlobalStyle2 from '../../styles/GlobalStyle2';
import NoResult from '../../utils/NoResult';
import {
  doSaveStoreOffline,
  getSavedStoreAsString,
  isStoreSaved,
} from '../../utils/RealmUtility';
import { StoreSkeleton } from '../../utils/Skeleton';
import { ShowConsoleLogMessage } from '../../utils/Utility';
import StoreCardView from '../Store/StoreCardView';
import SearchDialog from '../Search';
import PlacePickerLocation from '../Search/PlacePickerLocation';
import PlaceChooseLocation from '../Search/PlaceChooseLocation';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavStore = ({ navigation, showHeader = false }) => {
  let userLat = useSelector(state => state?.state?.latitude);
  let userLong = useSelector(state => state?.state?.longitude);

  const [storeId, setStoreId] = useState('');
  const [showError, setShowError] = useState(false);
  const [recentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();

  const [searchText, setSearchText] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [radius, setRadius] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [showPlaceChooseModal, setShowPlaceChooseModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [showPlacePickModal, setShowPlacePickModal] = useState(false);
  const [showClear, setShowClear] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const checkLoginStatus = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);
  const closeSearchModal = () => {
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
  const handleStoreSearchButtonClick = () => {
    setShowClear(true);

    closeSearchModal();
    getSearchStoreList(searchText, categoryId, radius);
  };

  useEffect(() => {
    if (isFocused) {
      (async function () {
        let ids = await getSavedStoreAsString();
        ShowConsoleLogMessage(ids);
        if (userData) {
          // getStoreList(userData?.id_user);
          getUserFromStorage();
        }
        setStoreId(ids);
      })();
    }
  }, [isFocused]);

  const [userData, setUserData] = useState({});

  // useEffect(() => {
  //   getUserFromStorage();
  // }, []);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            // ShowConsoleLogMessage(value);
            setUserData(JSON.parse(value));
            getStoreList(JSON.parse(value)?.id_user);
          } else {
          }
        }
      });
    } catch (err) {
      crashlytics().recordError(err);

      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const getSearchStoreList = (search, catId, radius, location) => {
    let body = {
      order_by: 'recent',
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      date: moment().format('yyyy-MM-dd H:m:s'),
      timezone: 'Asia/Kolkata',
      latitude: userLat + '',
      longitude: userLong + '',
      current_date: moment().format('yyyy-MM-dd H:m:s'),
      current_tz: 'Asia/Kolkata',
      limit: '30',
      page: '1',
      search: search,
      category_id: catId,
      offer_ids: '0',
      radius: radius,
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
          setRecentData(result);
        } else {
          setRecentData([]);
        }
      })
      .catch(err => {
        crashlytics().recordError(err);

        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => { });
  };

  const getStoreList = val => {
    if (val != '') {
      setLoading(true);
      let body = {
        limit: '',
        page: '',
        module: 'store',
        user_id: val,
        guest_id: '',
        device_date: '',
        device_timezone: '',

        lat: userLat + '',
        long: userLong + '',
      };

      ShowConsoleLogMessage(JSON.stringify(body));

      // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
      ApiCall('post', body, API_END_POINTS.API_GET_FAV_STORE_OFFER, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      })
        .then(response => {
          // ShowConsoleLogMessage(
          //   'response 0> ' + JSON.stringify(response?.data),
          // );
          if (response?.data?.success == 1) {
            // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
            let result = Object.values(response.data?.result);
            // ShowConsoleLogMessage(JSON.stringify(result));
            storeOffline(result);
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
          ShowConsoleLogMessage(
            'Error in get offer recent api call: ' + err.message,
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setShowError(true);
    }
  };

  const storeOffline = data => {
    data?.forEach(async item => {
      let is_offer_save = await isStoreSaved(item?.id_store);

      if (is_offer_save === false) {
        // ShowConsoleLogMessage('if part');
        doSaveStoreOffline(item?.id_store || item?.store_id);
      } else {
        // ShowConsoleLogMessage('else part');
      }
    });
  };

  const onReloadBtn = () => {
    setShowError(false);

    getStoreList(userData?.id_user);
  };

  const ReloadLogin = () => {
    navigation.navigate('Auth', {
      screen: 'Login',
      params: {
        screen: 'Login',
      },
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.backgroundColor, flex: 1 }}>
      {showHeader == false ? (
        <View
          style={[
            GlobalStyle2.headerFooterStyle,
            {
              maxHeight: 56,
            },
          ]}>
          <Ionicons
            onPress={() => {
              navigation.goBack();
            }}
            marginStart={15}
            color={COLORS.colorPrimary}
            name="ios-arrow-back-sharp"
            size={25}
          />

          <Text
            style={[
              FONTS.body2,
              {
                color: COLORS.colorPrimary,
                marginHorizontal: 10,
              },
            ]}>
            My stores
          </Text>
        </View>
      ) : null}

      {/* {!showError ? (
        <FlatList
          data={recentData}
          extraData={recentData}
          ListEmptyComponent={() => {
            return loading ? (
              <StoreSkeleton />
            ) : null;
            // <Text
            //   style={{
            //     flex: 1,
            //     alignSelf: 'center',
            //     textAlign: 'center',
            //     marginTop: 200,
            //     fontSize: 18,
            //     fontFamily: 'Montserrat-Regular',
            //   }}>
            //   No data found
            // </Text>
          }}
          renderItem={({item}) => {
            return <StoreCardView item={item} />;
          }}
        />
      ) : (
        <NoResult onReloadBtn={onReloadBtn} />
      )} */}
      {!isLoggedIn ? (

        <View style={{ flex: 1 }}>
          <NoResultLogin onReloadBtn={ReloadLogin} />
        </View>
      ) : (
        !showError ? (
          <FlatList
          data={recentData}
          extraData={recentData}
          ListEmptyComponent={() => {
            return loading ? (
              <StoreSkeleton />
            ) : null;
            // <Text
            //   style={{
            //     flex: 1,
            //     alignSelf: 'center',
            //     textAlign: 'center',
            //     marginTop: 200,
            //     fontSize: 18,
            //     fontFamily: 'Montserrat-Regular',
            //   }}>
            //   No data found
            // </Text>
          }}
          renderItem={({item}) => {
            return <StoreCardView item={item} />;
          }}
        />
        ) : (
          <View style={{ flex: 1 }}>
            <NoResult onReloadBtn={onReloadBtn} />
          </View>
        )
      )}
      <SearchDialog
        show={showSearchModal}
        onPress={handleStoreSearchButtonClick}
        title={'stores'}
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
        onChangeCategoryId={(val, name) => {
          setCategoryId(val);
          setCategoryName(name);
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
      {showClear ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setShowClear(false);
            setShowError(false);
            getStoreList(storeId);
          }}
          style={{
            padding: 10,
            backgroundColor: COLORS.colorPrimary,
            position: 'absolute',
            bottom: 10,
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            width: '30%',
            borderRadius: 30,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: COLORS.white,
              fontSize: 18,
            }}>
            Clear
          </Text>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};

export default FavStore;

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    color: COLORS.white,
    marginTop: 15,
    fontFamily: 'Montserrat-Medium',
  },
  email: {
    fontSize: 14,
    color: COLORS.white,
    fontFamily: 'Montserrat-Medium',
  },
});
