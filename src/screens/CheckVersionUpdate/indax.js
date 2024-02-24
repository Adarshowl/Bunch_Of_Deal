import React, {useEffect, useState} from 'react';
import {Alert, View, Text, Button, Linking} from 'react-native';
import VersionNumber from 'react-native-version-number';
import VersionCheck from 'react-native-version-check';

const UpdateNotification = () => {
  const [isUpdateAvailable, setUpdateAvailable] = useState(false);

  // VersionCheck.getCountry().then(country => console.log(country)); // KR
  // console.log(VersionCheck.getPackageName()); // com.reactnative.app
  // console.log(VersionCheck.getCurrentBuildNumber()); // 10
  // console.log(VersionCheck.getCurrentVersion());

  // VersionCheck.getLatestVersion().then(latestVersion => {
  //   console.log(latestVersion); // 0.1.2
  // });

  // VersionCheck.getLatestVersion({
  //   provider: 'appStore', // for iOS
  // }).then(latestVersion => {
  //   console.log(latestVersion); // 0.1.2
  // });

  // VersionCheck.needUpdate().then(async res => {
  //   console.log('resssss ==== ', res.isNeeded); // true
  //   if (res.isNeeded) {
  //     setUpdateAvailable(res.isNeeded);
  //     // Linking.openURL(res.storeUrl); // open store if update is needed.
  //   }
  // });

  useEffect(() => {
    const checkUpdate = async () => {
      const res = await VersionCheck.needUpdate();
      console.log('resssss ==== ', res.isNeeded); // true
      if (res.isNeeded) {
        setUpdateAvailable(res.isNeeded);
      }
    };

    checkUpdate();
  }, []);

  // const handleUpdatePress = () => {
  //   Alert.alert(
  //     'New version available',
  //     'There are new features avaiable, Please update your app',
  //   );
  // };

  if (isUpdateAvailable) {
    return Alert.alert(
      'New version available',
      'There are new features avaiable, Please update your app',
      [
        {
          text: 'No thanks',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Update',
          onPress: () => {
            VersionCheck.needUpdate().then(async res => {
              Linking.openURL(res.storeUrl);
            });
          },
        },
      ],
      {cancelable: false},
    );
  }

  return null;
};

export default UpdateNotification;
