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
  Alert,
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
import {ShowConsoleLogMessage, ShowToastMessage} from '../utils/Utility';
import {useIsFocused} from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const DrawerContent = ({navigation, props}) => {
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    // ShowConsoleLogMessage(item);
    setTimeout(async () => {
      await getUserFromStorage();
    }, 0);
  }, []);

  useEffect(() => {
    getUserFromStorage();
    if (isFocused) {
      getUserFromStorage();
    }
  }, [isFocused]);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            setUserData(JSON.parse(value));
            // ShowConsoleLogMessage(value, '$$$$$$$$$$$$');
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
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();

      // Remember to remove the user from your app's state as well
      // navigation.replace('Auth', {
      //   screen: 'Login',
      //   params: {
      //     screen: 'Login',
      //   },
      // });
      navigation.replace('MainContainer');
    } catch (error) {
      console.error(error);
    }
  };
  const onLogouClick = () => {
    AsyncStorage.clear().then(() => console.log('Cleared'));
    isSignedIn() ? signOut() : ShowToastMessage('Logout Failed');
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
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            // props?.navigation?.navigate('Account');
            if (userData?.id_user == null) {
              navigation.navigate('Auth', {
                screen: 'Login',
                params: {
                  screen: 'Login',
                },
              });
            } else {
              navigation.navigate('Account');
            }
          }}
          style={{
            padding: 25,
          }}>
          <BunchDealImageLoader
            defaultImg={images.profile_placeholder}
            styles={styles.profileImage}
            source={
              // 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
              '' + image
            }
          />
          {userData?.id_user == null ? (
            <View style={{marginTop: 10}}>
              <Text
                onPress={() => {
                  navigation.navigate('Auth', {
                    screen: 'Login',
                    params: {
                      screen: 'Login',
                    },
                  });
                }}
                style={[FONTS.h5, {color: COLORS.white}]}>
                Log In/Create Account
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.name} onPress={() => {}}>
                {userData?.name}
              </Text>
              <Text style={styles.email} onPress={() => {}}>
                {userData?.email}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </ImageBackground>
      <View
        style={{
          marginTop: 10,
        }}
      />
      <DrawerItem
        name={'Home'}
        title={Entypo}
        iconName="home"
        onPress={() => {
          // navigation.goBack();
          navigation.navigate('Home');
        }}
      />
      <DrawerItem
        name={'Categories'}
        title={Ionicons}
        iconName="md-reorder-three-outline"
        onPress={() => {
          // props?.navigation?.navigate('Category');
          navigation.navigate('Category');
        }}
      />
      <DrawerItem
        name={'Geo Stores'}
        title={Entypo}
        iconName="location"
        onPress={() => {
          // props?.navigation?.navigate('GeoStore');
          navigation.navigate('GeoStore');
        }}
      />
      {userData?.id_user == null ? null : (
        <DrawerItem
          name={'Orders'}
          title={Ionicons}
          iconName="ios-cart"
          onPress={() => {
            // props?.navigation?.navigate('Invoice');
            navigation.navigate('Invoice');
          }}
        />
      )}
      {userData?.id_user == null ? null : (
        <DrawerItem
          name={'Edit Profile'}
          title={Ionicons}
          iconName="ios-person-sharp"
          onPress={() => {
            // props?.navigation?.navigate('Account');
            navigation.navigate('Account');
          }}
        />
      )}

      {/* {userData?.id_user == null ? null : ( */}
      <DrawerItem
        name={'Favorite Store'}
        title={Fontisto}
        iconName="favorite"
        onPress={() => {
          // props?.navigation?.navigate('FavStore');
          navigation.navigate('FavStore');
        }}
      />
      {/* )} */}
      {/* {userData?.id_user == null ? null : ( */}
      <DrawerItem
        name={'Favorite Offer'}
        title={Fontisto}
        iconName="favorite"
        onPress={() => {
          // props?.navigation?.navigate('FavOffer');
          navigation.navigate('FavOffer');
        }}
      />
      {/* )} */}

      <DrawerItem
        name={'Settings'}
        title={Feather}
        iconName="settings"
        onPress={() => {
          // props?.navigation.navigate('Setting');
          navigation.navigate('Setting');
        }}
      />

      <DrawerItem
        name={'About Us'}
        title={Feather}
        iconName="info"
        onPress={() => {
          // props?.navigation?.navigate('About');
          navigation?.navigate('About');
        }}
      />

      {userData?.id_user == null ? (
        <DrawerItem
          name={'LogIn'}
          title={Feather}
          iconName="log-in"
          onPress={() => {
            navigation.navigate('Auth', {
              screen: 'Login',
              params: {
                screen: 'Login',
              },
            });
          }}
        />
      ) : (
        <DrawerItem
          name={'Logout'}
          title={Feather}
          iconName="log-in"
          onPress={() => {
            Alert.alert(
              'Log out',
              'Do you want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  // onPress: () => {

                  //   props?.navigation?.replace('Auth');
                  //   AsyncStorage.clear().then(() => console.log('Cleared'));

                  //   navigation.replace('Auth', {
                  //     screen: 'Login',
                  //     params: {
                  //       screen: 'Login',
                  //     },
                  //   });
                  // },
                  onPress: () => {
                    onLogouClick();
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      )}
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
          fontFamily: 'Montserrat-Regular',
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
