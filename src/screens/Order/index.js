import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import GlobalStyle from '../../styles/GlobalStyle';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import {STRING} from '../../constants';
import {FONTS} from '../../constants/themes';
import {COLORS} from '../../constants/Colors';
const Order = ({navigation}) => {
  const [changeOne, setChangeOne] = useState(false);

  return (
    <SafeAreaView style={GlobalStyle.mainContainerBgColor}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            height: 56,
          }}>
          <BunchDealVectorIcon
            title={AntDesign}
            name="close"
            size={25}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text
            style={[
              styles.toolBarTitle,
              {
                marginStart: -15,
              },
            ]}>
            Checkout
          </Text>
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            justifyContent: 'center',

            height: 56,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 18,
                  height: 18,
                  backgroundColor: COLORS.colorPrimary,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: changeOne
                      ? COLORS.colorPrimary
                      : COLORS.white,
                    borderRadius: 50,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                height: 3,
                width: 180,
                backgroundColor: changeOne
                  ? COLORS.colorPrimary
                  : COLORS.shimmer_loading_color_darker,
              }}></View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 18,
                  height: 18,
                  backgroundColor: changeOne
                    ? COLORS.colorPrimary
                    : COLORS.shimmer_loading_color_darker,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: changeOne
                      ? COLORS.colorPrimary
                      : COLORS.shimmer_loading_color_darker,
                    borderRadius: 50,
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                marginTop: 5,
                color: COLORS.colorPrimary,
                flex: 1,
                textAlign: 'center',
              }}>
              Confirm
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                marginTop: 5,
                color: changeOne
                  ? COLORS.colorPrimary
                  : COLORS.shimmer_loading_color_darker,
                textAlign: 'center',
                flex: 1,
              }}>
              Payment
            </Text>
          </View>
        </View>
      </View>
      {!changeOne ? (
        <>
          <View
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                marginTop: 5,
                color: COLORS.black,
                marginStart: 5,
                fontSize: 13,
              }}>
              ORDER DETAIL:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  marginTop: 5,
                  color: COLORS.black,
                  marginStart: 5,
                  fontSize: 13,
                }}>
                Full Name:
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  marginTop: 5,
                  color: COLORS.shimmer_loading_color_darker,
                  marginStart: 10,
                  fontSize: 13,
                }}>
                Full Name:
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',

                  marginTop: 5,
                  color: COLORS.black,
                  marginStart: 5,
                  fontSize: 13,
                }}>
                Phone Number:
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  marginTop: 5,
                  color: COLORS.shimmer_loading_color_darker,
                  marginStart: 10,
                  fontSize: 13,
                }}>
                012325656
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 2,
              backgroundColor: COLORS.shimmer_loading_color,
              width: '100%',
            }}
          />

          <View
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                marginTop: 5,
                color: COLORS.black,
                marginStart: 5,
                fontSize: 13,
              }}>
              PRODUCT ORDER:
            </Text>

            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                marginTop: 5,
                color: COLORS.shimmer_loading_color_darker,
                marginStart: 10,
                fontSize: 13,
              }}>
              list of products
            </Text>
          </View>

          <View
            style={{
              height: 2,
              backgroundColor: COLORS.shimmer_loading_color,
              width: '100%',
            }}
          />

          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                marginTop: 5,
                color: COLORS.black,
                marginStart: 5,
                fontSize: 14,
              }}>
              ORDER TOTAL
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                marginTop: 5,
                color: COLORS.black,
                marginEnd: 5,
                fontSize: 14,
              }}>
              AU$45.0
            </Text>
          </View>
        </>
      ) : (
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            marginTop: 15,
            color: COLORS.black,
            marginStart: 10,
            fontSize: 16,
            textAlign: 'center',
          }}>
          list of payment methods available
        </Text>
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (changeOne) {
            navigation.replace('MainContainer');
            alert('order placed successfully');
          } else {
            setChangeOne(!changeOne);
          }
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          height: 56,
          width: '100%',
          backgroundColor: COLORS.colorAccent,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: COLORS.white,
            marginEnd: 5,
            fontSize: 16,
            letterSpacing: 0.5,
          }}>
          {STRING.next}
        </Text>
        <AntDesign name="arrowright" size={15} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  toolBarTitle: {
    flex: 1,
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    textAlign: 'center',
  },
});
