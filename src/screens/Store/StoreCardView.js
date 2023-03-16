import React, {memo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';
import {useNavigation} from '@react-navigation/native';

const StoreCardView = ({image}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.9}
      onPress={() => {
        navigation.navigate('StoreDetails');
      }}>
      <View>
        <Image
          source={{
            uri: image,
          }}
          resizeMode="cover"
          PlaceholderContent={
            <ActivityIndicator color={COLORS.black} size={'large'} />
          }
          style={styles.image}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <BunchDealVectorIcon
              title={Entypo}
              name={'star'}
              color={COLORS.colorCountdownView}
              size={18}
              style={{}}
              onPress={() => {}}
            />
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                paddingVertical: 6,
                color: COLORS.white,
                fontSize: 13,
                marginStart: 5,
              }}>
              4 (2)
            </Text>
          </View>
          <Text
            style={{
              backgroundColor: COLORS.colorAccent,
              paddingHorizontal: 15,
              fontFamily: 'Montserrat-Medium',
              paddingVertical: 6,
              color: COLORS.white,
              fontSize: 11,
            }}>
            1 offer
          </Text>
          <Text
            style={{
              paddingHorizontal: 15,
              fontFamily: 'Montserrat-Medium',
              paddingVertical: 6,
              color: COLORS.white,
              fontSize: 11,
              backgroundColor: COLORS.colorPrimary,
            }}>
            +100km
          </Text>
        </View>
      </View>
      <View style={styles.details}>
        <Text style={[FONTS.body7, styles.name]} numberOfLines={1}>
          HSP Combo - $14 HSP Combo - $14 HSP Combo - $14HSP Combo - $14HSP
          Combo - $14HSP
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 2,
          }}>
          <BunchDealVectorIcon
            title={Entypo}
            name={'location-pin'}
            color={COLORS.black}
            size={15}
            style={{}}
            onPress={() => {}}
          />
          <Text style={[FONTS.body5, styles.dealName]} numberOfLines={1}>
            Turkish Kebabs and pides
          </Text>
        </View>
      </View>

      <View style={styles.dealPriceWrapper}>
        <View
          style={{
            backgroundColor: '#1565C0',
            margin: 5,
            borderRadius: 5,
          }}>
          {/* <Image
            style={{
              width: 24,
              height: 24,
              tintColor: COLORS.white,
              padding: 5,
            }}
            source={icons.ic_lnr_pushpin}
          /> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginStart: 'auto',
          }}>
          <Text style={styles.dealPriceText}>AU $34</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(StoreCardView);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: 7,
    marginTop: 9,
    marginBottom: 2,
    borderRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  details: {
    padding: 10,
  },
  name: {
    color: COLORS.black,
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
  },
  dealName: {
    color: COLORS.shimmer_loading_color_darker,
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    marginStart: 2,
  },
  dealPriceWrapper: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
    width: '100%',
  },
  dealText: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: COLORS.colorCountdownView,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingStart: 8,
    paddingEnd: 8,
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
    color: COLORS.black,
  },
  dealPriceText: {
    marginEnd: 5,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: COLORS.colorPromo,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingStart: 10,
    paddingEnd: 10,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: COLORS.white,
    paddingVertical: 5,
  },
});
