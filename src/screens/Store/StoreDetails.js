import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {COLORS} from '../../constants/Colors';
import images from '../../constants/images';
import {STRING} from '../../constants/String';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle1 from '../../styles/GlobalStyle1';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import BunchDealProgressBar from '../../utils/BunchDealProgressBar';
import BunchDealEditText from '../../utils/EditText/BunchDealEditText';
import {ShowToastMessage} from '../../utils/Utility';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypofrom from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
                  GlobalStyle1.storeprice,
                  {
                    marginVertical: 205,
                    alignSelf: 'flex-end',
                  },
                ]}>
                <Text style={[FONTS.body5, GlobalStyle1.storetext]}>
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
                  FONTS.h2,
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
            }}>
            <View
              style={[
                GlobalStyle1.OfferBOX,
                {
                  marginTop: 10,
                  marginStart: 10,
                },
              ]}>
              <AntDesign
                name="tags"
                size={18}
                color={COLORS.colorAccent}
                style={{
                  position: 'absolute',
                  marginStart: 15,
                  marginVertical: 12,
                }}
              />
              <Text style={[FONTS.body5, GlobalStyle1.Offertext]}>OFFERS</Text>
            </View>
            <View
              style={[
                GlobalStyle1.ReviewsBox,
                {
                  marginTop: 10,
                },
              ]}>
              <Feather
                name="message-square"
                size={18}
                color={COLORS.white}
                style={{
                  position: 'absolute',
                  marginStart: 15,
                  marginVertical: 12,
                }}
              />
              <Text style={[FONTS.body5, GlobalStyle1.Reviewstext]}>
                REVIEWS
              </Text>
            </View>
            <View
              style={[
                GlobalStyle1.GalleryBOX,
                {
                  marginTop: 10,
                },
              ]}>
              <MaterialCommunityIcons
                name="view-gallery-outline"
                size={18}
                color={COLORS.white}
                style={{
                  position: 'absolute',
                  marginStart: 15,
                  marginVertical: 12,
                }}
              />
              <Text style={[FONTS.body5, GlobalStyle1.Gallerytext]}>
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
            }}>
            <View
              style={[
                GlobalStyle1.iconBOX,
                {
                  marginTop: 10,
                  marginStart: 10,
                },
              ]}>
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
            <View
              style={[
                GlobalStyle1.iconBOX1,
                {
                  marginTop: 10,
                  marginHorizontal: 5,
                },
              ]}>
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
            <View
              style={[
                GlobalStyle1.iconBOX2,
                {
                  marginTop: 10,
                },
              ]}>
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
    </SafeAreaView>
  );
};

export default StoreDetails;
