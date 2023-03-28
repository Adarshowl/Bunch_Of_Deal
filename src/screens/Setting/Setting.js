import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import GlobalStyle2 from '../../styles/GlobalStyle2';

const Setting = ({navigation}) => {
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [data, setData] = useState({});
  const [select, setSelect] = useState();

  const onItemSelected = (item, index) => {
    let temp = Object.assign({}, item);

    temp.selected = !temp.selected;
    if (temp.selected) {
      setData(temp);
      setIsItemSelected(true);
    } else {
      setIsItemSelected(false);
      setData({});
    }

    return temp;
    setSelect(a);
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
          name={'check-box-outline-blank'}
          size={20}
          color={COLORS.white}
          marginEnd={5}
        />
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
          name={'check-box-outline-blank'}
          size={20}
          color={COLORS.white}
          marginEnd={5}
        />
      </TouchableOpacity>

      <TouchableOpacity
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
          name={'check-box-outline-blank'}
          size={20}
          color={COLORS.white}
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
