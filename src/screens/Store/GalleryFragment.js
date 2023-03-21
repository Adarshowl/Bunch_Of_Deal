import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const GalleryFragment = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Text
        style={{
          fontSize: 25,
          color: 'black',
        }}>
        GlobalStyle
      </Text>
    </View>
  );
};

export default GalleryFragment;

const styles = StyleSheet.create({});
