// import React, {useState} from 'react';
// import {FlatList, StyleSheet, Text, View} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {COLORS} from '../../constants/Colors';
// import {FONTS} from '../../constants/themes';
// import GlobalStyle2 from '../../styles/GlobalStyle2';

// const InvoiceList = ({navigation}) => {
//   const data = [
//     {
//       id: 3,
//       order: 'Order #320',
//       text: 'Upload',
//       des: 'TURKISH KEBAB AND PIDES',
//       status: 'Pending',
//     },
//     {
//       id: 2,
//       order: 'Order #319',
//       text: 'Upload',

//       des: 'TURKISH KEBAB AND PIDES',
//       status: 'Pending',
//     },
//     {
//       id: 4,
//       order: 'Order #318',
//       text: 'Upload',

//       des: 'TURKISH KEBAB AND PIDES',
//       status: 'Pending',
//     },
//     {
//       id: 5,
//       order: 'Order #317',
//       text: 'Upload',

//       des: 'TURKISH KEBAB AND PIDES',
//       status: 'Pending',
//     },
//     {
//       id: 1,
//       order: 'Order #316',
//       text: 'Upload',

//       des: 'TURKISH KEBAB AND PIDES',
//       status: 'Pending',
//     },
//     {
//       id: 6,
//       order: 'Order #315',
//       text: 'Upload',

//       des: 'TURKISH KEBAB AND PIDES',
//       status: 'Pending',
//     },
//     {
//       id: 7,
//       order: 'Order #314',
//       text: 'Upload',

//       des: 'TURKISH KEBAB AND PIDES',
//       status: 'Pending',
//     },
//     {
//       id: 7,
//       order: 'Order #314',
//       text: 'Upload',

//       des: 'TURKISH KEBAB AND PIDES',
//       status: 'Pending',
//     },
//     {
//       id: 7,
//       order: 'Order #314',
//       text: 'Upload',

//       des: 'TURKISH KEBAB AND PIDES',
//       status: 'Pending',
//     },
//     {
//       id: 7,
//       order: 'Order #314',
//       text: 'Upload',

//       des: 'TURKISH KEBAB AND PIDES',
//       status: 'Pending',
//     },
//     {
//       id: 7,
//       order: 'Order #314',
//       text: 'Upload',

//       des: 'TURKISH KEBAB AND PIDES',
//       status: 'Pending',
//     },
//     {
//       id: 7,
//       order: 'Order #314',
//       text: 'Upload',

//       des: 'TURKISH KEBAB AND PIDES',
//       status: 'Pending',
//     },
//     {
//       id: 7,
//       order: 'Order #314',
//       text: 'Upload',

//       des: 'TURKISH KEBAB AND PIDES',
//       status: 'Pending',
//     },
//   ];
//   const [orderData, setOrderData] = useState([]);

//   return (
//     <View style={{backgroundColor: COLORS.white}}>
//       <View style={GlobalStyle2.headerFooterStyle}>
//         <Ionicons
//           onPress={() => {
//             navigation.goBack();
//           }}
//           marginStart={15}
//           color={COLORS.colorPrimary}
//           name="ios-arrow-back-sharp"
//           size={25}
//         />

//         <Text
//           style={[
//             FONTS.body2,
//             {
//               color: COLORS.colorPrimary,
//               marginHorizontal: 10,
//             },
//           ]}>
//           Order
//         </Text>
//       </View>
//       <FlatList
//         data={data}
//         extraData={data}
//         keyExtractor={item => {
//           return item.id;
//         }}
//         renderItem={item => {
//           const Notification = item.item;
//           let attachment = <View />;

//           return (
//             <View style={GlobalStyle2.content}>
//               <View style={{flexDirection: 'column'}}>
//                 <View style={GlobalStyle2.text}>
//                   <Text style={[FONTS.body4, {color: COLORS.black}]}>
//                     {Notification.order}
//                   </Text>
//                   <Text style={GlobalStyle2.orderStatus}>
//                     {Notification.status}
//                   </Text>
//                   <Text style={GlobalStyle2.orderUpload}>
//                     {Notification.text}
//                   </Text>
//                 </View>

//                 <Text style={[FONTS.body4, {color: COLORS.black}]}>
//                   {Notification.des}
//                 </Text>
//               </View>

//               <Ionicons
//                 onPress={() => {
//                   navigation.navigate('InvoiceDetail');
//                 }}
//                 color={COLORS.grey}
//                 name="ios-chevron-down-outline"
//                 size={20}
//               />
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// };

// export default InvoiceList;

// const styles = StyleSheet.create({});
// code merge
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {images} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS, CLONE_BASE_URL} from '../../network/ApiEndPoints';
import GlobalStyle2 from '../../styles/GlobalStyle2';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import base64 from 'react-native-base64';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import BunchDealProgressBar from '../../utils/BunchDealProgressBar';
import {InvoiceListSkeleton} from '../../utils/Skeleton';

