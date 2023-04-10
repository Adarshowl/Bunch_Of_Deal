import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
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
  Timezone,
} from '../../utils/Utility';
import moment from 'moment';
import StoreCardView from './StoreCardView';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import NoResult from '../../utils/NoResult';
import {StoreSkeleton} from '../../utils/Skeleton';

const Store = ({
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

  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const permission = requestLocationPermission();
    setHaveLocationPermission(permission);
    Timezone.getTimeZone().then(result => {
      // console.log(result);
      setTimezone(result);
    });
    getStoreList();
  }, []);

  useEffect(() => {
    if (dataChange) {
      console.log('store page');
      getSearchStoreList(searchText, catId, radius, location);
    }
  }, [dataChange]);
  const getSearchStoreList = (search, catId, radius, location) => {
    setLoading(true);
    let body = {
      latitude: STRING.CURRENT_LAT + '',
      longitude: STRING.CURRENT_LONG + '',
      order_by: 'nearby',
      current_date: moment().format('yyyy-MM-dd H:m:s'),
      current_tz: 'Asia/Kolkata',
      limit: '30',
      page: '1',
      search: search,
      category_id: catId,
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
          // ShowConsoleLogMessage(JSON.stringify(response?.data));
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
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getStoreList = val => {
    let body = {
      latitude: STRING.CURRENT_LAT + '',
      longitude: STRING.CURRENT_LONG + '',
      radius: '',
      category_id: '',
      search: '',
      order_by: 'nearby',
      current_date: moment().format('yyyy-MM-dd H:m:s'),
      current_tz: 'Asia/Kolkata',
      limit: '30',
      page: '1',
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_USER_GET_STORES, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
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
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  const onReloadBtn = () => {
    getStoreList('rest');
  };
  return (
    <View style={GlobalStyle.mainContainerBgColor}>
      <View
        style={{
          flex: 1,
        }}>
        {!showError ? (
          <FlatList
            data={recentData}
            ListEmptyComponent={() => {
              return loading ? (
                <StoreSkeleton />
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
            renderItem={({item}) => {
              return <StoreCardView item={item} />;
            }}
          />
        ) : (
          <NoResult onReloadBtn={onReloadBtn} />
        )}
      </View>
    </View>
  );
};

export default Store;

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// 1. no internet connection
// 2. firebase connection and crashlytics
