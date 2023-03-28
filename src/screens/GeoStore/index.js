import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import MapView, {AnimatedRegion, Marker} from 'react-native-maps';
import {AirbnbRating} from 'react-native-elements';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {images, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import {ShowConsoleLogMessage, Timezone} from '../../utils/Utility';
import {FlatList} from 'react-native';
import SearchDialog from '../Search';
import PlacePickerLocation from '../Search/PlacePickerLocation';
var {width, height} = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ASPECT_RATIO = windowWidth / windowHeight;
const LATITUDE_DELTA = 0.9222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const apiKey = 'AIzaSyCIcyfvlmMVSAxxvPTASWasIN8ncskIj0w';

const GeoStore = ({navigation}) => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showPlacePickModal, setShowPlacePickModal] = useState(false);
  const [radius, setRadius] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const closeSearchModal = () => {
    setShowSearchModal(!showSearchModal);
  };

  const handleStoreSearchButtonClick = () => {
    closeSearchModal();
    getSearchStoreList(searchText, categoryId, radius);
  };
  const closePlacePickModal = () => {
    setShowPlacePickModal(!showPlacePickModal);
  };

  const getSearchStoreList = (search, catId, radius, location) => {
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

    ShowConsoleLogMessage(JSON.stringify(body));

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
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

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
      latitude: 0,
      longitude: 0,
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
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    Timezone.getTimeZone().then(result => {
      setTimezone(result);
    });
  }, []);

  const animate = (latitude, longitude) => {
    const newCoord = {
      latitude,
      longitude,
    };
    if (latitude && longitude) {
      setTimeout(() => {
        // markerRef.current.animateMarkerToCoordinate(newCoord, 7000);
        markerRef?.current?.animateMarkerToCoordinate(newCoord, 7000);
      }, 2000);
    }

    //place platform check
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef?.current?.animateMarkerToCoordinate(newCoord, 7000);
      }
    } else {
    }
  };

  const getOneTimeLocation = () => {
    console.log('getOneTimeLocation');
    setLoading(true);

    Geolocation.getCurrentPosition(
      position => {
        let coords = position.coords;
        animate(position.coords.latitude, position.coords.longitude);
        // const currentLongitude = JSON.stringify(position.coords.longitude);
        // const currentLatitude = JSON.stringify(position.coords.latitude);
        if (coords) {
          let {longitude, latitude} = coords;

          setMapRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
          });

          getStoreList(latitude, longitude);
          setCoordinate(
            new AnimatedRegion({
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }),
          );
        }
      },
      error => {
        console.log('google.maps. error -<> ', JSON.stringify(error));
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        // maximumAge: 1000,
      },
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
        // console.log('error < ', err);
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  const renderOfferItem = ({item}) => {
    // ShowConsoleLogMessage(item);
    let image = item?.images['0']['560_560']?.url;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('OfferDetails', {item: item});
        }}
        style={{
          margin: 3,
          maxWidth: 95,
        }}>
        <BunchDealImageLoader
          source={
            // 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
            image
          }
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
            Recent Offers{' '}
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
        {offerData?.length >= 1 ? (
          <FlatList
            style={{
              paddingBottom: 30,
              marginStart: 15,
            }}
            horizontal
            extraData={offerData}
            data={offerData}
            renderItem={renderOfferItem}
          />
        ) : (
          <ActivityIndicator
            size={'large'}
            color={COLORS.colorPrimary}
            style={{
              margin: 30,
            }}
          />
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
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
              closeSearchModal();
            }}
            marginStart={15}
            color={COLORS.colorPrimary}
            name="search"
            size={20}
          />

          <MaterialIcons
            onPress={() => {
              console.log('search');
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
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height - 100,
          }}
          pointerEvents="none"
          loadingEnabled
          region={mapRegion}
          pitchEnabled={true}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          minZoomLevel={0} // default => 0
          maxZoomLevel={20} // default => 20
          onMapReady={() => {}}>
          {recentData &&
            recentData.map(item => (
              <Marker
                coordinate={{
                  latitude: parseFloat(item?.latitude),
                  longitude: parseFloat(item?.longitude),
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
                      source={item?.images['0']['560_560'].url}
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
          <Marker.Animated
            ref={markerRef}
            coordinate={coordinate}
            title={'Your current location'}
            description="Current Location"
          />
        </MapView>
      </View>
      {selectedItem != null ? renderOfferModal() : null}

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
          closePlacePickModal();
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
    </View>
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
