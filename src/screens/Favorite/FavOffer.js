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
import { StoreSkeleton } from '../../utils/Skeleton';
import NoResultLogin from '../../utils/NoResultLogin'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { STRING } from '../../constants';
import { COLORS } from '../../constants/Colors';
import { FONTS } from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import { API_END_POINTS } from '../../network/ApiEndPoints';
import GlobalStyle2 from '../../styles/GlobalStyle2';
import NoResult from '../../utils/NoResult';
import {
  doSaveOfferOffline,
  getSavedOfferAsString,
  isOfferSaved,
} from '../../utils/RealmUtility';
import { OfferSkeleton } from '../../utils/Skeleton';
import { ShowConsoleLogMessage } from '../../utils/Utility';
import OfferCardView from '../Offer/OfferCardView';
import SearchDialog from '../Search';
import PlacePickerLocation from '../Search/PlacePickerLocation';
import PlaceChooseLocation from '../Search/PlaceChooseLocation';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavOffer = ({ navigation, showHeader = false }) => {
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
    getSearchOfferList(searchText, categoryId, radius);
  };
  const getSearchOfferList = (search, catId, radius, location) => {
    let body = {
      latitude: userLat + '',
      longitude: userLong + '',
      current_date: moment().format('yyyy-MM-dd H:m:s'),
      current_tz: 'Asia/Kolkata',
      limit: '30',
      page: '1',
      search: search,
      category_id: catId,
      radius: radius,
      order_by: 'recent',
      offer_ids: '0',
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      date: moment().format('yyyy-MM-dd H:m:s'),
      timezone: 'Asia/Kolkata',
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_GET_OFFERS, {
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

  useEffect(() => {
    if (isFocused) {
      (async function () {
        let ids = await getSavedOfferAsString();
        ShowConsoleLogMessage(ids);
        if (userData) {
          // getOfferList(userData?.id_user);
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
            getOfferList(JSON.parse(value)?.id_user);
          } else {
          }
        }
      });
    } catch (err) {
      crashlytics().recordError(err);

      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const getOfferList = val => {
    if (val != '') {
      setLoading(true);
      let body = {
        limit: '',
        page: '',
        module: 'offer',
        user_id: val,
        guest_id: '',
        device_date: '',
        device_timezone: '',
        lat: userLat + '',
        long: userLong + '',
      };

      // ShowConsoleLogMessage(JSON.stringify(body));

      // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
      ApiCall('post', body, API_END_POINTS.API_GET_FAV_STORE_OFFER, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      })
        .then(response => {
          // ShowConsoleLogMessage(JSON.stringify(response?.data));
          // ShowConsoleLogMessage(JSON.stringify(response?.data));

          if (response?.data?.success == 1) {
            let result = Object.values(response.data?.result);
            //ShowConsoleLogMessage(JSON.stringify(result));
            // setShowError(result.length <= 0);
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
      let is_offer_save = await isOfferSaved(item?.id_offer || item?.offer_id);
      if (is_offer_save === false) {
        // ShowConsoleLogMessage('if part');
        doSaveOfferOffline(item?.id_offer || item?.offer_id);
      } else {
        // ShowConsoleLogMessage('else part');
      }
    });
  };

  const onReloadBtn = () => {
    setShowError(false);
    getOfferList(userData?.id_user);
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
            Favorite Offer
          </Text>
        </View>
      ) : null}
      {/* {!showError ? (
        <FlatList
          data={recentData}
          extraData={recentData}
          ListEmptyComponent={() => {
            return loading ? (
              <OfferSkeleton />
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
          renderItem={({ item }) => {
            return <OfferCardView item={item} />;
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <NoResult onReloadBtn={onReloadBtn} />
        </View>
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
              <OfferSkeleton />
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
          renderItem={({ item }) => {
            return <OfferCardView item={item} />;
          }}
        />   
        ) : (
          <View style={{ flex: 1 }}>
            <NoResult onReloadBtn={onReloadBtn} />
          </View>
        )
      )}

      {/* <NoResult onReloadBtn={onReloadBtn} /> */}

      <SearchDialog
        show={showSearchModal}
        onPress={handleStoreSearchButtonClick}
        title={'offers'}
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
            getOfferList(storeId);
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

export default FavOffer;

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
/**
 *
 let m = resultData.map((item) => {
      return item?.mobile || item?.email;
    });

 mapRef.current.fitToSuppliedMarkers(m, {
      edgePadding: {
        right: 10,
        bottom: 100,
        left: 10,
        top: 100,
      },
      animated: true,
    });
 */
