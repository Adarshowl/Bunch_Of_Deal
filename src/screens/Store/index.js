import crashlytics from '@react-native-firebase/crashlytics';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import TimeZone from 'react-native-timezone';
import {STRING} from '../../constants';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle from '../../styles/GlobalStyle';
import NoResult from '../../utils/NoResult';
import {StoreSkeleton} from '../../utils/Skeleton';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import StoreCardView from './StoreCardView';
import {useDispatch, useSelector} from 'react-redux';

const Store = ({
  navigation,
  searchText,
  catId,
  radius,
  changeRadius,
  location,
  dataChange,
}) => {
  let userLat = useSelector(state => state?.state?.latitude);
  let userLong = useSelector(state => state?.state?.longitude);

  const [percent, setPercent] = useState(true);
  const [storeFront, setStoreFront] = useState(false);

  const [timeZone, setTimezone] = useState('');
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [haveLocationPermission, setHaveLocationPermission] = useState(false);

  const [recentData, setRecentData] = useState([]);

  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const permission = requestLocationPermission();
  //   setHaveLocationPermission(permission);
  //   TimeZone?.getTimeZone().then(result => {
  //     // console.log(result);
  //     setTimezone(result);
  //   });
  //   getStoreList();
  // }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    // const permission = requestLocationPermission(dispatch);
    // setHaveLocationPermission(permission);
    TimeZone?.getTimeZone().then(result => {
      setTimezone(result);
    });

    // Fetch initial store data when the component mounts
    getStoreList('nearby');
  }, []);

  useEffect(() => {
    if (dataChange) {
      console.log('store page');

      setShowError(false);
      getSearchStoreList(searchText, catId, radius, location, changeRadius);
    }
  }, [dataChange]);

  // const preprocessSearchTerm = (search) => {
  //   // Replace common special characters or words with spaces or remove them
  // //   return search
  // //     .replace("'", '') // Remove apostrophes
  // //     .trim(); // Trim leading and trailing spaces
  // // };

  // const getSearchStoreList = (searchText, catId, radius, location) => {

  //   setLoading(true);
  //   setShowError(false);

  //   setRecentData([]);

  //   // const preprocessedSearch = preprocessSearchTerm(search);

  //   setShowError(false);
  //   let body = {
  //     latitude: STRING.CURRENT_LAT + '',
  //     longitude: STRING.CURRENT_LONG + '',
  //     order_by: 'nearby',
  //     current_date: moment().format('yyyy-MM-dd H:m:s'),
  //     current_tz: 'Asia/Kolkata',
  //     limit: '30',
  //     page: '1',
  //     // location:location,
  //     search: searchText,
  //     category_id: catId,
  //     radius: radius,
  //   };

  //   // ShowConsoleLogMessage(JSON.stringify(body));

  //   // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
  //   ApiCall('post', body, API_END_POINTS.API_USER_GET_STORES, {
  //     Accept: 'application/json',
  //     'Content-Type': 'multipart/form-data',
  //   })
  //     .then(response => {
  //       if (response?.data?.success == 1) {
  //         ShowConsoleLogMessage("llllllllllll", JSON.stringify(response));
  //         let result = Object.values(response.data?.result);
  //         ShowConsoleLogMessage(JSON.stringify(result));
  //         setRecentData(result);

  //         setShowError(result.length <= 0);
  //       } else {
  //         setRecentData([]);
  //         setShowError(true);
  //       }
  //     })
  //     .catch(err => {
  //       crashlytics().recordError(err);

  //       ShowConsoleLogMessage('Error in get offer recent api call: ' + err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };
  const getSearchStoreList = (
    search,
    catId,
    radius,
    location,
    changeRadius,
  ) => {
    let stt = [];
    setRecentData(stt);

    setLoading(true);
    setShowError(false);

    // Clear the existing store data before each search
    // setRecentData([]);
    setTimeout(() => {
      console.warn(recentData);
      let body = {
        latitude: userLat + '',
        longitude: userLong + '',
        order_by: 'nearby',
        offer_ids: '0',
        token: STRING.FCM_TOKEN,
        mac_adr: STRING.MAC_ADR,
        date: moment().format('yyyy-MM-dd H:m:s'),
        // current_date: moment().format('yyyy-MM-dd H:m:s'),
        // current_tz: 'Asia/Kolkata',
        limit: '30',
        page: '1',
        // location: location === 'Current Location' ? '' : location,
        location: '',
        search: search,
        category_id: catId,
        // radius: changeRadius ? radius + '' : '',
        radius: radius + '',
        timezone: timeZone,
      };
      // ShowConsoleLogMessage("search store nerby", JSON.stringify(body));
      console.warn('serch store data', body);
      ApiCall('post', body, API_END_POINTS.API_USER_GET_STORES, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      })
        .then(response => {
          if (response?.data?.success == 1) {
            let result = Object.values(response.data?.result);
            // console.warn("store serch result", result)
            setShowError(result.length <= 0);
            setRecentData(result);
          } else {
            setShowError(true);
            setRecentData([]);
          }
        })
        .catch(err => {
          crashlytics().recordError(err);
          // setRecentData([]);

          setShowError(true);
          ShowConsoleLogMessage('Error in get offer recent API call: ' + err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  };

  const onReloadBtn = () => {
    getStoreList('rest');
  };
  const getStoreList = val => {
    // setRecentData([]);

    setLoading(true);
    setShowError(false);
    let body = {
      latitude: userLat + '',
      longitude: userLong + '',
      radius: '',
      category_id: '',
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      search: '',
      order_by: 'nearby',
      offer_ids: '0',

      date: moment().format('yyyy-MM-dd H:m:s'),
      timezone: timeZone,

      // current_date: moment().format('yyyy-MM-dd H:m:s'),
      // current_tz: 'Asia/Kolkata',
      limit: '30',
      page: '1',
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    ShowConsoleLogMessage(
      'abhi cll kiya he ' + API_END_POINTS.API_USER_GET_STORES,
    );
    console.log('store list request ', body);
    ApiCall('post', body, API_END_POINTS.API_USER_GET_STORES, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          let result = Object.values(response?.data?.result);
          // ShowConsoleLogMessage(JSON.stringify(result));

          setShowError(result.length <= 0);
          setRecentData(result);
        } else {
          setShowError(true);
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

  // const onReloadBtn = () => {
  //   getStoreList('rest');
  // };

  return (
    <View style={GlobalStyle.mainContainerBgColor}>
      <View
        style={{
          flex: 1,
        }}>
        {!showError ? (
          <FlatList
            // data={loading ? [] : recentData}
            data={recentData}
            ListEmptyComponent={() => {
              return <StoreSkeleton />;
            }}
            // ListEmptyComponent={() => {
            //   return loading ? (
            //     <StoreSkeleton />
            //   ) : (
            //     <Text
            //       style={{
            //         flex: 1,
            //         alignSelf: 'center',
            //         textAlign: 'center',
            //         marginTop: 200,
            //         fontSize: 18,
            //         fontFamily: 'Quicksand-Medium',
            //       }}>
            //       No data Found
            //     </Text>
            //   );
            // }}
            // keyExtractor={item => item?.id_store}
            // kya
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
