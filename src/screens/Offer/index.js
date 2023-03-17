import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icons, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import GlobalStyle from '../../styles/GlobalStyle';
import BunchDealImageText from '../../utils/BunchDealImageText';
import BunchDealVectorIconText from '../../utils/BunchDealVectorIconText';
import {requestLocationPermission} from '../../utils/RequestUserPermission';
import {getMacAddress, Timezone} from '../../utils/Utility';
import moment from 'moment';
import OfferCardView from './OfferCardView';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';

const Offer = ({navigation}) => {
  const [percent, setPercent] = useState(true);
  const [storeFront, setStoreFront] = useState(false);

  const [timeZone, setTimezone] = useState('');
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [haveLocationPermission, setHaveLocationPermission] = useState(false);

  useEffect(() => {
    const permission = requestLocationPermission();
    setHaveLocationPermission(permission);
    Timezone.getTimeZone().then(result => {
      // console.log(result);
      setTimezone(result);
    });
  }, []);

  const getOfferList = () => {
    const params = new FormData();
    if (STRING.CURRENT_LAT != 0.0 || STRING.CURRENT_LONG != 0.0) {
      params.append(STRING.API_LATITUDE, STRING.CURRENT_LAT + '');
      params.append(STRING.API_LONGITUDE, STRING.CURRENT_LONG + '');
      //order by geo
      params.append(STRING.API_ORDER_BY, STRING.ORDER_NEARBY);
    } else {
      //order by date
      params.append(STRING.API_ORDER_BY, STRING.ORDER_RECENT);
    }
    params.append(STRING.API_OFFER_IDS, '0');

    params.append(STRING.API_TOKEN, STRING.FCM_TOKEN);
    params.append(STRING.API_MAC_ADR, getMacAddress());
    params.append(STRING.API_LIMIT, '30');
    params.append(STRING.API_PAGE, '1');
    params.append(STRING.API_SEARCH, '');
    params.append(STRING.API_DATE, moment().format('yyyy-MM-dd H:m:s'));
    params.append(STRING.API_TIME_ZONE, timeZone);
  };

  useEffect(() => {
    getAllOffers();
  }, []);

  const getAllOffers = () => {
    let d = {
      date: '2023-03-17 16:24:57',
      mac_adr: '',
      search: '',
      timezone: 'Asia/Kolkata',
      latitude: 22.955682,
      limit: 30,
      order_by: 'recent',
      page: 1,
      longitude: 76.0328272,
      token: '',
    };

    console.log(d);

    const params = new FormData();
    params.append('date', '2023-03-17 16:24:57');
    params.append('mac_adr', '02:00:00:00:00');
    params.append('search', '');
    params.append('timezone', 'Asia/Kolkata');
    params.append('latitude', '22.955682,');
    params.append('limit', 30);
    params.append('order_by', 'recent');
    params.append('page', '1');
    params.append('longitude', '76.0328272');
    params.append('token', '');

    ApiCall(
      'post',
      JSON.stringify(d),
      'https://bunchofdeals.com.au/APP_CLONE/index.php/1.0/offer/getOffers',
      {
        // ApiCall('post', JSON.stringify(d), API_END_POINTS.API_GET_OFFERS, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    )
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {});
  };

  return (
    <View style={GlobalStyle.mainContainerBgColor}>
      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            justifyContent: 'space-around',
            height: 45,
          },
        ]}>
        <BunchDealImageText
          source={icons.ic_calendar}
          text={STRING.recent}
          textStyle={[
            FONTS.h6,
            {
              color: percent
                ? COLORS.colorAccent
                : COLORS.shimmer_loading_color,
              marginStart: 10,
            },
          ]}
          style={[
            {
              tintColor: percent
                ? COLORS.colorAccent
                : COLORS.shimmer_loading_color,
            },
            GlobalStyle.homeTabImageStyle,
          ]}
          wrapperStyle={styles.wrapperStyle}
          onPress={() => {
            setPercent(true);
            setStoreFront(false);
          }}
        />
        <BunchDealVectorIconText
          title={Ionicons}
          name={'location-sharp'}
          color={storeFront ? COLORS.colorAccent : COLORS.shimmer_loading_color}
          size={20}
          style={GlobalStyle.marginHorizontal5}
          source={icons.ic_storefront}
          text={STRING.nearby}
          textStyle={[
            FONTS.h6,
            {
              color: storeFront
                ? COLORS.colorAccent
                : COLORS.shimmer_loading_color,
            },
          ]}
          wrapperStyle={styles.wrapperStyle}
          onPress={() => {
            setPercent(false);
            setStoreFront(true);
          }}
        />
      </View>
      {percent ? (
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            style={{
              backgroundColor: COLORS.lightGrey,
              paddingBottom: 5,
            }}
            renderItem={item => {
              return (
                <OfferCardView image="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg" />
              );
            }}
          />
        </View>
      ) : null}

      {storeFront ? (
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            style={{
              backgroundColor: COLORS.lightGrey,
              paddingBottom: 5,
            }}
            renderItem={item => {
              return (
                <OfferCardView image="https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg" />
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default Offer;

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
