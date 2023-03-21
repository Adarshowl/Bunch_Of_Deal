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

const Store = ({navigation}) => {
  const [percent, setPercent] = useState(true);
  const [storeFront, setStoreFront] = useState(false);

  const [timeZone, setTimezone] = useState('');
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [haveLocationPermission, setHaveLocationPermission] = useState(false);

  const [recentData, setRecentData] = useState([]);

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const permission = requestLocationPermission();
    setHaveLocationPermission(permission);
    Timezone.getTimeZone().then(result => {
      // console.log(result);
      setTimezone(result);
    });
    getStoreList();
  }, []);

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

  return (
    <View style={GlobalStyle.mainContainerBgColor}>
      {percent ? (
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={recentData}
            style={{
              backgroundColor: COLORS.lightGrey,
              marginBottom: 15,
            }}
            renderItem={({item}) => {
              return <StoreCardView item={item} />;
            }}
          />
        </View>
      ) : null}
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
