import React, {memo} from 'react';

import {Text, TouchableOpacity, View} from 'react-native';
import {images} from '../../constants';
import {COLORS} from '../../constants/Colors';
import GlobalStyle1 from '../../styles/GlobalStyle1';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import {AirbnbRating} from 'react-native-elements';

const RenderReviewItem = ({item}) => {
  return (
    <TouchableOpacity
      key={item?.pseudo}
      activeOpacity={0.8}
      style={[
        GlobalStyle1.StoreBOX,
        {
          marginHorizontal: 5,
        },
      ]}>
      <BunchDealImageLoader
        defaultImg={images.def_logo}
        source={item?.image}
        styles={{
          width: 50,
          height: 50,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: COLORS.lightGrey,
          marginTop: 5,
        }}
      />
      <View
        style={{
          marginTop: 5,
          marginEnd: 15,
          marginStart: 10,
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={[
              {
                color: COLORS.black,
                fontSize: 14,
                fontFamily: 'Montserrat-Regular',
                flex: 1,
              },
            ]}
            numberOfLines={2}>
            {item?.pseudo}
          </Text>
          <AirbnbRating
            count={5}
            isDisabled={true}
            showRating={false}
            defaultRating={parseInt(item?.rate)}
            size={15}
          />
        </View>
        <Text
          style={[
            {
              color: COLORS.shimmer_loading_color_darker,
              fontSize: 13,
              fontFamily: 'Montserrat-Regular',
            },
          ]}>
          {item?.review}
        </Text>
      </View>
    </TouchableOpacity>
    // <Text>hi</Text>
  );
};
export default memo(RenderReviewItem);
