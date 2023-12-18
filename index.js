/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Kill state Notification Listener.
messaging().setBackgroundMessageHandler(async remoteMessage => {
  // Your code to handle notifications in killed state. For example
  console.log('Killed state notification.', JSON.stringify(remoteMessage));
  // await AsyncStorage.setItem('notification', JSON.stringify(remoteMessage));
  await AsyncStorage.setItem('notification', JSON.stringify(remoteMessage));
});

// messaging().onNotificationOpenedApp(remoteMessage => {
//   console.log(
//     'Notification caused app to open from background state:',
//     remoteMessage.notification,
//   );
//   // navigation.navigate(remoteMessage.data.type);
// });

AppRegistry.registerComponent(appName, () => App);
