import {StyleSheet, Text, View, FlatList, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import GlobalStyle2 from '../../styles/GlobalStyle2';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import OfferCardView from '../Offer/OfferCardView';
import StoreCardView from '../Store/StoreCardView';

const FavStore = ({navigation}) => {
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
            FONTS.body2,
            {
              color: COLORS.colorPrimary,
              marginHorizontal: 10,
            },
          ]}>
          My stores
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
            marginEnd={5}
            color={COLORS.colorPrimary}
            name="search"
            size={20}
          />
        </View>
      </View>
      <FlatList
        data={[2]}
        renderItem={item => {
          return (
            <StoreCardView image="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg" />
          );
        }}
      />
    </View>
  );
};

export default FavStore;

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
