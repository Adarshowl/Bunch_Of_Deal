import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import Home from '../screens/Home';
import OfferDetails from '../screens/Offer/OfferDetails';
import StoreDetails from '../screens/Store/StoreDetails';
const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        header: 'none',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="StoreDetails" component={StoreDetails} />
      <Stack.Screen name="OfferDetails" component={OfferDetails} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
