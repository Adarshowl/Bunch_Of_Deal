import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import moment from 'moment/moment';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import crashlytics from '@react-native-firebase/crashlytics';
import BunchDealProgressBar from '../../utils/BunchDealProgressBar';
import {COLORS} from '../../constants/Colors';

const Payment = ({navigation, route}) => {
  const {paypalUrl} = route.params;
  const {accessToken} = route.params;
  const {userData} = route.params;
  const {receivedData} = route.params;
  const {price} = route.params;
  const {paymentType} = route.params;
  const {count} = route.params;
  const {originalPrice} = route.params;
  const [isWebViewLoading, SetIsWebViewLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  const [shouldShowWebViewLoading, setShouldShowWebviewLoading] =
    useState(true);
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
        console.log(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
        );
        fetch(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
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
            createPaypalOrderApi(response?.id);
          })
          .catch(err => {
            setShouldShowWebviewLoading(true);
            console.log('response of test sandbox fetch error');
            console.log({...err});
            setLoading(false);
            ShowToastMessage('Payment Failed');
          });
        // axios
        //   .post(
        //     `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
        //     JSON.stringify({payer_id: payerId}),
        //     // {payerId: payerId},
        //     {
        //       headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: `Bearer ${accessToken}`,
        //       },
        //     },
        //   )
        //   .then(response => {
        //     setShouldShowWebviewLoading(true);
        //     console.log('response of test sandbox');
        //     console.log(response);
        //   })
        //   .catch(err => {
        //     setShouldShowWebviewLoading(true);
        //     console.log('response of test sandbox error');
        //     console.log({...err});
        //   });
      }
    }
  };

  const createPaypalOrderApi = paymentId => {
    setLoading(true);
    let c = [];
    c.push();
    let body = {
      user_id: userData?.id_user,
      seller_id: receivedData?.id_offer,
      module: 'store',
      module_id: receivedData?.store_id,
      fcm_id: 'fcm_token',
      order_amount: price + '',
      order_date: moment().format('YYYY-MM-DD'),
      order_time: moment().format('HH:mm:ss'),
      req_cf_data: JSON.stringify({
        'Full Name': userData?.name,
        'Phone Number': userData?.telephone,
      }),
      payment_method: paymentType,
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

        ShowConsoleLogMessage('response -> ' + JSON.stringify(response));
        // ShowConsoleLogMessage('response da -> ' + da.split(',')[0]);
        if (da.split(',')[0] == 1) {
          updatePaypalOrderApi(
            response?.data?.split(',')[1]?.split(':')[1] + '',
            paymentId,
          );
        } else {
          ShowToastMessage('Something went wrong.');
        }
      })
      .catch(error => {
        crashlytics().recordError(error);
        ShowToastMessage('Something went wrong.');
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
        }
      })
      .catch(error => {
        crashlytics().recordError(error);
        ShowToastMessage('Something went wrong>>>>>>>>>>.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
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
  );
};
export default Payment;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#61E786',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
