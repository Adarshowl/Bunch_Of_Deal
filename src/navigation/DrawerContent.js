import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {images, STRING} from '../constants';
import {COLORS} from '../constants/Colors';
import {FONTS} from '../constants/themes';
import GlobalStyle from '../styles/GlobalStyle';
import BunchDealImageLoader from '../utils/BunchDealImageLoader';
import BunchDealVectorIcon from '../utils/BunchDealVectorIcon';
import {ShowConsoleLogMessage} from '../utils/Utility';
const DrawerContent = props => {
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
            setUserData(JSON.parse(value));
          } else {
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };
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
          {/* <Image
            source={{
              uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
            }}
            style={styles.profileImage}
          /> */}

          <BunchDealImageLoader
            defaultImg={images.profile_placeholder}
            styles={styles.profileImage}
            source={
              'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
            }
          />
          <Text style={styles.name} onPress={() => {}}>
            {userData?.name}
          </Text>
          <Text style={styles.email} onPress={() => {}}>
            {userData?.email}
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
          AsyncStorage.clear();
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
