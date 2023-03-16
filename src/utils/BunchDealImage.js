import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

const BunchDealImage = props => {
  return (
    <TouchableOpacity
      style={props.wrapperStyle}
      activeOpacity={0.8}
      onPress={props?.onPress}>
      <Image style={props?.style} source={props?.source} />
    </TouchableOpacity>
  );
};

export default BunchDealImage;

const styles = StyleSheet.create({});
