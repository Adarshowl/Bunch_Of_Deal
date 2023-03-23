import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {STRING} from '../../../constants';
import images from '../../../constants/images';
import GlobalStyle from '../../../styles/GlobalStyle';

const Splash = ({navigation}) => {
  useEffect(() => {
    // navigation.replace('MainContainer');

    setTimeout(async () => {
      await getUserFromStorage();
    }, 2000);
  }, []);

  const getUserFromStorage = async () => {
    let onBoard = '';
    try {
      await AsyncStorage.getItem(STRING.onBoardComplete, (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            onBoard = value;
          } else {
          }
        }
      });

      await AsyncStorage.getItem(STRING.userEmail, (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            if (onBoard == 'true') {
              navigation.replace('MainContainer');
            } else {
              navigation.replace('OnBoarding');
            }
          } else {
            if (onBoard == 'true') {
              navigation.replace('Login');
            } else {
              navigation.replace('OnBoarding');
            }
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  return (
    <View style={GlobalStyle.mainContainerBgColor}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          padding: 15,
        }}
        source={images.one_splash_gif}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
