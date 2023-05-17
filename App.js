import notifee, {AndroidImportance} from '@notifee/react-native';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {LogBox, StyleSheet} from 'react-native';
import {COLORS} from './src/constants/Colors';
import {requestUserPermission} from './src/firebase/notificationService';
import DrawerNav from './src/navigation/DrawerNav';
import ForgotPassword from './src/screens/Auth/ForgotPassword';
import Login from './src/screens/Auth/Login';
import OnBoarding from './src/screens/Auth/OnBoarding';
import OtpVerification from './src/screens/Auth/OtpVerification';
import SignUp from './src/screens/Auth/SignUp';
import Splash from './src/screens/Auth/Splash';
import NoInternetConnection from './src/utils/NoInternetConnection';
import crashlytics from '@react-native-firebase/crashlytics';
import {requestLocationPermission} from './src/utils/RequestUserPermission';
import {ShowConsoleLogMessage} from './src/utils/Utility';
import {navigationRef} from './src/navigation/RootNavigation';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotifications: notification => {
    ShowConsoleLogMessage(
      'PushNotification.configure -> ' + JSON.stringify(notification),
    );
  },
});
LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);
const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
        header: 'none',
      }}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [isOffline, setOfflineStatus] = useState(false);
  if (!__DEV__) {
    console.log = () => {};
    console.info = () => {};
    console.warn = () => {};
    console.debug = () => {};
    console.error = () => {};
  }

  useEffect(() => {
    crashlytics().log('App Mounted');
    messaging().getInitialNotification(remoteMessage => {
      console.log(
        'Notification caused app to open from background state getInitialNotification app js:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state app js:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });
    notifee.onBackgroundEvent(event => {
      ShowConsoleLogMessage(JSON.stringify(event) + ' -> event');
    });
    requestUserPermission();
    requestLocationPermission();
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // ShowConsoleLogMessage(
      //   'Remote message arrived: App screen' + JSON.stringify(remoteMessage),
      // );
      DisplayNotification(remoteMessage);
    });

    return () => {
      removeNetInfoSubscription();
      unsubscribe();
    };
  }, []);

  const DisplayNotification = async remoteMessage => {
    const channelId = await notifee.createChannel({
      id: 'BUNCH_OF_DEALS',
      name: 'BUNCH_OF_DEALS',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: remoteMessage.notification?.title,
      body: remoteMessage?.data?.bodyText,

      android: {
        channelId: channelId,
        loopSound: false,
        sound: 'default',
        smallIcon: 'ic_launcher_full_latest',
      },
    });

    notifee.onBackgroundEvent(event => {
      console.log('on background event notifee -=> ' + JSON.stringify(event));
    });
  };

  return isOffline ? (
    <NoInternetConnection show={isOffline} />
  ) : (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
          header: 'none',
          statusBarColor: COLORS.colorPrimary,
          statusBarAnimation: 'slide',
          statusBarStyle: 'light',
        }}
        initialRouteName="Auth">
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="MainContainer" component={DrawerNav} />
        {/* <Stack.Screen name="MainContainer" component={Home} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});
