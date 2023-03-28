import {StyleSheet, Modal, Text, View} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import {STRING} from '../../constants';
const api_key = 'AIzaSyCIcyfvlmMVSAxxvPTASWasIN8ncskIj0w';

const PlacePickerLocation = ({navigation, show, onRequestClose}) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={show}
      onRequestClose={() => {
        onRequestClose();
      }}>
      <View style={GlobalStyle.mainContainerBgColor}>
        <AntDesign
          name="arrowleft"
          size={25}
          color={COLORS.black}
          style={{
            margin: 12,
          }}
          onPress={() => {
            onRequestClose();
          }}
        />
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(data?.description, details);
            STRING.SEARCH_LOCATION = data?.description;
            onRequestClose();
          }}
          textInputProps={{
            height: 60,
            fontSize: 16,
            fontFamily: 'Montserrat-Regular',
            paddingHorizontal: 15,
            color: 'black',
          }}
          userProps={{
            placeholderTextColor: '#000',
          }}
          styles={{
            color: COLORS.black,
          }}
          textInputHide={false}
          query={{
            key: api_key,
            language: 'en',
          }}
        />
      </View>
    </Modal>
  );
};

export default PlacePickerLocation;

const styles = StyleSheet.create({});
//* NOTE
/**
Google auto complete package me 2 change
1. text color black of flat list 
2. place holder color change
 */
