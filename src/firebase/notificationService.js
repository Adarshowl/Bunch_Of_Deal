import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import {STRING} from '../constants';
import {ShowConsoleLogMessage} from '../utils/Utility';
import ApiCall from '../network/ApiCall';
import {Platform} from 'react-native';
import {API_END_POINTS} from '../network/ApiEndPoints';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  // console.log('Authorization status:', authStatus);

  if (enabled) {
    // console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}
const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  // console.log(fcmToken, 'the old token');
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        // console.log(fcmToken, 'the new genrated token');
        STRING.FCM_TOKEN = fcmToken;
        await AsyncStorage.setItem('fcmToken', fcmToken);
        updateTokenToDatabase(fcmToken);
      }
    } catch (error) {
      console.log(error, 'error raised in fcmToken');
      //   showError(error.message);
    }
  } else {
    STRING.FCM_TOKEN = fcmToken;
    updateTokenToDatabase(fcmToken);
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state: ',
      remoteMessage.notification,
    );
  });

  messaging().onMessage(async remoteMessage => {
    console.log('received in foreground -> ', remoteMessage.notification);

    PushNotification.createChannel(
      {
        channelId: 'Club_Xtreme', // (required)
        channelName: 'Club_xtreme_Channel', // (required)
        channelDescription: 'Basket app', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    PushNotification.localNotification({
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
      bigPictureUrl: remoteMessage.notification.android.imageUrl,
      importance: 4,
      smallIcon: remoteMessage.notification.android.imageUrl,
    });
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

const updateTokenToDatabase = async fcmToken => {
  let id = '';
  try {
    await AsyncStorage.getItem('userData', (error, value) => {
      if (error) {
      } else {
        if (value !== null) {
          // ShowConsoleLogMessage(value);
          id = JSON.parse(value)?.id_user;
        } else {
        }
      }
    });
  } catch (err) {
    console.log('ERROR IN GETTING USER FROM STORAGE');
  }
  if (id != '') {
    let body = {
      user_id: id,
      fcm_id: fcmToken,
      sender_id: '',
      platform: Platform.OS,
      lat: STRING.CURRENT_LAT,
      lng: STRING.CURRENT_LONG,
    };
    // ShowConsoleLogMessage(JSON.stringify(body) + ' --> update token');
    ApiCall('post', body, API_END_POINTS.API_USER_REGISTER_TOKEN, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // ShowConsoleLogMessage(response);
      })
      .catch(err => {
        ShowConsoleLogMessage(err);
      })
      .finally(() => {});
  }
};
