import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import images from '../../constants/images';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import GlobalStyle1 from '../../styles/GlobalStyle1';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import BunchDealProgressBar from '../../utils/BunchDealProgressBar';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';

const Notification = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserFromStorage();
  }, []);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            // ShowConsoleLogMessage(value);
            setUserData(JSON.parse(value));
            getNotification(); // for now using static
          } else {
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const getNotification = () => {
    setLoading(true);
    let body = {user_id: '578', page: 1, limit: 30};

    ApiCall(
      'post',
      body,
      'https://bunchofdeals.com.au/APP/index.php/api/nshistoric/getNotifications_new', // old url
      {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    )
      .then(response => {
        // console.log(
        //   'ERROR IN GET Notification List => ',
        //   JSON.stringify(response),
        // );

        if (response?.data?.status == 1) {
          let result = Object.values(response.data?.result);
          // console.log(JSON.stringify(result));

          setListData(result);
        } else if (response.data?.success == 0) {
          console.log('error');
        }
      })
      .catch(error => {
        console.log('ERROR IN GET Notification List => ', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          // navigation.navigate('StoreDetails')
          ShowToastMessage('Work in progress');
          // if (item?.module == 'store') {
          //   navigation.navigate('StoreDetails', {
          //     item: {id_store: item?.module_id, intentFromNotification: true},
          //   });
          // }
          // if (item?.module == 'offer') {
          //   ShowConsoleLogMessage(item);
          //   navigation.navigate('OfferDetails', {
          //     item: {id_offer: item?.module_id, intentFromNotification: true},
          //   });
          // }
        }}
        style={{
          backgroundColor: item?.status == 1 ? COLORS.white : '#AAE4FA',
        }}>
        <View
          activeOpacity={0.9}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginVertical: 5,
          }}>
          {/* {item?.image ? (
            <Image source={{uri: item?.image}} style={[GlobalStyle1.images]} />
          ) : (
            <Image style={[GlobalStyle1.images]} source={images.def_logo} />
          )} */}
          <BunchDealImageLoader
            defaultImg={images.def_logo}
            source={item?.image}
            styles={GlobalStyle1.images}
          />

          <View
            style={{
              flexDirection: 'column',
              marginStart: 15,
            }}>
            <Text
              style={[
                FONTS.h6,
                {
                  color: COLORS.black,
                  marginHorizontal: 5,
                },
              ]}>
              {item.label_description}
            </Text>
            <Text
              style={[
                {
                  fontFamily: 'Montserrat-Regular',
                  color: 'grey',
                  marginHorizontal: 5,
                  fontSize: 13,
                  maxWidth: 230,
                },
              ]}>
              {item.label}
            </Text>
          </View>

          <Entypo
            color={COLORS.black}
            name="dots-three-vertical"
            size={15}
            style={{
              alignSelf: 'flex-start',
              marginStart: 'auto',
              marginEnd: 0,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={GlobalStyle1.mainContainerwhiteColor}>
      <BunchDealProgressBar loading={loading} />
      <View style={GlobalStyle1.Header}>
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          color={COLORS.colorPrimary}
          name="ios-arrow-back-sharp"
          size={25}
          style={{
            marginStart: 15,
          }}
        />
        <Text
          style={[
            {
              color: COLORS.colorPrimary,
              marginHorizontal: 15,
              fontFamily: 'Montserrat-Regular',
              fontSize: 18,
            },
          ]}>
          Notifications
        </Text>
      </View>
      <FlatList
        data={listData}
        extraData={listData}
        keyExtractor={item => {
          return item.item;
        }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Notification;
