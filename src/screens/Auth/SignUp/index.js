import React, {useState, useEffect} from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {COLORS} from '../../../constants/Colors';
import images from '../../../constants/images';
import {STRING} from '../../../constants/String';
import {FONTS} from '../../../constants/themes';
import GlobalStyle from '../../../styles/GlobalStyle';
import BunchDealCommonBtn from '../../../utils/BunchDealCommonBtn';
import BunchDealEditText from '../../../utils/EditText/BunchDealEditText';
import {requestExternalWritePermission} from '../../../utils/RequestUserPermission';
import {ShowToastMessage} from '../../../utils/Utility';

const SignUp = ({navigation}) => {
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
    ShowToastMessage('login success');
  };

  const onPickPhotoClick = () => {
    if (havePermission) {
      openImagePicker();
    } else {
      ShowToastMessage('Please allow photos & media permission');
    }
  };

  const [image, setImage] = useState();

  const openImagePicker = () => {
    ImagePicker.openPicker({
      multiple: false,
      cropping: true,
    }).then(images => {
      setImage(images.path);
    });
  };

  return (
    <SafeAreaView style={GlobalStyle.mainContainerBgColor}>
      <View style={GlobalStyle.nav_bg}>
        <Image
          source={images.navigation_icon_bg}
          style={GlobalStyle.nav_bg_image}
        />
      </View>
      <View
        style={[
          GlobalStyle.loginCard,
          {
            top: 160,
            paddingHorizontal: 15,
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
          onChangeText={val => {
            setEmail(val);
          }}
        />
        <BunchDealEditText
          borderBottomWidth={1}
          placeholder={STRING.pseudo}
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
    </SafeAreaView>
  );
};

export default SignUp;