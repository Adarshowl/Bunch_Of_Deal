import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {icons, images, SIZES, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle from '../../styles/GlobalStyle';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import BunchDealProgressBar from '../../utils/BunchDealProgressBar';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import moment from 'moment';
import crashlytics from '@react-native-firebase/crashlytics';
import Fontisto from 'react-native-vector-icons/Fontisto';

import axios from 'axios';
import qs from 'qs';
import {decode, encode} from 'base-64';
import {WebView} from 'react-native-webview';

const TEST_PAYPAL_KEY =
  'ARELQn0UMVmN65u5e6oMKWSekG4-63P6MnN7uUXgvn-EkBjKrkxAKeoyEyeO4oXgkhinXHJaa0sTyFLM';
const LIVE_PAYPAL_KEY =
  'AQNVRTj2GQT-m_NITEuxE1rz35-QvsUwHlj2vHLdk35JU8rYhnYnQ5lJNRvDQMYiSq6DmFO3ibrnu7ls';

const Order = ({navigation, route}) => {
  const [changeOne, setChangeOne] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});

  const [receivedData, setReceivedData] = useState();
  const [orderId, setOfferId] = useState('');
  const [CurrentDate, setCurrentDate] = useState('');
  const [orderDateTime, setOfferDateTime] = useState('');
  const [count, setCount] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState(0);
  const [telephone, setTelephone] = useState('');
  const [order_amount, setorderAmount] = useState('');
  useEffect(() => {
    let {item} = route.params;
    let {count} = route.params;
    let {price} = route.params;
    let {originalPrice} = route.params;
    let {telephone} = route.params;
    getPaymentGatewayList();
    setReceivedData(item);
    // ShowConsoleLogMessage('orderamount ' + JSON.stringify(originalPrice));
    // setorderAmount('orderamount',+ JSON.stringify(originalPrice));
    ShowConsoleLogMessage('originalPrice => ' + JSON.stringify(originalPrice));
    ShowConsoleLogMessage('price ' + JSON.stringify(price));
    // setorderAmount(price +'');
    setCount(count + '');
    setPrice(price + '');

    setOriginalPrice(originalPrice + '');
    setTelephone(telephone + '');
    setTimeout(async () => {
      await getUserFromStorage();
    }, 0);
  }, []);
  useEffect(() => {
    if (!global.btoa) {
      global.btoa = encode;
    }

    if (!global.atob) {
      global.atob = decode;
    }
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
      crashlytics().recordError(err);

      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const currentTime = moment().format('HH:mm');

  // Function to determine AM or PM
  const getAMPM = time => {
    const hour = parseInt(time.split(':')[0]);
    const minutes = time.split(':')[1];
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const currentAMPM = getAMPM(currentTime);
  console.log(currentAMPM);

  const [paymentList, setPaymentList] = useState([]);
  const [masterPaymentList, setMasterPaymentList] = useState([]);

  const [selectedPayment, setSelectedPayment] = useState(null);

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
          setMasterPaymentList(result);
        } else {
          setPaymentList([]);
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

  const onItemClick = idx => {
    let a = paymentList.map((data, index) => {
      let temp = Object.assign(data, {});
      if (index == idx) {
        temp.selected = !temp.selected;
        if (temp?.selected) {
          setSelectedPayment(temp);
        } else {
          setSelectedPayment(null);
        }
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
          marginHorizontal: 15,
          marginTop: 15,
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

  const triggerCall = () => {
    let m = telephone + '';
    if (m != '') {
      try {
        Linking.openURL(`tel:${m}`);
      } catch (error) {
        crashlytics().recordError(error);
      }
    } else {
      ShowToastMessage('Contact Number not available');
    }
  };

  const submitOrderApi = () => {
    setLoading(true);
    let c = [];
    c.push();
    let body = {
      user_id: userData?.id_user,
      seller_id: receivedData?.id_offer,
      module: 'store',
      module_id: receivedData?.store_id,
      fcm_id: 'fcm_token',
      req_cf_data: JSON.stringify({
        'Full Name': userData?.name,
        'Phone Number': userData?.telephone,
      }),
      payment_method: selectedPayment?.id,
      user_token: userData?.token,
      order_amount: price + '',
      order_date: moment().format('YYYY-MM-DD'),
      order_time: moment().format('HH:mm:ss'),
      cart: [
        {
          module: 'offer',
          module_id: parseInt(receivedData?.id_offer),
          qty: parseInt(count),
          amount: originalPrice + '',
        },
      ],
    };
    // {module_id=8, req_cf_data={"Full Name":"g ","Phone Number":"0293393839","Notes":"yv"},
    //  user_id=565, module=store, user_token=76558d292d03a265e91054a2cb33b0d3, seller_id=98,
    // fcm_id=fG, cart=[{"module":"offer","module_id":98,"qty":1,"amount":"15.0"}], payment_method=3}
    ShowConsoleLogMessage('API_URl -> ' + API_END_POINTS.API_ORDERS_CREATE_COD);
    ShowConsoleLogMessage('req body \n ' + JSON.stringify(body));

    ApiCall('post', body, API_END_POINTS.API_ORDERS_CREATE_COD, {
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        let da = response?.data?.split(':')[1];
        ShowConsoleLogMessage(
          'response of create order cod api \n -> ' + response?.data,
        );
        // ShowConsoleLogMessage('response da -> ' + da.split(',')[0]);
        if (da.split(',')[0] == 1) {
          setShowDone(true);
          // setorderAmount(order_amount);
          const currentDateTime = moment().format('DD-MM-YYYY');
          const currentTime = moment().format('HH:mm');
          setCurrentDate(currentDateTime);

          // Function to determine AM or PM
          function getAMPM(time) {
            const hour = parseInt(time.split(':')[0]);
            const minutes = time.split(':')[1];
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
            return `${formattedHour}:${minutes} ${ampm}`;
          }

          const currentAMPM = getAMPM(currentTime);
          setOfferDateTime(currentAMPM);
          setorderAmount('');
          setOfferId(
            response?.data
              ?.split(',')[1]
              ?.split(':')[1]
              ?.split('}')[1]
              ?.replaceAll('"', '') + '',
          );
        } else {
          ShowToastMessage('Something went wrong');
          setSelectedPayment(null);
          getPaymentGatewayList();
          setShowError(true);
        }
      })
      .catch(error => {
        crashlytics().recordError(error);

        ShowToastMessage('Something went wrong');
        setSelectedPayment(null);
        getPaymentGatewayList();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createPaypalOrderApi = paymentId => {
    setLoading(true);
    let c = [];
    c.push();
    let body = {
      user_id: userData?.id_user,
      seller_id: receivedData?.id_offer,
      module: 'offer',
      module_id: receivedData?.store_id,
      fcm_id: 'fcm_token',
      order_amount: price + '',
      order_date: moment().format('YYYY-MM-DD'),
      order_time: moment().format('HH:mm:ss'),
      req_cf_data: JSON.stringify({
        'Full Name': userData?.name,
        'Phone Number': userData?.telephone,
      }),
      payment_method: selectedPayment?.id,
      user_token: userData?.token,
      cart: [
        {
          module: 'offer',
          module_id: parseInt(receivedData?.id_offer),
          qty: parseInt(count),
          amount: originalPrice + '',
        },
      ],
    };

    ShowConsoleLogMessage('createPaypalOrderApi => ' + JSON.stringify(body));

    ApiCall('post', body, API_END_POINTS.API_ORDERS_CREATE, {
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        let da = response?.data?.split(':')[1];

        ShowConsoleLogMessage(
          'response -> ' +
            response?.data
              ?.split(',')[1]
              ?.split(':')[1]
              ?.split('}')[0]
              ?.replaceAll('"', '') +
            '',
        );
        // ShowConsoleLogMessage('response da -> ' + da.split(',')[0]);
        if (da.split(',')[0] == 1) {
          setShowDone(true);
          setorderAmount('');

          const currentDateTime = moment().format('DD-MM-YYYY');
          const currentTime = moment().format('HH:mm');
          setCurrentDate(currentDateTime);

          // Function to determine AM or PM
          function getAMPM(time) {
            const hour = parseInt(time.split(':')[0]);
            const minutes = time.split(':')[1];
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
            return `${formattedHour}:${minutes} ${ampm}`;
          }

          const currentAMPM = getAMPM(currentTime);
          setOfferDateTime(currentAMPM);

          // setOfferDateTime(moment().format('YYYY-MM-DD HH:mm:ss'));
          // setOfferId(response?.data?.split(',')[1]?.split(':')[1] + '');
          setOfferId(
            response?.data
              ?.split(',')[1]
              ?.split(':')[1]
              ?.split('}')[0]
              ?.replaceAll('"', '') + '',
          );
          updatePaypalOrderApi(
            response?.data
              ?.split(',')[1]
              ?.split(':')[1]
              ?.split('}')[0]
              ?.replaceAll('"', '') + '',
            paymentId,
          );
        } else {
          ShowToastMessage('Something went wrong.');
          setSelectedPayment(null);
          getPaymentGatewayList();
          setShowError(true);
        }
      })
      .catch(error => {
        crashlytics().recordError(error);

        ShowToastMessage('Something went wrong.');
        setSelectedPayment(null);
        getPaymentGatewayList();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updatePaypalOrderApi = (orderId, paymentId) => {
    setLoading(true);

    let body = {
      order_id: orderId,
      payment_token: paymentId,
    };

    ShowConsoleLogMessage('updatePaypalOrderApi => ' + JSON.stringify(body));

    ApiCall('post', body, API_END_POINTS.UPDATE_STATUS_API, {
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        ShowConsoleLogMessage(
          'response UPDATE_STATUS_API -> ' + JSON.stringify(response?.data),
        );
        // ShowConsoleLogMessage('response da -> ' + da.split(',')[0]);
        if (response?.data?.result == '1') {
          ShowToastMessage('Payment Successful');
        } else {
          ShowToastMessage('Something went wrong payment.......');
          setSelectedPayment(null);
          getPaymentGatewayList();
        }
      })
      .catch(error => {
        crashlytics().recordError(error);
        ShowToastMessage('Something went wrong>>>>>>>>>>.');
        setSelectedPayment(null);
        getPaymentGatewayList();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [isWebViewLoading, SetIsWebViewLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [shouldShowWebViewLoading, setShouldShowWebviewLoading] =
    useState(true);

  const [firstTime, setFirstTime] = useState(true);

  const onWebviewLoadStart = () => {
    if (shouldShowWebViewLoading) {
      SetIsWebViewLoading(true);
    }
  };

  const _onNavigationStateChange = webViewState => {
    // console.log('webViewState', webViewState);

    //When the webViewState.title is empty this mean it's in process loading the first paypal page so there is no paypal's loading icon
    //We show our loading icon then. After that we don't want to show our icon we need to set setShouldShowWebviewLoading to limit it
    if (webViewState.title == '') {
      //When the webview get here Don't need our loading anymore because there is one from paypal
      setShouldShowWebviewLoading(false);
    }

    if (webViewState.url.includes('https://bunchofdeals.com.au/')) {
      if (firstTime) {
        setFirstTime(false);
        const urlArr = webViewState.url.split(/(=|&)/);
        setLoading(true);
        const paymentId = urlArr[2];
        const payerId = urlArr[10];
        console.log(paymentId + ' --- ' + payerId);
        console.log(accessToken);

        fetch(
          //`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, // test
          `https://api.paypal.com/v1/payments/payment/${paymentId}/execute`, // live
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + accessToken,
            },
            body: JSON.stringify({payer_id: payerId}),
          },
        )
          .then(response => {
            return response.json();
          })
          .then(response => {
            console.log('fetch response');
            console.log(JSON.stringify(response));
            if (response?.id) {
              setPaypalUrl('');
              SetIsWebViewLoading(false);
              createPaypalOrderApi(response?.id);
            } else if (response?.name == 'TRANSACTION_REFUSED') {
              setPaypalUrl('');
              SetIsWebViewLoading(false);
              setFirstTime(true);

              setLoading(false);
              ShowToastMessage('Payment Failed');
            } else {
              setPaypalUrl('');
              SetIsWebViewLoading(false);
              setFirstTime(true);

              setLoading(false);
              ShowToastMessage('Payment Failed');
            }
          })
          .catch(err => {
            setShouldShowWebviewLoading(true);

            console.log({...err});
            setLoading(false);
            ShowToastMessage('Payment Failed');
            setPaypalUrl('');
            setFirstTime(true);

            SetIsWebViewLoading(false);
          });
      }
    }
  };

  const generatePaypalUrl = async () => {
    try {
      setLoading(true);
      const dataDetail = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        transactions: [
          {
            amount: {
              currency: 'AUD',
              total: price + '',
              // details: {
              //   shipping: '6',
              //   subtotal: '20',
              //   shipping_discount: '0',
              //   insurance: '0',
              //   handling_fee: '0',
              //   tax: '0',
              // },
            },
            description: 'This is the payment transaction description',
            payment_options: {
              allowed_payment_method: 'IMMEDIATE_PAY',
            },
            item_list: {
              items: [
                {
                  name: receivedData?.name,
                  description: receivedData?.description,
                  quantity: count + '',
                  price: price + '',
                  tax: '0',
                  sku:
                    '' +
                    receivedData?.id_offer +
                    '_' +
                    receivedData?.store_id +
                    '_' +
                    receivedData?.user_id,
                  currency: 'AUD',
                },
                // receivedData,
              ],
            },
          },
        ],
        redirect_urls: {
          return_url: 'https://bunchofdeals.com.au/',
          cancel_url: 'https://bunchofdeals.com.au/APP/index.php/',
        },
      };
      // Step 1: Get an access token from PayPal
      const tokenResponse = await axios.post(
        //'https://api.sandbox.paypal.com/v1/oauth2/token', // test
        'https://api.paypal.com/v1/oauth2/token', // live
        qs.stringify({grant_type: 'client_credentials'}),
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username:
              // 'ARELQn0UMVmN65u5e6oMKWSekG4-63P6MnN7uUXgvn-EkBjKrkxAKeoyEyeO4oXgkhinXHJaa0sTyFLM',
              'AQNVRTj2GQT-m_NITEuxE1rz35-QvsUwHlj2vHLdk35JU8rYhnYnQ5lJNRvDQMYiSq6DmFO3ibrnu7ls', //"your_paypal-app-client-ID",
            password:
              //'EJnyaIIG65X7UamY46_nFhpw4AZN93U8VoKXqCNuNA2oBD1OcqEnq79ho6g9lhRVttzd65iW5ZmT_31K',
              'EMmZzsanz9p8d_6zkm6iJuerJC3M0V-l_i8kGwc4NEzE3vbP0segfFtZHLygTO-jb5s563gVPprbLEvm',
          },
        },
      );

      const accessToken = tokenResponse.data.access_token;
      setAccessToken(accessToken);
      // Step 2: Create a PayPal payment request
      const paymentResponse = await axios.post(
        // 'https://api.sandbox.paypal.com/v1/payments/payment', // test
        'https://api.paypal.com/v1/payments/payment', // live
        dataDetail,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const {id, links} = paymentResponse.data;
      const approvalUrl = links.find(data => data.rel === 'approval_url').href;

      console.log('PayPal response:', approvalUrl);

      // Set the PayPal URL or do something else with it
      setLoading(false);

      setPaypalUrl(approvalUrl);

      // Navigate to the payment page or handle the URL as needed
      // navigation.navigate('Payment', {
      //   paypalUrl: approvalUrl,
      //   accessToken: accessToken,
      //   userData: userData,
      //   receivedData: receivedData,
      //   paymentType: selectedPayment?.id,
      //   price: price,
      //   count: count,
      //   originalPrice: originalPrice,
      // });
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);

      // Handle the error as needed, e.g., show an error message to the user
    }
  };

  return (
    <View style={GlobalStyle.mainContainerBgColor}>
      <BunchDealProgressBar loading={loading} />
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
            style={{
              padding: 5,
              //backgroundColor: 'red',
            }}
            color={COLORS.shimmer_loading_color_darker}
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
              }}
            />
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
      {showDone ? (
        <View
          style={{
            // flex: 1,
            alignItems: 'center',
            // justifyContent: 'center',
            marginTop: SIZES.width / 4,
            // backgroundColor: 'red',
            paddingBottom: 20,
          }}>
          <Ionicons
            name="checkmark-circle"
            size={120}
            color={COLORS.holoGreen}
            style={{
              marginTop: 'auto',
            }}
          />
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              marginTop: 5,
              color: COLORS.shimmer_loading_color_darker,
              textAlign: 'center',
              // flex: 1,
            }}>
            Your order has been sent successfully!
          </Text>

          <View
            style={{
              borderColor: COLORS.grey_20,
              paddingVertical: 5,
              paddingHorizontal: 8,
              marginBottom: 10,
              marginTop: 20,
              // flex: 1,
              width: '90%',
              elevation: 10,
              backgroundColor: '#e7e7e7',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Montserrat-SemiBold',
                color: COLORS.black,

                textAlign: 'center',
              }}>
              Order Details
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Montserrat-Regular',
                color: COLORS.black,
                marginTop: 5,
                marginStart: 5,
              }}>
              Order Id: #{orderId}
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Montserrat-Regular',
                color: COLORS.black,
                marginTop: 5,
                marginStart: 5,
              }}>
              Product Name: {receivedData?.name}
            </Text>
            {/* <Text
              style={{
                fontSize: 14,
                fontFamily: 'Montserrat-Regular',
                color: COLORS.black,
                marginTop: 5,
                marginStart: 5,
              }}
              numberOfLines={2}>
              Order Amount: {order_amount}
              .0
            </Text> */}
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Montserrat-Regular',
                color: COLORS.black,
                marginTop: 5,
                marginStart: 5,
              }}
              numberOfLines={2}>
              Order Total: {receivedData?.currency?.symbol + '' + price}
              .0
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Montserrat-Regular',
                color: COLORS.black,
                marginTop: 5,
                marginStart: 5,
              }}
              numberOfLines={2}>
              {/* Order Date & Time: {moment().format('LLL')} */}
              Order Date : {CurrentDate}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Montserrat-Regular',
                color: COLORS.black,
                marginTop: 5,
                marginStart: 5,
              }}
              numberOfLines={2}>
              {/* Order Date & Time: {moment().format('LLL')} */}
              Order Time: {orderDateTime}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Montserrat-Regular',
              color: COLORS.shimmer_loading_color_darker,
              textAlign: 'left',
            }}
            numberOfLines={2}>
            {/**CONTACT VENDOR TO CLAIM THIS OFFER*/}
            *Contact vendor to claim this offer
          </Text>
          {/*<BunchDealCommonBtn*/}
          {/*  height={40}*/}
          {/*  width={'90%'}*/}
          {/*  backgroundColor={COLORS.colorAccent}*/}
          {/*  marginHorizontal={0}*/}
          {/*  text={'CONTACT VENDOR TO CLAIM THIS OFFER'}*/}
          {/*  textStyle={FONTS.body4}*/}
          {/*  onPress={() => {*/}
          {/*    // ShowToastMessage('Coming soon!');*/}
          {/*    triggerCall();*/}
          {/*  }}*/}
          {/*  textColor={COLORS.white}*/}
          {/*  borderRadius={2}*/}
          {/*  textSize={14}*/}
          {/*  marginTop={20}*/}
          {/*/>*/}
        </View>
      ) : showError ? (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Fontisto name={'close-a'} color={COLORS.red} size={80} />
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              marginTop: 15,
              color: COLORS.shimmer_loading_color_darker,
              textAlign: 'center',
              // flex: 1,
            }}>
            Your order has been failed!
          </Text>
        </View>
      ) : !changeOne ? (
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
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flex: 1,
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
      {showDone ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            bottom: 30,
            right: 0,
            left: 0,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              height: 56,
              width: '100%',
              backgroundColor: showDone ? COLORS.done_green : COLORS.red,
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
              DONE
            </Text>
          </TouchableOpacity>
        </View>
      ) : showError ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              height: 56,
              width: '100%',
              backgroundColor: COLORS.red,
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
              DONE
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            //position: 'absolute',
            //bottom: 0,
            // right: 0,
            // left: 0,
          }}>
          {changeOne ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setChangeOne(!changeOne);
              }}
              style={{
                height: 56,
                width: '12%',
                backgroundColor: COLORS.colorPrimary,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                marginBottom: 30,
              }}>
              <AntDesign name="arrowleft" size={20} color={COLORS.white} />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={async () => {
              if (changeOne) {
                if (selectedPayment != null) {
                  ShowConsoleLogMessage(selectedPayment);
                  // await submitPaypalPayment();

                  if (selectedPayment?.id == 3) {
                    submitOrderApi();
                  } else if (selectedPayment?.id == 1) {
                    // await submitPaypalPayment();
                    await generatePaypalUrl();
                  }
                } else {
                  ShowToastMessage('Please choose your payment gateway!');
                }
                // navigation.replace('MainContainer');
                // alert('order placed successfully');
              } else {
                setChangeOne(!changeOne);
              }
            }}
            style={{
              height: 56,
              width: changeOne ? '88%' : '100%',
              backgroundColor: COLORS.colorAccent,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              flexDirection: 'row',
              marginBottom: 30,
            }}>
            {changeOne ? (
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: COLORS.white,
                  marginEnd: 5,
                  fontSize: 16,
                  letterSpacing: 0.5,
                }}>
                Confirm Payment
              </Text>
            ) : (
              <>
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
              </>
            )}
          </TouchableOpacity>
        </View>
      )}

      <>
        <BunchDealProgressBar loading={loading} />
        {paypalUrl ? (
          <View style={styles.webview}>
            <WebView
              style={{height: '100%', width: '100%'}}
              source={{uri: paypalUrl}}
              onNavigationStateChange={_onNavigationStateChange}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={false}
              onLoadStart={onWebviewLoadStart}
              onLoadEnd={() => SetIsWebViewLoading(false)}
            />
          </View>
        ) : null}
        {isWebViewLoading ? (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ffffff',
            }}>
            <ActivityIndicator size="large" color={COLORS.colorPrimary} />
          </View>
        ) : null}
      </>
      <View
        style={{
          backgroundColor: COLORS.colorPrimary,

          //height: 20,
        }}
      />
    </View>
  );
};
export default Order;

const styles = StyleSheet.create({
  toolBarTitle: {
    flex: 1,
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  webview: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
/**
 PERSONAL
--------
email
sb-qv7vc5159902@personal.example.com
Password
KM/.Cc6v ruko
Phone 
0365123651
John Doe



INDIA----
---------
email
sb-yxsc23885116@personal.example.com
Password
7DQHxq!=
Phone 
2089805663
John Doe
 */
