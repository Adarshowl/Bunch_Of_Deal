import React, {useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  default as Entypo,
  default as Entypofrom,
} from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import {STRING} from '../../constants/String';
import {FONTS} from '../../constants/themes';
import GlobalStyle from '../../styles/GlobalStyle';
import GlobalStyle1 from '../../styles/GlobalStyle1';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';

const OfferDetails = ({navigation, route}) => {
  const [intentCause, setIntentCause] = useState(false);
  const [fav, setFav] = useState(false);

  const onOrderClick = () => {
    navigation.navigate('Invoice');
  };

  return (
    <SafeAreaView
      style={GlobalStyle1.mainContainerBgColor}
      showsVerticalScrollIndicator={false}>
      <ScrollView>
        <SafeAreaView style={GlobalStyle1.mainContainerwhiteColor}>
          <View>
            <ImageBackground
              source={{
                uri: 'https://c4.wallpaperflare.com/wallpaper/92/475/600/coffee-sandwich-breakfast-food-wallpaper-preview.jpg',
              }}
              style={GlobalStyle1.Product_image}>
              <View
                style={[
                  GlobalStyle1.price,
                  {
                    alignSelf: 'flex-end',
                    // backgroundColor: 'red',
                    // flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 0,
                  },
                ]}>
                <Text style={[FONTS.body5, GlobalStyle1.Pricetext]}>
                  +100 km
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View
            style={[
              GlobalStyle1.product_amount,
              {
                justifyContent: 'center',
              },
            ]}>
            <Text style={[GlobalStyle1.amount_text]}>AU$15.0</Text>
          </View>
          <Text
            style={[
              FONTS.h5,
              {
                textAlign: 'center',
                marginTop: 15,
                color: COLORS.black,
                fontFamily: 'Montserrat-SemiBold',
              },
            ]}>
            DEAL ENDS ON
          </Text>
          <View
            style={[
              GlobalStyle1.minute,
              {
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                GlobalStyle1.minutetext,
                {
                  marginTop: 15,
                  padding: 10,
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 18,
                },
              ]}>
              105 : 12 : 10 : 10
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 10,
              paddingBottom: 15,
            }}>
            <Text
              style={[
                {
                  textAlign: 'center',
                  marginTop: 40,
                  color: COLORS.black,
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 18,
                },
              ]}>
              HSP COMBO - $15
            </Text>
            <Text
              style={[
                FONTS.body4,
                {
                  textAlign: 'left',
                  color: COLORS.darkgray,
                  marginStart: 25,
                  marginTop: 5,
                },
              ]}>
              THIS IS A DUMMY DEAL
            </Text>
            <Text
              style={[
                FONTS.h5,
                {
                  textAlign: 'center',
                  marginTop: 40,
                  color: COLORS.black,
                },
              ]}>
              Store Detail
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Ionicons
                name="md-location-sharp"
                size={20}
                color={COLORS.colorAccent}
                style={{
                  marginTop: 5,
                  marginStart: 25,
                }}
              />
              <Text style={[FONTS.h7, GlobalStyle1.accentColorTextUnderline]}>
                TURKISH KABAB AND PIDES
              </Text>
            </View>
            <Text
              style={[
                FONTS.h5,
                {
                  textAlign: 'center',
                  marginTop: 30,
                  color: COLORS.black,
                },
              ]}>
              Fine Print
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{
                  marginTop: 10,
                }}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginTop: 5,
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                Voucher Cannot be combined or used with any other offers or
                promotions
              </Text>
            </View>

            <Text
              style={[
                FONTS.h5,
                {
                  textAlign: 'center',
                  marginTop: 30,
                  color: COLORS.black,
                },
              ]}>
              How to Redeem
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{
                  marginTop: 10,
                }}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginTop: 5,
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <LinearGradient
        colors={['#00000090', '#00000090', COLORS.transparent]}
        style={GlobalStyle.offerDetailToolBar}>
        <BunchDealVectorIcon
          title={Ionicons}
          name={'arrow-back'}
          color={COLORS.colorAccent}
          size={25}
          style={{}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            flexGrow: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Entypofrom
            name="share"
            size={22}
            color={COLORS.colorAccent}
            style={{
              marginHorizontal: 15,
            }}
          />
          <FontAwesome
            name="heart-o"
            size={22}
            color={COLORS.colorAccent}
            style={{
              marginHorizontal: 5,
            }}
          />
        </View>
        {/* </View> */}
      </LinearGradient>

      <BunchDealCommonBtn
        height={50}
        backgroundColor={COLORS.colorAccent}
        marginHorizontal={0}
        text={STRING.order}
        textStyle={FONTS.body4}
        onPress={onOrderClick}
        textColor={COLORS.white}
        borderRadius={1}
        textSize={16}
      />
    </SafeAreaView>
  );
};

export default OfferDetails;
/**
id -  gouravcarpenter45@gmail.com 
Team viewer pass - q0VD0&PN1!kD2MJ1mi!cwR#ak

 * 
 */
