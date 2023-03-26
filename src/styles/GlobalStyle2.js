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
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginTop: 100,
  },
  OtpVerification: {
    alignSelf: 'center',
    color: COLORS.black,
    letterSpacing: 1,
    marginTop: 20,
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
  },
  OtpVerificationText: {
    color: COLORS.black,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 18,
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
  OnBoardingFooter: {
    backgroundColor: COLORS.lightGrey,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipNextText: {
    fontSize: 14,
    paddingVertical: 15,
    paddingHorizontal: 25,
    color: COLORS.black,
  },
  OnBoardingCenter: {
    position: 'absolute',
    right: SIZES.width / 2 - 80,
    left: SIZES.width / 2 - 80,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // basic margin
  allSideMargin5: {
    margin: 5,
  },
  allSideMargin10: {
    margin: 10,
  },
  marginHorizontal5: {
    marginHorizontal: 5,
  },
  marginHorizontal10: {
    marginHorizontal: 10,
  },
  marginVertical5: {
    marginVertical: 5,
  },
  marginVertical10: {
    marginVertical: 10,
  },
  marginHorizontal15: {
    marginHorizontal: 15,
  },
  marginHorizontal15: {
    marginHorizontal: 15,
  },
  marginVertical15: {
    marginVertical: 15,
  },
  marginVertical15: {
    marginVertical: 15,
  },
  // basic padding
  allSidePadding5: {
    margin: 5,
  },
  allSidePadding10: {
    margin: 10,
  },
  paddingHorizontal5: {
    paddingHorizontal: 5,
  },
  paddingHorizontal10: {
    paddingHorizontal: 10,
  },
  paddingVertical5: {
    paddingVertical: 5,
  },
  paddingVertical10: {
    paddingVertical: 10,
  },

  paddingHorizontal15: {
    paddingHorizontal: 15,
  },
  paddingHorizontal15: {
    paddingHorizontal: 15,
  },
  paddingVertical15: {
    paddingVertical: 15,
  },
  paddingVertical15: {
    paddingVertical: 15,
  },

  commonToolbarBG: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundColor,
  },
  homeTabImageStyle: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  InvoiceIcon: {
    height: 132,
    width: 132,
    marginStart: 10,
  },
  headerFooterStyle: {
    height: 56,

    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    elevation: 10,
    flexGrow: 1,
  },
  textStyle: {
    color: COLORS.colorPrimary,

    marginHorizontal: 5,
    fontSize: 19,
  },
  content: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  orderStatus: {
    marginLeft: 10,
    backgroundColor: 'red',
    color: 'white',
    fontSize: 10,
    borderRadius: 8,
    paddingHorizontal: 5,
    alignSelf: 'center',
    paddingVertical: 2,
  },
  orderUpload: {
    marginLeft: 10,
    backgroundColor: 'goldenrod',
    color: 'white',
    fontSize: 10,
    borderRadius: 8,
    paddingHorizontal: 5,
    alignSelf: 'center',
    paddingVertical: 2,
  },
  InvoiceLink: {
    color: COLORS.black,
    marginTop: -20,
    fontSize: 8,
    marginStart: 20,
  },
  InvoiceButton: {
    position: 'relative',
    bottom: 0,
    height: 50,
    width: '100%',
    backgroundColor: COLORS.colorPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerFooterAbout: {
    padding: 10,
    backgroundColor: COLORS.white,

    flexDirection: 'column',
    paddingVertical: 10,

    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
    paddingBottom: 50,
  },
  AboutIcon: {
    height: 200,
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'center',
    marginTop: 40,
  },
  AboutDes: {
    padding: 10,
    flexDirection: 'column',
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    marginBottom: 8,
    marginHorizontal: 4,
    marginTop: 5,
  },
  AboutMail: {
    padding: 10,
    flexDirection: 'column',
    paddingVertical: 15,
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: 4,
  },
  SettingView: {
    padding: 10,
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-between',
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
  },
  settingbox: {
    padding: 10,

    flexDirection: 'column',
    paddingVertical: 15,
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
  },
  content2: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
