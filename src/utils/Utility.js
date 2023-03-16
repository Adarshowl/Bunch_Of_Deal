import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import {Platform, NativeModules} from 'react-native';

export const ShowToastMessage = msg => {
  Toast.showWithGravity(msg + '' || '', Toast.SHORT, Toast.BOTTOM);
};

export const validateFieldNotEmpty = text => {
  return text ? false : true;
};

export const getMacAddress = async () => {
  if (Platform.OS == 'ios') {
    return await DeviceInfo.getUniqueId();
  } else {
    return await DeviceInfo.getMacAddress();
  }
};

const LINKING_ERROR =
  `The package 'react-native-timezone' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ios: "- You have run 'pod install'\n", default: ''}) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Timezone = NativeModules.Timezone
  ? NativeModules.Timezone
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      },
    );

export {Timezone};
