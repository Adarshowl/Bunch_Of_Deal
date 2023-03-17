import {StyleSheet, Text, View, FlatList, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import GlobalStyle2 from '../../styles/GlobalStyle2';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';

const Category = ({navigation}) => {
  const data = [
    {
      id: 3,
      order: 'Order #320',
      text: 'Upload',
      des: 'TURKISH KEBAB AND PIDES',
      status: 'Pending',
    },
    {
      id: 2,
      order: 'Order #319',
      text: 'Upload',

      des: 'TURKISH KEBAB AND PIDES',
      status: 'Pending',
    },
    {
      id: 4,
      order: 'Order #318',
      text: 'Upload',

      des: 'TURKISH KEBAB AND PIDES',
      status: 'Pending',
    },
    {
      id: 5,
      order: 'Order #317',
      text: 'Upload',

      des: 'TURKISH KEBAB AND PIDES',
      status: 'Pending',
    },
    {
      id: 1,
      order: 'Order #316',
      text: 'Upload',

      des: 'TURKISH KEBAB AND PIDES',
      status: 'Pending',
    },
    {
      id: 6,
      order: 'Order #315',
      text: 'Upload',

      des: 'TURKISH KEBAB AND PIDES',
      status: 'Pending',
    },
    {
      id: 7,
      order: 'Order #314',
      text: 'Upload',

      des: 'TURKISH KEBAB AND PIDES',
      status: 'Pending',
    },
    {
      id: 7,
      order: 'Order #314',
      text: 'Upload',

      des: 'TURKISH KEBAB AND PIDES',
      status: 'Pending',
    },
    {
      id: 7,
      order: 'Order #314',
      text: 'Upload',

      des: 'TURKISH KEBAB AND PIDES',
      status: 'Pending',
    },
    {
      id: 7,
      order: 'Order #314',
      text: 'Upload',

      des: 'TURKISH KEBAB AND PIDES',
      status: 'Pending',
    },
    {
      id: 7,
      order: 'Order #314',
      text: 'Upload',

      des: 'TURKISH KEBAB AND PIDES',
      status: 'Pending',
    },
    {
      id: 7,
      order: 'Order #314',
      text: 'Upload',

      des: 'TURKISH KEBAB AND PIDES',
      status: 'Pending',
    },
    {
      id: 7,
      order: 'Order #314',
      text: 'Upload',

      des: 'TURKISH KEBAB AND PIDES',
      status: 'Pending',
    },
  ];

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
          Category
        </Text>
      </View>

      <FlatList
        data={data}
        renderItem={item => {
          return (
            <ImageBackground
              style={{
                width: '100%',
                height: 150,
                marginTop: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              source={{
                uri: 'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg',
              }}>
              <Text
                style={styles.name}
                onPress={() => {
                  props?.navigation.navigate('Category');
                }}>
                Automatic store
              </Text>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: COLORS.white,
                  borderRadius: 50,
                  paddingHorizontal: 15,
                  marginTop: 5,
                }}>
                <Text
                  style={styles.email}
                  onPress={() => {
                    props?.navigation.navigate('Setting');
                  }}>
                  1 Store
                </Text>
              </View>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
};

export default Category;

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
