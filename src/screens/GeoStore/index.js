import Geolocation from '@react-native-community/geolocation';
import crashlytics from '@react-native-firebase/crashlytics';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AirbnbRating} from 'react-native-elements';
import MapView, {AnimatedRegion, Marker} from 'react-native-maps';

import TimeZone from 'react-native-timezone';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {images, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import SearchDialog from '../Search';
import PlaceChooseLocation from '../Search/PlaceChooseLocation';
import PlacePickerLocation from '../Search/PlacePickerLocation';
import {useSelector} from 'react-redux';

var {width, height} = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ASPECT_RATIO = windowWidth / windowHeight;
const LATITUDE_DELTA = 0.9222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const apiKey = 'AIzaSyCIcyfvlmMVSAxxvPTASWasIN8ncskIj0w';

const GeoStore = ({navigation}) => {
  let userLat = useSelector(state => state?.state?.latitude);

  let userLong = useSelector(state => state?.state?.longitude);

  const [percent, setPercent] = useState(true);

  const [changeTabOne, setChangeTabOne] = useState(true);
  const [changeTabTwo, setChangeTabTwo] = useState(false);
  const [changeRadius, setChangeRadius] = useState(false);

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

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showPlacePickModal, setShowPlacePickModal] = useState(false);
  const [radius, setRadius] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [showPlaceChooseModal, setShowPlaceChooseModal] = useState(false);
  const [location, setLocation] = useState(null);
  const closeSearchModal = () => {
    setShowSearchModal(!showSearchModal);
  };

  const handleStoreSearchButtonClick = () => {
    if (changeTabOne) {
      closeSearchModal();
      console.log(searchText + ' -- ' + categoryId + ' -- ' + radius);

      getSearchOfferList(searchText, categoryId, radius);
    } else if (changeTabTwo) {
      closeSearchModal();
      getSearchStoreList(searchText, categoryId, radius, changeRadius);
    }
  };
  const closePlacePickModal = () => {
    // if (showPlaceChooseModal) {
    //   setShowSearchModal(!showSearchModal);
    //   setShowPlaceChooseModal(false);
    // }
    setShowPlacePickModal(false);
    setShowPlaceChooseModal(false);
    setShowSearchModal(true);
  };

  const closePlaceChooseModalRequestClose = () => {
    setShowPlaceChooseModal(false);

    setShowSearchModal(false);
    setShowPlacePickModal(!showPlacePickModal);
  };

  const preprocessSearchTerm = search => {
    // Replace common special characters or words with spaces or remove them
    return search
      .replace("'", '') // Remove apostrophes
      .trim(); // Trim leading and trailing spaces
  };

  const getSearchOfferList = (search, catId, radius) => {
    setLoading(true);

    // Clear the existing store data
    setRecentData([]);
    const preprocessedSearch = preprocessSearchTerm(search);

    let body = {
      latitude: userLat + '',
      longitude: userLong + '',
      // order_by: isNearby ? "nearby" : 'recent',
      order_by: 'recent',
      offer_ids: '0',
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      limit: '30',
      page: '1',
      search: preprocessedSearch,
      // location: location,
      location: '',
      category_id: catId,
      radius: changeRadius ? radius + '' : '',
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
        ShowConsoleLogMessage('response 0> ' + JSON.stringify(response?.data));
        // console.log("ofereeeerrrrrrrr",response.data)
        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
          let result = Object.values(response.data?.result);
          // ShowConsoleLogMessage('search result -> ' + JSON.stringify(result));

          setRecentData(result);
        } else {
          setRecentData([]);
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
  const closePlaceChooseModal = () => {
    setShowPlaceChooseModal(!showPlaceChooseModal);
  };

  const getSearchStoreList = (search, catId, radius, changeRadius) => {
    setLoading(true);

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
        radius: changeRadius ? radius + '' : '',
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

            setRecentData(result);
          } else {
            setRecentData([]);
          }
        })
        .catch(err => {
          crashlytics().recordError(err);
          // setRecentData([]);

          ShowConsoleLogMessage('Error in get offer recent API call: ' + err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  };

  // const getSearchStoreList = (search, catId, radius, location) => {
  //   let body = {
  //     latitude: userLat + '',
  //     longitude: userLong + '',
  //     order_by: 'nearby',
  //     current_date: moment().format('yyyy-MM-dd H:m:s'),
  //     current_tz: 'Asia/Kolkata',
  //     limit: '30',
  //     page: '1',
  //     search: search,
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
  //         let result = Object.values(response.data?.result);
  //         setRecentData(result);
  //       } else {
  //         setRecentData([]);
  //       }
  //     })
  //     .catch(err => {
  //       crashlytics().recordError(err);

  //       ShowConsoleLogMessage(
  //         'Error in get offer recent api call: ' + err.message,
  //       );
  //     })
  //     .finally(() => {});
  // };

  const [loading, setLoading] = useState(false);
  const markerRef = useRef();
  const mapRef = useRef();
  const [timeZone, setTimezone] = useState('');
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [coordinate, setCoordinate] = useState(
    new AnimatedRegion({
      latitude: 0.0,
      longitude: 0.0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
  );

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message:
                'This App needs to Access your location for easy delivery of your products/foods.',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
          }
        } catch (err) {
          crashlytics().recordError(err);

          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    TimeZone.getTimeZone().then(result => {
      setTimezone(result);
    });
  }, []);

  const animate = (latitude, longitude) => {
    const newCoord = {
      latitude,
      longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    if (latitude && longitude) {
      setTimeout(() => {
        // markerRef.current.animateMarkerToCoordinate(newCoord, 7000);
        if (Platform.OS == 'android') {
          markerRef?.current?.animateMarkerToCoordinate(newCoord, 7000);
          // markerRef?.current?.animateToRegion(newCoord, 7000);
        }
      }, 200);
    }

    //place platform check
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef?.current?.animateMarkerToCoordinate(newCoord, 7000);
        // markerRef?.current?.animateToRegion(newCoord, 7000);
      }
    } else {
    }
  };

  const getOneTimeLocation = () => {
    setLoading(true);

    Geolocation.getCurrentPosition(
      position => {
        let coords = position.coords;
        // animate(position.coords.latitude, position.coords.longitude);
        // const currentLongitude = JSON.stringify(position.coords.longitude);
        // const currentLatitude = JSON.stringify(position.coords.latitude);
        if (coords) {
          console.log('', coords);
          setLocation(coords);
          let {longitude, latitude} = coords;

          setMapRegion({
            latitude: position.coords.latitude || 0.5,
            longitude: position.coords.longitude || 0.5,
            latitudeDelta: LATITUDE_DELTA, // Default latitude delta for zoom level
            longitudeDelta: LONGITUDE_DELTA,
          });

          getStoreList(latitude, longitude);
          mapRef.current?.animateToRegion(
            {
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
            2000,
          );
          // setCoordinate(
          //   new AnimatedRegion({
          //     latitude: latitude,
          //     longitude: longitude,
          //     latitudeDelta: LATITUDE_DELTA,
          //     longitudeDelta: LONGITUDE_DELTA,
          //   }),
          // );
        }
      },
      // error => {
      //   console.log('google.maps. error -<> ', JSON.stringify(error));
      // },
      // {
      //   enableHighAccuracy: true,
      //   timeout: 30000,
      //   maximumAge: 1000,
      // },
    );
    setLoading(false);
  };
  const [recentData, setRecentData] = useState([]);
  const [offerData, setOfferData] = useState([]);

  const getStoreList = (lat, lng) => {
    let body = {
      latitude: lat + '',
      longitude: lng + '',
      radius: '',
      category_id: '',
      search: '',
      order_by: 'recent',
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

  const getOfferList = val => {
    let body = {
      latitude: val?.latitude + '',
      longitude: val?.longitude + '',
      order_by: 'recent',
      offer_ids: '0',
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      limit: '30',
      page: '1',
      search: '',
      store_id: val?.id_store,
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
        if (response?.data?.success == 1) {
          let result = Object.values(response.data?.result);
          // ShowConsoleLogMessage(JSON.stringify(result));
          setOfferData(result);
        } else {
          setOfferData([]);
        }
      })
      .catch(err => {
        crashlytics().recordError(err);

        // console.log('error < ', err);
        ShowConsoleLogMessage('Error in getoffffffffffffffff ' + err.message);
      })
      .finally(() => {});
  };

  const renderOfferItem = ({item}) => {
    // ShowConsoleLogMessage(item);
    let imageUrl = item?.images?.['0']?.['560_560']?.url;
    //  console.log("dddddddddddddddddddd",item);
    // const imageData = item?.images?.['0']?.url; // Replace '0' with the specific key of the image you want to display

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('OfferDetails', {
            item: {
              id_offer: item?.id_offer,
              intentFromGeo: true,
            },
          });
        }}
        style={{
          margin: 3,
          maxWidth: 95,
        }}>
        <BunchDealImageLoader
          source={imageUrl}
          // source={
          //     // 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
          //     image
          //   }
          defaultImg={images.def_logo}
          styles={{
            width: 90,
            height: 70,
            borderRadius: 10,
          }}
        />
        <Text
          style={[
            {
              color: COLORS.black,
              fontSize: 13,
              fontFamily: 'Montserrat-SemiBold',
              marginEnd: 5,
              marginTop: 5,
            },
          ]}
          numberOfLines={1}>
          {item?.name}
        </Text>
        <Text
          style={[
            {
              color: COLORS.shimmer_loading_color_darker,
              marginTop: 3,
              marginEnd: 5,
              fontSize: 12,
              fontFamily: 'Montserrat-Regular',
            },
          ]}
          numberOfLines={1}>
          {item?.store_name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderOfferModal = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'white',
          flex: 1,
          left: 0,
          right: 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 5,
            paddingVertical: 10,
          }}>
          <Text
            style={[
              {
                color: COLORS.black,
                marginHorizontal: 10,
                fontSize: 17,
                fontFamily: 'Montserrat-Regular',
                flex: 1,
              },
            ]}>
            Recent Offers
          </Text>

          <Ionicons
            onPress={() => {
              setSelectedItem(null);
              setOfferData([]);
            }}
            marginEnd={15}
            color={COLORS.shimmer_loading_color_darker}
            name="close"
            size={25}
          />
        </View>
        {loading ? (
          <ActivityIndicator
            size={'large'}
            color={COLORS.colorPrimary}
            style={{margin: 30}}
          />
        ) : (
          <>
            {offerData?.length >= 1 ? (
              <FlatList
                style={{paddingBottom: 30, marginStart: 15}}
                horizontal
                extraData={offerData}
                data={offerData}
                renderItem={renderOfferItem}
              />
            ) : (
              <Text
                style={{
                  margin: 30,
                  alignSelf: 'center',
                  fontFamily: 'Montserrat-Regular',
                }}>
                No Data Found
              </Text>
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View
        style={{
          height: 56,

          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: COLORS.white,
          elevation: 10,
        }}>
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
          Business Locator
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
              setSearchText('');
              closeSearchModal();
              setChangeRadius(false);
              // navigation.navigate('UniversalSearch');
            }}
            marginStart={15}
            color={COLORS.colorPrimary}
            name="search"
            size={20}
          />

          <MaterialIcons
            onPress={() => {
              setLocation({
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              });

              getOneTimeLocation();
            }}
            marginEnd={10}
            marginStart={20}
            color={COLORS.colorPrimary}
            name="my-location"
            size={20}
          />
        </View>
      </View>
      {selectedItem != null ? (
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: COLORS.white,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              marginTop: 10,
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Montserrat-SemiBold',
                color: COLORS.black,
                marginStart: 5,
                flexGrow: 1,
                paddingBottom: 5,
              }}>
              {selectedItem?.name}
            </Text>
            <View
              style={{
                alignItems: 'center',
                marginBottom: 5,
                flexDirection: 'row',
              }}>
              <AirbnbRating
                count={5}
                isDisabled={true}
                showRating={false}
                defaultRating={parseInt(selectedItem?.votes)}
                size={16}
              />
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'Montserrat-SemiBold',
                  color: COLORS.black,
                  marginStart: 10,
                  flexGrow: 1,
                  marginTop: 2,
                  paddingBottom: 5,
                }}>
                {selectedItem?.votes?.toFixed(2)}
                {' (' + selectedItem?.nbr_votes + ')'}
              </Text>
            </View>
          </View>
          <Ionicons
            onPress={() => {
              setSelectedItem(null);
              setOfferData([]);
            }}
            marginStart={15}
            color={COLORS.shimmer_loading_color_darker}
            name="close"
            size={25}
          />
        </View>
      ) : null}
      {/* <View style={styles.container}>
        <MapView
          style={styles.mapcontainer}
          showsUserLocation={true}
          showsMyLocationButton={false}
          zoomEnabled={true}
          region={mapRegion}></MapView>
      </View> */}
      <View>
        <MapView
          ref={mapRef}
          region={mapRegion}
          // showsUserLocation={true}
          mapType="standard"
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height - 100,
          }}
          zoomEnabled={true}>
          {/*<MapViewDirections*/}
          {/*  origin={{*/}
          {/*    latitude: location?.latitude,*/}
          {/*    longitude: location?.longitude,*/}
          {/*  }}*/}
          {/*  destination={{*/}
          {/*    // latitude: parseFloat(location?.latitude) + 1.0,*/}
          {/*    // longitude: parseFloat(location?.longitude) + 1.0,*/}
          {/*    latitude: location?.latitude,*/}
          {/*    longitude: location?.longitude,*/}
          {/*  }}*/}
          {/*  apikey={apiKey}*/}
          {/*  strokeWidth={5}*/}
          {/*  strokeColor={COLORS.transparent}*/}
          {/*  optimizeWaypoints={true}*/}
          {/*  onReady={result => {*/}
          {/*    // ShowConsoleLogMessage(result);*/}
          {/*    mapRef.current.fitToCoordinates(result.coordinates, {*/}
          {/*      edgePadding: {*/}
          {/*        right: 100,*/}
          {/*        bottom: 200,*/}
          {/*        left: 0,*/}
          {/*        top: 200,*/}
          {/*      },*/}
          {/*    });*/}
          {/*    // mapRef.current.fitToCoordinates(result.coordinates, {*/}
          {/*    //   edgePadding: {*/}
          {/*    //     right: 0,*/}
          {/*    //     bottom: 200,*/}
          {/*    //     left: 0,*/}
          {/*    //     top: 200,*/}
          {/*    //   },*/}
          {/*    //   animated: true,*/}
          {/*    // });*/}
          {/*    // animate(*/}
          {/*    //   result?.coordinates[0]?.latitude,*/}
          {/*    //   result?.coordinates[0]?.longitude,*/}
          {/*    // );*/}
          {/*    // sendLatLong(location?.['latitude'], location?.['longitude']);*/}
          {/*  }}*/}
          {/*/>*/}
          {recentData &&
            recentData.map(item => (
              <Marker
                // key={item.id}
                coordinate={{
                  latitude: parseFloat(item?.latitude) || 0.0,
                  longitude: parseFloat(item?.longitude) || 0.0,
                  latitudeDelta: 0,
                  longitudeDelta: 0,
                }}
                onPress={() => {
                  setSelectedItem(item);
                  getOfferList(item);
                }}
                tappable={true}
                title={item?.name}>
                <View
                  activeOpacity={0.8}
                  style={{
                    width: 60,
                    alignItems: 'center',
                  }}
                  onPress={() => {}}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: COLORS.colorPrimary,
                      backgroundColor: 'white',
                      borderRadius: 5,
                    }}>
                    <BunchDealImageLoader
                      source={item?.images?.['0']?.['560_560']?.url}
                      defaultImg={images.def_logo}
                      styles={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                      }}
                    />
                  </View>
                  <Ionicons
                    name="caret-down-sharp"
                    color={COLORS.colorPrimary}
                    size={20}
                    style={{
                      marginTop: -8,
                    }}
                  />
                </View>
              </Marker>
            ))}
          {/*<Marker.Animated*/}
          {/*  ref={markerRef}*/}
          {/*  coordinate={coordinate}*/}
          {/*  title={'Your current location'}*/}
          {/*  description="Current Location"*/}
          {/*/>*/}
          {location != null ? (
            <Marker
              coordinate={{
                latitude: location?.latitude,
                longitude: location?.longitude,
                latitudeDelta: 0,
                longitudeDelta: 0,
              }}
              position={'center'}
            />
          ) : null}
        </MapView>
      </View>
      {selectedItem !== null ? renderOfferModal() : <Text>No Data</Text>}
      {/* <SearchDialog
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
      /> */}

      <SearchDialog
        show={showSearchModal}
        onPress={handleStoreSearchButtonClick}
        title={percent ? 'offers' : 'stores'}
        onRequestClose={closeSearchModal}
        searchText={searchText}
        onChangeText={val => {
          setSearchText(val);
        }}
        onCurrentLocationPress={() => {
          closeSearchModal();
          closePlaceChooseModal();
        }}
        selectedTab={changeTabOne ? 1 : 2}
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
        show={showPlacePickModal}
      />
      <PlaceChooseLocation
        navigation={navigation}
        onRequestClose={closePlaceChooseModalRequestClose}
        onChangeLocation={closePlacePickModal}
        show={showPlaceChooseModal}
      />
    </SafeAreaView>
  );
};

export default GeoStore;

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
  container: {
    flex: 1,
  },
  mapcontainer: {
    flex: 1,
    width: width,
    height: height,
  },
});
