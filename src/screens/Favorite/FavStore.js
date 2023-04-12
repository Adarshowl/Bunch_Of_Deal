import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle2 from '../../styles/GlobalStyle2';
import StoreCardView from '../Store/StoreCardView';

import moment from 'moment';
import NoResult from '../../utils/NoResult';
import {getSavedStoreAsString} from '../../utils/RealmUtility';
import {StoreSkeleton} from '../../utils/Skeleton';
import {ShowConsoleLogMessage} from '../../utils/Utility';

const FavStore = ({navigation}) => {
  const [storeId, setStoreId] = useState('');
  const [showError, setShowError] = useState(false);
  const [recentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    let ids = await getSavedStoreAsString();
    ShowConsoleLogMessage(ids);
    getStoreList(ids);
    setStoreId(ids);
  }, []);

  const getStoreList = val => {
    if (val != '') {
      setLoading(true);
      let body = {
        latitude: STRING.CURRENT_LAT + '',
        longitude: STRING.CURRENT_LONG + '',
        order_by: 'recent',
        store_ids: val,
        token: STRING.FCM_TOKEN,
        mac_adr: STRING.MAC_ADR,
        limit: '30',
        page: '1',
        search: '',
        date: moment().format('yyyy-MM-dd H:m:s'),
        timezone: '',
      };

      // ShowConsoleLogMessage(JSON.stringify(body));

      // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
      ApiCall('post', body, API_END_POINTS.API_USER_GET_STORES, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      })
        .then(response => {
          // ShowConsoleLogMessage('response 0> ' + JSON.stringify(response?.data));
          if (response?.data?.success == 1) {
            // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
            let result = Object.values(response.data?.result);
            // ShowConsoleLogMessage(JSON.stringify(result));
            setShowError(result.length <= 0);
            setRecentData(result);
          } else {
            setRecentData([]);
            setShowError(true);
          }
        })
        .catch(err => {
          // console.log('error < ', err);
          ShowConsoleLogMessage(
            'Error in get offer recent api call: ' + err.message,
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setShowError(true);
    }
  };

  const onReloadBtn = () => {
    setShowError(false);

    getStoreList(storeId);
  };

  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      <View
        style={[
          GlobalStyle2.headerFooterStyle,
          {
            maxHeight: 56,
          },
        ]}>
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          marginStart={15}
          color={COLORS.colorPrimary}
          name="ios-arrow-back-sharp"
          size={25}
        />

        <Text
          style={[
            FONTS.body2,
            {
              color: COLORS.colorPrimary,
              marginHorizontal: 10,
            },
          ]}>
          My stores
        </Text>

        <View
          style={{
            padding: 10,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <Ionicons
            onPress={() => {
              navigation.navigate('UniversalSearch');
            }}
            marginEnd={5}
            color={COLORS.colorPrimary}
            name="search"
            size={20}
          />
        </View>
      </View>
      {!showError ? (
        <FlatList
          data={recentData}
          ListEmptyComponent={() => {
            return loading ? (
              <StoreSkeleton />
            ) : (
              <Text
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginTop: 200,
                  fontSize: 18,
                  fontFamily: 'Quicksand-Medium',
                }}>
                No data Found
              </Text>
            );
          }}
          renderItem={({item}) => {
            return <StoreCardView item={item} />;
          }}
        />
      ) : (
        <NoResult onReloadBtn={onReloadBtn} />
      )}
    </View>
  );
};

export default FavStore;

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    color: COLORS.white,
    marginTop: 15,
    fontFamily: 'Montserrat-Medium',
  },
  email: {
    fontSize: 14,
    color: COLORS.white,
    fontFamily: 'Montserrat-Medium',
  },
});
