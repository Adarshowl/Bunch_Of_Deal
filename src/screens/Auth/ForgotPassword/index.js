import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
import {COLORS} from '../../../constants/Colors';
import {FONTS} from '../../../constants/themes';
import {CLONE_BASE_URL} from '../../../network/ApiEndPoints';
import BunchDealProgressBar from '../../../utils/BunchDealProgressBar';

const ForgotPassword = ({navigation, route}) => {
  const [webViewLoading, setWebViewLoading] = useState(true);
  const showSpinner = () => setWebViewLoading(true);
  const hideSpinner = () => setWebViewLoading(false);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={[
          {
            elevation: 10,
            height: 56,

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
          marginStart={10}
          color={COLORS.colorPrimary}
          name="ios-arrow-back-sharp"
          size={25}
        />

        <Text
          style={[
            {
              color: COLORS.colorPrimary,
              marginHorizontal: 10,
              fontSize: 18,
              fontFamily: 'Montserrat-Regular',
            },
          ]}>
          Forgot Password
        </Text>
      </View>
      <BunchDealProgressBar loading={webViewLoading} />
      <WebView
        source={{
          uri: CLONE_BASE_URL + '/fpassword',
        }}
        onLoadStart={showSpinner}
        onLoadEnd={hideSpinner}
        androidHardwareAccelerationDisabled={true}
        javaScriptEnabled={true}
        injectedJavaScript={'jsCode'}
        javaScriptCanOpenWindowsAutomatically
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        style={{marginTop: 0, flex: 1}}
      />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
