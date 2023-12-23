import React from 'react';

import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {images} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import GlobalStyle2 from '../../styles/GlobalStyle2';

const About = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={GlobalStyle2.headerFooterAbout}>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'space-around',
            alignItems: 'center',
          }}>
          <Ionicons
            onPress={() => {
              navigation.goBack();
            }}
            marginStart={5}
            marginEnd={5}
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
            Bunch of Deals
          </Text>
        </View>
        <Image source={images.splash_new_beta} style={GlobalStyle2.AboutIcon} />
        <View style={{flexDirection: 'row', alignSelf: 'center',alignItems:'center'}}>
          <Text style={{fontSize: 14}}>version : </Text>
          <Text style={[FONTS.h4, {fontSize: 14, color: COLORS.colorPrimary,textAlign:'center'}]}>
            2.0.2
          </Text>
        </View>
      </View>
      <View style={GlobalStyle2.AboutDes}>
        <Text
          onPress={() => {
            navigation.navigate('Notification');
          }}
          style={[FONTS.h6, {marginBottom: 20, marginStart: 10}]}>
          Description
        </Text>
        <Text style={[FONTS.body4, {marginStart: 10}]}>
          Bunch of Deals is an innovative iPhone{'\n'}
          and Android Phone search app with an{'\n'}
          intelligent search functionality that can{'\n'}
          help you find different exclusive deals and{'\n'}
          offers from a variety of merchants in your{'\n'}
          local area.
        </Text>
      </View>
      <View style={GlobalStyle2.AboutMail}>
        <Text style={[FONTS.h6, {marginBottom: 20, marginStart: 10}]}>
          Mail
        </Text>
        <Text style={[FONTS.body3, {marginStart: 10}]}>
          contact@bunchofdeals.com.au
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({});
