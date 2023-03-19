import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import About from '../screens/Content/About';
import Home from '../screens/Home';
import InvoiceList from '../screens/Invoice/InvoiceList';
import OfferDetails from '../screens/Offer/OfferDetails';
import StoreDetails from '../screens/Store/StoreDetails';
import Notification from '../screens/Notification/index';
import Setting from '../screens/Setting/Setting';
import InvoiceDetail from '../screens/Invoice/InvoiceDetail';
import Category from '../screens/Category';
import GeoStore from '../screens/GeoStore';
import Order from '../screens/Order';
import FavStore from '../screens/Favorite/FavStore';
import FavOffer from '../screens/Favorite/FavOffer';
import Account from '../screens/Account';
const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        header: 'none',
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="StoreDetails" component={StoreDetails} />
      <Stack.Screen name="OfferDetails" component={OfferDetails} />
      <Stack.Screen name="Invoice" component={InvoiceList} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="InvoiceDetail" component={InvoiceDetail} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="GeoStore" component={GeoStore} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="FavStore" component={FavStore} />
      <Stack.Screen name="FavOffer" component={FavOffer} />
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