const InvoiceList = ({navigation}) => {
  const [listData, setListData] = useState([]);
  const [apiToken, setApiToken] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserFromStorage();
  }, []);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            // ShowConsoleLogMessage(value);
            setUserData(JSON.parse(value));
            getOrderList(JSON.parse(value)?.id_user);
          } else {
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  const getOrderList = val => {
    setLoading(true);
    let body = {user_id: val, limit: 30, page: '1'};

    ApiCall('post', body, API_END_POINTS.API_ORDERS_GET, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        console.log('ERROR IN GET USer PROFILE => ', JSON.stringify(response));

        if (response?.data?.success == 1) {
          let result = Object.values(response.data?.result);
          // console.log(JSON.stringify(result));

          setListData(result);
        } else if (response.data?.success == 0) {
          console.log('error');
        }
      })
      .catch(error => {
        console.log('ERROR IN GET USer PROFILE => ', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onItemClick = idx => {
    let a = listData.map((data, index) => {
      let temp = Object.assign(data, {});
      if (index == idx) {
        temp.selected = !temp.selected;
      } else {
        temp.selected = false;
      }
      return temp;
    });
    setListData(a);
  };

  const onEyeItemClick = item => {
    let a = base64.encode(item?.id);
    let url = CLONE_BASE_URL + '/user/Data_Order?Id=' + a;
    ShowConsoleLogMessage(url);
    navigation.navigate('InvoiceDetail', {
      url: url + '',
      order_id: item?.id + '',
    });
  };

  const renderInterItem = ({item, index}) => {
    return (
      <View
        style={{
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
          }}>
          <BunchDealImageLoader
            defaultImg={images.def_logo}
            source={item?.image}
            styles={{
              width: 60,
              height: 60,
            }}
          />
          <View
            style={{
              padding: 3,
              flex: 1,
              marginTop: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Montserrat-Regular',
                  color: COLORS.black,
                  marginEnd: 5,
                  marginStart: 5,
                  flex: 1,
                }}
                numberOfLines={2}>
                {item?.name}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'Montserrat-SemiBold',
                  color: COLORS.black,
                }}>
                {item?.currency?.symbol + '' + item?.amount}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Montserrat-Regular',
                color: COLORS.black,
                marginStart: 5,
                marginTop: 4,
              }}>
              Qty: {item?.qty}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    ShowConsoleLogMessage(item?.owner_name);
    let order_status =
      item?.status?.split(';')[0].substring(0, 1).toUpperCase() +
      item?.status?.split(';')[0].substring(1);
    let order_statusColor = item?.status?.split(';')[1].toUpperCase();
    let payment_status =
      item?.payment_status_data?.split(';')[0].substring(0, 1).toUpperCase() +
      item?.payment_status_data?.split(';')[0].substring(1);
    let payment_statusColor = item?.payment_status_data
      ?.split(';')[1]
      .toUpperCase();

    // ShowConsoleLogMessage(Object.values(item?.items));

    return (
      <View
        style={{
          backgroundColor: '#f7f7f7',
        }}>
        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.white,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'Montserrat-SemiBold',
                  color: COLORS.black,
                }}>
                Order #{item?.id}
              </Text>

              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'Montserrat-Regular',
                  color: COLORS.white,
                  backgroundColor: `${order_statusColor}`,
                  marginHorizontal: 10,
                  paddingVertical: 1.5,
                  paddingHorizontal: 6,
                  borderRadius: 5,
                }}>
                {order_status}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'Montserrat-Regular',
                  color: COLORS.white,
                  backgroundColor: `${payment_statusColor}`,
                  paddingVertical: 1.5,

                  paddingHorizontal: 6,
                  borderRadius: 5,
                }}>
                {payment_status}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'Montserrat-SemiBold',
                color: COLORS.black,
              }}>
              {/* {item?.owner_name?.replace(/<\/?[^>]+(>|$)/g, '')} */}
              {item?.owner_name?.replace(/<[^>]*>/g, '')}
            </Text>
          </View>
          <Feather
            name={item?.selected ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={COLORS.shimmer_loading_color_darker}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              onItemClick(index);
            }}
          />
        </View>
        {item?.selected ? (
          <>
            <FlatList
              data={Object.values(item?.items)}
              renderItem={renderInterItem}
            />
            <AntDesign
              name="eye"
              style={{
                alignSelf: 'center',
                backgroundColor: '#d6d8d7',
                paddingVertical: 5,
                paddingHorizontal: 7,
                borderRadius: 2,
                marginBottom: 2,
              }}
              color={'#616362'}
              size={20}
              onPress={() => {
                // navigation.navigate('InvoiceDetail', {
                //   url: '',
                //   order_id: '',
                // });
                onEyeItemClick(item);
              }}
            />
          </>
        ) : null}
      </View>
    );
  };

  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      {/* <BunchDealProgressBar loading={loading} /> */}
      <View
        style={[
          GlobalStyle2.headerFooterStyle,
          {
            elevation: 10,
          },
        ]}>
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          marginStart={10}
          color={COLORS.colorPrimary}
          name="ios-arrow-back-sharp"
          size={25}
        />

        <Text
          style={[
            FONTS.body2,
            {color: COLORS.colorPrimary, marginHorizontal: 10},
          ]}>
          Orders
        </Text>
      </View>
      {/* <InvoiceListSkeleton /> */}
      <View
        style={{
          height: '93%',
          width: '100%',
          paddingTop: 3,
        }}>
        <FlatList
          data={listData}
          ListEmptyComponent={() => {
            return loading ? (
              <InvoiceListSkeleton />
            ) : (
              <Text
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginTop: 200,
                  fontSize: 18,
                  fontFamily: 'Quicksand-Medium',
                }}>
                No data Found
              </Text>
            );
          }}
          style={{
            backgroundColor: COLORS.white,
            marginBottom: 15,
          }}
          extraData={listData}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={renderItem}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 0.5,
                  backgroundColor: 'grey',
                }}></View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default InvoiceList;

const styles = StyleSheet.create({});
