import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import React, {useEffect} from 'react';
import {Alert, Image, Platform, StyleSheet, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {STRING} from '../../../constants';
import {COLORS} from '../../../constants/Colors';
import images from '../../../constants/images';
import ApiCall from '../../../network/ApiCall';
import {API_END_POINTS} from '../../../network/ApiEndPoints';
import GlobalStyle from '../../../styles/GlobalStyle';
import {clearRealm} from '../../../utils/RealmUtility';
import {
  requestLocationPermission,
  requestMultiplePermissionsAndroid,
  requestNotiPermission,
} from '../../../utils/RequestUserPermission';

import messaging from '@react-native-firebase/messaging';
import {ShowConsoleLogMessage} from '../../../utils/Utility';
import {useDispatch} from 'react-redux';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (Platform.OS == 'android') {
        await requestMultiplePermissionsAndroid(dispatch);
        await requestNotiPermission();
      } else {
        await requestLocationPermission(dispatch);
        await requestMultiplePermissionsAndroid(dispatch);
        await requestNotiPermission();
      }
      setTimeout(async () => {
        await getUserFromStorage();
      }, 2000);
    })();
    // run karna
  }, []);

  // const requestLocationPermission = async () => {
  //   try {
  //     const permission =
  //       Platform.OS === 'ios'
  //         ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  //         : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  //     const result = await check(permission);

  //     if (result === RESULTS.GRANTED) {
  //       // Location permission is already granted
  //       // You can now use Geolocation to get the user's location
  //     } else {
  //       const requestResult = await request(permission);
  //       if (requestResult === RESULTS.GRANTED) {
  //         // Permission granted
  //         // You can now use Geolocation to get the user's location
  //       } else {
  //         // Permission denied
  //         // Handle this case
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error requesting location permission: ', error);
  //   }commenrt
  // };

  useEffect(() => {
    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'Notification caused app to open from background state app js:',
        remoteMessage,
      );
      let temp = remoteMessage;

      if (temp?.data?.module_name == 'store') {
        navigation.navigate('StoreDetails', {
          item: {
            store_id: temp?.data?.module_id,
            // store_id: 4 + '',
            intentFromNotification: true,
            cid: temp?.data?.cam_id || '',
          },
        });
      } else if (temp?.data?.module_name == 'offer') {
        navigation.navigate('OfferDetails', {
          item: {
            id_offer: temp?.data?.module_id,
            intentFromNotification: true,
            cid: temp?.data?.cam_id || '',
          },
        });
      }

      // navigation.navigate(remoteMessage.data.type);
    });
  }, []);

  const getUserFromStorage = async () => {
    let onBoard = '';
    try {
      await AsyncStorage.getItem(STRING.onBoardComplete, (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            onBoard = value;
          } else {
            appInit();
          }
        }
      });

      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            checkUserExist(JSON.parse(value), onBoard);
          } else {
            if (onBoard == 'true') {
              // navigation.replace('Login');
              navigation.replace('MainContainer');
            } else {
              navigation.replace('OnBoarding');
            }
          }
        }
      });
      await AsyncStorage.getItem(
        STRING.userNotificationPref,
        async (error, value) => {
          if (error) {
          } else {
            if (value == null) {
              let data = {
                offerNotification: true,
                storeNotification: true,
                messengerNotification: true,
              };
              await AsyncStorage.setItem(
                STRING.userNotificationPref,
                JSON.stringify(data),
              );
            }
          }
        },
      );
    } catch (err) {
      crashlytics().recordError(err);

      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const checkUserExist = (data, board) => {
    let body = {
      userid: /*'578'*/ data?.id_user,
      username: data?.username,
      email: data?.email,
    };
    // ShowConsoleLogMessage(JSON.stringify(data));

    ApiCall('post', body, API_END_POINTS.API_USER_CHECK_CONNECTION, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(async response => {
        // console.log(
        //     'ERROR IN GET Notification List => ',
        //     JSON.stringify(response),
        //   );

        if (response?.data?.success == 1) {
          if (board == 'true') {
            navigation.replace('MainContainer');
          } else {
            navigation.replace('OnBoarding');
          }
        } else if (
          response.data?.success == 0 ||
          response.data?.success == -1
        ) {
          AsyncStorage.clear();
          await clearRealm();

          Alert.alert('Logout !', STRING.logoutMessage);
          navigation.replace('OnBoarding');
        }
      })
      .catch(async error => {
        crashlytics().recordError(error);
        AsyncStorage.clear();
        await clearRealm();
        navigation.replace('OnBoarding');

        console.log('ERROR IN GET Notification List 1=> ', error);
      })
      .finally(() => {});
  };

  const appInit = (data, board) => {
    let deviceId = '';
    DeviceInfo.getAndroidId().then(response => {
      deviceId = response;
    });
    let body = {
      userid: deviceId,
      mac_adr: '',
      mac_address: '',
      crypto_key: STRING.ANDROID_APP_ID,
    };

    ApiCall('post', body, API_END_POINTS.API_APP_INIT, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(async response => {
        console.log(
          'ERROR IN GET Notification List 2 => ',
          JSON.stringify(response),
        );

        if (response?.data?.success == 1) {
          let toSave = {
            mac_address: '',
            deviceId: deviceId,
            token: response?.data?.token,
          };
          //   ShowConsoleLogMessage(JSON.stringify(toSave));
          await AsyncStorage.setItem(STRING.initConfig, JSON.stringify(toSave));
        } else {
        }
      })
      .catch(error => {
        crashlytics().recordError(error);

        console.log('ERROR IN GET Notification List 3 => ', error);
      })
      .finally(() => {});
  };

  return (
    <View
      style={[
        GlobalStyle.mainContainerBgColor,
        {
          backgroundColor: COLORS.white,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <Image
        style={{
          width: '80%',
          height: '80%',
          padding: 15,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
        source={images.new_login_beta}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
