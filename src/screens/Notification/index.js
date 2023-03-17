import React, {useState} from 'react';
import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalStyle1 from '../../styles/GlobalStyle1';

const Notification = ({navigation}) => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Kid&039;s HAIR CUT - $10',
      description:
        'DUMMY DEALKids hair cut - CLIPPER ONLY for $10Stylist hair cut starting from $15No ORDER REQU',
      uri: 'https://c4.wallpaperflare.com/wallpaper/92/475/600/coffee-sandwich-breakfast-food-wallpaper-preview.jpg',
    },
    {
      id: 2,
      name: 'TEST DEAL $1',
      description: 'TEST ORDER$1',
      uri: 'https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466__340.jpg',
    },
    {
      id: 3,
      name: 'Buy 2 Traditional Pizza for $20',
      description: '2 Traditional Pizza $20',
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLyE86C-kl1M-kwQ__rq73rNj4klm0TdDO600MD8Q-hNW4t1bvoBY3Aa5IwEBa_xupJAQ&usqp=CAU',
    },
    {
      id: 4,
      name: 'New Test',
      description: 'Testing',
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRLH-3g_ZE2QLVwDeBzPXYiuQo4gP00S0IZ45tTh2fyDYSwPAyfSZcy7lntstOCjClUx8&usqp=CAU',
    },
    {
      id: 5,
      name: 'New Test 11 jan',
      description: 'Testing',
      uri: 'https://c4.wallpaperflare.com/wallpaper/92/475/600/coffee-sandwich-breakfast-food-wallpaper-preview.jpg',
    },
    {
      id: 6,
      name: 'Madina Halal Meat, Coburg',
      description:
        'Madina Halal Meats, CoburgHalal meat, Hand slaughter chicken',
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb-J46RTxChrwlxg2Y_icIAPtajU779z9aD3TgLkeZnuBBREp3eQkYlEGwqLD4-uCgVEo&usqp=CAU',
    },
    {
      id: 7,
      name: 'Minor Car Service for $50',
      description:
        'Minor Car Service for $50Oil chnageOil Filter ChangeGneneral safety check.Diesel cars $15 Extra',
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4ptqcWtbHe62ZM9z9Y9sFcGo3-MAAN2HbvQ&usqp=CAU',
    },
    {
      id: 8,
      name: 'Id',
      description: 'Not Id',
      uri: 'https://c4.wallpaperflare.com/wallpaper/92/475/600/coffee-sandwich-breakfast-food-wallpaper-preview.jpg',
    },
    {
      id: 9,
      name: 'AJ',
      description: 'Check Aj',
      uri: 'https://c4.wallpaperflare.com/wallpaper/92/475/600/coffee-sandwich-breakfast-food-wallpaper-preview.jpg',
    },
  ]);

  const renderItem = ({item, index}) => {
    return (
      <View activeOpacity={0.9} style={[GlobalStyle1.content]}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            paddingStart: 10,
          }}>
          <Image source={{uri: item.uri}} style={[GlobalStyle1.images]} />

          <View
            style={{
              flexDirection: 'column',
              marginStart: 15,
            }}>
            <Text
              style={[
                FONTS.h6,
                {
                  color: COLORS.black,
                  marginHorizontal: 5,
                },
              ]}>
              {item.name}
            </Text>
            <Text
              style={[
                FONTS.body5,
                {
                  fontFamily: 'Quicksand-Medium',
                  color: COLORS.dimgray,
                  marginHorizontal: 5,
                  fontSize: 13,
                  maxWidth: 230,
                },
              ]}>
              {item.description}
            </Text>
          </View>
        </View>
        <Entypo
          color={COLORS.black}
          name="dots-three-vertical"
          size={15}
          style={{
            marginTop: 10,
            marginEnd: 10,
            alignItems: 'flex-end',
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={GlobalStyle1.mainContainerwhiteColor}>
      <View style={GlobalStyle1.Header}>
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          color={COLORS.colorPrimary}
          name="ios-arrow-back-sharp"
          size={25}
          style={{
            marginStart: 10,
          }}
        />
        <Text
          style={[
            FONTS.body2,
            {
              color: COLORS.colorPrimary,
              marginHorizontal: 10,
            },
          ]}>
          Notification
        </Text>
      </View>
      <FlatList
        data={data}
        extraData={data}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Notification;
