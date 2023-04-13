import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import NoResult from '../../utils/NoResult';
import {ShowConsoleLogMessage, Timezone} from '../../utils/Utility';
import StoreCardView from '../Store/StoreCardView';
import SearchDialog from '../Search';
import PlacePickerLocation from '../Search/PlacePickerLocation';
import PlaceChooseLocation from '../Search/PlaceChooseLocation';
import {StoreSkeleton} from '../../utils/Skeleton';

const CategoryList = ({navigation, route}) => {
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [receivedData, setReceivedData] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showPlacePickModal, setShowPlacePickModal] = useState(false);
  const [radius, setRadius] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [showPlaceChooseModal, setShowPlaceChooseModal] = useState(false);
  const [timeZone, setTimezone] = useState('');

  useEffect(() => {
    Timezone.getTimeZone().then(result => {
      setTimezone(result);
    });
    let {item} = route.params;
    setReceivedData(item);
    setCategoryName(item?.name);
    getOfferList(item);
  }, []);

  const getOfferList = item => {
    let body = {
      latitude: STRING.CURRENT_LAT + '',
      longitude: STRING.CURRENT_LONG + '',
      order_by: 'recent',
      offer_ids: '0',
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      limit: '30',
      page: '1',
      search: '',
      category_id: item?.id_category,
      radius: '',
      date: moment().format('yyyy-MM-dd H:m:s'),
      timezone: timeZone,
    };

    // ShowConsoleLogMessage(JSON.stringify(item));

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
          setListData(result);
        } else {
          setListData([]);
          setShowError(true);
        }
      })
      .catch(err => {
        // console.log('eorir < ', err);
        setShowError(true);

        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  const onReloadBtn = () => {
    setShowError(false);
    getOfferList(receivedData);
  };

  const closeSearchModal = () => {
    setShowSearchModal(!showSearchModal);
  };

  const handleStoreSearchButtonClick = () => {
    closeSearchModal();
    getSearchStoreList(searchText, categoryId, radius);
  };
  const closePlacePickModal = () => {
    if (showPlaceChooseModal) {
      closePlaceChooseModal();
    }
    setShowPlacePickModal(!showPlacePickModal);
  };
  const closePlaceChooseModal = () => {
    setShowPlaceChooseModal(!showPlaceChooseModal);
  };

  const getSearchStoreList = (search, catId, radius, location) => {
    let body = {
      latitude: STRING.CURRENT_LAT + '',
      longitude: STRING.CURRENT_LONG + '',
      order_by: 'nearby',
      current_date: moment().format('yyyy-MM-dd H:m:s'),
      current_tz: 'Asia/Kolkata',
      limit: '30',
      page: '1',
      search: search,
      category_id: catId,
      radius: radius,
    };

    ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_USER_GET_STORES, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          let result = Object.values(response.data?.result);
          setListData(result);
        } else {
          setListData([]);
        }
      })
      .catch(err => {
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
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
              flex: 1,
            },
          ]}>
          {categoryName || ''}
        </Text>

        <Fontisto
          onPress={() => {
            // closeSearchModal();
            navigation.navigate('UniversalSearch');
          }}
          marginEnd={15}
          color={COLORS.colorPrimary}
          name="search"
          size={18}
        />
      </View>
      {!showError ? (
        <FlatList
          data={listData}
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
      <SearchDialog
        show={showSearchModal}
        onPress={handleStoreSearchButtonClick}
        title={'stores'}
        onRequestClose={closeSearchModal}
        searchText={searchText}
        onChangeText={val => {
          setSearchText(val);
        }}
        onCurrentLocationPress={() => {
          // closeSearchModal();
          // closePlacePickModal();
          closePlaceChooseModal();
        }}
        onChangeRadius={val => {
          setRadius(val);
        }}
        onChangeCategoryId={(val, name) => {
          setCategoryId(val);
          setCategoryName(name);
        }}
      />
      <PlacePickerLocation
        navigation={navigation}
        onRequestClose={closePlacePickModal}
        show={showPlacePickModal}
      />
      <PlaceChooseLocation
        navigation={navigation}
        onRequestClose={closePlaceChooseModal}
        onChangeLocation={closePlacePickModal}
        show={showPlaceChooseModal}
      />
    </View>
  );
};

export default CategoryList;

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
