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
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
//apple login

// import appleAuth, {
//   AppleAuthCredentialState,
//   AppleAuthRequestOperation,
//   AppleAuthRequestScope,
//   AppleButton,
// } from "@invertase/react-native-apple-authentication";

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

  const [showFilterModal, setShowFilterModal] = useState(false);

  const closeFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  /** fb login start */
  async function fbSignIn() {
    try {
      // Login the User and get his public profile and email id.
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      ShowConsoleLogMessage('fb result -> ' + JSON.stringify(result));

      // If the user cancels the login process, the result will have a
      // isCancelled boolean set to true. We can use that to break out of this function.
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Get the Access Token
      const data = await AccessToken.getCurrentAccessToken();
      ShowConsoleLogMessage('fb data -> ' + JSON.stringify(data));
      // If we don't get the access token, then something has went wrong.
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Use the Access Token to create a facebook credential.
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      ShowConsoleLogMessage(
        'fb facebookCredential -> ' + JSON.stringify(facebookCredential),
      );

      // Use the facebook credential to sign in to the application.
      return auth()
        .signInWithCredential(facebookCredential)
        .then(response => {
          ShowConsoleLogMessage(
            'login fb response -> ' + JSON.stringify(response),
          );
          handleFbLogin(response);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      alert(error);
    }
  }

  const handleFbLogin = response => {
    let googleImage =
      response?.additionalUserInfo?.profile?.picture?.data?.url + '';
    let body = {
      email: response?.additionalUserInfo?.profile?.email,
      name: response?.additionalUserInfo?.profile?.name,
      username: response?.additionalUserInfo?.profile?.name,
      telephone: '',
      social_type: 'Facebook',
      guest_id: '1',
      lng: '1234',
      lat: '123',
      mac_adr: '02.00:00:00:00',
      images: response?.additionalUserInfo?.profile?.picture?.data?.url,
      password: '',
    };

    console.log('response -> ' + JSON.stringify(body));

    ApiCall('post', body, API_END_POINTS.API_FACEBOOK_SIGNUP, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        console.log(JSON.stringify(response), 'google ');

        if (response?.data?.status == true) {
          ShowToastMessage('Login successful');
          setLoading(false);
          let arr = [];
          arr.push(response?.data?.data);
          for (let i = 0; i < arr.length; i++) {
            // console.log(arr[i]['0']?.images['0']['560_560']?.url);
            AsyncStorage.setItem('userData', JSON.stringify(arr[i]));
            // AsyncStorage.setItem('userPseudo', arr[i]['0']?.username);

            AsyncStorage.setItem(STRING.userEmail, arr[i]?.email);
            if (googleImage != null || '') {
              AsyncStorage.setItem('userImage', googleImage || '');
            }
            // console.log(googleImage + ' imatgwe profile  ');
            uploadImage(arr[i]?.id_user, googleImage);
          }
          // console.log(arr.length);
          // console.log(JSON.stringify(response));
          navigation.navigate('MainContainer');
        } else {
          ShowToastMessage('Login failed');
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /** fb login end */

  const renderFilterModal = () => {
    return (
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        onRequestClose={() => closeFilterModal()}
        style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <View
          style={{
            width: 340,
            height: 150,
            backgroundColor: COLORS.white,
            elevation: 20,

            alignSelf: 'center',
            marginTop: 150,
          }}>
          <View
            style={{
              height: 40,
              backgroundColor: COLORS.colorPrimary,
              // alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={[
                FONTS.body3,
                {
                  color: COLORS.white,
                  marginStart: 10,
                },
              ]}>
              Privacy & Policy
            </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={[
                FONTS.body4,
                {
                  color: COLORS.black,
                  marginTop: 10,
                  paddingHorizontal: 3,
                },
              ]}>
              By using this App you agree to be bound by the Terms_Conditions
              and Privacy_Policy
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginTop: 30,
              marginHorizontal: 5,
            }}>
            <Text
              style={[
                FONTS.body4,
                {color: COLORS.colorPrimary, marginHorizontal: 10},
              ]}>
              DECLINE
            </Text>
            <Text
              onPress={() => {
                closeFilterModal();
              }}
              style={[FONTS.body4, {color: COLORS.colorPrimary}]}>
              ACCEPT
            </Text>
          </View>
        </View>
      </Modal>
    );
  };

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
        login: email.replace(/ /g, ''),
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
          console.log(JSON.stringify(body));

          if (response?.data?.success == 1) {
            ShowToastMessage('Login successful');
            setLoading(false);
            let arr = [];
            arr.push(response?.data?.result);
            try {
              for (let i = 0; i < arr.length; i++) {
                // console.log(arr[i]['0']?.images['0']['560_560']?.url);
                AsyncStorage.setItem('userData', JSON.stringify(arr[i]['0']));

                AsyncStorage.setItem(STRING.userEmail, arr[i]['0']?.email);
                if (arr[i]['0']?.images != null || undefined) {
                  AsyncStorage.setItem(
                    'userImage',
                    arr[i]['0']?.images['0']['560_560']?.url || '',
                  );
                }
              }
              // console.log(arr.length);
              // console.log(JSON.stringify(response));
              // closeFilterModal();

              navigation.replace('MainContainer');
            } catch (error) {
              AsyncStorage.setItem('userData', JSON.stringify(arr[0]['0']));
              AsyncStorage.setItem(STRING.userEmail, arr[0]['0']?.email);
              navigation.replace('MainContainer');
            }
          } else {
            ShowToastMessage(response?.data?.errors?.connect2);
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

  const onAppleButtonPress = async () => {
    try {
      // Make a request to apple.
      // const appleAuthRequestResponse = await appleAuth.performRequest({
      //requestedOperation: AppleAuthRequestOperation.LOGIN,
      //   requestedScopes: [
      //      AppleAuthRequestScope.EMAIL,
      //      AppleAuthRequestScope.FULL_NAME,
      //    ],
      //   });
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: 1,
        requestedScopes: [0, 1],
      });

      // Get the credential for the user.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // If the Auth is authorized, we call our API and pass the authorization code.
      //    if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
      if (credentialState === 1) {
        console.log(
          'apple login -> ',
          appleAuthRequestResponse.authorizationCode,
        );

        // Axios.post("http://172.20.10.9:3000/auth/apple", {
        // token: appleAuthRequestResponse.authorizationCode,
        //  }).then((res) => {
        //   if (res?.data?.user) {
        ////     Alert.alert('Number of connections: ' + res.data.user.nbOfConnections.toString());
        // }
        // });
      }
    } catch (error) {
      ShowConsoleLogMessage('error in aple login -> ' + error);
    }
  };

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

  const uploadImage = (val, image) => {
    setLoading(true);
    let body = {
      image: image,
      int_id: val,
      module_id: val,
      type: 'user',
      module: 'user',
    };
    ShowConsoleLogMessage(
      'upload image3 bidty requresr =-> logou karke run karo ' +
        JSON.stringify(body),
    );
    ApiCall('post', body, API_END_POINTS.API_USER_UPLOAD64, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // ShowConsoleLogMessage(response);
        if (response?.data?.status == true) {
        } else {
        }
      })
      .catch(error => {
        console.log(error, 'eroor------------>');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <KeyboardAwareScrollView style={GlobalStyle.mainContainerBgColor}>
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
      <Ionicons
        onPress={() => {
          navigation.goBack();
        }}
        marginStart={10}
        color={COLORS.black}
        name="ios-arrow-back-sharp"
        size={25}
        style={{
          position: 'absolute',
          top: 10,
          left: 2,
          backgroundColor: COLORS.white,
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 50,
        }}
      />
      <BunchDealProgressBar loading={loading} />
      <View
        style={[
          GlobalStyle.loginCard,
          {
            position: 'relative',
            bottom: 100,
          },
        ]}>
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
          // keyBoardType=""
          style={FONTS.body3}
          value={password}
          secureTextEntry={true}
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
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 15,
          }}>
          {/* <AppleButton 
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          height:45,
          width:"80%"

        }}
        onPress={()=>onAppleButtonPress()}
        /> */}

          <TouchableOpacity
            style={{
              height: 45,
              width: '80%',
              // top: 5,
              // backgroundColor: COLORS.red,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}
            onPress={() => {
              fbSignIn();
            }}>
            {/* <Text style={[FONTS.h6, {color: COLORS.white}]}>Google +</Text>*/}
            <Image
              source={images.fb_logo}
              style={{
                width: '100%',

                flex: 1,
                resizeMode: 'cover',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 45,
              width: '80%',
              // top: 5,
              // backgroundColor: COLORS.red,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}
            onPress={() => {
              onGoogleButtonPress()
                .then(response => {
                  let googleImage =
                    response?.additionalUserInfo?.profile?.picture + '';
                  let body = {
                    email: response?.additionalUserInfo?.profile?.email,
                    name: response?.additionalUserInfo?.profile?.name,
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

                  ApiCall('post', body, API_END_POINTS.API_GOOGLE_SIGNUP, {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                  })
                    .then(response => {
                      console.log(JSON.stringify(response), 'google ');

                      if (response?.data?.status == true) {
                        ShowToastMessage('Login successful');
                        setLoading(false);
                        let arr = [];
                        arr.push(response?.data?.data);
                        for (let i = 0; i < arr.length; i++) {
                          // console.log(arr[i]['0']?.images['0']['560_560']?.url);
                          AsyncStorage.setItem(
                            'userData',
                            JSON.stringify(arr[i]),
                          );
                          // AsyncStorage.setItem('userPseudo', arr[i]['0']?.username);

                          AsyncStorage.setItem(STRING.userEmail, arr[i]?.email);
                          if (googleImage != null || '') {
                            AsyncStorage.setItem(
                              'userImage',
                              googleImage || '',
                            );
                          }
                          // console.log(googleImage + ' imatgwe profile  ');
                          uploadImage(arr[i]?.id_user, googleImage);
                        }
                        // console.log(arr.length);
                        // console.log(JSON.stringify(response));

                        navigation.navigate('MainContainer');
                      } else {
                        ShowToastMessage('Login failed');
                        setLoading(false);
                      }
                    })
                    .catch(() => {
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
            {/* <Text style={[FONTS.h6, {color: COLORS.white}]}>Google +</Text>*/}
            <Image
              source={images.google_btn}
              style={{
                width: '100%',

                flex: 1,
                resizeMode: 'cover',
              }}
            />
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
      {renderFilterModal()}
    </KeyboardAwareScrollView>
  );
};

export default Login;
