import {
  StyleSheet,
  Text,
  SafeAreaView,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/Colors';
import {images, STRING} from '../constants';
import {Image} from 'react-native-elements';
import {FONTS} from '../constants/themes';
import BunchDealVectorIcon from '../utils/BunchDealVectorIcon';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import GlobalStyle from '../styles/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import {ShowToastMessage} from '../utils/Utility';
const DrawerContent = props => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <ImageBackground
        source={images.navigation_icon_bg}
        style={{
          height: 180,
          width: '100%',
        }}
        imageStyle={{
          tintColor: COLORS.lightGrey,
          backgroundColor: COLORS.colorPrimary,
        }}>
        <View
          style={{
            padding: 25,
          }}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name} onPress={() => {}}>
            {STRING.login_create_account}
          </Text>
          <Text style={styles.email} onPress={() => {}}>
            email address
          </Text>
        </View>
      </ImageBackground>
      <View
        style={{
          marginTop: 10,
        }}
      />
      <DrawerItem name={'Home'} title={Entypo} iconName="home" />
      <DrawerItem
        name={'Categories'}
        title={Ionicons}
        iconName="md-reorder-three-outline"
        onPress={() => {
          props?.navigation?.navigate('Category');
        }}
      />
      <DrawerItem
        name={'Geo Stores'}
        title={Entypo}
        iconName="location"
        onPress={() => {
          props?.navigation?.navigate('GeoStore');
        }}
      />
      <DrawerItem
        name={'Orders'}
        title={Ionicons}
        iconName="ios-cart"
        onPress={() => {
          props?.navigation?.navigate('Invoice');
        }}
      />
      <DrawerItem
        name={'Edit Profile'}
        title={Ionicons}
        iconName="ios-person-sharp"
        onPress={() => {
          props?.navigation?.navigate('Account');
        }}
      />
      <DrawerItem
        name={'Favorite Store'}
        title={Fontisto}
        iconName="favorite"
        onPress={() => {
          props?.navigation?.navigate('FavStore');
        }}
      />
      <DrawerItem
        name={'Favorite Offer'}
        title={Fontisto}
        iconName="favorite"
        onPress={() => {
          props?.navigation?.navigate('FavOffer');
        }}
      />
      <DrawerItem
        name={'Settings'}
        title={Feather}
        iconName="settings"
        onPress={() => {
          props?.navigation.navigate('Setting');
        }}
      />
      <DrawerItem
        name={'About Us'}
        title={Feather}
        iconName="info"
        onPress={() => {
          props?.navigation?.navigate('About');
        }}
      />
      <DrawerItem
        name={'Logout'}
        title={Feather}
        iconName="log-in"
        onPress={() => {
          props?.navigation?.replace('Auth');
        }}
      />
    </SafeAreaView>
  );
};

export default DrawerContent;

const DrawerItem = ({name, title, iconName, iconSize, onPress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 12,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 55,
          alignItems: 'center',
        }}>
        <BunchDealVectorIcon
          title={title}
          name={iconName}
          color={COLORS.editTextBorder}
          size={iconSize || 22}
          style={GlobalStyle.marginHorizontal15}
          onPress={() => {}}
        />
      </View>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'Montserrat-SemiBold',
          color: COLORS.editTextBorder,
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    borderRadius: 50,
    width: 70,
    height: 70,
    borderColor: COLORS.white,
    borderWidth: 2,
  },
  name: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 15,
    ...FONTS.h5,
  },
  email: {
    fontSize: 14,
    color: COLORS.white,
    marginTop: 5,
    fontFamily: 'Montserrat-Italic',
  },
});
