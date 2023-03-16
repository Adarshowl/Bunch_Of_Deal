import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../constants/Colors';
import {SIZES} from '../constants/themes';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.colorPrimary,
  },
  mainContainerBgColor: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  mainContainerBgRedColor: {
    flex: 1,
    backgroundColor: COLORS.red,
  },
  mainContainerwhiteColor: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  nav_bg_image: {
    width: '100%',
    height: '100%',
    tintColor: COLORS.lightGrey,
  },
  nav_bg: {
    height: 300,
    backgroundColor: COLORS.colorPrimary,
    alignItems: 'center',
  },
  loginAppIcon: {
    height: 132,
    width: 132,
    position: 'absolute',
    top: 30,
  },
  loginCard: {
    position: 'absolute',
    width: '77%',
    backgroundColor: COLORS.white,
    paddingTop: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
    top: 225,
    borderRadius: 6,
  },
  ForgotCard: {
    position: 'absolute',
    width: '90%',
    backgroundColor: COLORS.white,
    paddingTop: 15,
    paddingHorizontal: 10,
    alignSelf: 'center',
    top: 180,
    borderRadius: 6,
    elevation: 3,
  },
  primaryColorText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: COLORS.white,
    marginTop: 12,
    color: COLORS.colorAccent,
  },
  primaryColorTextUnderline: {
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: COLORS.white,
    marginTop: 5,
    color: COLORS.colorAccent,
    textDecorationLine: 'underline',
  },
  profile_placeholder: {
    width: 75,
    height: 75,
    borderRadius: 60,
  },
  pickPhotoBg: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  forgetAppIcon: {
    height: 132,
    width: 132,
    position: 'absolute',
    top: 10,
    left: 120,
  },
  facebookIcon: {
    height: 30,
    width: 90,
    top: 5,
  },
  Header: {
    height: 56,
    width: '100%',
    backgroundColor: COLORS.white,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  otpAppIcon: {
    height: 100,
    width: 100,
    position: 'absolute',
    top: 50,
    left: 120,
  },
  OtpVerification: {
    position: 'absolute',
    alignSelf: 'center',
    color: COLORS.black,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  OtpVerificationText: {
    color: COLORS.black,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  emailText: {
    color: COLORS.black,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 75,
  },
  TextStyle: {
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    padding: 10,
    height: 55,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  greyColorTextUnderline: {
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: COLORS.white,
    marginTop: 5,
    color: COLORS.grey,
    textDecorationLine: 'underline',
  },
  Product_image: {
    height: 350,
    backgroundColor: COLORS.colorPrimary,
    alignItems: 'center',
    resizeMode: 'contain',
  },
  price: {
    height: 40,
    width: 80,
    backgroundColor: COLORS.colorAccent,
    borderWidth: 1,
    borderColor: COLORS.colorAccent,
  },
  Pricetext: {
    color: COLORS.white,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  product_amount: {
    height: 50,
    width: '100%',
    backgroundColor: COLORS.crimson,
  },
  amount_text: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    color: COLORS.white,
  },
  minute: {
    height: 38,
    width: '85%',
    backgroundColor: COLORS.goldenrod,
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  minutetext: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    color: COLORS.white,
  },
  accentColorTextUnderline: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 0,
    marginStart: 5,
    color: COLORS.colorAccent,
    textDecorationLine: 'underline',
  },
  FontICON: {
    height: 56,
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  store_image: {
    height: 300,
    backgroundColor: COLORS.colorPrimary,
    alignItems: 'center',
    resizeMode: 'contain',
  },
  Fonticon: {
    height: 56,
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeimage: {
    height: 60,
    width: '97%',
    marginStart: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  storeprice: {
    height: 40,
    width: 80,
    backgroundColor: COLORS.colorAccent,
    borderWidth: 1,
    borderColor: COLORS.colorAccent,
  },
  storetext: {
    color: COLORS.white,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  OfferBOX: {
    height: 45,
    width: 110,
    backgroundColor: COLORS.white,
  },
  Offertext: {
    color: COLORS.colorAccent,
    textAlign: 'center',
    marginTop: 12,
    marginStart: 15,
  },
  ReviewsBox: {
    height: 45,
    width: 110,
    backgroundColor: COLORS.colorAccent,
  },
  Reviewstext: {
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 12,
    marginStart: 20,
  },
  GalleryBOX: {
    height: 45,
    width: 120,
    backgroundColor: COLORS.colorAccent,
    alignSelf: 'flex-end',
  },
  Gallerytext: {
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 12,
    marginStart: 20,
  },
  StoreBOX: {
    height: 90,
    width: '94%',
    backgroundColor: COLORS.white,
    marginStart: 10,
  },
  Storeimages: {
    height: 60,
    width: 55,
    marginStart: 20,
    marginTop: 10,
  },
  price_BOX: {
    height: 20,
    width: 65,
    backgroundColor: COLORS.colorAccent,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  priceText: {
    color: COLORS.white,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  iconBOX: {
    height: 40,
    width: 110,
    backgroundColor: COLORS.colorAccent,
    borderRadius: 5,
  },
  iconBOX1: {
    height: 40,
    width: 110,
    backgroundColor: COLORS.colorAccent,
    borderRadius: 5,
  },
  iconBOX2: {
    height: 40,
    width: 110,
    backgroundColor: COLORS.colorAccent,
    borderRadius: 5,
    alignItems: 'flex-end',
  },
  StoreBOX1: {
    height: 70,
    width: '94%',
    backgroundColor: COLORS.white,
    marginStart: 10,
    marginTop: 10,
  },
  StoreBOX2: {
    height: 65,
    width: '94%',
    backgroundColor: COLORS.white,
    marginStart: 10,
    marginTop: 10,
  },
  Locationimage: {
    height: 300,
    width: '97%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    // marginStart: 10,
    marginStart: 10,
  },
  Locationimage1: {
    height: 300,
    width: '97%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    // marginStart: 10,
    marginStart: 10,
  },
});
// git command
/**
 * 
 1. git add .
 2. git commit -m "type your message"
 3. git push origin main
  */
