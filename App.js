import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {LogBox, StyleSheet} from 'react-native';
import {COLORS} from './src/constants/Colors';
import {requestUserPermission} from './src/firebase/notificationService';
import DrawerNav from './src/navigation/DrawerNav';
import Login from './src/screens/Auth/Login';
import OnBoarding from './src/screens/Auth/OnBoarding';
import OtpVerification from './src/screens/Auth/OtpVerification';
import SignUp from './src/screens/Auth/SignUp';
import Splash from './src/screens/Auth/Splash';
import NoInternetConnection from './src/utils/NoInternetConnection';
LogBox.ignoreAllLogs();
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
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    requestUserPermission();
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });

    return () => removeNetInfoSubscription();
  }, []);
  return isOffline ? (
    <NoInternetConnection show={isOffline} />
  ) : (
    <NavigationContainer>
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
