import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, TextInput, View} from 'react-native';
import {COLORS} from '../../../constants/Colors';
import images from '../../../constants/images';
import {STRING} from '../../../constants/String';
import {FONTS} from '../../../constants/themes';
import ApiCall from '../../../network/ApiCall';
import {API_END_POINTS} from '../../../network/ApiEndPoints';
import GlobalStyle2 from '../../../styles/GlobalStyle2';
import BunchDealCommonBtn from '../../../utils/BunchDealCommonBtn';
import {ShowToastMessage, validateFieldNotEmpty} from '../../../utils/Utility';

const OtpVerification = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState('');
  const [resendVerifyOtp, setResendVerifyOtp] = useState('');

  const [otp, setOtp] = useState(['-', '-', '-', '-']);
  const [otpVal, setOtpVal] = useState('');

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState();

  const onSubmitClick = () => {
    handleOTPpassword();
  };

  useEffect(() => {
    let {data} = route.params;

    setPseudo(data.pseudo);
    setEmail(data.email);
    setFullName(data.name);
    setPassword(data.password);
    setImage(data.image);
  });

  const handleOTPpassword = () => {
    if (validateFieldNotEmpty(otp)) {
      ShowToastMessage('OTP is required');
    } else {
      setLoading(true);
      let body = {
        otp: otp,
        name: fullName,
        email: email,
        image: image,
        pseudo: pseudo,
        password: password,
        social_type: '',
        phone: '',
        lat: '',
        lng: '',
        token: '',
        mac_adr: '02:00:00:00:00',
        auth_type: '',
        guest_id: 1,
      };

      ApiCall('post', body, API_END_POINTS.verifyOTP, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      })
        .then(response => {
          console.log(response, '$$$$$');

          if (response?.data?.status === true) {
            ShowToastMessage('OTP verify successfully');
            navigation.navigate('Login');
          } else {
            ShowToastMessage('Failed');
          }
        })
        .catch(error => {
          console.log(error, 'eroor------------>');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const ResendOTPpassword = () => {
    let body = {
      email: email,
    };
    ApiCall('post', body, API_END_POINTS.resend_OTP, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        console.log(response, '$$$$$');

        if (response?.data?.status === true) {
          ShowToastMessage('Sucessfully resend OTP to your mail');
        } else {
          ShowToastMessage('Failed');
        }
      })
      .catch(error => {
        console.log(error, 'eroor------------>');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyle2.mainContainerBgColor,
        {
          backgroundColor: COLORS.white,
        },
      ]}>
      <Image source={images.splash_new_beta} style={GlobalStyle2.otpAppIcon} />
      <View>
        <View style={[GlobalStyle2.OtpVerification, {}]}>
          <Text style={[FONTS.body2, GlobalStyle2.OtpVerification]}>
            Verification Code
          </Text>
          <View style={{flexDirection: 'column'}}>
            <Text style={[FONTS.body3, GlobalStyle2.OtpVerificationText]}>
              Please enter the Otp sent to your email
            </Text>
          </View>
        </View>

        <View
          style={{
            alignSelf: 'center',
            marginTop: 70,
          }}>
          <TextInput
            keyboardType="number-pad"
            onChangeText={value => {
              if (isNaN(value)) {
                return;
              }
              if (value.length > 4) {
                return;
              }
              let val = value + '----'.substr(0, 4 - value.length);
              let a = [...val];
              setOtpVal(a);
              setOtp(value);
            }}
            style={{height: 0, fontSize: 16}}
            autoFocus={true}
          />
          <View style={{flexDirection: 'row'}}>
            {[0, 1, 2, 3].map((item, index) => (
              <Text
                style={{
                  padding: 10,
                  marginRight: 10,
                  borderWidth: 1,
                  borderColor: 'lightGrey',
                  height: 52,
                  width: 45,
                  textAlign: 'center',
                  backgroundColor: COLORS.white,
                  borderRadius: 4,
                  fontSize: 25,
                }}
                key={index}>
                {otp[item]}
              </Text>
            ))}
          </View>

          {/* <BunchDealEditText
            borderBottomWidth={1}
            placeholder={STRING.email_username}
            style={FONTS.body3}
            value={verifyOtp}
            onChangeText={val => {
              setVerifyOtp(val);
            }}
          /> */}
        </View>
        <View
          style={{
            marginTop: 15,
            alignSelf: 'center',
          }}>
          <BunchDealCommonBtn
            height={40}
            width={140}
            backgroundColor={COLORS.colorAccent}
            marginHorizontal={5}
            text={'SUBMIT'}
            textStyle={FONTS.body3}
            textColor={COLORS.white}
            onPress={() => {
              navigation.navigate('MainContainer');
            }}
            marginTop={15}
            borderRadius={1}
            textSize={16}
          />
        </View>
        <Text
          onPress={() => {
            // ResendOTPpassword();
          }}
          style={[
            FONTS.body3,
            {
              marginTop: 20,
              marginStart: 20,
              color: COLORS.black,
              fontSize: 14,
            },
          ]}>
          Don't Receive the OTP?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OtpVerification;
// https://bunchofdeals.com.au/APP_CLONE/index.php/1.0/user/signIn
