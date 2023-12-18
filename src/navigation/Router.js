import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
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
import UniversalSearch from '../screens/UniversalSearch';
import {useNavigation} from '@react-navigation/native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import StoreCardView from '../screens/Store/StoreCardView';
import BottomTabNav from '../bottom_tab_nav';

const Stack = createNativeStackNavigator();

const Router = ({}) => {
  const navigation = useNavigation();

  // useEffect(() => {
  //   dynamicLinks()
  //     .getInitialLink()
  //     .then(link => {
  //       let offerId = link.url.split('=').pop()

  //       if (offerId) {
  //         // Use the navigation.navigate within this function
  //       navigation.navigate('OfferDetails', { offerId: offerId });
  //       } else {
  //         console.log('OfferId is null or undefined');
  //       }
  //     });
  // }, []);

  useEffect(() => {
    try {
      dynamicLinks()
        .getInitialLink()
        .then(link => {
          try {
            console.log(link, ' 22222222222222222222222 dynamic url of app ');

            if (link) {
              const url = link?.url;
              let offerId = url?.split('=').pop();

              if (url?.includes('/StoreDetails/')) {
                // Extract the storeId from the URL (assuming it's an integer)
                const storeId = parseInt(url?.split('/StoreDetails/')[1], 10);
                console.log('storeId:', storeId);

                // Navigate to the "StoreDetails" screen with the extracted storeId
                navigation?.navigate('StoreDetails', {
                  item: {store_id: storeId, id_store: storeId},
                });
              } else if (url?.includes('/offerDetails/')) {
                // Extract the offerId from the URL (assuming it's an integer)
                const offerId = parseInt(url?.split('/offerDetails/')[1], 10);
                console.log('offerId:', offerId);
                console.log(' 1111111323232 dynamic url of app ');
                // Navigate to the "OfferDetails" screen with the extracted offerId
                navigation.navigate('OfferDetails', {
                  item: {id_offer: offerId, offer_id: offerId},
                });
              } else if (url?.includes('?offerDetails/')) {
                // Extract the offerId from the URL (assuming it's an integer)
                const offerId = parseInt(url?.split('?offerDetails/')[1], 10);
                console.log('offerId:', offerId);
                console.log(' 454545454545454s dynamic url of app ');
                // Navigate to the "OfferDetails" screen with the extracted offerId
                navigation?.navigate('OfferDetails', {
                  item: {id_offer: offerId, offer_id: offerId},
                });
              }
            }
          } catch (error) {
            console.log(error);
            alert('3' + JSON.stringify(error));
          }
        });
    } catch (error) {
      console.log(error, 'error');
      alert('4' + JSON.stringify(error));
    }
  }, []);

  // const [linking, setLinking] = useState({
  //   prefixes: ['com.bunch.of.deals://'],
  // });

  // useEffect(() => {
  //   const onReceiveLink = ({ url }) => {
  //     if (url.includes('/offers/')) {
  //       setLinking({
  //         prefixes: ['com.bunch.of.deals://'],
  //         config: {
  //           screens: {
  //             OfferDetails: 'offers/:offerId',
  //           },
  //         },
  //       });
  //     } else {
  //       setLinking({
  //         prefixes: ['com.bunch.of.deals://'],
  //       });
  //     }
  //   };
  //   Linking.addEventListener('url', onReceiveLink);

  //   return () => {
  //     Linking.removeEventListener('url', onReceiveLink);
  //   };
  // }, []);

  const linking = {
    prefixes: ['com.bunch.of.deals://'],
    config: {
      screens: {
        OfferDetails: 'offers/:offerId',
        StoreDetails: 'stores/:storeId',
      },
    },
  };
  // console.log("linking >>>>>",linking)

  return (
    <Stack.Navigator
      // linking={linking}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        header: 'none',
        animation: 'slide_from_right',
      }}>
      {/*<Stack.Screen name="Home" component={Home} />*/}
      <Stack.Screen name="Home" component={BottomTabNav} />
      <Stack.Screen name="StoreCardView" component={StoreCardView} />

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
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="UniversalSearch" component={UniversalSearch} />
    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});
