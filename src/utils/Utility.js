import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import {Platform, NativeModules} from 'react-native';
import moment from 'moment';

export const ShowToastMessage = msg => {
  Toast.showWithGravity(msg + '' || '', Toast.SHORT, Toast.BOTTOM);
};

export const ShowConsoleLogMessage = msg => {
  console.log(msg, '');
};

export const validateFieldNotEmpty = text => {
  return text ? false : true;
};

export const validateEmail = text => {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    console.log('Email is Not Correct');
    return false;
  } else {
    console.log('Email is Correct');
    return true;
  }
};

export const getMacAddress = async () => {
  if (Platform.OS == 'ios') {
    return await DeviceInfo.getUniqueId().toString();
  } else {
    return await DeviceInfo.getMacAddress().toString();
  }
};

export const getDateDiff = date => {
  try {
    let newData = moment(date).format('yyyy-MM-DD HH:mm:ss');
    // ShowConsoleLogMessage(newData + ' new data');
    let d1 = new Date(newData).getTime();
    // ShowConsoleLogMessage(d1 + ' d1 new data');
    //
    let d2 = new Date().getTime();
    // ShowConsoleLogMessage(d2 + ' d2 new data');

    // let d3 = d2 - d1;
    let d3 = d1 - d2;

    // ShowConsoleLogMessage(d3 + ' d3 new data');
    //
    let seconds = d3 / 1000;

    // ShowConsoleLogMessage(seconds + ' seconds new data');

    if (seconds > 0) {
      return seconds;
    } else {
      return seconds;
      // return seconds * -1;
    }
  } catch (err) {
    console.log(err);
  }
};

const LINKING_ERROR =
  `The package 'react-native-timezone' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ios: "- You have run 'pod install'\n", default: ''}) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

//const Timezone = NativeModules.Timezone
//? NativeModules.Timezone
 // : new Proxy(
   //   {},
   //   {
   //     get() {
   //       throw new Error(LINKING_ERROR);
   //     },
   //   },
   // );

//export {Timezone};
