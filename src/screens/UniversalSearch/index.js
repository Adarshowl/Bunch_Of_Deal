import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import ApiCall from '../../network/ApiCall';
import {STRING, images} from '../../constants';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import BunchDealProgressBar from '../../utils/BunchDealProgressBar';
import BunchDealEditText from '../../utils/EditText/BunchDealEditText';
import moment from 'moment';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import OfferCardView from '../Offer/OfferCardView';
import StoreCardView from '../Store/StoreCardView';
import {OfferSkeleton, StoreSkeleton} from '../../utils/Skeleton';

const UniversalSearch = ({navigation}) => {
  const [offerData, setOfferData] = useState(0);
  const [listData, setListData] = useState([]);
  const [listStoreData, setListStoreData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const [searchText, setSearchText] = useState('');

  const getSearchOfferList = () => {
    setLoading(true);

    let body = {
      latitude: STRING.CURRENT_LAT + '',
      longitude: STRING.CURRENT_LONG + '',
      order_by: 'recent',
      offer_ids: '0',
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      limit: '30',
      page: '1',
      search: searchText,
      category_id: '',
      radius: '',
      date: moment().format('yyyy-MM-dd H:m:s'),
      timezone: '',
    };

    ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_GET_OFFERS, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // ShowConsoleLogMessage('response 0> ' + JSON.stringify(response?.data));

        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
          let result = Object.values(response.data?.result);
          // ShowConsoleLogMessage(JSON.stringify(result[0]));
          setShowError(result.length <= 0);
          setOfferData(result.length || 0);
          setListData(result);
          getSearchStoreList();
        } else {
          setListData([]);
          setShowError(true);
        }
      })
      .catch(err => {
        // console.log('eorir < ', err);
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSearchStoreList = () => {
    setLoading(true);
    let body = {
      latitude: STRING.CURRENT_LAT + '',
      longitude: STRING.CURRENT_LONG + '',
      order_by: 'nearby',
      current_date: moment().format('yyyy-MM-dd H:m:s'),
      current_tz: 'Asia/Kolkata',
      limit: '30',
      page: '1',
      search: searchText,
      category_id: '',
      radius: '',
    };

    ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_USER_GET_STORES, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(JSON.stringify(response?.data));
          let result = Object.values(response.data?.result);
          ShowConsoleLogMessage(JSON.stringify(result));
          setShowError(result.length <= 0);
          setListStoreData(result);
        } else {
          // setListData([]);
          // setShowError(true);
        }
      })
      .catch(err => {
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderItem = ({item, index}) => {
    return index <= offerData ? (
      <OfferCardView item={item} />
    ) : (
      <StoreCardView item={item} />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* <BunchDealProgressBar loading={loading} /> */}
      <View
        style={[
          {
            height: 56,
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: COLORS.white,
            elevation: 10,
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
          Search
        </Text>
      </View>

      <View
        style={{
          flexGrow: 1,
          height: '90%',
        }}>
        <BunchDealEditText
          borderBottomWidth={1}
          placeholder={'Search...'}
          style={FONTS.body3}
          value={searchText}
          iconPosition={'left'}
          onChangeText={val => {
            setSearchText(val);
          }}
          returnKeyType={'search'}
          onSubmitEditing={() => {
            getSearchOfferList();
          }}
          icon={
            <Ionicons
              onPress={() => {}}
              marginEnd={5}
              marginStart={5}
              color={COLORS.colorPrimary}
              name="search"
              size={20}
            />
          }
        />
        <View
          style={{
            padding: 10,
          }}>
          {loading ? (
            <ActivityIndicator size={'large'} color={COLORS.colorAccent} />
          ) : null}
        </View>
        {searchText?.length > 0 ? (
          listData?.length > 0 || listStoreData?.length > 0 ? (
            <ScrollView>
              <FlatList
                data={listData}
                // ListEmptyComponent={() => {
                //   return loading ? (
                //     <OfferSkeleton />
                //   ) : (
                //     <Text
                //       style={{
                //         flex: 1,
                //         alignSelf: 'center',
                //         textAlign: 'center',
                //         marginTop: 200,
                //         fontSize: 18,
                //         fontFamily: 'Quicksand-Medium',
                //       }}>
                //       No data Found
                //     </Text>
                //   );
                // }}
                // style={{
                //   backgroundColor: COLORS.lightGrey,
                //   marginBottom: 15,
                // }}
                renderItem={({item}) => {
                  return <OfferCardView item={item} />;
                }}
              />
              <FlatList
                data={listStoreData}
                // ListEmptyComponent={() => {
                //   return loading ? (
                //     <StoreSkeleton />
                //   ) : (
                //     <Text
                //       style={{
                //         flex: 1,
                //         alignSelf: 'center',
                //         textAlign: 'center',
                //         marginTop: 200,
                //         fontSize: 18,
                //         fontFamily: 'Quicksand-Medium',
                //       }}>
                //       No data Found
                //     </Text>
                //   );
                // }}
                renderItem={({item}) => {
                  return <StoreCardView item={item} />;
                }}
              />
            </ScrollView>
          ) : showError ? (
            <Text
              style={{
                flex: 1,
                alignSelf: 'center',
                textAlign: 'center',
                marginTop: 200,
                fontSize: 18,
                fontFamily: 'Montserrat-Medium',
              }}>
              No Results Found
            </Text>
          ) : null
        ) : null}
      </View>
    </View>
  );
};

export default UniversalSearch;

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    color: COLORS.red,
    marginTop: 15,
    fontFamily: 'Montserrat-Medium',
  },
  email: {
    fontSize: 14,
    color: COLORS.white,
    fontFamily: 'Montserrat-Medium',
  },
});
