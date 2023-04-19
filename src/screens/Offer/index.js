import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View, Modal, SafeAreaView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icons, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import GlobalStyle from '../../styles/GlobalStyle';
import BunchDealImageText from '../../utils/BunchDealImageText';
import BunchDealVectorIconText from '../../utils/BunchDealVectorIconText';
import {requestLocationPermission} from '../../utils/RequestUserPermission';
import {
  getMacAddress,
  ShowConsoleLogMessage,

} from '../../utils/Utility';
import moment from 'moment';
import OfferCardView from './OfferCardView';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import NoResult from '../../utils/NoResult';
import {OfferSkeleton} from '../../utils/Skeleton';
import TimeZone from 'react-native-timezone';
const Offer = ({
  navigation,
  searchText,
  catId,
  radius,
  location,
  dataChange,
}) => {
  const [percent, setPercent] = useState(true);
  const [storeFront, setStoreFront] = useState(false);
  const [timeZone, setTimezone] = useState('');
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [haveLocationPermission, setHaveLocationPermission] = useState(false);
  const [recentData, setRecentData] = useState([]);
  const [nearByData, setNearByData] = useState([]);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const permission = requestLocationPermission();
    setHaveLocationPermission(permission);
    TimeZone?.getTimeZone().then(result => {
      setTimezone(result);
    });
    getOfferList('recent');
  }, []);

  useEffect(() => {
    if (dataChange) {
      getSearchOfferList(searchText, catId, radius, location);
    }
  }, [dataChange]);

  const getSearchOfferList = (search, catId, radius, location) => {
    setLoading(true);

    let body = {
      latitude: STRING.CURRENT_LAT + '',
      longitude: STRING.CURRENT_LONG + '',
      order_by: 'recent',
      offer_ids: '0',
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      limit: '30',
      page: '1',
      search: search,
      category_id: catId,
      radius: radius,
      date: moment().format('yyyy-MM-dd H:m:s'),
      timezone: timeZone,
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

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
        // console.log('eorir < ', err);
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onReloadBtn = () => {
    getOfferList('rest');
  };

  const getOfferList = val => {
    let body = {
      latitude: STRING.CURRENT_LAT + '',
      longitude: STRING.CURRENT_LONG + '',
      order_by: 'recent',
      offer_ids: '0',
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      limit: '30',
      page: '1',
      search: '',
      date: moment().format('yyyy-MM-dd H:m:s'),
      timezone: timeZone,
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

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
        // console.log('error < ', err);
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  const getNearbyList = val => {
    setLoading(true);
    let body = {
      latitude: STRING.CURRENT_LAT + '',
      longitude: STRING.CURRENT_LONG + '',
      order_by: 'nearby',
      offer_ids: '0',
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      limit: '30',
      page: '1',
      search: '',
      date: moment().format('yyyy-MM-dd H:m:s'),
      timezone: timeZone,
    };

    ShowConsoleLogMessage(JSON.stringify(body), '5555555555');

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_GET_OFFERS, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // ShowConsoleLogMessage('response 1> ' + JSON.stringify(response?.data));
        if (response?.data?.success == 1) {
          let result = Object.values(response.data?.result);
          // ShowConsoleLogMessage(JSON.stringify(result));
          setShowError(result.length <= 0);
          setNearByData(result);
        } else {
          setNearByData([]);
          setShowError(true);
        }
      })
      .catch(err => {
        // console.log('Erro -> ', err);

        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={GlobalStyle.mainContainerBgColor}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            justifyContent: 'space-around',
            height: 45,
          },
        ]}>
        <BunchDealImageText
          source={icons.ic_calendar}
          text={STRING.recent}
          textStyle={[
            FONTS.h6,
            {
              color: percent
                ? COLORS.colorAccent
                : COLORS.shimmer_loading_color,
              marginStart: 10,
            },
          ]}
          style={[
            {
              tintColor: percent
                ? COLORS.colorAccent
                : COLORS.shimmer_loading_color,
            },
            GlobalStyle.homeTabImageStyle,
          ]}
          wrapperStyle={styles.wrapperStyle}
          onPress={() => {
            setPercent(true);
            setStoreFront(false);
            getOfferList('recent');
          }}
        />
        <BunchDealVectorIconText
          title={Ionicons}
          name={'location-sharp'}
          color={storeFront ? COLORS.colorAccent : COLORS.shimmer_loading_color}
          size={20}
          style={GlobalStyle.marginHorizontal5}
          source={icons.ic_storefront}
          text={STRING.nearby}
          textStyle={[
            FONTS.h6,
            {
              color: storeFront
                ? COLORS.colorAccent
                : COLORS.shimmer_loading_color,
            },
          ]}
          wrapperStyle={styles.wrapperStyle}
          onPress={() => {
            setPercent(false);
            setStoreFront(true);
            getNearbyList('nearby');
          }}
        />
      </View>
      {percent ? (
        <View
          style={{
            flex: 1,
          }}>
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
              style={{
                backgroundColor: COLORS.lightGrey,
                marginBottom: 15,
              }}
              renderItem={({item}) => {
                return <OfferCardView item={item} />;
              }}
            />
          ) : (
            <NoResult onReloadBtn={onReloadBtn} />
          )}
        </View>
      ) : null}

      {storeFront ? (
        <View
          style={{
            flex: 1,
          }}>
          {!showError ? (
            <FlatList
              data={nearByData}
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
              style={{
                backgroundColor: COLORS.lightGrey,
                marginBottom: 15,
              }}
              renderItem={({item}) => {
                return <OfferCardView item={item} />;
              }}
            />
          ) : (
            <NoResult onReloadBtn={onReloadBtn} />
          )}
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default Offer;

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
