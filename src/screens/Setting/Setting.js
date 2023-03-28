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
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <View style={GlobalStyle2.headerFooterStyle}>
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          marginStart={10}
          color={COLORS.colorPrimary}
          name="ios-arrow-back-sharp"
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
        <View style={{flexDirection: 'column'}}>
          <Text
            style={[
              FONTS.body5,
              {color: COLORS.colorPrimary, marginBottom: 10},
            ]}>
            NOTIFICATIONS
          </Text>
          <Text style={[FONTS.body4, {color: COLORS.black}]}>
            Offers notifications
          </Text>
          <Text style={[FONTS.body5]}>
            Receive a special offers notification
          </Text>
        </View>

        <MaterialIcons
          onPress={() => {
            onItemSelected(item, index);
          }}
          name={'check-box-outline-blank'}
          size={20}
          color={COLORS.black}
        />
      </View>
      <View activeOpacity={0.9} style={GlobalStyle2.SettingView}>
        <View style={{flexDirection: 'column'}}>
          <Text
            onPress={() => {
              navigation.navigate('About');
            }}
            style={[FONTS.body4, {color: COLORS.black}]}>
            Nearby stores notifications
          </Text>
          <Text style={[FONTS.body5]}>
            Receive notification when there is a store {'\n'}
            near you
          </Text>
        </View>
        <MaterialIcons
          name={'check-box-outline-blank'}
          size={20}
          color={COLORS.black}
        />
      </View>
      <View activeOpacity={0.9} style={GlobalStyle2.SettingView}>
        <View style={{flexDirection: 'column'}}>
          <Text style={[FONTS.body4, {color: COLORS.black}]}>
            Messenger notifications
          </Text>
          <Text style={[FONTS.body5]}>
            Receive notification when there is new {'\n'}
            messages
          </Text>
          <Text
            style={[
              FONTS.body5,
              {color: COLORS.colorPrimary, marginVertical: 20},
            ]}>
            APPLICATION
          </Text>
          <Text style={[FONTS.body4, {color: COLORS.black}]}>Terms of use</Text>
        </View>
        <MaterialIcons
          name={'check-box-outline-blank'}
          size={20}
          color={COLORS.black}
        />
      </View>
      <View activeOpacity={0.9} style={GlobalStyle2.settingbox}>
        <Text style={[FONTS.body4, {color: COLORS.black}]}>Privacy Policy</Text>
      </View>
      <View activeOpacity={0.9} style={GlobalStyle2.settingbox}>
        <Text style={[FONTS.body4, {color: COLORS.black}]}>
          Version of application
        </Text>
        <Text style={[FONTS.body5]}>2.0.2</Text>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({});
