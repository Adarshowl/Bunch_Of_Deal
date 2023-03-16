import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/Colors';
import {FONTS} from '../constants/themes';

const BunchDealCommonToolBar = props => {
  return (
    <View
      style={[
        styles.wrapper,
        {
          ...props?.style,
        },
      ]}>
      <Text
        style={[
          FONTS.body2,
          {
            color: COLORS.colorPrimary,
          },
        ]}>
        {props.title || ''}
      </Text>
    </View>
  );
};

export default BunchDealCommonToolBar;

const styles = StyleSheet.create({
  wrapper: {
    height: 56,
    backgroundColor: COLORS.backgroundColor,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
