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
    // bottom: -150,
    top: 225,
    borderRadius: 6,
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
    marginTop: 20,
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

  offerDetailToolBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    // backgroundColor: 'red',
    padding: 10,
    flexGrow: 1,
  },
});
