import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  default as Entypo,
  default as Entypofrom,
} from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import {STRING} from '../../constants/String';
import {FONTS, SIZES} from '../../constants/themes';
import GlobalStyle from '../../styles/GlobalStyle';
import GlobalStyle1 from '../../styles/GlobalStyle1';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';
// import CountDown from 'react-native-countdown-component';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import {images} from '../../constants';

const OfferDetails = ({navigation, route}) => {
  const [intentCause, setIntentCause] = useState(false);
  const [fav, setFav] = useState(false);

  const [receivedData, setReceivedData] = useState({});

  const [count, setCount] = useState(1);

  const onOrderClick = () => {
    // navigation.navigate('Order');
    // if (STRING.IS_LOGGED_IN == true) {

    closeQtyModal();
    // if (parseInt(receivedData?.qty_enabled) == 1) {
    //   console.log('show dialog with');
    // } else {
    //   navigation.navigate('Order', {
    //     item: receivedData,
    //   });
    // }

    // } else {
    //   navigation.replace('Auth');
    // }
  };

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    let {item} = route.params;
    // console.log(JSON.stringify(item));
    setImageUrl(item?.images['0']['560_560'].url);
    setReceivedData(item);
  }, []);

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
                    {receivedData?.currency?.symbol +
                      '' +
                      receivedData?.offer_value}
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
                    });
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
          <View
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
          </View>

          {/* <CountDown
            digitStyle={{
              backgroundColor: COLORS.colorCountdownView,
            }}
            until={10 * 60 * 60 * 60}
            onFinish={() => alert('finished')}
            onPress={() => alert('hello')}
            size={20}
          /> */}
          <View
            style={{
              marginHorizontal: 10,
              paddingBottom: 15,
              marginTop: 45,
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
                  color: COLORS.darkgray,
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
              onPress={() => {}}
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
      {renderQtyModal()}
    </SafeAreaView>
  );
};

export default OfferDetails;
