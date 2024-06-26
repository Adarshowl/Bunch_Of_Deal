import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/Colors';
import { STRING } from '../constants/String';
import { FONTS, SIZES } from '../constants/themes';

const BunchDealProgressBar = ({loading}) => {


  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout;

    if (loading) {
      // Show the loading indicator after a delay (e.g., 1000 milliseconds)
      timeout = setTimeout(() => {
        setVisible(true);
      }, 500); // Adjust the delay as needed
    } else {
      // Clear the timeout and hide the loading indicator
      clearTimeout(timeout);
      setVisible(false);
    }
    
    return () => {
      // Cleanup the timeout on unmount
      clearTimeout(timeout);
    };
  }, [loading]);

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={true}
            color={COLORS.colorPrimary}
            size="large"
            style={styles.activityIndicator}
          />
          <Text
            style={[
              FONTS.body3,
              {
                flex: 1,
                marginStart: 20,
                color: COLORS.shimmer_loading_color_darker,
              },
            ]}>
            {STRING.loading}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default BunchDealProgressBar;

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
    width: SIZES.width - 60,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 75,
  },
});
