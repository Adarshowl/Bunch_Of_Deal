import React, {memo} from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
import {images} from '../../constants';
import {COLORS} from '../../constants/Colors';
import GlobalStyle1 from '../../styles/GlobalStyle1';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';

const RenderOfferItem = ({item, navigation}) => {
  //   ShowConsoleLogMessage(item);

  // let imageUrl = item?.images['0']['560_560']?.url;
  let imageUrl = item?.images?.['0']?.['560_560']?.url;

  return (
    <TouchableOpacity
      key={imageUrl}
      activeOpacity={0.8}
      style={[GlobalStyle1.StoreBOX]}
      onPress={() => {
        navigation.navigate('OfferDetails', {item: item});
      }}>
      <BunchDealImageLoader
        defaultImg={images.def_logo}
        source={imageUrl}
        styles={GlobalStyle1.Storeimages}
      />
      <View
        style={{
          marginTop: 5,
          marginStart: 10,
          flex: 1,
        }}>
        <Text
          style={[
            {
              color: COLORS.black,
              fontSize: 14,
              fontFamily: 'Montserrat-Regular',
            },
          ]}>
          {item?.name}
        </Text>
        <Text
          style={[
            {
              color: 'grey',
              fontSize: 13,
              fontFamily: 'Montserrat-Regular',
            },
          ]}
          numberOfLines={1}>
          {item?.description?.replace(/<\/?[^>]+(>|$)/g, '\n')}
        </Text>
      </View>
      <View
        style={[
          GlobalStyle1.price_BOX,
          {
            paddingHorizontal: 10,
            paddingVertical: 2,
            marginEnd: 10,
          },
        ]}>
        <Text
          style={[
            {
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 11,
              textAlignVertical: 'center',
              textAlign: 'center',
              color: COLORS.white,
            },
          ]}>
          {item?.currency?.symbol + '' + item?.offer_value}
          .0
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default memo(RenderOfferItem);
