import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icons, images, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle from '../../styles/GlobalStyle';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';
import {ShowConsoleLogMessage} from '../../utils/Utility';
const Order = ({navigation, route}) => {
  const [changeOne, setChangeOne] = useState(false);
  const [userData, setUserData] = useState({});

  const [receivedData, setReceivedData] = useState();
  const [count, setCount] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    let {item} = route.params;
    let {count} = route.params;
    let {price} = route.params;
    getPaymentGatewayList();
    setReceivedData(item);
    // ShowConsoleLogMessage(JSON.stringify(item));
    setCount(count + '');
    setPrice(price + '');
    setTimeout(async () => {
      await getUserFromStorage();
    }, 0);
  }, []);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            // ShowConsoleLogMessage(value);
            setUserData(JSON.parse(value));
          } else {
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const [paymentList, setPaymentList] = useState([]);

  const getPaymentGatewayList = () => {
    // ShowConsoleLogMessage(API_END_POINTS.API_PAYMENT_GATEWAY);
    ApiCall('get', null, API_END_POINTS.API_PAYMENT_GATEWAY, {
      Accept: 'application/json',
      // 'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
          let result = Object.values(response.data?.result);
          // ShowConsoleLogMessage(JSON.stringify(result));
          setPaymentList(result);
        } else {
          setPaymentList([]);
        }
      })
      .catch(err => {
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  const onItemClick = idx => {
    let a = paymentList.map((data, index) => {
      let temp = Object.assign(data, {});
      if (index == idx) {
        temp.selected = !temp.selected;
      } else {
        temp.selected = false;
      }
      return temp;
    });
    setPaymentList(a);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onItemClick(index);
        }}
        activeOpacity={0.8}
        style={{
          flexDirection: 'row',
          padding: 15,
          margin: 15,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: item?.selected ? COLORS.lightGreen : COLORS.grey_20,
        }}>
        <BunchDealImageLoader
          defaultImg={images.def_logo}
          source={item?.image}
          styles={{
            height: 60,
            width: 60,
            backgroundColor: COLORS.backgroundColor,
          }}
        />

        <View
          style={{
            width: 10,
            height: 0,
          }}></View>

        <View
          style={{
            padding: 3,
            flex: 1,
            marginTop: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Montserrat-Medium',
                color: COLORS.black,
                flex: 1,
              }}
              numberOfLines={2}>
              {item?.payment}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Montserrat-Regular',
              color: COLORS.black,
              marginTop: 2,
            }}>
            {item?.description}
          </Text>
        </View>
        {item?.selected ? (
          <Ionicons
            name="checkmark-circle"
            size={25}
            color={COLORS.lightGreen}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  const submitOrderApi = () => {
    let body = {
      user_id: userData?.id_user,
      seller_id: receivedData?.id_offer,
      module: 'store',
      module_id: receivedData?.store_id,
      fcm_id: 'fcm_token',
    };
  };

  return (
    <SafeAreaView style={GlobalStyle.mainContainerBgColor}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            height: 56,
          }}>
          <BunchDealVectorIcon
            title={AntDesign}
            name="close"
            size={25}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text
            style={[
              styles.toolBarTitle,
              {
                marginStart: -15,
              },
            ]}>
            Checkout
          </Text>
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            justifyContent: 'center',

            height: 56,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 18,
                  height: 18,
                  backgroundColor: COLORS.colorPrimary,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: changeOne
                      ? COLORS.colorPrimary
                      : COLORS.white,
                    borderRadius: 50,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                height: 3,
                width: 180,
                backgroundColor: changeOne
                  ? COLORS.colorPrimary
                  : COLORS.shimmer_loading_color_darker,
              }}></View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 18,
                  height: 18,
                  backgroundColor: changeOne
                    ? COLORS.colorPrimary
                    : COLORS.shimmer_loading_color_darker,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: changeOne
                      ? COLORS.colorPrimary
                      : COLORS.shimmer_loading_color_darker,
                    borderRadius: 50,
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                marginTop: 5,
                color: COLORS.colorPrimary,
                flex: 1,
                textAlign: 'center',
              }}>
              Confirm
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                marginTop: 5,
                color: changeOne
                  ? COLORS.colorPrimary
                  : COLORS.shimmer_loading_color_darker,
                textAlign: 'center',
                flex: 1,
              }}>
              Payment
            </Text>
          </View>
        </View>
      </View>
      {!changeOne ? (
        <>
          <View
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                marginTop: 5,
                color: COLORS.black,
                marginStart: 5,
                fontSize: 13,
              }}>
              ORDER DETAIL:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  marginTop: 5,
                  color: COLORS.black,
                  marginStart: 5,
                  fontSize: 13,
                }}>
                Full Name:
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  marginTop: 5,
                  color: COLORS.shimmer_loading_color_darker,
                  marginStart: 10,
                  fontSize: 13,
                }}>
                {userData?.name}
              </Text>
            </View>
            {userData?.telephone ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-SemiBold',
                    marginTop: 5,
                    color: COLORS.black,
                    marginStart: 5,
                    fontSize: 13,
                  }}>
                  Phone Number:
                </Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    marginTop: 5,
                    color: COLORS.shimmer_loading_color_darker,
                    marginStart: 10,
                    fontSize: 13,
                  }}>
                  {userData?.telephone ? userData?.telephone : '-'}
                </Text>
              </View>
            ) : null}
          </View>
          <View
            style={{
              height: 2,
              backgroundColor: COLORS.shimmer_loading_color,
              width: '100%',
            }}
          />

          <View
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                marginTop: 5,
                color: COLORS.black,
                marginStart: 5,
                fontSize: 13,
              }}>
              PRODUCT ORDER:
            </Text>

            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                margin: 10,
              }}>
              <Image
                source={icons.small_notification_icon}
                style={{
                  width: 60,
                  height: 60,
                }}
              />
              <View
                style={{
                  padding: 3,
                  flex: 1,
                  marginTop: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Montserrat-Regular',
                      color: COLORS.black,
                      marginStart: 5,
                      flex: 1,
                    }}
                    numberOfLines={2}>
                    {receivedData?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: 'Montserrat-SemiBold',
                      color: COLORS.black,
                      marginStart: 5,
                    }}>
                    {receivedData?.currency?.symbol +
                      '' +
                      receivedData?.offer_value}
                    .0
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Montserrat-Regular',
                    color: COLORS.black,
                    marginStart: 10,
                    marginTop: 2,
                  }}>
                  Qty: {count}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              height: 2,
              backgroundColor: COLORS.shimmer_loading_color,
              width: '100%',
            }}
          />

          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                marginTop: 5,
                color: COLORS.black,
                marginStart: 5,
                fontSize: 14,
              }}>
              ORDER TOTAL
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                marginTop: 5,
                color: COLORS.black,
                marginEnd: 5,
                fontSize: 14,
              }}>
              {receivedData?.currency?.symbol + '' + price}.0
            </Text>
          </View>
        </>
      ) : (
        <FlatList
          style={{
            marginTop: 10,
          }}
          data={paymentList}
          renderItem={renderItem}
        />
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (changeOne) {
            // navigation.replace('MainContainer');
            // alert('order placed successfully');
            submitOrderApi();
          } else {
            setChangeOne(!changeOne);
          }
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          height: 56,
          width: '100%',
          backgroundColor: COLORS.colorAccent,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: COLORS.white,
            marginEnd: 5,
            fontSize: 16,
            letterSpacing: 0.5,
          }}>
          {STRING.next}
        </Text>
        <AntDesign name="arrowright" size={15} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  toolBarTitle: {
    flex: 1,
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    textAlign: 'center',
  },
});
