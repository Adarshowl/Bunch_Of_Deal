import {Modal, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import {STRING} from '../../constants';
import Geocoder from 'react-native-geocoding';
import {useDispatch} from 'react-redux';
import {fetchUserLatitude, fetchUserLongitude} from '../../redux/actions';
import {ShowConsoleLogMessage} from '../../utils/Utility';

Geocoder.init('AIzaSyCIcyfvlmMVSAxxvPTASWasIN8ncskIj0w');
// const api_key = 'AIzaSyCIcyfvlmMVSAxxvPTASWasIN8ncskIj0w';
const defaultLocation = {
  latitude: 0,
  longitude: 0,
};

const PlacePickerLocation = ({navigation, show, onRequestClose}) => {
  const dispatch = useDispatch();
  // const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);
  const [isCurrentLocationSelected, setIsCurrentLocationSelected] =
    useState(false);

  // const handleRecentLocationSelect = (data) => {
  //   STRING.SEARCH_LOCATION = data?.description;

  //   // Use the Geocoder to fetch latitude and longitude
  //   Geocoder.from(STRING.SEARCH_LOCATION )

  //     .then((response) => {
  //       const { results } = response;
  //       if (results.length > 0) {
  //         // STRING.SEARCH_LOCATION = data?.description;
  //         // onRequestClose();

  //         const { lat, lng } = results[0].geometry.location;
  //         console.log('Geocoded Latitude:', lat);
  //         console.log('Geocoded Longitude:', lng);
  //         // Handle the latitude and longitude here, or set it in your state
  //         setSelectedLocation({ latitude: lat, longitude: lng });
  //         STRING.CURRENT_LAT = lat;
  //         STRING.CURRENT_LONG = lng;
  //         onRequestClose();
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Geocoding Error:', error);
  //     });
  // };
  // const handleRecentLocationSelect = (data, details) => {
  //   // Check if the user has explicitly selected a new location
  //   if (data && data.description) {
  //     STRING.SEARCH_LOCATION = data.description;

  //     // Use the Geocoder to fetch latitude and longitude
  //     Geocoder.from(STRING.SEARCH_LOCATION)
  //       .then((response) => {
  //         const { results } = response;
  //         if (results.length > 0) {
  //           const { lat, lng } = results[0].geometry.location;
  //           console.log('Geocoded Latitude:', lat);
  //           console.log('Geocoded Longitude:', lng);
  //           // Handle the latitude and longitude here, or set it in your state
  //           setSelectedLocation({ latitude: lat, longitude: lng });
  //           STRING.CURRENT_LAT = lat;
  //           STRING.CURRENT_LONG = lng;
  //           onRequestClose();
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Geocoding Error:', error);
  //       });
  //   }
  // };

  const handleRecentLocationSelect = (data, details) => {
    if (data.description === 'Current Location' || !STRING.SEARCH_LOCATION) {
      STRING.SEARCH_LOCATION = data.description;

      getCurrentLocationData()
        .then(response => {
          const {results} = response;

          STRING.SEARCH_LOCATION = data.description;

          onRequestClose();
        })
        .catch(error => {
          console.error('Error fetching current location data:', error);
        });
    } else {
      STRING.SEARCH_LOCATION = data.description;

      Geocoder.from(STRING.SEARCH_LOCATION)
        .then(response => {
          const {results} = response;
          if (results.length > 0) {
            // STRING.SEARCH_LOCATION = data.description;
            ShowConsoleLogMessage(JSON.stringify(results[0]));
            const {lat, lng} = results[0].geometry.location;
            console.log('Geocoded Latitude:', lat);
            console.log('Geocoded Longitude:', lng);

            dispatch(fetchUserLatitude(lat));
            dispatch(fetchUserLongitude(lng));
            setSelectedLocation({latitude: lat, longitude: lng});
            STRING.CURRENT_LAT = lat;
            STRING.CURRENT_LONG = lng;
            // STRING.SEARCH_LOCATION;

            onRequestClose();
          }
        })
        .catch(error => {
          console.error('Geocoding Error:', error);
        });
    }
  };

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={show}
      onRequestClose={() => {
        onRequestClose();
      }}>
      <View style={GlobalStyle.mainContainerBgColor}>
        <AntDesign
          name="arrowleft"
          size={25}
          color={COLORS.black}
          style={{
            margin: 12,
          }}
          onPress={() => {
            navigation;
            onRequestClose();
          }}
        />
        {/* <TextInput
        value={selectedLocation ? JSON.stringify(selectedLocation) : ''}
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
        editable={false}
      /> */}
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // Handle recent location selection
            handleRecentLocationSelect(data);
          }}
          textInputProps={{
            height: 60,
            fontSize: 16,
            fontFamily: 'Montserrat-Regular',
            paddingHorizontal: 15,
            color: 'black',
          }}
          userProps={{
            placeholderTextColor: '#000',
          }}
          styles={{
            color: 'black',
          }}
          textInputHide={false}
          query={{
            key: 'AIzaSyCIcyfvlmMVSAxxvPTASWasIN8ncskIj0w',
            language: 'en',
          }}
        />
        {/* <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(data?.description, details);
            STRING.SEARCH_LOCATION = data?.description;
            console.log("google dta ",data?.description)
            onRequestClose();
          }}
          textInputProps={{
            height: 60,
            fontSize: 16,
            fontFamily: 'Montserrat-Regular',
            paddingHorizontal: 15,
            color: 'black',
          }}
          userProps={{
            placeholderTextColor: '#000',
          }}
          styles={{
            color: COLORS.black,
          }}
          textInputHide={false}
          query={{
            key: api_key,
            language: 'en',
          }}


        /> */}
        {/* <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            if (details) {
              // 'details' is provided when fetchDetails = true
              if (data?.description === "Current Location") {
                // User selected current location
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log("Current Location - Latitude: ", latitude);
                    console.log("Current Location - Longitude: ", longitude);

                    STRING.CURRENT_LAT = latitude;
                    STRING.CURRENT_LONG = longitude;
                    onRequestClose();
                  },
                  (error) => {
                    console.error("Error getting current location:", error);
                  }
                );
              } else {
                // User selected a custom location
                STRING.SEARCH_LOCATION = data?.description;
                console.log("Custom Location: ", data?.description);

                const latitude = details.geometry.location.lat;
                const longitude = details.geometry.location.lng;
                console.log("Custom Location - Latitude: ", latitude);
                console.log("Custom Location - Longitude: ", longitude);

                STRING.CURRENT_LAT = latitude;
                STRING.CURRENT_LONG = longitude;
                onRequestClose();
              }
            }
          }}


          textInputProps={{
            height: 60,
            fontSize: 16,
            fontFamily: 'Montserrat-Regular',
            paddingHorizontal: 15,
            color: 'black',
          }}
          userProps={{
            placeholderTextColor: '#000',
          }}
          styles={{
            color: COLORS.black,
          }}
          textInputHide={false}
          query={{
            key: api_key,
            language: 'en',
          }}
          fetchDetails={true} // Set fetchDetails to true
        /> */}

        {/* {searchError ? <Text>Error: {searchError}</Text> : null}

        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            if (details) {
              if (data?.description === 'Current Location') {
                if (Platform.OS === 'web' && navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const latitude = position.coords.latitude;
                      const longitude = position.coords.longitude;
                      STRING.SEARCH_LOCATION = data?.description;

                      console.log('Current Location - Latitude: ', latitude);
                      console.log('Current Location - Longitude: ', longitude);
                      STRING.CURRENT_LAT = latitude;
                      STRING.CURRENT_LONG = longitude;
                      onRequestClose()
                      // You can save latitude and longitude as needed
                    },
                    (error) => {
                      console.error('Error getting current location:', error);
                    }
                  );
                } else {
                  console.error('Error getting current location:', error);
                }
              } else {
                // User selected a custom location
                console.log('Custom Location: ', data?.description);
                STRING.SEARCH_LOCATION = data?.description;

                const latitude = details.geometry.location.lat;
                const longitude = details.geometry.location.lng;
                console.log('Custom Location - Latitude: ', latitude);
                console.log('Custom Location - Longitude: ', longitude);
                STRING.CURRENT_LAT = latitude;
                STRING.CURRENT_LONG = longitude;
                onRequestClose();
                console.warn('Geolocation is not available on this platform.');

                // You can save latitude and longitude as needed
              }
            }
            else {
              setSearchError('Location not found. Please try a different search term.');

            }
          }} textInputProps={{
            height: 60,
            fontSize: 16,
            fontFamily: 'Montserrat-Regular',
            paddingHorizontal: 15,
            color: 'black',
          }}
          userProps={{
            placeholderTextColor: '#000',
          }}
          styles={{
            textInput: {
              color: 'black',
            },
          }}
          textInputHide={false}
          query={{
            key: api_key,
            language: 'en',
          }}
          fetchDetails={true} // Set fetchDetails to true
        /> */}
        {/* {searchError ? <Text>Error: {searchError}</Text> : null}
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            if (details) {
              if (data?.description === 'Current Location') {
                if (Platform.OS === 'web' && navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      STRING.SEARCH_LOCATION = data?.description;

                      const latitude = position.coords.latitude;
                      const longitude = position.coords.longitude;
                      console.log('Current Location - Latitude: ', latitude);
                      console.log('Current Location - Longitude: ', longitude);
                      // Handle current location data as needed

                      STRING.CURRENT_LAT = latitude;
                      STRING.CURRENT_LONG = longitude;
                      onRequestClose();
                    },
                    (error) => {
                      console.error('Error getting current location:', error);
                    }
                  );
                } else if (Platform.OS === 'android' || Platform.OS === 'ios') {
                  // Geolocation is available on mobile platforms
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      STRING.SEARCH_LOCATION = data?.description;

                      const latitude = position.coords.latitude;
                      const longitude = position.coords.longitude;
                      console.log('Current Location - Latitude: ', latitude);
                      console.log('Current Location - Longitude: ', longitude);
                      // Handle current location data as needed
                      STRING.CURRENT_LAT = latitude;
                      STRING.CURRENT_LONG = longitude;
                      onRequestClose();
                    },
                    (error) => {
                      console.error('Error getting current location:', error);
                    }
                  );
                } else {
                  console.warn('Geolocation is not supported on this platform.');
                }
              } else {
                // User selected a custom location
                console.log('Custom Location: ', data?.description);
                STRING.SEARCH_LOCATION = data?.description;

                const latitude = details.geometry.location.lat;
                const longitude = details.geometry.location.lng;
                console.log('Custom Location - Latitude: ', latitude);
                console.log('Custom Location - Longitude: ', longitude);
                STRING.CURRENT_LAT = latitude;
                STRING.CURRENT_LONG = longitude;
                onRequestClose();
                // Handle custom location data as needed
              }
            } else {
              setSearchError('Location not found. Please try a different search term.');
            }
          }}
          textInputProps={{
            height: 60,
            fontSize: 16,
            fontFamily: 'Montserrat-Regular',
            paddingHorizontal: 15,
            color: 'black',
          }}
          userProps={{
            placeholderTextColor: '#000',
          }}
          styles={{
            textInput: {
              color: 'black',
            },
          }}textInputHide={false}
          query={{
            key: api_key,
            language: 'en',
          }}
          fetchDetails={true}
        /> */}
      </View>
    </Modal>
  );
};

export default PlacePickerLocation;

const styles = StyleSheet.create({});
//* NOTE
/**
 Google auto complete package me 2 change
 1. text color black of flat list
 2. place holder color change
 */
