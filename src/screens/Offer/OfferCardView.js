import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {icons, images} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';

const formatDistance = distance => {
  if (distance >= 1000) {
    return `${(distance / 1000).toFixed(0)} km`;
  } else {
    return `${distance.toFixed(0)} m`;
  }
};
const OfferCardView = ({item, index}) => {
  const navigation = useNavigation();

  // ShowConsoleLogMessage(index + item?.name);
  // ShowConsoleLogMessage('\n\n\n\n');
  //
  // ShowConsoleLogMessage(item?.images);

  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.9}
      onPress={() => {
        navigation.navigate('OfferDetails', {item: item});
      }}>
      <View style={styles.imageWrapper}>
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
          // source={item?.images ? item?.images['0']?.['560_560']?.url + '' : ''}
          source={
            // item?.image['0']?.['560_560']?.url + '' ||
            item?.images['0']?.['560_560']?.url + ''
          }
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
                // backgroundColor: COLORS.colorCountdownView,
                // paddingHorizontal: 15,
                // fontFamily: 'Montserrat-Medium',
                // paddingVertical: 6,
                // color: COLORS.white,
                // fontSize: 11,
                margin: 5,
                borderRadius: 5,
                backgroundColor: COLORS.colorCountdownView,
                textAlignVertical: 'center',
                textAlign: 'center',
                paddingStart: 8,
                paddingEnd: 8,
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                color: COLORS.black,
                paddingVertical: 5,
              }}>
              +{item?.purchase_counter} sold
            </Text>
          ) : null}

          {/* {item?.distance != null ? (
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

                {item?.distance != null ? (
        <Text>{formatDistance(item.distance)}</Text>
      ) : null}
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
          )
          : null} */}
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
          numberOfLines={1}
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            marginTop: 5,
            // flex: 1,
            width: '60%',
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
          {/* <Text
            style={[
              styles.dealName,
              {
                fontFamily: 'Montserrat-Medium',
                marginEnd: 8,
              },
            ]}
            numberOfLines={2}> */}
          <Text
            //  style={[FONTS.body5, styles.dealName]}
            style={{
              color: COLORS.shimmer_loading_color_darker,
              fontFamily: 'Montserrat-Regular',
              fontSize: item?.distance >= 1000 ? 15 : 14,
              alignItems: 'center',
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {/*{item?.address || ''}*/}
            {item?.address?.split(',')[1] || item?.address?.split(',')[0] || ''}
          </Text>
          <View>
            {item?.distance != null ? (
              item?.distance >= 100 ? (
                <Text
                  //   style={{
                  //   color: COLORS.shimmer_loading_color_darker,
                  //   fontFamily: 'Montserrat-Regular',
                  //   fontSize: item?.distance >= 1000 ? 15 : 14,
                  //   alignItems: 'center',
                  // }}
                  style={{
                    color: COLORS.shimmer_loading_color_darker,
                    fontFamily: 'Montserrat-Regular',
                    fontSize: item?.distance >= 1000 ? 15 : 14,
                    alignItems: 'center',
                    marginLeft: 5,
                  }}>
                  {`\u25CF ${item.distance_km} ${item.distance_by}`}
                </Text>
              ) : item?.distance < 100 ? (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    color: COLORS.shimmer_loading_color_darker,
                    fontFamily: 'Montserrat-Regular',
                    fontSize: item?.distance >= 1000 ? 15 : 14,
                    alignItems: 'center',
                  }}>
                  {/*{`\u25CF ${item.distance_km}`} km away*/}
                  {`\u25CF ${item.distance_km} ${item.distance_by}`}
                </Text>
              ) : null
            ) : null}
          </View>
          {/* <View>
            {item?.distance != null && (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: COLORS.shimmer_loading_color_darker,
                  // color:COLORS.black,
                  fontFamily: 'Montserrat-Medium',
                  fontSize: item?.distance >= 1000 ? 15 : 14,
                  alignItems: 'center',
                }}>
                {`\u25CF ${formatDistance(item.distance)} Away`}
              </Text>
            )}
          </View> */}
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
        {item?.discount > 0 ? (
          <View
            style={{
              position: 'absolute', // Set the position to absolute
              top: 0, // Align the component to the top
              left: 0, // Align the component to the left
              marginTop: 5,
              marginLeft: 5,
            }}>
            <ImageBackground
              // source={{
              //   uri:
              //     'https://w7.pngwing.com/pngs/67/521/png-transparent-computer-icons-offers-text-logo-discount-thumbnail.png',
              // }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
              imageStyle={{resizeMode: 'cover'}}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: COLORS.colorPromo,
                  borderRadius: 100,
                  width: 50,
                  height: 50,
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    color: 'white',
                    fontWeight: 'bold',
                    transform: [{rotate: '-20deg'}],
                  }}>
                  {item.discount}%
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: 'white',
                    fontWeight: 'bold',
                    transform: [{rotate: '-18deg'}],
                    marginLeft: 5,
                  }}>
                  off
                </Text>
              </View>
            </ImageBackground>
          </View>
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            marginStart: 'auto',
          }}>
          <Text style={styles.dealText}>Deal</Text>
          {/* <Text style={styles.dealPriceText}>{item?.offer_value}</Text> */}

          {item?.value_type === 'percent' ? (
            <Text style={styles.dealPriceText}>{item?.offer_value}%</Text>
          ) : (
            <Text style={styles.dealPriceText}>
              {item?.currency?.symbol + '' + item?.offer_value}.0
            </Text>
          )}

          {/* <Text style={styles.dealPriceText}>
            {item?.currency?.symbol + '' + item?.offer_value}
            .0
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(OfferCardView);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.homepagebg,
    marginHorizontal: 7,
    marginTop: 9,
    marginBottom: 2,
    borderRadius: 5,
    elevation: 5,
  },
  imageWrapper: {
    position: 'relative',
  },
  // image: {
  //   width: '100%',
  //   height: 250,

  //   borderTopLeftRadius: 5,
  //   borderTopRightRadius: 5,
  //   // resizeMode:'cover',
  //   // padding: 20,
  //   resizeMode: 'cover'  ,

  //   // borderRadius:5,

  // },

  image: {
    width: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    resizeMode: 'cover',
    // marginBottom: 10,
    height: 190,
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
    fontSize: 12,
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
