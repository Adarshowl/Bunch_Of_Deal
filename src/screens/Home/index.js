import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {icons, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle from '../../styles/GlobalStyle';
import BunchDealCommonToolBar from '../../utils/BunchDealCommonToolBar';
import BunchDealImage from '../../utils/BunchDealImage';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import Offer from '../Offer';
import SearchDialog from '../Search';
import PlacePickerLocation from '../Search/PlacePickerLocation';
import Store from '../Store';

const Home = ({navigation}) => {
  const [toolbarTitle, setToolbarTitle] = useState('Offers');

  const [percent, setPercent] = useState(true);
  const [storeFront, setStoreFront] = useState(false);

  const [notificationCount, setNotificationCount] = useState(0);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showPlacePickModal, setShowPlacePickModal] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [radius, setRadius] = useState('');
  const closeSearchModal = () => {
    setUpdate(false);
    setStoreUpdate(false);
    setShowSearchModal(!showSearchModal);
  };
  const closePlacePickModal = () => {
    setShowPlacePickModal(!showPlacePickModal);
  };

  const [update, setUpdate] = useState(false);
  const [storeUpdate, setStoreUpdate] = useState(false);
  const handleSearchButtonClick = () => {
    closeSearchModal();
    setUpdate(true);
  };

  const handleStoreSearchButtonClick = () => {
    closeSearchModal();
    setStoreUpdate(true);
  };

  useEffect(() => {
    getNotificationCount();
  }, []);

  const getNotificationCount = val => {
    let body = {
      user_id: '578',
      guest_id: '0',
      // auth_type: '', // if login not sent
      // auth_id: '', // if login sent not
      status: '0', // 0 for getting unread notifications
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_NOTIFICATIONS_COUNT_GET);
    ApiCall('post', body, API_END_POINTS.API_NOTIFICATIONS_COUNT_GET, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(response.data);
          // let result = Object.values(response.data?.result);
          setNotificationCount(response?.data?.result);
        } else {
          setNotificationCount(0);
        }
      })
      .catch(err => {
        setNotificationCount(0);

        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  return (
    <View style={GlobalStyle.mainContainerBgColor}>
      <View style={GlobalStyle.commonToolbarBG}>
        <BunchDealVectorIcon
          title={Entypo}
          name={'menu'}
          color={COLORS.colorPrimary}
          size={25}
          style={GlobalStyle.marginHorizontal15}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
        <BunchDealCommonToolBar title={toolbarTitle} />
        <BunchDealVectorIcon
          title={Fontisto}
          name={'search'}
          color={COLORS.colorPrimary}
          size={18}
          style={GlobalStyle.marginHorizontal10}
          onPress={() => {
            // ShowToastMessage('Coming soon!');
            closeSearchModal();
          }}
        />
        <View>
          <BunchDealVectorIcon
            title={MaterialIcons}
            name={'notifications'}
            color={COLORS.colorPrimary}
            size={25}
            style={GlobalStyle.marginHorizontal15}
            onPress={() => {
              navigation.navigate('Notification');
            }}
          />
          {notificationCount > 0 ? (
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
                backgroundColor: COLORS.colorPromo,
                textAlign: 'center',
                color: COLORS.white,
                position: 'absolute',
                right: 10,
                top: -5,
                paddingHorizontal: 5,
                borderRadius: 5,
              }}>
              {notificationCount}
            </Text>
          ) : null}
        </View>
      </View>

      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            justifyContent: 'space-around',
            height: 45,
          },
        ]}>
        <Text
          style={[
            FONTS.h6,
            {
              color: percent
                ? COLORS.colorAccent
                : COLORS.shimmer_loading_color,
              fontSize: 16,
            },
          ]}
          onPress={() => {
            setPercent(true);
            setStoreFront(false);
            setToolbarTitle('Offers');
            setUpdate(false);
            setStoreUpdate(false);
          }}>
          Offers
        </Text>
        <Text
          style={[
            FONTS.h6,
            {
              color: storeFront
                ? COLORS.colorAccent
                : COLORS.shimmer_loading_color,
              fontSize: 16,
            },
          ]}
          onPress={() => {
            setPercent(false);
            setStoreFront(true);
            setToolbarTitle('Store');
            setStoreUpdate(false);
            setUpdate(false);
          }}>
          Store
        </Text>
      </View>
      <View
        style={{
          backgroundColor: COLORS.lightGrey,
          height: 0.5,
          width: '100%',
        }}
      />
      {percent ? (
        <Offer
          searchText={searchText}
          location={STRING.SEARCH_LOCATION}
          radius={radius}
          catId={categoryId}
          dataChange={update}
        />
      ) : null}
      {storeFront ? (
        <Store
          searchText={searchText}
          location={STRING.SEARCH_LOCATION}
          radius={radius}
          catId={categoryId}
          dataChange={storeUpdate}
        />
      ) : null}
      <SearchDialog
        show={showSearchModal}
        onPress={
          percent ? handleSearchButtonClick : handleStoreSearchButtonClick
        }
        title={percent ? 'offers' : 'stores'}
        onRequestClose={closeSearchModal}
        searchText={searchText}
        onChangeText={val => {
          setSearchText(val);
        }}
        onCurrentLocationPress={() => {
          // closeSearchModal();
          closePlacePickModal();
        }}
        onChangeRadius={val => {
          setRadius(val);
        }}
        onChangeCategoryId={val => {
          setCategoryId(val);
        }}
      />
      <PlacePickerLocation
        navigation={navigation}
        onRequestClose={closePlacePickModal}
        show={showPlacePickModal}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
