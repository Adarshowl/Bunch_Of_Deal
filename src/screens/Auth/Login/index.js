// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, {useState} from 'react';
// import {Image, SafeAreaView, Text, View} from 'react-native';
// import {COLORS} from '../../../constants/Colors';
// import images from '../../../constants/images';
// import {STRING} from '../../../constants/String';
// import {FONTS} from '../../../constants/themes';
// import ApiCall from '../../../network/ApiCall';
// import {API_END_POINTS} from '../../../network/ApiEndPoints';
// import GlobalStyle from '../../../styles/GlobalStyle';
// import BunchDealCommonBtn from '../../../utils/BunchDealCommonBtn';
// import BunchDealProgressBar from '../../../utils/BunchDealProgressBar';
// import BunchDealEditText from '../../../utils/EditText/BunchDealEditText';
// import {ShowToastMessage, validateFieldNotEmpty} from '../../../utils/Utility';
// // import {ShowToastMessage} from '../../../utils/Utility';

// const Login = ({navigation}) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const [loading, setLoading] = useState(false);

//   const onLoginClick = () => {
//     navigation.replace('MainContainer');
//   };

//   // const onLoginClick = () => {
//   //   if (validateFieldNotEmpty(email)) {
//   //     ShowToastMessage('Email is required');
//   //   } else if (validateFieldNotEmpty(password)) {
//   //     ShowToastMessage('Password is required');
//   //   } else {
//   //     setLoading(true);
//   //     let body = {
//   //       login: email,
//   //       password: password,
//   //       social_type: 'Normal',
//   //     };
//   //     const params = new FormData();
//   //     params.append('login', email);
//   //     params.append('password', password);
//   //     params.append('social_type', 'Normal');
//   //     console.log(JSON.stringify(body));
//   //     ApiCall('post', body, API_END_POINTS.signin, {
//   //       Accept: 'application/json',
//   //       'Content-Type': 'multipart/form-data',
//   //     })
//   //       .then(response => {
//   //         console.log(response?.data);
//   //         if (response?.data?.success == 1) {
//   //           ShowToastMessage('Login successful');
//   //           setLoading(false);
//   //           AsyncStorage.setItem(STRING.userEmail, email);
//   //           navigation.replace('MainContainer');
//   //         } else {
//   //           ShowToastMessage('Login failed');
//   //           setLoading(false);
//   //         }
//   //       })
//   //       .catch(() => {
//   //         ShowToastMessage('Something went wrong.');
//   //         setLoading(false);
//   //       })
//   //       .finally(() => {
//   //         setLoading(false);
//   //       });
//   //   }
//   // };

//   const onCreateAccountClick = () => {
//     navigation.navigate('SignUp');
//   };

//   return (
//     <SafeAreaView style={GlobalStyle.mainContainerBgColor}>
//       <View style={GlobalStyle.nav_bg}>
//         <Image
//           source={images.navigation_icon_bg}
//           style={GlobalStyle.nav_bg_image}
//         />
//         <Image
//           source={images.splash_new_beta}
//           style={GlobalStyle.loginAppIcon}
//         />
//       </View>
//       <BunchDealProgressBar loading={loading} />
//       <View style={GlobalStyle.loginCard}>
//         <BunchDealEditText
//           borderBottomWidth={1}
//           placeholder={STRING.email_username}
//           style={FONTS.body3}
//           value={email}
//           onChangeText={val => {
//             setEmail(val);
//           }}
//         />
//         <BunchDealEditText
//           borderBottomWidth={1}
//           placeholder={STRING.password}
//           style={FONTS.body3}
//           value={password}
//           onChangeText={val => {
//             setPassword(val);
//           }}
//         />
//         <BunchDealCommonBtn
//           height={40}
//           backgroundColor={COLORS.colorAccent}
//           marginHorizontal={5}
//           text={STRING.log_in}
//           textStyle={FONTS.body3}
//           textColor={COLORS.white}
//           onPress={onLoginClick}
//           marginTop={20}
//           borderRadius={1}
//           textSize={18}
//         />
//         <View
//           style={{
//             marginTop: 20,
//           }}
//         />
//         <Text style={[FONTS.h6, GlobalStyle.primaryColorTextUnderline]}>
//           {STRING.forgot_password}
//         </Text>
//         <Text style={[FONTS.h6, GlobalStyle.primaryColorText]}>
//           {STRING.or}
//         </Text>
//         <BunchDealCommonBtn
//           height={40}
//           backgroundColor={COLORS.colorAccent}
//           marginHorizontal={5}
//           text={STRING.create_an_account}
//           textStyle={FONTS.body5}
//           textColor={COLORS.white}
//           onPress={onCreateAccountClick}
//           marginTop={13}
//           borderRadius={1}
//           textSize={14}
//         />
//         <View
//           style={{
//             paddingBottom: 20,
//           }}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Login;

