import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypofrom from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import GlobalStyle from '../../styles/GlobalStyle';
import GlobalStyle1 from '../../styles/GlobalStyle1';

// import {ShowToastMessage} from '../../../utils/Utility';

const StoreDetails = ({navigation}) => {
  return (
    <SafeAreaView
      style={GlobalStyle1.mainContainerBgColor}
      showsVerticalScrollIndicator={false}>
      <ScrollView>
        <SafeAreaView style={GlobalStyle1.mainContainerBgColor}>
          <View>
            <ImageBackground
              source={{
                uri: 'https://aalamsalon.com/wp-content/uploads/2015/10/Dallas-Hair-salon-Best-Plano-Hair-Salon-Best-Frisco-Hair-Salon-Top-Allen-Hair-salon-Best-McKinney-Addison-TX-DFW-Hair-Colorist-Hair-Stylist-Men-Haircut-Mens-Hair-Cut-Hair-Salons-Best-Salons-A-.jpg',
              }}
              style={GlobalStyle1.store_image}>
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
          <View>
            <ImageBackground
              source={{
                uri: 'https://thumbs.dreamstime.com/b/nail-salon-interior-as-creative-abstract-blur-background-pedicure-armchairs-modern-inside-beauty-studio-white-blue-140835941.jpg',
              }}
              style={GlobalStyle1.storeimage}>
              <Text
                style={[
                  FONTS.h3,
                  {
                    textAlign: 'center',
                    color: COLORS.black,
                  },
                ]}>
                Salon and Message
              </Text>
            </ImageBackground>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginHorizontal: 10,
              marginTop: 10,
              width: '94%',
            }}>
            <View
              style={[
                GlobalStyle1.OfferBOX,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  justifyContent: 'center',
                  backgroundColor: COLORS.white,
                },
              ]}>
              <AntDesign
                name="tags"
                size={18}
                color={COLORS.colorAccent}
                style={{}}
              />
              <View
                style={{
                  marginHorizontal: 5,
                }}
              />
              <Text style={[FONTS.body5, GlobalStyle1.Offertext]}>OFFERS</Text>
            </View>
            <View
              style={[
                GlobalStyle1.OfferBOX,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  justifyContent: 'center',
                  backgroundColor: COLORS.colorAccent,
                },
              ]}>
              <Feather
                name="message-square"
                size={18}
                color={COLORS.white}
                style={{}}
              />
              <View
                style={{
                  marginHorizontal: 5,
                }}
              />
              <Text
                style={[
                  FONTS.body5,
                  GlobalStyle1.Offertext,
                  {
                    color: COLORS.white,
                  },
                ]}>
                REVIEWS
              </Text>
            </View>
            <View
              style={[
                GlobalStyle1.OfferBOX,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  justifyContent: 'center',
                  backgroundColor: COLORS.colorAccent,
                },
              ]}>
              <MaterialCommunityIcons
                name="view-gallery-outline"
                size={18}
                color={COLORS.white}
                style={{}}
              />
              <View
                style={{
                  marginHorizontal: 5,
                }}
              />
              <Text
                style={[
                  FONTS.body5,
                  GlobalStyle1.Offertext,
                  {
                    color: COLORS.white,
                  },
                ]}>
                GALLERY
              </Text>
            </View>
          </View>
          <View style={[GlobalStyle1.StoreBOX]}>
            <Image
              source={{
                uri: 'https://thumbs.dreamstime.com/b/nail-salon-interior-as-creative-abstract-blur-background-pedicure-armchairs-modern-inside-beauty-studio-white-blue-140835941.jpg',
              }}
              style={GlobalStyle1.Storeimages}
            />
            <Text
              style={[
                FONTS.body4,
                {
                  marginStart: 85,
                  color: COLORS.black,
                  marginTop: -55,
                },
              ]}>
              MENS's HAIR CUT - $15
            </Text>
            <Text
              style={[
                FONTS.body5,
                {
                  marginStart: 85,
                  color: COLORS.darkgray,
                  maxWidth: 255,
                },
              ]}>
              THIS IS A DUMMY DEALmen's hair cut..
            </Text>
            <View
              style={[
                GlobalStyle1.price_BOX,
                {
                  marginTop: 10,
                  marginRight: 10,
                },
              ]}>
              <Text style={[FONTS.body5, GlobalStyle1.priceText]}>AU$15.0</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
              marginHorizontal: 15,
              marginBottom: 15,
              backgroundColor: COLORS.white,
            }}>
            <View style={[GlobalStyle1.iconBOX, {}]}>
              <FontAwesome
                name="phone"
                size={18}
                color={COLORS.white}
                style={{
                  marginVertical: 12,
                  alignSelf: 'center',
                }}
              />
            </View>
            <View style={[GlobalStyle1.iconBOX, {}]}>
              <MaterialCommunityIcons
                name="directions"
                size={18}
                color={COLORS.white}
                style={{
                  marginVertical: 10,
                  alignSelf: 'center',
                }}
              />
            </View>
            <View style={[GlobalStyle1.iconBOX, {}]}>
              <FontAwesome
                name="heart-o"
                size={18}
                color={COLORS.white}
                style={{
                  marginVertical: 10,
                  alignSelf: 'center',
                }}
              />
            </View>
          </View>
          <View style={[GlobalStyle1.StoreBOX1]}>
            <Text
              style={[
                FONTS.h5,
                {
                  marginStart: 20,
                  color: COLORS.black,
                  marginTop: 10,
                },
              ]}>
              HAIRSMITH UNISEX SALON
            </Text>
            <Text
              style={[
                FONTS.body5,
                {
                  marginStart: 20,
                  color: COLORS.darkgray,
                },
              ]}>
              HAIR SMITH HAIR AND BEAUTY SALON UNISEX SALON
            </Text>
          </View>
          <View
            style={[
              GlobalStyle1.StoreBOX2,
              {
                flexDirection: 'row',
              },
            ]}>
            <Ionicons
              name="md-location-sharp"
              size={18}
              color={COLORS.colorAccent}
              style={{
                marginTop: 20,
                marginStart: 22,
              }}
            />
            <Text
              style={[
                FONTS.body4,
                {
                  marginStart: 10,
                  color: COLORS.darkgray,
                  marginTop: 15,
                  maxWidth: 270,
                },
              ]}>
              11 Ascot Vale Rd, Flegmington VIC 3031, Australia
            </Text>
          </View>
          <ImageBackground
            source={{
              uri: 'https://png.pngtree.com/background/20221109/original/pngtree-city-map-gps-navigation-with-location-pin-markers-picture-image_1953527.jpg',
            }}
            style={GlobalStyle1.Locationimage}></ImageBackground>
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
    </SafeAreaView>
  );
};

export default StoreDetails;
