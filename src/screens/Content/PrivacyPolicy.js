import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
import BunchDealProgressBar from '../../utils/BunchDealProgressBar';
import {API_END_POINTS} from '../../network/ApiEndPoints';

const TermsOfUse = ({navigation}) => {
  const [webViewLoading, setWebViewLoading] = useState(true);
  const showSpinner = () => setWebViewLoading(true);
  const hideSpinner = () => setWebViewLoading(false);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <View
        style={{
          height: 56,
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: COLORS.white,
          elevation: 10,
        }}>
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
            {color: COLORS.colorPrimary, marginHorizontal: 10},
          ]}>
          Privacy Policy
        </Text>
      </View>
      <BunchDealProgressBar loading={webViewLoading} />
      <WebView
        source={{
          uri: API_END_POINTS.PRIVACY_POLICY_URL,
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
    </SafeAreaView>
  );
};

export default TermsOfUse;

const styles = StyleSheet.create({});
