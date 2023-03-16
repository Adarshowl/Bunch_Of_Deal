import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/Colors';
export default StyleSheet.create({
  wrapper: {
    height: 45,
    paddingHorizontal: 0,
    marginTop: 5,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  textInput: {
    // flex: 1,
    width: '100%',
    color: COLORS.black,
    backgroundColor: COLORS.white,
    // paddingStart: 8,
    // paddingEnd: 15,
  },
  error: {
    color: COLORS.red,
    paddingTop: 4,
    fontSize: 13,
  },
  label: {
    fontSize: 16,
    color: COLORS.black,
  },
});
