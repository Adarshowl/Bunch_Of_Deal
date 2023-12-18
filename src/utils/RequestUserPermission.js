import Geolocation from '@react-native-community/geolocation';
import crashlytics from '@react-native-firebase/crashlytics';
import {PermissionsAndroid, Platform} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {STRING} from '../constants';
import {fetchUserLatitude, fetchUserLongitude} from '../redux/actions';
// import {fetchUserLatitude, fetchUserLongitude} from '../redux/actions';

export const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      crashlytics().recordError(err);

      console.warn(err);
      alert('Write permission err', err);
    }
    return false;
  } else {
    return true;
  }
};

export const requestLocationPermission = async dispatch => {
  if (Platform.OS === 'ios') {
    getCurrentLatLong(dispatch);
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        STRING.CAN_ACCESS_LOCATION = true;
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then(data => {})
          .catch(err => {
            crashlytics().recordError(err);
          });
        getCurrentLatLong(dispatch);
      } else if (granted === 'never_ask_again') {
        STRING.CAN_ACCESS_LOCATION = false;
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then(data => {})
          .catch(err => {
            crashlytics().recordError(err);
          });
      }
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      crashlytics().recordError(err);

      console.warn(err);
    }
  }
};

export const requestContactPermission = async () => {
  if (Platform.OS === 'ios') {
    return true;
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else if (granted === 'never_ask_again') {
      }
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      crashlytics().recordError(err);

      console.warn(err);
    }
  }
};

export const requestNotiPermission = async () => {
  if (Platform.OS === 'ios') {
    return true;
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Access Required',
          message: 'This App needs to enable notification permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else if (granted === 'never_ask_again') {
      }
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      crashlytics().recordError(err);

      console.warn(err);
    }
  }
};

export const getCurrentLatLong = dispatch => {
  var currentLongitude = 0.0;
  var currentLatitude = 0.0;

  Geolocation.getCurrentPosition(
    //Will give you the current location
    position => {
      console.log('coming 1');

      //getting the Longitude from the location json
      currentLongitude = JSON.stringify(position.coords.longitude);
      STRING.CURRENT_LONG = currentLongitude;
      //getting the Latitude from the location json
      currentLatitude = JSON.stringify(position.coords.latitude);
      STRING.CURRENT_LAT = currentLatitude;
      console.log(currentLatitude + ' ---- ' + currentLongitude);
      dispatch(fetchUserLatitude(currentLatitude));
      dispatch(fetchUserLongitude(currentLongitude));
      STRING.CAN_ACCESS_LOCATION = true;
    },
    error => {
      console.log('coming 2', error);
    },
    {
      timeout: 10000,
      enableHighAccuracy: false,
    },
  );
};

// export const getCurrentLatLong = () => {
//   var currentLongitude = 144.554733;
//   var currentLatitude = -37.712749; // Set your desired latitude here
//   STRING.CURRENT_LONG = currentLongitude;
//   STRING.CURRENT_LAT = currentLatitude;
//   STRING.CAN_ACCESS_LOCATION = true;

//   console.log(currentLatitude + " >>>>>>>>> "+ currentLongitude)
// };

export const requestMultiplePermissionsAndroid = async dispatch => {
  try {
    const permissions = [
      // PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      // Add other permissions you need here
    ];

    const granted = await PermissionsAndroid.requestMultiple(permissions);

    Object.keys(granted).forEach(permission => {
      if (granted[permission] !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log(`Permission ${permission} denied`);
      } else {
        getCurrentLatLong(dispatch);
      }
    });
  } catch (err) {
    console.warn(err);
  }
};
