import crashlytics from '@react-native-firebase/crashlytics';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle2 from '../../styles/GlobalStyle2';
import NoResult from '../../utils/NoResult';
import {
  getSavedOfferAsString,
  isStoreReviewSaved,
} from '../../utils/RealmUtility';
import {OfferSkeleton} from '../../utils/Skeleton';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import OfferCardView from '../Offer/OfferCardView';
import SearchDialog from '../Search';
import PlacePickerLocation from '../Search/PlacePickerLocation';
import PlaceChooseLocation from '../Search/PlaceChooseLocation';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';

const FavOffer = ({navigation}) => {
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
      latitude: STRING.CURRENT_LAT + '',
      longitude: STRING.CURRENT_LONG + '',
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
      .finally(() => {});
  };

  useEffect(() => {
    (async function () {
      let ids = await getSavedOfferAsString();
      ShowConsoleLogMessage(ids);
      getOfferList(ids);
      setStoreId(ids);
    })();
  }, [isFocused]);

  const getOfferList = val => {
    if (val != '') {
      setLoading(true);
      let body = {
        latitude: STRING.CURRENT_LAT + '',
        longitude: STRING.CURRENT_LONG + '',
        order_by: 'recent',
        offer_ids: val,
        token: STRING.FCM_TOKEN,
        mac_adr: STRING.MAC_ADR,
        limit: '30',
        page: '1',
        search: '',
        date: moment().format('yyyy-MM-dd H:m:s'),
        timezone: '',
      };

      ShowConsoleLogMessage(JSON.stringify(body));

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

  const onReloadBtn = () => {
    setShowError(false);
    getOfferList(storeId);
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.backgroundColor, flex: 1}}>
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

        <View
          style={{
            padding: 10,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <Ionicons
            onPress={() => {
              setShowError(false);

              closeSearchModal();
              // navigation.navigate('UniversalSearch');
            }}
            marginEnd={5}
            color={COLORS.colorPrimary}
            name="search"
            size={20}
          />
        </View>
      </View>
      {!showError ? (
        <FlatList
          data={recentData}
          ListEmptyComponent={() => {
            return loading ? (
              <OfferSkeleton />
            ) : (
              <Text
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginTop: 200,
                  fontSize: 18,
                  fontFamily: 'Quicksand-Medium',
                }}>
                No data Found
              </Text>
            );
          }}
          // style={{
          //   backgroundColor: COLORS.lightGrey,
          //   marginBottom: 15,
          // }}
          renderItem={({item}) => {
            return <OfferCardView item={item} />;
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
          }}>
          <NoResult onReloadBtn={onReloadBtn} />
        </View>
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
