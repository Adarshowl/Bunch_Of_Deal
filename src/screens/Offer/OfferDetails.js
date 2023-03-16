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
// import {ShowToastMessage} from '../../../utils/Utility';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';

const OfferDetails = ({navigation, route}) => {
  const [intentCause, setIntentCause] = useState(false);
  const [fav, setFav] = useState(false);

  const onOrderClick = () => {
    navigation.navigate('StoreDetails');
  };

  return (
    <ScrollView
      style={GlobalStyle1.mainContainerBgColor}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={GlobalStyle1.mainContainerwhiteColor}>
        <View>
          <ImageBackground
            source={{
              uri: 'https://c4.wallpaperflare.com/wallpaper/92/475/600/coffee-sandwich-breakfast-food-wallpaper-preview.jpg',
            }}
            style={GlobalStyle1.Product_image}>
            <LinearGradient
              //  colors={[COLORS.black, COLORS.red]}
              //  style={{flex: 1}}
              colors={[
                COLORS.shimmer_loading_color,
                COLORS.lightGrey,
                COLORS.transparent,
              ]}
              style={GlobalStyle.offerDetailToolBar}>
              {/* <View style={GlobalStyle.offerDetailToolBar}> */}
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

            <View
              style={[
                GlobalStyle1.price,
                {
                  alignSelf: 'flex-end',
                  marginVertical: 255,
                },
              ]}>
              <Text style={[FONTS.body5, GlobalStyle1.Pricetext]}>+100 km</Text>
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
          <Text style={[FONTS.h5, GlobalStyle1.amount_text]}>AU$15.0</Text>
        </View>
        <Text
          style={[
            FONTS.h5,
            {
              textAlign: 'center',
              marginTop: 15,
              color: COLORS.black,
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
              FONTS.body2,
              GlobalStyle1.minutetext,
              {
                marginTop: 15,
              },
            ]}>
            105 : 12 : 10 : 10
          </Text>
        </View>
        <Text
          style={[
            FONTS.h5,
            {
              textAlign: 'center',
              marginTop: 40,
              color: COLORS.black,
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
          {'\n'}
          {'\n'}
          SMALL COMBO $15
          {'\n'}
          MEDIUM COMBO $18
          {'\n'}
          LARGE COMBO$22
          {'\n'}
          Combo deal is combined with A can OF SOFT DRINK/Water Bottle
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
            marginTop: -15,
          }}>
          <Entypo
            name="dot-single"
            size={40}
            color={COLORS.black}
            style={{
              marginStart: 15,
              marginTop: 10,
            }}
          />
          <Text
            style={[
              FONTS.body4,
              {
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 5,
                marginStart: 0,
                color: COLORS.black,
              },
            ]}>
            {' '}
            Voucher Cannot be combined or used
          </Text>
        </View>
        <Text
          style={[
            FONTS.body4,
            {
              marginStart: 60,
              color: COLORS.black,
              marginTop: -15,
            },
          ]}>
          with any other offers or promotions
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: -15,
          }}>
          <Entypo
            name="dot-single"
            size={40}
            color={COLORS.black}
            style={{
              marginStart: 15,
              marginTop: 10,
            }}
          />
          <Text
            style={[
              FONTS.body4,
              {
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 5,
                marginStart: 0,
                color: COLORS.black,
              },
            ]}>
            {' '}
            Standard Fine Print apply for all the offers
          </Text>
        </View>
        <Text
          style={[
            FONTS.body4,
            {
              marginStart: 60,
              color: COLORS.black,
              marginTop: -15,
            },
          ]}>
          in app
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: -15,
          }}>
          <Entypo
            name="dot-single"
            size={40}
            color={COLORS.black}
            style={{
              marginStart: 15,
              marginTop: 10,
            }}
          />
          <Text
            style={[
              FONTS.body4,
              {
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 5,
                marginStart: 0,
                color: COLORS.black,
              },
            ]}>
            {' '}
            General Terms and Conditions and User's
          </Text>
        </View>
        <Text
          style={[
            FONTS.body4,
            {
              marginStart: 60,
              color: COLORS.black,
              marginTop: -15,
            },
          ]}>
          Terms and Conditions apply
        </Text>
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
            marginTop: -10,
          }}>
          <Entypo
            name="dot-single"
            size={40}
            color={COLORS.black}
            style={{
              marginStart: 15,
              marginTop: 5,
            }}
          />
          <Text
            style={[
              FONTS.body4,
              {
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 5,
                marginStart: 0,
                color: COLORS.black,
              },
            ]}>
            {' '}
            Expiry: 30 days from purchase
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: -20,
          }}>
          <Entypo
            name="dot-single"
            size={40}
            color={COLORS.black}
            style={{
              marginStart: 15,
              marginTop: 5,
            }}
          />
          <Text
            style={[
              FONTS.body4,
              {
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 5,
                marginStart: 0,
                color: COLORS.black,
              },
            ]}>
            {' '}
            Standard Redeem procedure apply
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: -25,
          }}>
          <Entypo
            name="dot-single"
            size={40}
            color={COLORS.black}
            style={{
              marginStart: 15,
              marginTop: 10,
            }}
          />
          <Text
            style={[
              FONTS.body4,
              {
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 5,
                marginStart: 0,
                color: COLORS.black,
              },
            ]}>
            {' '}
            No booking required, unless stated by
          </Text>
        </View>
        <Text
          style={[
            FONTS.body4,
            {
              marginStart: 60,
              color: COLORS.black,
              marginTop: -15,
            },
          ]}>
          Business.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: -15,
          }}>
          <Entypo
            name="dot-single"
            size={40}
            color={COLORS.black}
            style={{
              marginStart: 15,
              marginTop: 10,
            }}
          />
          <Text
            style={[
              FONTS.body4,
              {
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 5,
                marginStart: 0,
                color: COLORS.black,
              },
            ]}>
            {' '}
            Payment method will be Cash or Credit/
          </Text>
        </View>
        <Text
          style={[
            FONTS.body4,
            {
              marginStart: 60,
              color: COLORS.black,
              marginTop: -15,
            },
          ]}>
          Debit Card
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: -15,
          }}>
          <Entypo
            name="dot-single"
            size={40}
            color={COLORS.black}
            style={{
              marginStart: 15,
              marginTop: 10,
            }}
          />
          <Text
            style={[
              FONTS.body4,
              {
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 5,
                marginStart: 0,
                color: COLORS.black,
              },
            ]}>
            {' '}
            Credit/Debit Card may require at the time
          </Text>
        </View>
        <Text
          style={[
            FONTS.body4,
            {
              marginStart: 60,
              color: COLORS.black,
              marginTop: -15,
            },
          ]}>
          of claim the deal
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: -15,
          }}>
          <Entypo
            name="dot-single"
            size={40}
            color={COLORS.black}
            style={{
              marginStart: 15,
              marginTop: 10,
            }}
          />
          <Text
            style={[
              FONTS.body4,
              {
                textAlign: 'center',
                textAlignVertical: 'center',
                marginTop: 5,
                marginStart: 0,
                color: COLORS.black,
              },
            ]}>
            {' '}
            Present printed Invoice, app purches on
          </Text>
        </View>
        <Text
          style={[
            FONTS.body4,
            {
              marginStart: 60,
              color: COLORS.black,
              marginTop: -15,
            },
          ]}>
          arrival, or call prior for confirmation
        </Text>
        <BunchDealCommonBtn
          height={40}
          backgroundColor={COLORS.colorAccent}
          marginHorizontal={0}
          text={STRING.order}
          textStyle={FONTS.h2}
          onPress={onOrderClick}
          textColor={COLORS.white}
          marginTop={25}
          borderRadius={1}
          textSize={16}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default OfferDetails;
/**
id -  gouravcarpenter45@gmail.com 
Team viewer pass - q0VD0&PN1!kD2MJ1mi!cwR#ak

 * 
 */
