import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import {images} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';

const StoreCardView = ({item}) => {
  // console.log('Item Data:', item);

  const Width = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  // ShowConsoleLogMessage(item);

  const formatDistance = distance => {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(0)} km`;
    } else {
      return `${distance.toFixed(2)} m`;
    }
  };

  // console.log('amoungttttttttttttt', item);
  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.9}
      onPress={() => {
        navigation.navigate('StoreDetails', {
          item: item,
        });
        // item: {
        //   id_store: item?.id_store,
        //   intentFromGeo: true
        // }
        // console.log('Item Data:', item);

        // navigation.navigate('TestStoreDetail', {item: item});
      }}>
      <View style={{}}>
        <View style={styles.imageWrapper}>
          <BunchDealImageLoader
            defaultImg={images.def_logo}
            source={item?.images?.['0']?.['560_560']?.url + ''}
            styles={styles.image}
          />
        </View>
        {/* <BunchDealImageLoader
          defaultImg={images.def_logo}
          source={item?.images['0']['560_560'].url + ''}

          styles={styles.image}
        /> */}
        <LinearGradient
          colors={[COLORS.transparent, '#00000000', '#00000050', '#00000090']}
          style={{
            paddingVertical: 25,
            position: 'absolute',
            right: 0,
            left: 0,
            bottom: 0,
          }}
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
              {item?.votes?.toFixed(2)}
              {' (' + item?.nbr_votes + ')'}
            </Text>
          </View>
          {/* {item?.nbrOffers != null && item?.nbrOffers >= 1 ? (
            <Text
              style={{
                backgroundColor: COLORS.colorAccent,
                paddingHorizontal: 15,
                fontFamily: 'Montserrat-Medium',
                paddingVertical: 6,
                color: COLORS.white,
                fontSize: 11,
              }}>
              {item?.nbrOffers} {item?.nbrOffers > 1 ? 'offers' : 'offer'}
            </Text>
          ) : null} */}
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
                {/* +100km */}
          {/* {item?.distance != null ? (
        <Text>{formatDistance(item.distance)}</Text>
      ) : null} */}
          {/* </Text>
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
          ) : null} */}
        </View>
      </View>
      <View style={styles.details}>
        <Text style={[FONTS.body7, styles.name]} numberOfLines={1}>
          {item?.name}
        </Text>
        <View
          numberOfLines={2}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 2,
            width: '60%',
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
            {/*{item?.address}*/}
            {item?.address?.split(',')[1] ||
              item?.address?.split(',')[0] ||
              ''}{' '}
          </Text>
          {/* <View>
            {item?.distance != null ? (
              item?.distance >= 100 ? (
                <Text
                  style={{
                    color: COLORS.shimmer_loading_color_darker,                    // paddingHorizontal: 15,
                    fontFamily: 'Montserrat-Regular',
                    // paddingVertical:2 ,
                    fontSize: 15,
                    alignItems:'center'
                  }}>
                      {`\u25CF ${formatDistance(item.distance)}`} Away
                </Text>
              ) : item?.distance < 100 ? (
                <Text
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  style={{
                    // paddingHorizontal: 15,
                    color: COLORS.shimmer_loading_color_darker,
                     // paddingHorizontal: 15,
                    fontFamily: 'Montserrat-Regular',
                    fontSize:14,
                  }}>
                    {`\u25CF ${formatDistance(item.distance)}`} Away
                </Text>
              ) : null
            )
              : null}
          </View> */}

          <View>
            {item?.distance != null && (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: COLORS.shimmer_loading_color_darker,
                  fontFamily: 'Montserrat-Regular',
                  fontSize: item?.distance >= 1000 ? 15 : 14,
                  alignItems: 'center',
                }}>
                {/*{`\u25CF ${item.distance_km} km away`}*/}
                {`\u25CF ${item?.distance_km} ${item?.distance_by}`}
              </Text>
            )}
          </View>
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
          {/* nbr_votes */}
          {/* {item?.nbr_votes ? (
        <Text style={styles.dealPriceText}>{item.nbr_votes}</Text>
      ) : null} */}
          {/* <Text style={styles.dealPriceText}>{item?.nbr_votes}</Text> */}
          {item?.nbrOffers != null && item?.nbrOffers >= 1 ? (
            <Text
              style={{
                backgroundColor: COLORS.colorPromo,
                paddingHorizontal: 12,
                fontFamily: 'Montserrat-Medium',
                paddingVertical: 6,
                color: COLORS.white,
                fontSize: 11,
                marginVertical: 5,
                borderRadius: 5,
                marginRight: 5,
              }}>
              {item?.nbrOffers} {item?.nbrOffers > 1 ? 'offers' : 'offer'}
            </Text>
          ) : null}
          {/* <Text style={styles.dealPriceText}>{item?.lastOffer}</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(StoreCardView);

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: 7,
    marginTop: 9,
    marginBottom: 2,
    borderRadius: 5,
    elevation: 5,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 190,

    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // resizeMode:'cover',
    // padding: 20,
    resizeMode: 'cover',

    // borderRadius:5,
    // justifyContent: 'center',
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
