import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
  StyleSheet,
  Share,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';
import MapView, {AnimatedRegion, Marker} from 'react-native-maps';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypofrom from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants/Colors';
import {FONTS, SIZES} from '../../constants/themes';
import GlobalStyle from '../../styles/GlobalStyle';
import GlobalStyle1 from '../../styles/GlobalStyle1';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import {images} from '../../constants';
import TopTabBar from './top_tab_nav';
import {requestContactPermission} from '../../utils/RequestUserPermission';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import ApiCall from '../../network/ApiCall';

// import {ShowToastMessage} from '../../../utils/Utility';

const StoreDetails = ({navigation, route}) => {
  const [imageUrl, setImageUrl] = useState(
    'https://cdn.corporatefinanceinstitute.com/assets/products-and-services-1024x1024.jpeg',
  );

  const [catImageUrl, setCatImageUrl] = useState(
    'https://cdn.corporatefinanceinstitute.com/assets/products-and-services-1024x1024.jpeg',
  );
  const [receivedData, setReceivedData] = useState({});
  const [haveContactPermission, setHaveContactPermission] = useState({});

  const triggerCall = () => {
    let m = receivedData?.telephone + '';
    // if (m.includes('+91')) {
    //   m.replace('+91');
    // } else {
    //   m.replace('+91');
    // }

    try {
      Linking.openURL(`tel:${m}`);
    } catch (error) {}
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          receivedData?.name +
          ' - Only on Bunch of Deals \n https://play.google.com/store/apps/details?id=com.bunch.of.deals',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const getStoreList = val => {
    let body = {
      limit: '1',
      store_id: val,
    };

    ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_USER_GET_STORES, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          ShowConsoleLogMessage(JSON.stringify(response?.data));
          let result = Object.values(response.data?.result);
          setReceivedData(result[0]);
          setImageUrl(result[0]?.images['0']['560_560'].url);
          setCatImageUrl(result[0]?.images['0']['560_560'].url);
        } else {
        }
      })
      .catch(err => {
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  useEffect(() => {
    let {item} = route.params;
    console.log(JSON.stringify(item));

    if (item?.id_store == undefined || null) {
      getStoreList(item?.store_id);
    } else {
      if (item?.id_store != undefined || null) {
        if (item?.intentFromNotification) {
          getStoreList(item?.store_id);
        }
      } else {
        setReceivedData(item);
        setImageUrl(item?.images['0']['560_560'].url);
        setCatImageUrl(item?.images['0']['200_200'].url);
      }
    }
  }, []);

  const openMap = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${receivedData?.latitude},${receivedData?.longitude}`;
    const label = receivedData?.name;
    // const label = 'Open Google Map';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  return (
    <SafeAreaView
      style={GlobalStyle1.mainContainerBgColor}
      showsVerticalScrollIndicator={false}>
      <ScrollView>
        <SafeAreaView style={GlobalStyle1.mainContainerBgColor}>
          <View>
            <BunchDealImageLoader
              defaultImg={images.def_logo}
              source={imageUrl + ''}
              styles={GlobalStyle1.store_image}
            />
            <View
              style={[
                GlobalStyle1.price,
                {
                  alignSelf: 'flex-end',
                  // backgroundColor: 'red',
                  // flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: 0,
                },
              ]}>
              <Text
                style={[
                  FONTS.body5,
                  GlobalStyle1.Pricetext,
                  {
                    fontFamily: 'MontSerrat-SemiBold',
                  },
                ]}>
                +100 km
              </Text>
            </View>
          </View>
          <View style={{}}>
            <BunchDealImageLoader
              defaultImg={images.def_logo}
              source={catImageUrl}
              styles={[
                GlobalStyle1.storeimage,
                {
                  opacity: 1,
                },
              ]}
              viewStyle={{
                opacity: 0.2,
              }}
            />
            <Text
              style={[
                {
                  textAlign: 'center',
                  color: COLORS.black,
                  position: 'absolute',
                  // bottom: 0,
                  top: 25,
                  right: 0,
                  left: 0,
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 20,
                },
              ]}>
              {receivedData?.category_name}
            </Text>
          </View>

          <View
            style={{
              marginHorizontal: 8,
              backgroundColor: COLORS.white,
              paddingVertical: 5,
              marginTop: 12,
              minHeight: 350,
            }}>
            <TopTabBar items={receivedData} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
              marginHorizontal: 10,
              marginBottom: 15,
              backgroundColor: COLORS.white,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                // let res = requestContactPermission();
                // ShowConsoleLogMessage(
                //   JSON.stringify(res) + ' Permission granted',
                // );
                // setHaveContactPermission(res);
                // if (haveContactPermission) {
                // }
                triggerCall();
              }}
              style={[GlobalStyle1.iconBOX, {}]}>
              <FontAwesome
                name="phone"
                size={20}
                color={COLORS.white}
                style={{
                  marginVertical: 10,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                openMap();
              }}
              style={[GlobalStyle1.iconBOX, {}]}>
              <MaterialCommunityIcons
                name="directions"
                size={20}
                color={COLORS.white}
                style={{
                  marginVertical: 10,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                ShowToastMessage('Api required');
              }}
              style={[GlobalStyle1.iconBOX, {}]}>
              <FontAwesome
                name="heart-o"
                size={20}
                color={COLORS.white}
                style={{
                  marginVertical: 10,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              GlobalStyle1.StoreBOX1,
              {
                paddingBottom: 10,
                paddingHorizontal: 15,
              },
            ]}>
            <Text
              style={[
                {
                  color: COLORS.black,
                  marginTop: 10,
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 16,
                },
              ]}>
              {receivedData?.name}
            </Text>
            <Text
              style={[
                FONTS.body5,
                {
                  color: 'grey',

                  fontFamily: 'Montserrat-Regular',
                  fontSize: 13,
                },
              ]}>
              {receivedData?.detail}
              {/* n publishing and graphic design,
              Lorem ipsum is a placeholder text commonly used to demonstrate the
              visual form of a document or a typeface */}
            </Text>
          </View>

          <View
            style={[
              GlobalStyle1.StoreBOX2,
              {
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                marginBottom: 15,
              },
            ]}>
            <Ionicons
              name="md-location-sharp"
              size={18}
              color={COLORS.colorAccent}
              style={{}}
            />
            <Text
              style={[
                FONTS.body4,
                {
                  marginStart: 10,
                  color: 'grey',
                  flex: 1,
                },
              ]}>
              {receivedData?.address}
            </Text>
          </View>
          {receivedData?.latitude ? (
            <View style={styles.container}>
              <MapView
                style={styles.mapcontainer}
                showsUserLocation={true}
                showsMyLocationButton={false}
                zoomEnabled={true}
                region={{
                  latitude: parseFloat(receivedData?.latitude) || 0.0,
                  longitude: parseFloat(receivedData?.longitude) || 0.0,
                  latitudeDelta: 0,
                  longitudeDelta: 0,
                }}>
                <Marker.Animated
                  coordinate={{
                    latitude: parseFloat(receivedData?.latitude) || 0.0,
                    longitude: parseFloat(receivedData?.longitude) || 0.0,
                    latitudeDelta: 0,
                    longitudeDelta: 0,
                  }}
                  title={receivedData?.name}
                />
              </MapView>
            </View>
          ) : null}
          <View
            style={{
              padding: 10,
            }}></View>
        </SafeAreaView>
      </ScrollView>

      <LinearGradient
        colors={['#00000090', '#00000090', COLORS.transparent]}
        style={GlobalStyle.offerDetailToolBar}>
        <BunchDealVectorIcon
          title={Ionicons}
          name={'arrow-back'}
          color={COLORS.colorAccent}
          size={25}
          style={{}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            flexGrow: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Entypofrom
            name="share"
            size={22}
            color={COLORS.colorAccent}
            style={{
              marginHorizontal: 15,
            }}
            onPress={() => {
              onShare();
            }}
          />
          <FontAwesome
            name="heart-o"
            size={22}
            color={COLORS.colorAccent}
            style={{
              marginHorizontal: 5,
            }}
          />
        </View>
        {/* </View> */}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default StoreDetails;
const styles = StyleSheet.create({
  container: {
    height: SIZES.width,
    flex: 1,
  },
  mapcontainer: {
    flex: 1,
    width: SIZES.width,
    height: SIZES.height,
  },
});
