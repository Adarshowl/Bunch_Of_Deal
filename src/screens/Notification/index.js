import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import {useIsFocused} from '@react-navigation/native';
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
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle1 from '../../styles/GlobalStyle1';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import NoResult from '../../utils/NoResult';
import {NotificationSkeleton} from '../../utils/Skeleton';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';

const Notification = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [listData, setListData] = useState([]);
  const [userData, setUserData] = useState({});

  const isFocused = useIsFocused();

  // ShowConsoleLogMessage(showError);

  useEffect(() => {
    getUserFromStorage();
  }, [isFocused]);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            // ShowConsoleLogMessage(value);
            setUserData(JSON.parse(value));
            getNotification(JSON.parse(value)?.id_user); // for now using static
          } else {
          }
        }
      });
    } catch (err) {
      crashlytics().recordError(err);

      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const getNotification = id => {
    setLoading(true);
    let body = {user_id: /*'578'*/ id, page: 1, limit: 30};
    // ShowConsoleLogMessage(body);
    ApiCall('post', body, API_END_POINTS.API_NOTIFICATIONS_GET, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // console.log(
        //   'ERROR IN GET Notification List 4 res=> ',
        //   JSON.stringify(response),
        // );

        if (response?.data?.status == 1) {
          let result = Object.values(response.data?.result);
          // console.log(JSON.stringify(result));

          setShowError(result.length <= 0);

          setListData(result);
        } else if (response.data?.success == 0) {
          setListData([]);
          setShowError(true);
        } else {
          setShowError(true);
        }
      })
      .catch(error => {
        crashlytics().recordError(error);

        console.log('ERROR IN GET Notification List 5=> ', error);
        setShowError(true);
        setListData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getEditNotification = id => {
    // setLoading(true);
    let body = {user_id: /*'578'*/ id, page: 1, limit: 30};

    ApiCall('post', body, API_END_POINTS.API_NOTIFICATIONS_GET, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // console.log('ERROR IN GET Notification List => ', JSON.stringify(response));

        if (response?.data?.status == 1) {
          let result = Object.values(response.data?.result);
          // console.log(JSON.stringify(result));

          setListData(result);
        } else if (response.data?.success == 0) {
          console.log('error');
        }
      })
      .catch(error => {
        crashlytics().recordError(error);

        console.log('ERROR IN GET Notification List 6=> ', error);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const editStatusNotification = async notification_id => {
    // setLoading(true);
    let body = {id: notification_id, status: '1'};
    // ShowConsoleLogMessage(JSON.stringify(body));
    ApiCall('post', body, API_END_POINTS.API_NOTIFICATIONS_EDIT_STATUS, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // console.log(
        //   'ERROR IN GET Notification List 7=> ',
        //   JSON.stringify(response),
        // );
        if (response?.data?.success == 1) {
          getEditNotification(userData?.id_user);
        } else if (response.data?.success == 0) {
          console.log('error');
        }
      })
      .catch(error => {
        crashlytics().recordError(error);

        console.log('ERROR IN GET Notification List 8 => ', error);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const archiveNotification = notification_id => {
    setLoading(true);
    let body = {id: notification_id};

    ApiCall('post', body, API_END_POINTS.API_NOTIFICATIONS_REMOVE, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // console.log(
        //   'ERROR IN GET Notification List 9=> ',
        //   JSON.stringify(response),
        // );

        if (response?.data?.success == 1) {
          getEditNotification(userData?.id_user);
        } else if (response.data?.success == 0) {
          console.log('error');
        }
      })
      .catch(error => {
        crashlytics().recordError(error);

        console.log('ERROR IN GET Notification List 10=> ', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onItemClick = idx => {
    let a = listData.map((data, index) => {
      let temp = Object.assign(data, {});
      if (index == idx) {
        temp.selected = !temp.selected;
      } else {
        temp.selected = false;
      }
      return temp;
    });
    setListData(a);
  };

  const onReloadBtn = () => {
    setShowError(false);
    getNotification(userData?.id_user);
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        activeOpacity={0.8}
        style={{
          backgroundColor: item?.status == 1 ? COLORS.white : '#AAE4FA',
          alignItems: 'flex-start',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={async () => {
            // navigation.navigate('StoreDetails')
            ShowConsoleLogMessage(item);
            if (item?.status != 1) {
              await editStatusNotification(item?.id);
            }
            if (item?.module == 'store') {
              navigation.navigate('StoreDetails', {
                item: {
                  store_id: item?.module_id,
                  intentFromNotification: true,
                  cid: item?.campaign_id,
                },
              });
            } else if (item?.module == 'offer') {
              navigation.navigate('OfferDetails', {
                item: {
                  id_offer: item?.module_id,
                  intentFromNotification: true,
                  cid: item?.campaign_id,
                },
              });
            } else if (item?.module == 'nsorder') {
              // ShowConsoleLogMessage(item);
              navigation.navigate('InvoiceList', {
                item: {id: item?.module_id, intentFromNotification: true},
              });
            } else if (item?.module == 'event') {
              ShowToastMessage('Work in progress');

              // ShowConsoleLogMessage(item);
              // navigation.navigate('InvoiceList', {
              //   item: {id: item?.module_id, intentFromNotification: true},
              // });
            }
          }}
          activeOpacity={0.9}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginVertical: 5,
            flex: 1,
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
        </TouchableOpacity>

        {item?.selected ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              archiveNotification(item?.id);
            }}
            style={{
              backgroundColor: COLORS.white,
              elevation: 10,
              borderRadius: 4,
              position: 'absolute',
              padding: 10,
              top: 10,
              right: 25,
            }}>
            <Text
              style={[
                {
                  fontFamily: 'Montserrat-Regular',
                  color: COLORS.black,
                  marginHorizontal: 5,
                  fontSize: 13,
                },
              ]}>
              Archive
            </Text>
          </TouchableOpacity>
        ) : null}
        <Entypo
          color={COLORS.black}
          name="dots-three-vertical"
          size={15}
          style={{
            marginTop: 5,
            marginEnd: 10,
            paddingBottom: 10,
            paddingStart: 5,
          }}
          onPress={() => {
            onItemClick(index);
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={GlobalStyle1.mainContainerwhiteColor}>
      {/* <BunchDealProgressBar loading={loading} /> */}
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
      {!showError ? (
        <FlatList
          data={listData}
          ListEmptyComponent={() => {
            return loading ? (
              <NotificationSkeleton />
            ) : (
              <Text
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginTop: 200,
                  fontSize: 18,
                  fontFamily: 'Montserrat-Medium',
                  color: 'grey',
                }}>
                {loading && listData?.length == 0 ? 'No Data Found' : ''}
              </Text>
            );
          }}
          extraData={listData}
          keyExtractor={item => {
            return item.item;
          }}
          renderItem={renderItem}
        />
      ) : (
        <NoResult onReloadBtn={onReloadBtn} />
      )}
    </SafeAreaView>
  );
};

export default Notification;
