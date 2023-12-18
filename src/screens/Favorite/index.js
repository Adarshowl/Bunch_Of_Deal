import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import { FONTS } from '../../constants/themes';
import { COLORS } from '../../constants/Colors';
import FavOffer from './FavOffer';
import FavOffer11 from './FavOffer11';
import FavStore11 from './FavStore11';
import FavStore from './FavStore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';


const Favorite = ({ navigation, route }) => {
  const [percent, setPercent] = useState(true);
  const [storeFront, setStoreFront] = useState(false);
  return (
    <SafeAreaView style={GlobalStyle.mainContainerBgColor}>
      <View
        style={[
          {
            height: 56,
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: COLORS.white,
            elevation: 10,
          },
        ]}>
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
          Favorite
        </Text>
      </View>
      {/* <View style={[
        GlobalStyle.commonToolbarBG,
        {
        height:20
      }]}> */}

      <View
        style={{
          // flexDirection: 'row',
          alignItems: 'center',
          // width: 350,
          // flex: 1,
          // justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            // flexGrow: 1,
            // height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            // marginStart: 13,
            marginTop: 10,
            marginBottom:3

          }}
        // onPress={() => {
        //   setPercent(true);
        //   setStoreFront(false);
        // }}
        >
          <Text
            style={[
              FONTS.h6,
              {
                // color: percent
                //   ? COLORS.colorAccent
                //   : COLORS.shimmer_loading_color,
                color: COLORS?.black,
                fontSize: 20,
              },
            ]}>
            Favorite Offers
          </Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>

      <FavOffer11 navigation={navigation} key={'1'} showHeader={true} />

      {/* {percent ? (
        <FavOffer navigation={navigation} key={'1'} showHeader={true} />
      ) : null} */}

      {/* <View style={GlobalStyle.commonToolbarBG}> */}
      <View
        style={{
          // marginTop:-40,
          // flexDirection: 'row',
          alignItems: 'center',
          // // width: 350,
          // flex: 1,
          // justifyContent: 'space-around',
        }}>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            // flexGrow: 1,
            // height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            // marginBottom:3
            // marginStart: 13,
          }}
        // onPress={() => {
        //   setPercent(false);
        //   setStoreFront(true);
        // }}
        >
          <Text
            style={[
              FONTS.h6,
              {
                color: COLORS?.black,
                // color: storeFront
                //   ? COLORS.colorAccent
                //   : COLORS.shimmer_loading_color,
                fontSize: 20,
                marginTop:5
                // fontFamily: 'OpenSans-Bold'
              },
            ]}>
            Favorite Stores
          </Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
      <FavStore11 navigation={navigation} key={'2'} showHeader={true} />

      {/* {storeFront ? (
        <FavStore navigation={navigation} key={'2'} showHeader={true} />
      ) : null} */}
    </SafeAreaView>
  );
};

export default Favorite;
