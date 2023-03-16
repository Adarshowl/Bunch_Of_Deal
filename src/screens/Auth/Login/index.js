import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {COLORS} from '../../../constants/Colors';
import images from '../../../constants/images';
import {STRING} from '../../../constants/String';
import {FONTS} from '../../../constants/themes';
import ApiCall from '../../../network/ApiCall';
import {API_END_POINTS} from '../../../network/ApiEndPoints';
import GlobalStyle from '../../../styles/GlobalStyle';
import BunchDealCommonBtn from '../../../utils/BunchDealCommonBtn';
import BunchDealProgressBar from '../../../utils/BunchDealProgressBar';
import BunchDealEditText from '../../../utils/EditText/BunchDealEditText';
import {ShowToastMessage, validateFieldNotEmpty} from '../../../utils/Utility';
// import {ShowToastMessage} from '../../../utils/Utility';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const onLoginClick = () => {
    if (validateFieldNotEmpty(email)) {
      ShowToastMessage('Email is required');
    } else if (validateFieldNotEmpty(password)) {
      ShowToastMessage('Password is required');
    } else {
      setLoading(true);
      let body = {
        login: email,
        password: password,
        social_type: 'Normal',
      };
      const params = new FormData();
      params.append('login', email);
      params.append('password', password);
      params.append('social_type', 'Normal');
      console.log(JSON.stringify(body));
      ApiCall('post', body, API_END_POINTS.signin, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      })
        .then(response => {
          if (response?.data?.success == 1) {
            // console.log(response);
            ShowToastMessage('Login successful');
            setLoading(false);
            AsyncStorage.setItem(STRING.userEmail, email);
            navigation.replace('MainContainer');
          } else {
            ShowToastMessage('Login failed');
            setLoading(false);
          }
        })
        .catch(() => {
          ShowToastMessage('Something went wrong.');
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onCreateAccountClick = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={GlobalStyle.mainContainerBgColor}>
      <View style={GlobalStyle.nav_bg}>
        <Image
          source={images.navigation_icon_bg}
          style={GlobalStyle.nav_bg_image}
        />
        <Image
          source={images.splash_new_beta}
          style={GlobalStyle.loginAppIcon}
        />
      </View>
      <BunchDealProgressBar loading={loading} />
      <View style={GlobalStyle.loginCard}>
        <BunchDealEditText
          borderBottomWidth={1}
          placeholder={STRING.email_username}
          style={FONTS.body3}
          value={email}
          onChangeText={val => {
            setEmail(val);
          }}
        />
        <BunchDealEditText
          borderBottomWidth={1}
          placeholder={STRING.password}
          style={FONTS.body3}
          value={password}
          onChangeText={val => {
            setPassword(val);
          }}
        />
        <BunchDealCommonBtn
          height={40}
          backgroundColor={COLORS.colorAccent}
          marginHorizontal={5}
          text={STRING.log_in}
          textStyle={FONTS.body3}
          textColor={COLORS.white}
          onPress={onLoginClick}
          marginTop={20}
          borderRadius={1}
          textSize={18}
        />
        <View
          style={{
            marginTop: 20,
          }}
        />
        <Text style={[FONTS.h6, GlobalStyle.primaryColorTextUnderline]}>
          {STRING.forgot_password}
        </Text>
        <Text style={[FONTS.h6, GlobalStyle.primaryColorText]}>
          {STRING.or}
        </Text>
        <BunchDealCommonBtn
          height={40}
          backgroundColor={COLORS.colorAccent}
          marginHorizontal={5}
          text={STRING.create_an_account}
          textStyle={FONTS.body5}
          textColor={COLORS.white}
          onPress={onCreateAccountClick}
          marginTop={13}
          borderRadius={1}
          textSize={14}
        />
        <View
          style={{
            paddingBottom: 20,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
