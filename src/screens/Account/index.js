import React, {useState, useEffect} from 'react';
import {Image, SafeAreaView, View, Text} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {COLORS} from '../../constants/Colors';
import images from '../../constants/images';
import {STRING} from '../../constants/String';
import {FONTS} from '../../constants/themes';
import GlobalStyle from '../../styles/GlobalStyle';
import GlobalStyle2 from '../../styles/GlobalStyle2';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import BunchDealEditText from '../../utils/EditText/BunchDealEditText';
import {requestExternalWritePermission} from '../../utils/RequestUserPermission';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImgToBase64 from 'react-native-image-base64';

const Account = ({navigation}) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    // ShowConsoleLogMessage(item);
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
            ShowConsoleLogMessage(JSON.parse(value));
            setUserData(JSON.parse(value));
          } else {
          }
        }
      });

      await AsyncStorage.getItem('userImage', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            setImage(value);
          } else {
          }
        }
      });
      await AsyncStorage.getItem('userPseudo', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            setPseudo(value);
          } else {
            setPseudo('');
          }
        }
      });
      await AsyncStorage.getItem('userPassword', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            setPassword(value);
          } else {
            setPassword('');
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [havePermission, setHavePermission] = useState(false);

  useEffect(() => {
    let permission = requestExternalWritePermission();
    setHavePermission(permission);
  }, []);

  const onLoginClick = () => {
    // ShowToastMessage('login success');
    AsyncStorage.setItem('userImage', 'data:image/jpeg;base64,' + imageBase64);
    navigation.replace('MainContainer');
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
    });
  };

  return (
    <SafeAreaView style={GlobalStyle.mainContainerBgColor}>
      <View
        style={{
          height: 56,

          alignItems: 'center',
          flexDirection: 'row',
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
            {
              color: COLORS.colorPrimary,
              marginHorizontal: 10,
            },
          ]}>
          Edit Profile
        </Text>

        <View
          style={{
            padding: 10,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}></View>
      </View>
      <View
        style={[
          {
            paddingHorizontal: 15,
            width: '77%',
            paddingTop: 10,
            paddingHorizontal: 10,
            alignSelf: 'center',
            // bottom: -150,
            borderRadius: 6,
            backgroundColor: COLORS.white,
            marginTop: 150,
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

        <BunchDealEditText
          borderBottomWidth={1}
          placeholder={STRING.email}
          style={FONTS.body3}
          value={userData?.email}
          onChangeText={val => {
            setEmail(val);
          }}
          editable={false}
          backgroundColor={COLORS.backgroundColor}
        />
        <BunchDealEditText
          borderBottomWidth={1}
          placeholder={STRING.pseudo}
          style={FONTS.body3}
          value={pseudo}
          onChangeText={val => {
            setPseudo(val);
          }}
          editable={false}
        />
        <BunchDealEditText
          borderBottomWidth={1}
          placeholder={STRING.fullName}
          style={FONTS.body3}
          value={userData?.name}
          onChangeText={val => {
            setFullName(val);
          }}
          editable={false}
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
          text={'Save'}
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
    </SafeAreaView>
  );
};

export default Account;
