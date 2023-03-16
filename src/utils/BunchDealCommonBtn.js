import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../constants/Colors';

const BunchDealCommonBtn = ({
  height,
  width,
  borderRadius,
  textSize,
  textColor,
  text,
  marginTop,
  backgroundColor,
  image,
  onPress,
  paddingHorizontal,
  marginHorizontal,
  textStyle,
}) => {
  return (
    // <LinearGradient
    //   colors={[COLORS.red, COLORS.colorAccent]}
    //   start={{x: 0, y: 0}}
    //   end={{x: 1, y: 1}}
    //   activeOpacity={0.6}
    //   style={{
    // width: width,
    // height: height,
    // borderRadius: borderRadius,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: marginTop || 0,
    // marginStart: marginStart,
    // flexDirection: 'row',
    // borderWidth: borderWidth || 0,
    // borderColor: borderColor,
    // paddingHorizontal: 10,
    //   }}>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        onPress();
      }}
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: marginTop || 0,
        flexDirection: 'row',
        backgroundColor: backgroundColor,
        paddingHorizontal: paddingHorizontal,
        marginHorizontal: marginHorizontal,
      }}>
      {image && (
        <Image
          source={image}
          style={{
            width: 25,
            height: 25,
            marginHorizontal: 10,
            alignSelf: 'center',
          }}
        />
      )}
      <Text
        style={[
          textStyle,
          {
            color: textColor,
            fontSize: textSize || 16,
            // marginStart: -10,
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
    // </LinearGradient>
  );
};

export default BunchDealCommonBtn;

const styles = StyleSheet.create({});
