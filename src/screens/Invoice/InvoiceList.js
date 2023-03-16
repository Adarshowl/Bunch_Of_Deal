import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import GlobalStyle2 from '../../styles/GlobalStyle2';
// import GlobalStyle2 from '../../styles/GlobalStyle2';

const InvoiceList = ({navigation}) => {
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
            FONTS.h3,
            {color: COLORS.colorPrimary, marginHorizontal: 10},
          ]}>
          Order
        </Text>
      </View>
      <FlatList
        data={data}
        extraData={data}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={item => {
          const Notification = item.item;
          let attachment = <View />;

          return (
            <View style={GlobalStyle2.content}>
              <View style={{flexDirection: 'column'}}>
                <View style={GlobalStyle2.text}>
                  <Text style={[FONTS.body4, {color: COLORS.black}]}>
                    {Notification.order}
                  </Text>
                  <Text style={GlobalStyle2.orderStatus}>
                    {Notification.status}
                  </Text>
                  <Text style={GlobalStyle2.orderUpload}>
                    {Notification.text}
                  </Text>
                </View>

                <Text style={[FONTS.body4, {color: COLORS.black}]}>
                  {Notification.des}
                </Text>
              </View>

              <Ionicons
                onPress={() => {
                  navigation.navigate('InvoiceDetail');
                }}
                color={COLORS.grey}
                name="ios-chevron-down-outline"
                size={20}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default InvoiceList;

const styles = StyleSheet.create({});
