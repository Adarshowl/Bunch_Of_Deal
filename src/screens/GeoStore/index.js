import {StyleSheet, Text, View, FlatList, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import GlobalStyle2 from '../../styles/GlobalStyle2';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';

const GeoStore = ({navigation}) => {
  return (
    <View style={{backgroundColor: COLORS.white}}>
      <View style={GlobalStyle2.headerFooterStyle}>
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
            FONTS.h3,
            {color: COLORS.colorPrimary, marginHorizontal: 10},
          ]}>
          Business Locator
        </Text>

        <View
          style={{
            padding: 10,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <Ionicons
            onPress={() => {
              navigation.goBack();
            }}
            marginStart={15}
            color={COLORS.colorPrimary}
            name="search"
            size={20}
          />

          <Ionicons
            onPress={() => {
              navigation.goBack();
            }}
            marginStart={15}
            color={COLORS.colorPrimary}
            name="location"
            size={20}
          />
        </View>
      </View>
      <ImageBackground
        source={{
          uri: 'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg',
        }}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </View>
  );
};

export default GeoStore;

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    color: COLORS.white,
    marginTop: 15,
    fontFamily: 'Montserrat-Medium',
  },
  email: {
    fontSize: 14,
    color: COLORS.white,
    fontFamily: 'Montserrat-Medium',
  },
});
