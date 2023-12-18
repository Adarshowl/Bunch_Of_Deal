import crashlytics from '@react-native-firebase/crashlytics';
import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import ImgToBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../constants/Colors';
import {STRING} from '../../../constants/String';
import images from '../../../constants/images';
import {FONTS} from '../../../constants/themes';
import ApiCall from '../../../network/ApiCall';
import {API_END_POINTS} from '../../../network/ApiEndPoints';
import GlobalStyle from '../../../styles/GlobalStyle';
import BunchDealCommonBtn from '../../../utils/BunchDealCommonBtn';
import BunchDealProgressBar from '../../../utils/BunchDealProgressBar';
import BunchDealEditText from '../../../utils/EditText/BunchDealEditText';
import {requestExternalWritePermission} from '../../../utils/RequestUserPermission';
import {
  ShowToastMessage,
  validateEmail,
  validateFieldNotEmpty,
} from '../../../utils/Utility';

const SignUp = ({navigation}) => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [havePermission, setHavePermission] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let permission = requestExternalWritePermission();
    setHavePermission(permission);
  }, []);

  const onLoginClick = () => {
    handleLogin();
    // navigation.navigate('OtpVerification', {
    //   data: {},
    //   imageBase64: '',
    // });
  };
  const [imageBase64, setImageBase64] = useState('');

  const handleLogin = () => {
    if (validateFieldNotEmpty(email)) {
      ShowToastMessage('Email is required');
    } else if (!validateEmail(email)) {
      ShowToastMessage('Email is Invalid');

      setEmailValid(true);
    } else if (validateFieldNotEmpty(fullName)) {
      ShowToastMessage('FullName is required');
    } else if (validateFieldNotEmpty(pseudo)) {
      ShowToastMessage('Pseudo is required');
    } else if (validateFieldNotEmpty(password)) {
      ShowToastMessage('Password is required');
    } else {
      setLoading(true);
      let data = {
        name: fullName,
        email: email,
        password: password,
        social_type: 'Normal',
        image: imageBase64,
        phone: mobile,
        telephone: mobile,
        username: pseudo,
        pseudo: pseudo,
      };

      // console.log(JSON.stringify(data));

      ApiCall('post', data, API_END_POINTS.signUp, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      })
        .then(response => {
          // ShowConsoleLogMessage(JSON.stringify(response));
          if (response?.data?.status == true) {
            ShowToastMessage(response?.data?.message);
            navigation.navigate('OtpVerification', {
              data,
              imageBase64: imageBase64,
            });
          } else {
            ShowToastMessage(response?.data?.message);
          }
        })
        .catch(error => {
          crashlytics().recordError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onPickPhotoClick = () => {
    if (havePermission) {
      openImagePicker();
    } else {
      ShowToastMessage('Please allow photos & media permission');
    }
  };

  const [image, setImage] = useState(false);

  const openImagePicker = () => {
    ImagePicker.openPicker({
      multiple: false,
      cropping: true,
    }).then(images => {
      setImage(images.path);
      ImgToBase64.getBase64String(images.path)
        .then(base64String => {
          // console.log(base64String);
          setImageBase64(base64String);
        })
        .catch(err => {
          crashlytics().recordError(err);
        });
    });
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}
      // scrollEnabled={false}
    >
      <BunchDealProgressBar loading={loading} />

      <View style={GlobalStyle.nav_bg}>
        <Image
          source={images.navigation_icon_bg}
          style={GlobalStyle.nav_bg_image}
        />
      </View>
      <Ionicons
        onPress={() => {
          navigation.goBack();
        }}
        marginStart={10}
        color={COLORS.black}
        name="ios-arrow-back-sharp"
        size={25}
        style={{
          position: 'absolute',
          top: 10,
          left: 2,
          backgroundColor: COLORS.white,
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 50,
        }}
      />

      <View
        style={[
          GlobalStyle.loginCard,
          {
            // paddingHorizontal: 15,
            position: 'relative',
            bottom: 160,
            // overflow: 'scroll',
          },
        ]}>
        <View style={GlobalStyle.pickPhotoBg}>
          {image ? (
            <Image
              source={{
                uri: image,
              }}
              style={GlobalStyle.profile_placeholder}
            />
          ) : (
            <Image
              source={images.profile_placeholder}
              style={GlobalStyle.profile_placeholder}
            />
          )}
          <BunchDealCommonBtn
            width={140}
            height={35}
            backgroundColor={COLORS.colorAccent}
            marginHorizontal={5}
            text={STRING.pickPhoto}
            textStyle={FONTS.body3}
            textColor={COLORS.white}
            onPress={onPickPhotoClick}
            borderRadius={1}
            textSize={14}
          />
        </View>

        <BunchDealEditText
          borderBottomWidth={1}
          placeholder={STRING.email}
          style={FONTS.body3}
          value={email}
          keyBoardType="email-address"
          onChangeText={val => {
            setEmail(val);
          }}
          error={
            emailError ? (
              <Text>{STRING.fieldRequired}</Text>
            ) : emailValid ? (
              <Text>{STRING.invalidEmailAddress}</Text>
            ) : (
              ''
            )
          }
        />
        <BunchDealEditText
          borderBottomWidth={1}
          // placeholder={STRING.pseudo}
          placeholder="User Name"
          style={FONTS.body3}
          value={pseudo}
          onChangeText={val => {
            setPseudo(val);
          }}
        />
        <BunchDealEditText
          borderBottomWidth={1}
          placeholder={STRING.fullName}
          style={FONTS.body3}
          value={fullName}
          onChangeText={val => {
            setFullName(val);
          }}
        />
        <BunchDealEditText
          borderBottomWidth={1}
          placeholder={'Phone Number'}
          keyBoardType="number-pad"
          style={FONTS.body3}
          value={mobile}
          maxLength={10}
          onChangeText={val => {
            setMobile(val);
          }}
        />
        <BunchDealEditText
          borderBottomWidth={1}
          placeholder={STRING.password}
          keyBoardType="default"
          secureTextEntry={true}
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
          text={STRING.signUp}
          textStyle={FONTS.body3}
          textColor={COLORS.white}
          onPress={onLoginClick}
          marginTop={25}
          borderRadius={1}
          textSize={16}
        />

        <View
          style={{
            paddingBottom: 30,
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
