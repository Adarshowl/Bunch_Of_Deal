import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../constants/Colors';
import {FONTS, SIZES} from '../constants/themes';

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
    height: 390,
    backgroundColor: COLORS.colorPrimary,
    alignItems: 'center',
    // resizeMode: 'contain',
    width: '100%',
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
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 13,
  },
  product_amount: {
    height: 57,
    width: '100%',
    backgroundColor: COLORS.colorPromo,
  },
  amount_text: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    color: COLORS.white,
    fontSize: 17,
    fontFamily: 'Montserrat-SemiBold',
  },
  minute: {
    height: 44,
    width: '85%',
    backgroundColor: COLORS.colorCountdownView,
    borderRadius: 2,
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
    marginTop: 5,
    marginStart: 5,
    color: COLORS.colorAccent,
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Light',
    fontSize: 14,
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
    // backgroundColor: COLORS.colorPrimary,
    alignItems: 'center',
    // resizeMode: 'contain',
    width: '100%',
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
    minHeight: 45,
    // width: 110,
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  Offertext: {
    color: COLORS.colorAccent,
    textAlign: 'center',
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
    // height: 90,
    width: '100%',
    backgroundColor: COLORS.white,
    paddingStart: 8,
    flexDirection: 'row',
    paddingVertical: 5,
  },
  Storeimages: {
    height: 60,
    width: 60,
  },
  price_BOX: {
    // height: 20,
    // width: 65,
    backgroundColor: COLORS.colorAccent,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  priceText: {
    color: COLORS.white,
    textAlignVertical: 'center',
  },
  iconBOX: {
    flex: 1,
    margin: 3,
    backgroundColor: COLORS.colorPrimary,
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
    backgroundColor: COLORS.white,
    marginEnd: 10,
    marginStart: 10,
    marginTop: 10,
  },
  StoreBOX2: {
    minHeight: 65,
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
    marginBottom: 10,
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
  content: {
    padding: 5,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    marginVertical: 5,
  },
  images: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  Header: {
    height: 50,
    alignContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
// git command -
/*
 git init
 git remote add origin "repository url"
 1. git status
 2. git add .
 3. git commit -m "type your message"
 4. git push origin main
*/
