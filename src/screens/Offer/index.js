import crashlytics from '@react-native-firebase/crashlytics';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import TimeZone from 'react-native-timezone';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icons, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle from '../../styles/GlobalStyle';
import BunchDealImageText from '../../utils/BunchDealImageText';
import BunchDealVectorIconText from '../../utils/BunchDealVectorIconText';
import NoResult from '../../utils/NoResult';
import {OfferSkeleton} from '../../utils/Skeleton';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import OfferCardView from './OfferCardView';
import {useDispatch, useSelector} from 'react-redux';

const Offer = ({
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
  const [nearByData, setNearByData] = useState([]);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);

  // useEffect(() => {
  //   requestLocationPermission(); // Ask for location permission
  // }, []);

  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       getCurrentLocation();
  //     } else {
  //       // Location permission denied
  //       console.log('Location permission denied');
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };

  // const getCurrentLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const { latitude, longitude } = position.coords;
  //       setRecentData({ latitude, longitude });
  //       // Now you have the current location
  //       // Use this location for your API calls
  //     },
  //     error => {
  //       console.log('Error getting location:', error.message);
  //     },
  //     // { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //   );
  // };

  // console.log("check lat long",recentData)
  const dispatch = useDispatch();
  useEffect(() => {
    // const permission = requestLocationPermission(dispatch);
    // setHaveLocationPermission(permission);
    TimeZone?.getTimeZone().then(result => {
      setTimezone(result);
    });
    getOfferList('nearby');
  }, []);

  useEffect(() => {
    if (dataChange) {
      setShowError(false);
      setCurrentRadius(radius);

      if (percent) {
        getSearchOfferList(
          searchText,
          catId,
          radius,
          location,
          0.0,
          0.0,
          changeRadius,
        );
      }
      if (storeFront) {
        getSearchNerbyList(
          searchText,
          catId,
          radius,
          location,
          0.0,
          0.0,
          changeRadius,
        );
      }
    }
  }, [dataChange]);

  const preprocessSearchTerm = search => {
    // Replace common special characters or words with spaces or remove them
    return search
      .replace("'", '') // Remove apostrophes
      .trim(); // Trim leading and trailing spaces
  };

  const [isNearby, setIsNearby] = useState(false);
  const [currentRadius, setCurrentRadius] = useState(radius);

  const getSearchOfferList = (
    search,
    catId,
    radius,
    location,
    latitude,
    longitude,
    changeRadius,
  ) => {
    setLoading(true);

    // Clear the existing store data
    setRecentData([]);
    const preprocessedSearch = preprocessSearchTerm(search);

    let body = {
      latitude: userLat + '',
      longitude: userLong + '',
      // order_by: isNearby ? "nearby" : 'recent',
      order_by: 'nearby',
      offer_ids: '0',
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      limit: '30',
      page: '1',
      search: preprocessedSearch,
      // location: location,
      location: '',
      category_id: catId,
      //radius: changeRadius ? radius + '' : '',
      radius: radius + '' ,
      date: moment().format('yyyy-MM-dd H:m:s'),
      timezone: timeZone,
    };

    // ShowConsoleLogMessage("search data recent", JSON.stringify(body));
    console.log('search data', body);
    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_GET_OFFERS, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // ShowConsoleLogMessage('response 0> ' + JSON.stringify(response?.data));
        // console.log("ofereeeerrrrrrrr",response.data)
        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
          let result = Object.values(response.data?.result);
          // ShowConsoleLogMessage('search result -> ' + JSON.stringify(result));
          setShowError(result.length <= 0);
          setRecentData(result);
        } else {
          setRecentData([]);
          setShowError(true);
        }
      })
      .catch(err => {
        crashlytics().recordError(err);

        // console.log('eorir < ', err);
        ShowConsoleLogMessage('Error in get offer recent api call: ' + err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateRadiusAndSearch = newRadius => {
    // Update the radius value
    setRadius(newRadius);

    // Perform a new search with the updated radius
    getSearchOfferList(
      searchTerm,
      categoryId,
      newRadius,
      location,
      latitude,
      longitude,
    );
  };

  const getSearchNerbyList = (
    search,
    catId,
    radius,
    location,
    latitude,
    longitude,
  ) => {
    setNearByData([]);
    setLoading(true);
    const preprocessedSearch = preprocessSearchTerm(search);
    // console.warn("called method get nerby")

    let body = {
      latitude: userLat + '',
      longitude: userLong + '',
      // order_by: isNearby ? "nearby" : 'recent',
      order_by: 'nearby',

      offer_ids: '0',
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      limit: '30',
      page: '1',
      // location: location,
      location: '',
      search: preprocessedSearch,
      category_id: catId,
      radius: radius,
      date: moment().format('yyyy-MM-dd H:m:s'),
      timezone: timeZone,
    };

    // ShowConsoleLogMessage("search data nerby", JSON.stringify(body));
    console.log(' data nerby', body);
    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_GET_OFFERS, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // ShowConsoleLogMessage('response 0> ' + JSON.stringify(response?.data));
        // console.log("ofereeeerrrrrrrr",response.data)
        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
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
        crashlytics().recordError(err);

        // console.log('eorir < ', err);
        ShowConsoleLogMessage('Error in get offer recent api call: ' + err);
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
      latitude: userLat,
      longitude: userLong,
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

     ShowConsoleLogMessage('normal request -> ' + JSON.stringify(body));
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

  // const getNearbyList = val => {
  //   setLoading(true);
  //   let body = {
  //     latitude: STRING.CURRENT_LAT + '',
  //     longitude: STRING.CURRENT_LONG + '',
  //     order_by: 'nearby',
  //     offer_ids: '0',
  //     token: STRING.FCM_TOKEN,
  //     mac_adr: STRING.MAC_ADR,
  //     limit: '30',
  //     page: '1',
  //     search: '',
  //     date: moment().format('yyyy-MM-dd H:m:s'),
  //     timezone: timeZone,
  //   };

  //   ShowConsoleLogMessage(JSON.stringify(body), '5555555555');

  //   // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
  //   ApiCall('post', body, API_END_POINTS.API_GET_OFFERS, {
  //     Accept: 'application/json',
  //     'Content-Type': 'multipart/form-data',
  //   })
  //     .then(response => {
  //       // ShowConsoleLogMessage('response 1> ' + JSON.stringify(response?.data));
  //       if (response?.data?.success == 1) {
  //         let result = Object.values(response.data?.result);
  //         // ShowConsoleLogMessage(JSON.stringify(result));
  //         setShowError(result.length <= 0);
  //         setNearByData(result);
  //       } else {
  //         setNearByData([]);
  //         setShowError(true);
  //       }
  //     })
  //     .catch(err => {
  //       // console.log('Erro -> ', err);
  //       crashlytics().recordError(err);

  //       ShowConsoleLogMessage('Error in get offer recent api call: ' + err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  // const calculateDistance = (distance) => {

  //   const { latitude: lat1, longitude: lon1 } = location1;
  //   const { latitude: lat2, longitude: lon2 } = location2;
  //   const earthRadius = 6371; // Earth's radius in km

  //   const dLat = ((lat2 - lat1) * Math.PI) / 180;
  //   const dLon = ((lon2 - lon1) * Math.PI) / 180;

  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos((lat1 * Math.PI) / 180) *
  //     Math.cos((lat2 * Math.PI) / 180) *
  //     Math.sin(dLon / 2) * Math.sin(dLon / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const distance = earthRadius * c;

  //   return distance;
  // };

  const formatDistance = distance => {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(0)} km`;
    } else {
      return `${distance.toFixed(0)} m`;
    }
  };

  const calculateDistance = (location1, location2) => {
    const earthRadius = 6371; // Earth's radius in km
    const {latitude: lat1, longitude: lon1} = location1;
    const {latitude: lat2, longitude: lon2} = location2;

    const toRadians = degrees => {
      return (degrees * Math.PI) / 180;
    };

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  };

  const getNearbyList = val => {
    setLoading(true);
    let body = {
      latitude: userLat + '',
      longitude: userLong + '',
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

    ApiCall('post', body, API_END_POINTS.API_GET_OFFERS, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        console.log('Offer Response Arun' + JSON.stringify(response));
        if (response?.data?.success === 1) {
          let result = Object.values(response.data?.result);

          // Calculate distance for each item and add it as a property to the item
          const itemsWithDistance = result.map(item => {
            const distance = calculateDistance(
              {latitude: item.latitude, longitude: item.longitude},
              // {latitude: STRING.CURRENT_LAT, longitude: STRING.CURRENT_LONG},
              {latitude: userLat, longitude: userLong},
            );
            return {...item, distanceFormatted: formatDistance(distance)};
          });

          // Sort the items based on their distances in ascending order (closest to farthest)
          const sortedItems = itemsWithDistance.sort(
            (a, b) => a.distance - b.distance,
          );

          setShowError(sortedItems.length <= 0);
          setNearByData(sortedItems);
        } else {
          setNearByData([]);
          setShowError(true);
        }
      })
      .catch(err => {
        crashlytics().recordError(err);
        ShowConsoleLogMessage('Error in nearby offer api call: ' + err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={GlobalStyle.mainContainerBgColor}>
   
      {/* <View
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
            setIsNearby(false);
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
            setIsNearby(true);
            setStoreFront(true);
            getNearbyList('nearby');
          }}
        />
      </View> */}
      {percent ? (
        <View
          style={{
            flex: 1,
          }}>
          {!showError ? (
            <FlatList
              data={recentData}
              ListEmptyComponent={() => {
                return <OfferSkeleton />;
              }}
              // ListEmptyComponent={() => {
              //   return /*loading ? (*/
              //   <OfferSkeleton />
              //   // ) : (
              //   //   <Text
              //   //     style={{
              //   //       flex: 1,
              //   //       alignSelf: 'center',
              //   //       textAlign: 'center',
              //   //       marginTop: 200,
              //   //       fontSize: 18,
              //   //       fontFamily: 'Quicksand-Medium',
              //   //     }}>
              //   //     No data Found
              //   //   </Text>
              //   // );
              // }}
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
                return <OfferSkeleton />;
              }}
              // ListEmptyComponent={() => {
              //   return /*loading ? (*/
              //   <OfferSkeleton />
              //   // ) : (
              //   //   <Text
              //   //     style={{
              //   //       flex: 1,
              //   //       alignSelf: 'center',
              //   //       textAlign: 'center',
              //   //       marginTop: 200,
              //   //       fontSize: 18,
              //   //       fontFamily: 'Quicksand-Medium',
              //   //     }}>
              //   //     No data Found
              //   //   </Text>
              //   // );
              // }}
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
    </View>
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
