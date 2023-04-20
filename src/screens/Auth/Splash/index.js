import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {STRING} from '../../../constants';
import images from '../../../constants/images';
import ApiCall from '../../../network/ApiCall';
import {API_END_POINTS} from '../../../network/ApiEndPoints';
import GlobalStyle from '../../../styles/GlobalStyle';
import {ShowConsoleLogMessage} from '../../../utils/Utility';
import {COLORS} from '../../../constants/Colors';
import {clearRealm} from '../../../utils/RealmUtility';
const Splash = ({navigation}) => {
  useEffect(() => {
    // navigation.replace('MainContainer');
    setTimeout(async () => {
      await getUserFromStorage();
    }, 2000);
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
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const checkUserExist = (data, board) => {
    // ShowConsoleLogMessage(JSON.stringify(data));
    let body = {
      userid: /*'578'*/ data?.id_user,
      username: data?.username,
      email: data?.email,
    };

    ApiCall('post', body, API_END_POINTS.API_USER_CHECK_CONNECTION, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(async response => {
        // console.log(
        //   'ERROR IN GET Notification List => ',
        //   JSON.stringify(response),
        // );

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
      .catch(error => {
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
