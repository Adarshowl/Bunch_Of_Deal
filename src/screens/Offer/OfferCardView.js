import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {icons, images} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';

const OfferCardView = ({item}) => {
  const navigation = useNavigation();
  // ShowConsoleLogMessage(item);
  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.9}
      onPress={() => {
        navigation.navigate('OfferDetails', {item: item});
      }}>
      <View>
        {/* <Image
          source={{
            uri: item?.images['0']['560_560'].url + '',
          }}
          resizeMode="cover"
          PlaceholderContent={
            <ActivityIndicator color={COLORS.black} size={'large'} />
          }
          style={styles.image}
        /> */}

        <BunchDealImageLoader
          defaultImg={images.def_logo}
          source={item?.images['0']['560_560'].url + ''}
          styles={styles.image}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            flexDirection: 'row',
          }}>
          {item?.purchase_counter > 0 ? (
            <Text
              style={{
                backgroundColor: COLORS.colorAccent,
                paddingHorizontal: 15,
                fontFamily: 'Montserrat-Medium',
                paddingVertical: 6,
                color: COLORS.white,
                fontSize: 11,
              }}>
              +{item?.purchase_counter} sold
            </Text>
          ) : null}
          {item?.distance != null ? (
            item?.distance >= 100 ? (
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
                {/*{item?.distance}km*/}
              </Text>
            ) : item?.distance < 100 ? (
              <Text
                style={{
                  paddingHorizontal: 15,
                  fontFamily: 'Montserrat-Medium',
                  paddingVertical: 6,
                  color: COLORS.white,
                  fontSize: 11,
                  backgroundColor: COLORS.colorPrimary,
                }}>
                {item?.distance}km
              </Text>
            ) : null
          ) : null}
        </View>
      </View>
      <View style={styles.details}>
        <Text style={[FONTS.body7, styles.name]} numberOfLines={1}>
          {item?.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 2,
          }}>
          <BunchDealVectorIcon
            title={MaterialCommunityIcons}
            name={'storefront-outline'}
            color={COLORS.black}
            size={15}
            style={{}}
            onPress={() => {}}
          />
          <Text style={[FONTS.body5, styles.dealName]} numberOfLines={1}>
            {item?.store_name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            marginTop: 5,
            flex: 1,
          }}>
          <BunchDealVectorIcon
            title={Entypo}
            name={'location-pin'}
            color={COLORS.black}
            size={15}
            style={{
              marginTop: 2,
            }}
            onPress={() => {}}
          />
          <Text
            style={[
              styles.dealName,
              {
                fontFamily: 'Montserrat-Regular',
              },
            ]}
            numberOfLines={2}>
            {/*{item?.address || ''}*/}
            {item?.address?.split(',')[1] || item?.address?.split(',')[0] || ''}
          </Text>
        </View>
      </View>

      <View style={styles.dealPriceWrapper}>
        <View
          style={{
            backgroundColor:
              item?.featured != null && item?.featured == 0
                ? '#1565C0'
                : COLORS.transparent,
            margin: 5,
            borderRadius: 5,
            width: 24,
            height: 24,
          }}>
          {item?.featured != null && item?.featured == 0 ? (
            <Image
              style={{
                width: 24,
                height: 24,
                tintColor: COLORS.white,
                padding: 5,
              }}
              source={icons.ic_lnr_pushpin}
            />
          ) : null}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginStart: 'auto',
          }}>
          <Text style={styles.dealText}>Deal</Text>
          <Text style={styles.dealPriceText}>
            {item?.currency?.symbol + '' + item?.offer_value}
            .0
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(OfferCardView);

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
    height: 195,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    resizeMode: 'cover',
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
    color: COLORS.black,
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    marginStart: 2,
    // textTransform: 'uppercase',
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
    paddingVertical: 5,
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
