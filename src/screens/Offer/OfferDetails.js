import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Share,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  default as Entypo,
  default as Entypofrom,
} from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import {STRING} from '../../constants/String';
import {FONTS, SIZES} from '../../constants/themes';
import GlobalStyle from '../../styles/GlobalStyle';
import GlobalStyle1 from '../../styles/GlobalStyle1';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';
import CountDown from 'react-native-countdown-component';
import {images} from '../../constants';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import {ShowConsoleLogMessage, ShowToastMessage} from '../../utils/Utility';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import ApiCall from '../../network/ApiCall';
const OfferDetails = ({navigation, route}) => {
  const isFocused = useIsFocused();

  const [intentCause, setIntentCause] = useState(false);
  const [fav, setFav] = useState(false);

  const [receivedData, setReceivedData] = useState({});

  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);

  const onOrderClick = () => {
    if (parseInt(receivedData?.qty_enabled) > 0) {
      closeQtyModal();
    } else {
      navigation.navigate('Order', {
        item: receivedData,
        count: count,
        price: price,
      });
    }
  };

  useEffect(() => {
    setCount(1);
    setOriginalPrice(receivedData?.offer_value || 0);
    setPrice(receivedData?.offer_value || 0);
  }, [isFocused]);

  const [imageUrl, setImageUrl] = useState('');

  const [counterTime, setCounterTime] = useState(0);
  let t = 0;
  useEffect(() => {
    let {item} = route.params;
    // console.log(JSON.stringify(item));

    if (item?.id_offer == undefined || null) {
      getSearchOfferList(item?.id_offer);
    } else {
      if (item?.id_offer != undefined || null) {
        if (item?.intentFromNotification) {
          getSearchOfferList(item?.id_offer);
        }
      } else {
        setImageUrl(item?.images['0']['560_560'].url);
        setReceivedData(item);
        setPrice(item?.offer_value + '');
        setOriginalPrice(item?.offer_value);

        let date_start = item?.date_start;
        let newData = moment(date_start).format('yyyy-MM-DD HH:mm:ss');
        let cData = moment().format('yyyy-MM-DD HH:mm:ss');
        let d1 = new Date(newData).getTime();
        let d2 = new Date(cData).getTime();
        let d3 = d2 - d1;
        let seconds = d3 / 1000;
        t = seconds;
        setCounterTime(seconds);
      }
    }
  }, []);

  const getSearchOfferList = offer_ids => {
    let body = {
      latitude: STRING.CURRENT_LAT + '',
      longitude: STRING.CURRENT_LONG + '',
      order_by: 'recent',
      offer_ids: offer_ids,
      token: STRING.FCM_TOKEN,
      mac_adr: STRING.MAC_ADR,
      limit: '30',
      page: '1',
      search: '',
      category_id: '',
      radius: '',
      date: moment().format('yyyy-MM-dd H:m:s'),
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_GET_OFFERS, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        // ShowConsoleLogMessage('response 0> ' + JSON.stringify(response?.data));

        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
          let result = Object.values(response.data?.result);
          // ShowConsoleLogMessage(JSON.stringify(result));
          setReceivedData(result[0]);
          setImageUrl(result[0]?.images['0']['560_560'].url);

          setPrice(result[0]?.offer_value + '');
          setOriginalPrice(result[0]?.offer_value);

          let date_start = result[0]?.date_start;
          let newData = moment(date_start).format('yyyy-MM-DD HH:mm:ss');
          let cData = moment().format('yyyy-MM-DD HH:mm:ss');
          let d1 = new Date(newData).getTime();
          let d2 = new Date(cData).getTime();
          let d3 = d2 - d1;
          let seconds = d3 / 1000;
          t = seconds;
          setCounterTime(seconds);
        } else {
          setReceivedData({});
        }
      })
      .catch(err => {
        // console.log('eorir < ', err);
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  useEffect(() => {
    setCounterTime(t);
  }, [counterTime]);

  const [showQtyModal, setShowQtyModal] = useState(false);

  const closeQtyModal = () => {
    setShowQtyModal(!showQtyModal);
  };

  const renderQtyModal = () => {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={showQtyModal}
        onRequestClose={() => {
          closeQtyModal();
        }}
        style={{flexGrow: 1}}>
        <View
          style={{
            backgroundColor: '#00000090',
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              closeQtyModal();
            }}
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}></TouchableOpacity>
          <View
            style={{
              maxHeight: SIZES.height * 0.7,
            }}>
            <View
              style={[
                {
                  paddingTop: 10,
                  paddingHorizontal: 10,
                  backgroundColor: '#FFF',
                },
              ]}>
              <View
                style={{
                  borderRadius: 2,
                  backgroundColor: COLORS.white,
                  marginHorizontal: 15,
                  flexDirection: 'row',
                  elevation: 10,
                  marginBottom: 5,
                  marginTop: 5,
                  borderRadius: 3,
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: imageUrl,
                  }}
                  style={{
                    width: 115,
                    height: 115,
                    borderRadius: 3,
                  }}
                />
                <View
                  style={{
                    marginStart: 15,
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: 'Montserrat-Regular',
                      color: COLORS.shimmer_loading_color_darker,
                    }}
                    numberOfLines={2}>
                    {receivedData?.name}
                  </Text>

                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Montserrat-Regular',
                      color: COLORS.colorAccent,
                    }}>
                    {receivedData?.currency?.symbol + '' + price}
                    .0
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 15,
                    }}>
                    <BunchDealVectorIcon
                      title={AntDesign}
                      name={'minus'}
                      color={COLORS.shimmer_loading_color_darker}
                      size={20}
                      style={{
                        marginEnd: 15,
                      }}
                      onPress={() => {
                        if (count > 1) {
                          setCount(prev => prev - 1);
                          let p1 = parseInt(price) - parseInt(originalPrice);
                          setPrice(p1);
                        }
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: 'Montserrat-Regular',
                        color: COLORS.shimmer_loading_color_darker,
                      }}>
                      {count}
                    </Text>

                    <BunchDealVectorIcon
                      title={AntDesign}
                      name={'plus'}
                      color={COLORS.shimmer_loading_color_darker}
                      size={20}
                      style={{
                        marginStart: 15,
                      }}
                      onPress={() => {
                        setCount(prev => prev + 1);
                        let p1 = parseInt(price) + parseInt(originalPrice);
                        setPrice(p1);
                      }}
                    />
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 15,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  flexDirection: 'row',
                }}>
                <Text
                  onPress={() => {
                    closeQtyModal();
                  }}
                  style={{
                    fontSize: 16,
                    fontFamily: 'Montserrat-Regular',
                    color: COLORS.shimmer_loading_color_darker,
                    paddingVertical: 12,
                    paddingHorizontal: 8,
                    borderRadius: 3,
                    marginEnd: 30,
                  }}>
                  CLOSE
                </Text>
                <Text
                  onPress={() => {
                    closeQtyModal();
                    navigation.navigate('Order', {
                      item: receivedData,
                      count: count,
                      price: price,
                    });
                    // ShowToastMessage('Work in progress');
                  }}
                  style={{
                    fontSize: 16,
                    fontFamily: 'Montserrat-Regular',
                    color: COLORS.white,
                    backgroundColor: COLORS.colorPrimary,
                    paddingVertical: 12,
                    paddingHorizontal: 8,
                    borderRadius: 3,
                  }}>
                  CONFIRM
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
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

  return (
    <SafeAreaView
      style={GlobalStyle1.mainContainerBgColor}
      showsVerticalScrollIndicator={false}>
      <ScrollView>
        <SafeAreaView style={GlobalStyle1.mainContainerwhiteColor}>
          <View>
            <BunchDealImageLoader
              defaultImg={images.def_logo}
              source={imageUrl + ''}
              styles={GlobalStyle1.Product_image}
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
          <View
            style={[
              GlobalStyle1.product_amount,
              {
                justifyContent: 'center',
              },
            ]}>
            <Text style={[GlobalStyle1.amount_text]}>
              {receivedData?.currency?.symbol + '' + receivedData?.offer_value}
              .0
            </Text>
          </View>
          <Text
            style={[
              FONTS.h5,
              {
                textAlign: 'center',
                marginTop: 20,
                color: COLORS.black,
                fontFamily: 'Montserrat-SemiBold',
              },
            ]}>
            DEAL ENDS ON
          </Text>
          {/* <View
            style={[
              GlobalStyle1.minute,
              {
                marginTop: 12,
                borderRadius: 5,
              },
            ]}>
            <Text
              style={[
                GlobalStyle1.minutetext,
                {
                  marginTop: 10,
                  padding: 10,
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 18,
                },
              ]}>
              105 : 12 : 10 : 10
            </Text>
          </View> */}

          <View
            style={{
              backgroundColor: '#F4B400',
              marginHorizontal: 30,
              marginTop: 15,
              borderRadius: 3,
            }}>
            <CountDown
              digitStyle={{
                backgroundColor: COLORS.colorCountdownView,
              }}
              until={counterTime}
              // onFinish={() => alert('finished')}
              // onPress={() => alert('hello')}
              size={20}
              showSeparator={true}
              digitTxtStyle={{
                color: 'white',
                fontFamily: 'Montserrat-Medium',
              }}
            />
          </View>
          <View
            style={{
              marginHorizontal: 10,
              paddingBottom: 15,
              marginTop: 25,
            }}>
            <Text
              style={[
                {
                  textAlign: 'center',
                  color: COLORS.black,
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 18,
                },
              ]}>
              {receivedData?.name}
            </Text>
            <Text
              style={[
                FONTS.body4,
                {
                  color: 'grey',
                  marginHorizontal: 15,
                },
              ]}>
              {receivedData?.description?.replace(/<\/?[^>]+(>|$)/g, '\n')}
            </Text>
            <Text
              style={[
                FONTS.h5,
                {
                  textAlign: 'center',
                  marginTop: 40,
                  color: COLORS.black,
                },
              ]}>
              Store Detail
            </Text>
            <TouchableOpacity
              onPress={() => {
                console.log(JSON.stringify(receivedData));
                navigation.navigate('StoreDetails', {item: receivedData});
              }}
              activeOpacity={0.8}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="md-location-sharp"
                size={20}
                color={COLORS.colorAccent}
                style={{
                  marginTop: 5,
                  marginStart: 15,
                }}
              />
              <Text style={[GlobalStyle1.accentColorTextUnderline]}>
                {receivedData?.store_name}
              </Text>
            </TouchableOpacity>
            <Text
              style={[
                FONTS.h5,
                {
                  textAlign: 'center',
                  marginTop: 30,
                  color: COLORS.black,
                  marginBottom: 5,
                },
              ]}>
              Fine Print
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.fine_print_1}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.fine_print_2}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.fine_print_3}
              </Text>
            </View>
            <Text
              style={[
                FONTS.h5,
                {
                  textAlign: 'center',
                  marginTop: 30,
                  color: COLORS.black,
                },
              ]}>
              How to Redeem
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 3,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{
                  marginVertical: -5,
                }}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    fontFamily: 'Montserrat-Regular',
                  },
                ]}>
                {STRING.how_to_red_1}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                  },
                ]}>
                {STRING.how_to_red_2}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.how_to_red_3}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.how_to_red_4}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.how_to_red_5}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.how_to_red_6}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}>
              <Entypo
                name="dot-single"
                size={40}
                color={COLORS.black}
                style={{}}
              />
              <Text
                style={[
                  FONTS.body4,
                  {
                    textAlign: 'left',
                    textAlignVertical: 'center',
                    marginStart: 0,
                    marginEnd: 10,
                    color: COLORS.black,
                    flex: 1,
                  },
                ]}>
                {STRING.how_to_red_7}
              </Text>
            </View>

            <View
              style={{
                padding: 5,
              }}
            />
          </View>
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

      {receivedData?.order_button != null || '' ? (
        <BunchDealCommonBtn
          height={50}
          backgroundColor={COLORS.colorAccent}
          marginHorizontal={0}
          text={receivedData?.order_button?.toUpperCase()}
          textStyle={FONTS.body4}
          onPress={onOrderClick}
          textColor={COLORS.white}
          borderRadius={1}
          textSize={16}
        />
      ) : null}
      {renderQtyModal()}
    </SafeAreaView>
  );
};

export default OfferDetails;
