import 'react-native-gesture-handler';
import notifee, {AndroidImportance} from '@notifee/react-native';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {LogBox, View, StyleSheet, StatusBar, Alert} from 'react-native';
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
import dynamicLinks from '@react-native-firebase/dynamic-links';

import {navigationRef} from './src/navigation/RootNavigation';
import PushNotification from 'react-native-push-notification';
import OfferDetails from './src/screens/Offer/OfferDetails';
import configureStore from './src/redux/store/configureStore';
import {Provider} from 'react-redux';
import {ShowConsoleLogMessage} from './src/utils/Utility';

PushNotification.configure({
  onNotifications: notification => {},
});
LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);
const Stack = createNativeStackNavigator();
const store = configureStore();

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
      {/* <Stack.Screen name="OfferDetails" component={OfferDetails} /> */}
    </Stack.Navigator>
  );
};

const App = ({navigation}) => {
  const [isOffline, setOfflineStatus] = useState(false);
  if (!__DEV__) {
    console.log = () => {};
    console.info = () => {};
    console.warn = () => {};
    console.debug = () => {};
    console.error = () => {};
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        // Alert.alert(
        //   'A new FCM message arrived!',
        //   JSON.stringify(remoteMessage),
        // );
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    messaging().getInitialNotification(remoteMessage => {
      // Alert.alert('FCM TEST', JSON.stringify(remoteMessage));
      // navigation.navigate(remoteMessage.data.type);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state app js:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });
    notifee.onBackgroundEvent(event => {});
    requestUserPermission();

    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      //const offline = !(state.isConnected && state.isInternetReachable);
      const offline = !state.isConnected;
      console.log('offline', offline);
      setOfflineStatus(offline);
    });

    return () => {
      removeNetInfoSubscription();
    };
  }, []);

  const [module_name, setmodule_name] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMsg, setNotificationMsg] = useState('');
  const [notificationData, setNotificationData] = useState({});

  // const [notificationTitle, setNotificationTitle] = useState('');
  // const [notificationMsg, setNotificationMsg] = useState('');

  const [imageUrl, setimageUrl] = useState('');

  // const HandleDeepLinking = () => {
  //   const { navigate } = useNavigation()
  //   const handleDynamicLinks = async (link) => {
  //     console.log('Foreground link handling:', link)
  //     let offerId = link.url.split('=').pop()

  //     console.log('productId:', offerId)
  //     navigate('OfferDetails', { offerId: offerId })
  //   }
  //   useEffect(() => {
  //     const unsubscribe = dynamicLinks().onLink(handleDynamicLinks)
  //     return () => {
  //       unsubscribe.remove(); // Clean up the event listener when the component unmounts
  //     }    }, [])

  //   return null
  // }

  const HandleDeepLinking = () => {
    try {
      const {navigate} = useNavigation();

      const handleDynamicLinks = async link => {
        try {
          const url = link?.url;
          console.log(link, ' 1111111111111111111111111 dynamic url of app ');
          if (url?.includes('/StoreDetails/')) {
            const storeId = parseInt(url?.split('/StoreDetails/')[1], 10);

            navigate('StoreDetails', {
              item: {store_id: storeId, id_store: storeId},
            });
          } else if (url?.includes('/offerDetails/')) {
            const offerId = parseInt(url?.split('/offerDetails/')[1], 10);
            console.log(offerId, ' 333333333 ');
            navigate('OfferDetails', {
              item: {id_offer: offerId, offer_id: offerId},
            });
          } else if (url?.includes('offerDetails')) {
            const offerId = parseInt(url?.split('?offerDetails/')[1], 10);
            console.log(offerId, ' dynamic offer id of app ');
            navigate('OfferDetails', {
              item: {id_offer: offerId, offer_id: offerId},
            });
          }
        } catch (error) {
          console.log(error);
          alert('1' + JSON.stringify(error));
        }
      };

      useEffect(() => {
        const unsubscribe = dynamicLinks()?.onLink(handleDynamicLinks);
        return () => {
          unsubscribe(); // Clean up the event listener when the component unmounts
        };
      }, []);

      return null;
    } catch (error) {
      console.log(error, 'error');
      alert('2' + JSON.stringify(error));
    }
  };

  // useEffect(() => {
  //   dynamicLinks()
  //     .getInitialLink()
  //     .then(link => {
  //       console.log('Background condition link handling:', link)
  //       let offerId = link.url.split('=').pop()

  //       if (offerId) {
  //         // Use the navigation.navigate within this function
  //         // Example: navigation.navigate('OfferDetails', { offerId: offerId });
  //       } else {
  //         console.log('OfferId is null or undefined');
  //       }
  //     });
  // }, []);

  // const HandleDeepStoreLinking = () => {
  //   const { navigate } = useNavigation()
  //   const handleDynamicLinkstors = async (link) => {
  //     console.log('Foreground link handling store :', link)
  //     let StoreId = link.url.split('=').pop()

  //     console.log('store:', StoreId)
  //     navigate('StoreDetails', { StoreId: StoreId })
  //   }
  //   useEffect(() => {
  //     const unsubscribe = dynamicLinks().onLink(handleDynamicLinkstors)
  //     return () => unsubscribe()
  //   }, [])

  //   return null
  // }

  // const {navigate} = useNavigation()

  // const navigation = useNavigation();

  // const HandleDeepLink = async (navigate) => {
  //   try {
  //     const link = await dynamicLinks().getInitialLink();

  //     if (link) {
  //       console.log('Initial Deep Link:', link);

  //       // Extract the offerId or relevant data from the deep link URL
  //       let offerId = link.url.split('=').pop()
  //       console.log('productIdbbb:', offerId)

  //       navigate('OfferDetails', { offerId: offerId })

  //       // if (offerId) {
  //       //   // Navigate to the OfferDetails screen or perform other actions
  //       //   navigate('OfferDetails', { offerId })
  //       // } else {
  //       //   console.log('No offerId found in the deep link.');
  //       // }
  //     } else {
  //       console.log('No initial deep link.');
  //     }
  //   } catch (error) {
  //     console.error('Error handling initial deep link:', error);
  //   }
  // };

  // useEffect(() => {
  //   HandleDeepLink();
  // }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        ShowConsoleLogMessage(JSON.stringify(remoteMessage));
        await DisplayNotification(remoteMessage);
        // setShowNotification(true);
        // setNotificationTitle(remoteMessage?.notification?.title);
        // setNotificationMsg(remoteMessage?.notification?.body);
        // setimageUrl(remoteMessage?.notification?.imageUrl);
        // setNotificationData(remoteMessage);
        //
        // setShowNotification(false);
      }
    });

    return unsubscribe;
  }, []);

  const DisplayNotification = async remoteMessage => {
    const channelId = await notifee.createChannel({
      id: 'BUNCH_OF_DEALS',
      name: 'BUNCH_OF_DEALS',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: remoteMessage.notification?.title,
      body: remoteMessage?.data?.body || remoteMessage?.notification?.body,

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

  return (
    <Provider store={store}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.colorPrimary,
          paddingTop: 40,
          //paddingTop:
          //  StatusBar.currentHeight == 0 ? 40 : StatusBar.currentHeight,
        }}>
        <NavigationContainer ref={navigationRef}>
          <HandleDeepLinking />

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

        {/* <NoInternetConnection show={isOffline} /> */}
      </View>
    </Provider>
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
