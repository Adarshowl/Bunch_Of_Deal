import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import Account from '../screens/Account';
import Category from '../screens/Category';
import CategoryList from '../screens/Category/CategoryList';
import About from '../screens/Content/About';
import PrivacyPolicy from '../screens/Content/PrivacyPolicy';
import TermsOfUse from '../screens/Content/TermsOfUse';
import FavOffer from '../screens/Favorite/FavOffer';
import FavStore from '../screens/Favorite/FavStore';
import GeoStore from '../screens/GeoStore';
import Home from '../screens/Home';
import InvoiceDetail from '../screens/Invoice/InvoiceDetail';
import InvoiceList from '../screens/Invoice/InvoiceList';
import Notification from '../screens/Notification/index';
import OfferDetails from '../screens/Offer/OfferDetails';
import Order from '../screens/Order';
import Setting from '../screens/Setting/Setting';
import StoreDetails from '../screens/Store/StoreDetails';
import TestStoreDetail from '../screens/Store/TestStoreDetail';

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
      <Stack.Screen name="TestStoreDetail" component={TestStoreDetail} />
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
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
