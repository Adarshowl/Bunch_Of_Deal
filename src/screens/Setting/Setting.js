import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import GlobalStyle2 from '../../styles/GlobalStyle2';
import {ShowConsoleLogMessage} from '../../utils/Utility';

const Setting = ({navigation}) => {
  const [offerNotification, setOfferNotification] = useState(false);
  const [storeNotification, setStoreNotification] = useState(false);
  const [messengerNotification, setMessengerNotification] = useState(false);
  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem(
        STRING.userNotificationPref,
        (error, value) => {
          if (error) {
          } else {
            if (value != null) {
              // ShowConsoleLogMessage(value);
              setOfferNotification(JSON.parse(value)?.offerNotification);
              setStoreNotification(JSON.parse(value)?.storeNotification);
              setMessengerNotification(
                JSON.parse(value)?.messengerNotification,
              );
            }
          }
        },
      );
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  useEffect(() => {
    getUserFromStorage();
  }, []);

  useEffect(() => {
    updateStoredValue();
  }, [offerNotification, storeNotification, messengerNotification]);

  const updateStoredValue = async () => {
    let data = {
      offerNotification: offerNotification,
      storeNotification: storeNotification,
      messengerNotification: messengerNotification,
    };
    // ShowConsoleLogMessage(JSON.stringify(data));
    await AsyncStorage.setItem(
      STRING.userNotificationPref,
      JSON.stringify(data),
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <View
        style={{
          height: 56,
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: COLORS.white,
          elevation: 10,
        }}>
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          marginStart={15}
          color={COLORS.colorPrimary}
          name="close"
          size={25}
        />

        <Text
          style={[
            FONTS.body2,
            {color: COLORS.colorPrimary, marginHorizontal: 10},
          ]}>
          Settings
        </Text>
      </View>

      <View activeOpacity={0.9} style={GlobalStyle2.SettingView}>
        <Text
          style={[
            {
              color: COLORS.colorAccent,

              fontFamily: 'Montserrat-Regular',
              fontSize: 14,
              marginStart: 5,
            },
          ]}>
          NOTIFICATIONS
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setOfferNotification(!offerNotification);
        }}
        style={{
          paddingVertical: 5,
          paddingHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: COLORS.lightGrey,
          borderBottomWidth: 1,
          paddingBottom: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <View>
            <Text
              style={[
                {
                  color: COLORS.black,
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 15,
                },
              ]}>
              Offers notifications
            </Text>
            <Text
              style={[
                {
                  color: 'grey',
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 13,
                  marginTop: 3,
                },
              ]}>
              Receive a special offers notification
            </Text>
          </View>
        </View>
        <MaterialIcons
          name={offerNotification ? 'check-box' : 'check-box-outline-blank'}
          size={20}
          color={offerNotification ? COLORS.colorPrimary : COLORS.white}
          marginEnd={5}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setStoreNotification(!storeNotification);
        }}
        activeOpacity={0.8}
        style={{
          paddingVertical: 5,
          paddingHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: COLORS.lightGrey,
          borderBottomWidth: 1,
          paddingBottom: 15,
          marginTop: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <View>
            <Text
              style={[
                {
                  color: COLORS.black,
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 15,
                },
              ]}>
              Nearby stores notifications
            </Text>
            <Text
              style={[
                {
                  color: 'grey',
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 13,
                  marginTop: 3,
                },
              ]}>
              Receive notification when there is a store {'\n'}near you
            </Text>
          </View>
        </View>
        <MaterialIcons
          name={storeNotification ? 'check-box' : 'check-box-outline-blank'}
          size={20}
          color={storeNotification ? COLORS.colorPrimary : COLORS.white}
          marginEnd={5}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setMessengerNotification(!messengerNotification);
        }}
        activeOpacity={0.8}
        style={{
          paddingVertical: 5,
          paddingHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 15,
          marginTop: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <View>
            <Text
              style={[
                {
                  color: COLORS.black,
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 15,
                },
              ]}>
              Messenger notifications
            </Text>
            <Text
              style={[
                {
                  color: 'grey',
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 13,
                  marginTop: 3,
                },
              ]}>
              Receive notification when there is new{'\n'}messages
            </Text>
          </View>
        </View>
        <MaterialIcons
          name={messengerNotification ? 'check-box' : 'check-box-outline-blank'}
          size={20}
          color={messengerNotification ? COLORS.colorPrimary : COLORS.white}
          marginEnd={5}
        />
      </TouchableOpacity>

      <View activeOpacity={0.9} style={GlobalStyle2.SettingView}>
        <Text
          style={[
            {
              color: COLORS.colorAccent,
              fontFamily: 'Montserrat-Regular',
              fontSize: 14,
              marginStart: 5,
            },
          ]}>
          APPLICATION
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TermsOfUse');
        }}
        activeOpacity={0.8}
        style={{
          paddingVertical: 5,
          paddingHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: COLORS.lightGrey,
          borderBottomWidth: 1,
          paddingBottom: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Text
            style={[
              {
                color: COLORS.black,
                fontFamily: 'Montserrat-Regular',
                fontSize: 15,
              },
            ]}>
            Terms of use
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PrivacyPolicy');
        }}
        activeOpacity={0.8}
        style={{
          paddingVertical: 5,
          paddingHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: COLORS.lightGrey,
          borderBottomWidth: 1,
          paddingBottom: 15,
          marginTop: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Text
            style={[
              {
                color: COLORS.black,
                fontFamily: 'Montserrat-Regular',
                fontSize: 15,
              },
            ]}>
            Privacy Policy
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          paddingVertical: 5,
          paddingHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: COLORS.lightGrey,
          borderBottomWidth: 1,
          paddingBottom: 15,
          marginTop: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <View>
            <Text
              style={[
                {
                  color: COLORS.black,
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 15,
                },
              ]}>
              Version of application
            </Text>
            <Text
              style={[
                {
                  color: 'grey',
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 13,
                  marginTop: 3,
                },
              ]}>
              1.0.0
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({});
