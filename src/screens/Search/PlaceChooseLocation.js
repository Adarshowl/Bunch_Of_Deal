import React from 'react';
import {Modal, StyleSheet, View, Text} from 'react-native';
import {SIZES} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PlaceChooseLocation = ({
  navigation,
  show,
  onRequestClose,
  onChangeLocation,
}) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={show}
      onRequestClose={() => {
        onRequestClose();
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View
            style={{
              padding: 25,
              backgroundColor: COLORS.colorAccent,
              width: '100%',
              alignItems: 'center',
            }}>
            <Ionicons
              name="location-sharp"
              color={COLORS.white}
              style={{
                marginHorizontal: 5,
              }}
              size={70}
            />
            <Text
              style={{
                fontSize: 18,
                color: COLORS.white,
                fontFamily: 'Montserrat-SemiBold',
                marginTop: 15,
              }}>
              Change Location
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.shimmer_loading_color_darker,
              fontFamily: 'Montserrat-Regular',
              marginTop: 15,
              textAlign: 'center',
            }}>
            Do you want to change {'\n'}your location ?
          </Text>
          <BunchDealCommonBtn
            height={40}
            width={'95%'}
            backgroundColor={COLORS.colorAccent}
            marginHorizontal={5}
            text={'KEEP CURRENT LOCATION'}
            textStyle={FONTS.body3}
            textColor={COLORS.white}
            onPress={() => {
              onRequestClose();
            }}
            marginTop={25}
            borderRadius={30}
            textSize={14}
          />
          <BunchDealCommonBtn
            height={40}
            width={'95%'}
            backgroundColor={COLORS.colorAccent}
            marginHorizontal={5}
            text={'CHANGE LOCATION'}
            textStyle={FONTS.body3}
            textColor={COLORS.white}
            onPress={() => {
              onChangeLocation();
            }}
            marginTop={10}
            borderRadius={30}
            textSize={14}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PlaceChooseLocation;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    height: SIZES.width - 35,
    width: SIZES.width - 120,
    // paddingHorizontal: 20,

    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 75,
  },
});