//// code merged
import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../constants/Colors';
import images from '../../../constants/images';
import {STRING} from '../../../constants/String';
import {FONTS} from '../../../constants/themes';
import ApiCall from '../../../network/ApiCall';
import {API_END_POINTS} from '../../../network/ApiEndPoints';
import GlobalStyle from '../../../styles/GlobalStyle';
import BunchDealCommonBtn from '../../../utils/BunchDealCommonBtn';
import BunchDealProgressBar from '../../../utils/BunchDealProgressBar';
import BunchDealEditText from '../../../utils/EditText/BunchDealEditText';
import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  validateFieldNotEmpty,
} from '../../../utils/Utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
// import {LoginButton, AccessToken} from 'react-native-fbsdk';
GoogleSignin.configure({
  webClientId:
    '719363581249-bkjvh6ll5663rdvk2f43fu7n2msnopio.apps.googleusercontent.com',
});

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('');

  const [loading, setLoading] = useState(false);

  const onPress = () => {
    onLoginClick();
    // navigation.navigate('About');
  };

  const onLoginClick = () => {
    if (validateFieldNotEmpty(email)) {
      ShowToastMessage('Email is required');
    } else if (validateFieldNotEmpty(password)) {
      ShowToastMessage('Password is required');
    } else {
      setLoading(true);
      let body = {
        login: email,
        password: password,
        social_type: 'Normal',
        guest_id: '1',
        lng: '1234',
        lat: '123',
        mac_adr: '02.00:00:00:00',
      };
      ShowConsoleLogMessage(API_END_POINTS.signin);
      ApiCall('post', body, API_END_POINTS.signin, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      })
        .then(response => {
          console.log(JSON.stringify(response));

          if (response?.data?.success == 1) {
            ShowToastMessage('Login successful');
            setLoading(false);
            let arr = [];
            arr.push(response?.data?.result);
            for (let i = 0; i < arr.length; i++) {
              // console.log(arr[i]['0']?.images['0']['560_560']?.url);
              AsyncStorage.setItem('userData', JSON.stringify(arr[i]['0']));
              // AsyncStorage.setItem('userPseudo', arr[i]['0']?.username);

              AsyncStorage.setItem(STRING.userEmail, arr[i]['0']?.email);
              if (arr[i]['0']?.images != null || undefined) {
                AsyncStorage.setItem(
                  'userImage',
                  arr[i]['0']?.images['0']['560_560']?.url || '',
                );
              }
            }
            console.log(arr.length);
            console.log(JSON.stringify(response));

            navigation.navigate('MainContainer');
          } else {
            ShowToastMessage('Login failed');
            setLoading(false);
          }
        })
        .catch(error => {
          ShowConsoleLogMessage('Something went wrong.' + error);
          ShowToastMessage('Something went wrong.' + error);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const fblogin = resCallback => {
    LoginManager.logOut();
    return LoginManager.logInWithPermissions(['email', 'public_profile']).then(
      result => {
        console.log('fb result', result);
        if (
          result.declinedPermissions &&
          result.declinedPermissions.includes('email')
        ) {
          resCallback({message: 'Email is required'});
        } else {
          const infoRequest = new GraphRequest(
            '/me?fileds=email,name,picture,friend',
            null,
            resCallback,
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      function (error) {
        console.log('login fail with error:' + error);
      },
    );
  };

  // const onFbLogin = async () => {
  //   try {
  //     await fblogin(_responseInfoCallBack);
  //   } catch (error) {
  //     console.log('error raised', error);
  //   }
  // };

  // const _responseInfoCallBack = async (error, result) => {
  //   if (error) {
  //     console.log('error top', error);
  //     return;
  //   } else {
  //     const userData = result;
  //     console.log('fb data++++', userData);
  //   }
  // };

  const onCreateAccountClick = () => {
    navigation.navigate('SignUp');
  };

  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    console.log(JSON.stringify(idToken), ' <  id Token');
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    console.log(JSON.stringify(googleCredential), ' <  google credential');
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <SafeAreaView style={GlobalStyle.mainContainerBgColor}>
      <View style={GlobalStyle.nav_bg}>
        <Image
          source={images.navigation_icon_bg}
          style={GlobalStyle.nav_bg_image}
        />
        <Image
          source={images.splash_new_beta}
          style={GlobalStyle.loginAppIcon}
        />
      </View>
      <BunchDealProgressBar loading={loading} />
      <View style={GlobalStyle.loginCard}>
        <BunchDealEditText
          borderBottomWidth={1}
          placeholder={STRING.email_username}
          style={FONTS.body3}
          value={email}
          onChangeText={val => {
            setEmail(val);
          }}
        />
        <BunchDealEditText
          borderBottomWidth={1}
          placeholder={STRING.password}
          keyBoardType="number-pad"
          style={FONTS.body3}
          value={password}
          onChangeText={val => {
            setPassword(val);
          }}
        />
        <BunchDealCommonBtn
          height={40}
          backgroundColor={COLORS.colorAccent}
          marginHorizontal={5}
          text={STRING.log_in}
          textStyle={FONTS.body3}
          textColor={COLORS.white}
          onPress={onPress}
          marginTop={20}
          borderRadius={1}
          textSize={18}
        />
        <Text style={[FONTS.h7, GlobalStyle.greyColorTextUnderline]}>
          {STRING.also_login}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {/* <Image
            style={GlobalStyle.facebookIcon}
            source={{
              uri: 'https://neilpatel.com/wp-content/uploads/2019/06/facebook.png',
            }}
          /> */}
          <TouchableOpacity
            style={{
              height: 30,
              width: 90,
              top: 5,
              backgroundColor: 'royalblue',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            // onPress={onFbLogin}
          >
            <Text style={[FONTS.h6, {color: COLORS.white}]}>facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 30,
              width: 90,
              top: 5,
              backgroundColor: COLORS.red,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              onGoogleButtonPress()
                .then(response => {
                  let body = {
                    email: response?.additionalUserInfo?.profile?.email,
                    username: response?.additionalUserInfo?.profile?.name,
                    telephone: response?.additionalUserInfo?.providerData?.name,
                    social_type: 'Google',
                    guest_id: '1',
                    lng: '1234',
                    lat: '123',
                    mac_adr: '02.00:00:00:00',
                    images: response?.additionalUserInfo?.profile?.picture,
                  };
                  console.log('response -> ' + JSON.stringify(body));

                  ApiCall('post', body, API_END_POINTS.GOOGLE_LOGIN, {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                  })
                    .then(response => {
                      console.log(JSON.stringify(response));

                      if (response?.data?.success == 1) {
                        ShowToastMessage('Login successful');

                        setLoading(false);

                        let arr = [];
                        arr.push(response?.data?.result);
                        console.log(JSON.stringify(arr));
                        for (let i = 0; i < arr.length; i++) {
                          console.log(arr[i]['0']);
                          AsyncStorage.setItem(
                            'userData',
                            JSON.stringify(arr[i]['0']),
                          );
                        }
                        console.log(arr.length);
                        console.log(JSON.stringify(response));

                        navigation.navigate('Profile');
                      } else {
                        ShowToastMessage('Login failed');
                        setLoading(false);
                      }
                    })
                    .catch(() => {
                      ShowToastMessage('Something went wrong.');
                      setLoading(false);
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                })

                .catch(error => {
                  console.log('response -> ' + JSON.stringify(error));
                });
            }}>
            <Text style={[FONTS.h6, {color: COLORS.white}]}>Google +</Text>
          </TouchableOpacity>

          {/* <GoogleSigninButton
            style={{width: 150, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={_SignIn}

            // disabled={this.state.isSigninInProgress}
          /> */}
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        />

        <Text
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}
          style={[FONTS.h6, GlobalStyle.primaryColorTextUnderline]}>
          {STRING.forgot_password}
        </Text>
        <Text
          onPress={() => {
            navigation.navigate('Profile');
          }}
          style={[FONTS.h6, GlobalStyle.primaryColorText]}>
          {STRING.or}
        </Text>

        <BunchDealCommonBtn
          height={40}
          backgroundColor={COLORS.colorAccent}
          marginHorizontal={5}
          text={STRING.create_an_account}
          textStyle={FONTS.body5}
          textColor={COLORS.white}
          onPress={onCreateAccountClick}
          marginTop={10}
          borderRadius={1}
          textSize={14}
        />
        <View
          style={{
            paddingBottom: 20,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
