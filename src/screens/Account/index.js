import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import ImgToBase64 from 'react-native-image-base64';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import {STRING} from '../../constants/String';
import images from '../../constants/images';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle from '../../styles/GlobalStyle';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import BunchDealProgressBar from '../../utils/BunchDealProgressBar';
import BunchDealEditText from '../../utils/EditText/BunchDealEditText';
import {requestExternalWritePermission} from '../../utils/RequestUserPermission';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import GlobalStyle2 from '../../styles/GlobalStyle2';

const Account = ({navigation}) => {
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // ShowConsoleLogMessage(item);

    setTimeout(async () => {
      await getUserFromStorage();
    }, 0);
  }, []);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        // console.log(value, '------------------');
        if (error) {
        } else {
          if (value !== null) {
            setUserData(JSON.parse(value));
            setFullName(JSON.parse(value).username);
            setUserId(JSON.parse(value).id_user);
            setName(JSON.parse(value).name);
            setEmail(JSON.parse(value).email);
            if (JSON.parse(value).email != null || '') {
              setEmailAvailable(false);
            } else {
              setEmailAvailable(true);
            }
            setMobile(JSON.parse(value).telephone);
            setPassword(JSON.parse(value).password + '');
          } else {
          }
        }
      });

      await AsyncStorage.getItem('userImage', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            setImage(value);
            // ShowConsoleLogMessage(value + ' image');
            setImageBase64(value.replace('data:image/jpeg;base64,', ''));
          } else {
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE' + err);
    }
  };

  const [email, setEmail] = useState('');
  const [emailAvailable, setEmailAvailable] = useState(false);
  const [fullName, setFullName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [havePermission, setHavePermission] = useState(false);

  const [loading, setLoading] = useState(false);

  const [update, setUpdate] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);

  useEffect(() => {
    let permission = requestExternalWritePermission();
    setHavePermission(permission);
  }, []);

  const onLoginClick = async () => {
    // ShowToastMessage('login success');
    if (update) {
      await updateProfile();
      if (!updateImage) {
        setTimeout(() => {
          navigation.replace('MainContainer');
        }, 1500);
      }

      if (updateImage) {
        await AsyncStorage.setItem(
          'userImage',
          'data:image/jpeg;base64,' +
            imageBase64.replace('data:image/jpeg;base64,', ''),
        );
        uploadImage('uId');

        setTimeout(() => {
          navigation.replace('MainContainer');
        }, 1500);
      }
    } else if (updateImage) {
      await AsyncStorage.setItem(
        'userImage',
        'data:image/jpeg;base64,' +
          imageBase64.replace('data:image/jpeg;base64,', ''),
      );
      uploadImage('uId');

      setTimeout(() => {
        navigation.replace('MainContainer');
      }, 1500);
    } else {
      navigation.replace('MainContainer');
    }
  };

  const onPickPhotoClick = () => {
    if (havePermission) {
      openImagePicker();
    } else {
      ShowToastMessage('Please allow photos & media permission');
    }
  };
  const [imageBase64, setImageBase64] = useState('');

  const [image, setImage] = useState();

  const openImagePicker = () => {
    try {
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
          .catch(err => {});

        setUpdateImage(true);
      });
    } catch (error) {
      ShowConsoleLogMessage('Image picker error => ' + JSON.stringify(error));
    }
  };

  const uploadImage = val => {
    setLoading(true);
    let body = {
      image: imageBase64,
      int_id: userData?.id_user,
      module_id: userData?.id_user,
      type: 'user',
      module: 'user',
    };
    // ShowConsoleLogMessage(JSON.stringify(body));
    ApiCall('post', body, API_END_POINTS.API_USER_UPLOAD64, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // ShowConsoleLogMessage(response);
        if (response?.data?.status == true) {
        } else {
        }
      })
      .catch(error => {
        console.log(error, 'eroor------------>');
        crashlytics().recordError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateProfile = async () => {
    setLoading(true);
    let body = {
      // password: password,
      username: fullName,
      email: email,
      oldUsername: userData?.username || fullName,
      name: name,
      mobile: mobile,
      phone: mobile,
      telephone: mobile,
      user_id: userId,
      // images: image,
      lng: '0',
      lat: '0',
      mac_adr: '02.00:00:00:00',
      social_type: 'Normal',
      guest_id: '1',
    };
    ShowConsoleLogMessage(API_END_POINTS.API_UPDATE_ACCOUNT);
    console.log(JSON.stringify(body));
    ApiCall('post', body, API_END_POINTS.API_UPDATE_ACCOUNT, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // console.log(JSON.stringify(response), '&&&&&&&&&&&&&&&');

        if (response?.data?.success == 1) {
          console.log(response);
          let arr = [];
          arr.push(response?.data?.result);
          for (let i = 0; i < arr.length; i++) {
            AsyncStorage.setItem('userData', JSON.stringify(arr[i]['0']));
          }
          ShowToastMessage('Profile Update Successfully');
        } else {
          ShowToastMessage('Unable to update profile');
        }
      })
      .catch(error => {
        console.log('ERROR IN GET USer PROFILE => ', error);
        crashlytics().recordError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={GlobalStyle.mainContainerBgColor}>
      <BunchDealProgressBar loading={loading} />
      {/*<View*/}
      {/*  style={{*/}
      {/*    height: 56,*/}

      {/*    alignItems: 'center',*/}
      {/*    flexDirection: 'row',*/}
      {/*  }}>*/}
      <View
        style={[
          GlobalStyle2.headerFooterStyle,
          {
            elevation: 10,
            maxHeight: 56,
          },
        ]}>
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
            {
              color: COLORS.colorPrimary,
              marginHorizontal: 10,
            },
          ]}>
          {/*Edit Profile*/}
          Profile
        </Text>

        <View
          style={{
            padding: 10,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            // flex: 1,
          }}
        />
      </View>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View
          style={[
            {
              width: '77%',
              paddingTop: 10,
              paddingHorizontal: 10,
              alignSelf: 'center',
              // bottom: -150,
              borderRadius: 6,
              backgroundColor: COLORS.white,
              marginTop: 50,
            },
          ]}>
          <View
            style={[
              {
                // height: 100,
                // backgroundColor: 'red',
                paddingHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 5,
              },
            ]}>
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
          <Text
            style={{
              color: COLORS.black,
              fontFamily: 'Montserrat-Light',
              fontSize: 14,
              marginTop: 10,
              marginBottom: -10,
              marginStart: 10,
            }}>
            {STRING.email}
          </Text>
          <BunchDealEditText
            borderBottomWidth={1}
            placeholder={STRING.email}
            style={[
              FONTS.body3,
              {color: emailAvailable ? COLORS.black : COLORS.lightGrey},
            ]}
            value={email}
            onChangeText={val => {
              setEmail(val);
            }}
            editable={emailAvailable}
            backgroundColor={COLORS.backgroundColor}
          />

          <Text
            style={{
              color: COLORS.black,
              fontFamily: 'Montserrat-Light',
              fontSize: 14,
              marginTop: 10,
              marginBottom: -10,
              marginStart: 10,
            }}>
            {/* {STRING.pseudo} */}
            User Name
          </Text>
          <BunchDealEditText
            borderBottomWidth={1}
            placeholder={STRING.pseudo}
            style={FONTS.body3}
            // value={userData?.username}
            value={fullName}
            onChangeText={val => {
              setFullName(val);
              setUpdate(true);
            }}
          />
          <Text
            style={{
              color: COLORS.black,
              fontFamily: 'Montserrat-Light',
              fontSize: 14,
              marginTop: 10,
              marginBottom: -10,
              marginStart: 10,
            }}>
            {STRING.fullName}
          </Text>
          <BunchDealEditText
            borderBottomWidth={1}
            placeholder={STRING.fullName}
            style={FONTS.body3}
            // value={userData?.name}
            value={name}
            onChangeText={val => {
              setName(val);
              setUpdate(true);
            }}
          />
          <Text
            style={{
              color: COLORS.black,
              fontFamily: 'Montserrat-Light',
              fontSize: 14,
              marginTop: 10,
              marginBottom: -10,
              marginStart: 10,
            }}>
            {STRING.phone}
          </Text>
          <BunchDealEditText
            borderBottomWidth={1}
            placeholder={STRING.phoneHint}
            style={FONTS.body3}
            value={mobile}
            maxLength={10}
            keyBoardType={'number-pad'}
            onChangeText={val => {
              setMobile(val);
              setUpdate(true);
            }}
          />
          {/*<Text*/}
          {/*  style={{*/}
          {/*    color: COLORS.black,*/}
          {/*    fontFamily: 'Montserrat-Light',*/}
          {/*    fontSize: 14,*/}
          {/*    marginTop: 10,*/}
          {/*    marginBottom: -10,*/}
          {/*    marginStart: 10,*/}
          {/*  }}>*/}
          {/*  FCM TOKEN*/}
          {/*</Text>*/}
          {/*<TextInput value={STRING.FCM_TOKEN} multiline={true} />*/}
          {/* <BunchDealEditText

          borderBottomWidth={1}
          placeholder={STRING.password}
          style={FONTS.body3}
          value={''}
          onChangeText={val => {
            setPassword(val);
            setUpdate(true);
          }}
          editable={false}
        /> */}
          <BunchDealCommonBtn
            height={40}
            backgroundColor={COLORS.colorAccent}
            marginHorizontal={5}
            text={'Save'}
            textStyle={FONTS.body3}
            textColor={COLORS.white}
            // onPress={onLoginClick}
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
    </SafeAreaView>
  );
};

export default Account;
