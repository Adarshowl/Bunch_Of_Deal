import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {images, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle1 from '../../styles/GlobalStyle1';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import crashlytics from '@react-native-firebase/crashlytics';
import TimeZone from 'react-native-timezone';

const StoreOffer = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  let userLat = useSelector(state => state?.state?.latitude);
  let userLong = useSelector(state => state?.state?.longitude);
  useEffect(() => {
    // ShowConsoleLogMessage('propse -> ' + JSON.stringify(props?.item?.id_store));
    TimeZone.getTimeZone().then(result => {
      // console.log(result);
      setTimezone(result);
    });
    getOfferList('rest');
  }, [isFocused]);

  useEffect(() => {
    // ShowConsoleLogMessage('propse -> ' + JSON.stringify(props?.item?.id_store));
    TimeZone.getTimeZone().then(result => {
      // console.log(result);
      setTimezone(result);
    });
    getOfferList('rest');
  }, [props?.item?.id_store]);

  const isFocused = useIsFocused();

  const [timeZone, setTimezone] = useState('');

  const [recentData, setRecentData] = useState([]);

  const [showError, setShowError] = useState(false);
  const getOfferList = val => {
    if (props?.item?.id_store != undefined) {
      let body = {
        store_id: props?.item?.id_store,
        page: '1',
        limit: '7',
        date: moment().format('yyyy-MM-dd H:m:s'),
        timezone: timeZone,
      };

      // ShowConsoleLogMessage(JSON.stringify(body));

      // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
      ApiCall('post', body, API_END_POINTS.API_GET_OFFERS, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      })
        .then(response => {
          if (response?.data?.success == 1) {
            // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
            let result = Object.values(response.data?.result);
            // ShowConsoleLogMessage(JSON.stringify(result.length));
            setShowError(result.length <= 0);
            setRecentData(result);
          } else {
            setRecentData([]);
            setShowError(true);
          }
        })
        .catch(err => {
          crashlytics().recordError(err);

          ShowConsoleLogMessage(
            'Error in get offer recent api call: ' + err.message,
          );
        })
        .finally(() => {});
    }
  };

  const onReloadBtn = () => {
    getStoreList('rest');
  };
  const getStoreList = val => {
    // setRecentData([]);

    setLoading(true);
    setShowError(false);
    let body = {
      latitude: userLat + '',
      longitude: userLong + '',
      radius: '',
      // category_id: '',
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      search: '',
      order_by: 'nearby',
      offer_ids: '0',

      date: moment().format('yyyy-MM-dd H:m:s'),
      timezone: timeZone,

      // current_date: moment().format('yyyy-MM-dd H:m:s'),
      // current_tz: 'Asia/Kolkata',
      limit: '30',
      page: '1',
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    ShowConsoleLogMessage('abhi cll kiya he ', body);
    ApiCall('post', body, API_END_POINTS.API_USER_GET_STORES, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage("aaaa", JSON.stringify(response?.data));
          let result = Object.values(response?.data?.result);
          // ShowConsoleLogMessage(JSON.stringify(result));
          setShowError(result.length <= 0);
          setRecentData(result);
        } else {
          setShowError(true);
          setRecentData([]);
        }
      })
      .catch(err => {
        crashlytics().recordError(err);

        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  const renderItem = ({item}) => {
    // ShowConsoleLogMessage(item);
    let imageUrl = item.images['0']['560_560']?.url;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[GlobalStyle1.StoreBOX]}
        onPress={() => {
          navigation.navigate('OfferDetails', {item: item});
        }}>
        {/* <Image
          source={{
            uri: 'https://thumbs.dreamstime.com/b/nail-salon-interior-as-creative-abstract-blur-background-pedicure-armchairs-modern-inside-beauty-studio-white-blue-140835941.jpg',
          }}
          style={GlobalStyle1.Storeimages}
        /> */}
        <BunchDealImageLoader
          defaultImg={images.def_logo}
          source={imageUrl}
          styles={GlobalStyle1.Storeimages}
        />
        <View
          style={{
            marginTop: 5,
            marginStart: 10,
            flex: 1,
          }}>
          <Text
            style={[
              {
                color: COLORS.black,
                fontSize: 14,
                fontFamily: 'Montserrat-Regular',
              },
            ]}>
            {item?.name}
          </Text>
          <Text
            style={[
              {
                color: 'grey',
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
              },
            ]}
            numberOfLines={1}>
            {item?.description?.replace(/<\/?[^>]+(>|$)/g, '\n')}
          </Text>
        </View>
        <View
          style={[
            GlobalStyle1.price_BOX,
            {
              paddingHorizontal: 10,
              paddingVertical: 2,
              marginEnd: 10,
            },
          ]}>
          <Text
            style={[
              {
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 11,
                textAlignVertical: 'center',
                textAlign: 'center',
                color: COLORS.white,
              },
            ]}>
            {item?.currency?.symbol + '' + item?.offer_value}
            .0
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        // flex: 1,
        backgroundColor: COLORS.red,
        // padding: 10,
      }}>
      <FlatList
        data={recentData}
        keyExtractor={item => item?.id_store}
        renderItem={renderItem}
      />
    </View>
  );
};

export default StoreOffer;

const styles = StyleSheet.create({});
