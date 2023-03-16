import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const BunchDealVectorIcon = props => {
  return (
    <props.title
      name={props?.name}
      size={props?.size}
      color={props?.color}
      style={props?.style}
      onPress={props?.onPress}
    />
  );
};

export default BunchDealVectorIcon;

const styles = StyleSheet.create({});
