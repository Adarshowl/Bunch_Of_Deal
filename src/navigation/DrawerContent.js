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
            source={images.profile_placeholder}
            style={styles.profileImage}
          />
          <Text
            style={styles.name}
            onPress={() => {
              props?.navigation.navigate('Category');
            }}>
            {STRING.login_create_account}
          </Text>
          <Text
            style={styles.email}
            onPress={() => {
              props?.navigation.navigate('Setting');
            }}>
            test1@gmail.com
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
      />
      <DrawerItem name={'Geo Stores'} title={Entypo} iconName="location" />
      <DrawerItem name={'Orders'} title={Ionicons} iconName="ios-cart" />
      <DrawerItem
        name={'Edit Profile'}
        title={Ionicons}
        iconName="ios-person-sharp"
      />
      <DrawerItem
        name={'Favorite Store'}
        title={Fontisto}
        iconName="favorite"
      />
      <DrawerItem
        name={'Favorite Offer'}
        title={Fontisto}
        iconName="favorite"
      />
      <DrawerItem name={'Settings'} title={Feather} iconName="settings" />
      <DrawerItem name={'About Us'} title={Feather} iconName="info" />
      <DrawerItem name={'Logout'} title={Feather} iconName="log-in" />
    </SafeAreaView>
  );
};

export default DrawerContent;

const DrawerItem = ({name, title, iconName, iconSize}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('GeoStore');
      }}
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
