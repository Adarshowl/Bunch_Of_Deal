import React from 'react';
import {Image, StyleSheet, TouchableOpacity, Text} from 'react-native';

const BunchDealImageText = props => {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        props.wrapperStyle,
      ]}
      activeOpacity={0.8}
      onPress={props?.onPress}>
      <Image style={props?.style} source={props?.source} />
      <Text style={props?.textStyle}>{props?.text}</Text>
    </TouchableOpacity>
  );
};

export default BunchDealImageText;

const styles = StyleSheet.create({});
