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
