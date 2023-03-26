// import React, {useState} from 'react';
// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {Row, Rows, Table} from 'react-native-table-component';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {images} from '../../constants';
// import {COLORS} from '../../constants/Colors';
// import {FONTS} from '../../constants/themes';
// import GlobalStyle2 from '../../styles/GlobalStyle2';

// const InvoiceDetail = ({navigation}) => {
//   const [tableHead, setTableHead] = useState([
//     'description',
//     'Price',
//     'QTY',
//     'Total',
//   ]);

//   const [tableData, setTableData] = useState([
//     ['HSP COMBO - $ 15 * 1', 'AU$ 15.00', '1', '$15'],
//   ]);

//   const [colData, setColData] = useState(['SUB TOTAL', '$ 15']);
//   const [totalData, setTotalData] = useState(['TOTAL', '$ 15']);
//   const [paymentData, setPaymentData] = useState(['Payment ']);
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
//       <ScrollView>
//         <View style={GlobalStyle2.headerFooterStyle}>
//           <Ionicons
//             onPress={() => {
//               navigation.goBack();
//             }}
//             marginStart={10}
//             color={COLORS.colorPrimary}
//             name="ios-arrow-back-sharp"
//             size={25}
//           />

//           <Text
//             style={[
//               FONTS.h4,
//               {color: COLORS.colorPrimary, marginHorizontal: 5},
//             ]}>
//             Bunch of Deals
//           </Text>
//         </View>

//         <Image
//           source={images.splash_new_beta}
//           style={GlobalStyle2.InvoiceIcon}
//         />
//         <Text style={GlobalStyle2.InvoiceLink}>www.bunchofdeals.com.au</Text>

//         <View style={{marginHorizontal: 12}}>
//           <Text
//             style={[FONTS.body2, {alignSelf: 'flex-end', color: COLORS.black}]}>
//             INVOICE
//           </Text>
//           <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
//             <Text
//               style={[
//                 FONTS.body4,
//                 {alignSelf: 'flex-end', color: COLORS.black},
//               ]}>
//               Order Number :
//             </Text>
//             <Text
//               style={[
//                 FONTS.body5,
//                 {alignSelf: 'flex-end', color: COLORS.black},
//               ]}>
//               #320
//             </Text>
//           </View>
//           <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
//             <Text
//               style={[
//                 FONTS.body4,
//                 {alignSelf: 'flex-end', color: COLORS.black},
//               ]}>
//               Order DATE :
//             </Text>
//             <Text
//               style={[
//                 FONTS.body5,
//                 {alignSelf: 'flex-end', color: COLORS.black},
//               ]}>
//               24 Feb,2023 06:17 PM
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginVertical: 25,
//             }}>
//             <View
//               style={{flexDirection: 'column', justifyContent: 'space-around'}}>
//               <Text
//                 style={[FONTS.body5, {color: COLORS.black, marginBottom: 10}]}>
//                 Store Detail
//               </Text>
//               <Text style={[FONTS.body5, {color: COLORS.black}]}>
//                 Store TURKISH KEBAB
//               </Text>
//               <Text style={[FONTS.body5, {color: COLORS.black}]}>
//                 AND PIDES
//               </Text>
//               <Text style={[FONTS.body5, {color: COLORS.black}]}>
//                 Store : 188 Enmore Rd,
//               </Text>
//               <Text style={[FONTS.body5, {color: COLORS.black}]}>
//                 Newtown NSW2042
//               </Text>
//               <Text style={[FONTS.body5, {color: COLORS.black}]}>
//                 Australia
//               </Text>
//             </View>
//             <View style={{flexDirection: 'column'}}>
//               <Text style={[FONTS.h6, {color: COLORS.black, marginBottom: 10}]}>
//                 Customer Detail
//               </Text>
//               <Text style={[FONTS.h6, {color: COLORS.black}]}>
//                 Customer:New
//               </Text>
//               <Text style={[FONTS.h6, {color: COLORS.black}]}>
//                 Customer Address:
//               </Text>
//             </View>
//           </View>
//           <View
//             style={[FONTS.h1, {justifyContent: 'center', alignSelf: 'center'}]}>
//             <Text
//               style={[
//                 FONTS.body2,
//                 {alignSelf: 'center', color: COLORS.black, marginVertical: 10},
//               ]}>
//               ORDER DETAILS
//             </Text>
//             <Table borderStyle={{borderWidth: 1}}>
//               <Row
//                 widthArr={[115, 95, 80, 80]}
//                 style={{height: 50, width: 370}}
//                 textStyle={[
//                   FONTS.h6,
//                   {color: COLORS.black, textAlign: 'center'},
//                 ]}
//                 data={tableHead}></Row>
//               <Rows
//                 widthArr={[115, 95, 80, 80]}
//                 data={tableData}
//                 textStyle={[
//                   FONTS.body5,
//                   {color: COLORS.black, textAlign: 'center'},
//                 ]}
//                 style={{height: 70, width: 370}}></Rows>
//               <Row
//                 textStyle={[
//                   FONTS.body5,
//                   {color: COLORS.black, textAlign: 'center'},
//                 ]}
//                 widthArr={[290, 80]}
//                 data={colData}
//                 style={{height: 50, width: 370}}></Row>
//               <Row
//                 textStyle={[
//                   FONTS.body5,
//                   {color: COLORS.black, textAlign: 'center'},
//                 ]}
//                 widthArr={[290, 80]}
//                 data={totalData}
//                 style={{height: 50, width: 370}}></Row>
//             </Table>
//             <Text style={[FONTS.h6, {color: COLORS.black}]}>
//               (Note:All price mentioned above are including GST for tex purpose)
//             </Text>
//           </View>
//           <View
//             style={[FONTS.h1, {justifyContent: 'center', alignSelf: 'center'}]}>
//             <Text
//               style={[
//                 FONTS.body2,
//                 {alignSelf: 'center', color: COLORS.black, marginVertical: 10},
//               ]}>
//               Payment DETAILS
//             </Text>
//             <Table borderStyle={{borderWidth: 1}}>
//               <Row
//                 textStyle={[
//                   FONTS.body5,
//                   {color: COLORS.black, textAlign: 'center'},
//                 ]}
//                 widthArr={[290, 80]}
//                 data={colData}
//                 style={{height: 50, width: 370}}></Row>
//               <Row
//                 textStyle={[
//                   FONTS.body5,
//                   {color: COLORS.black, textAlign: 'center'},
//                 ]}
//                 data={paymentData}
//                 style={{height: 50, width: 370}}></Row>
//               <Row
//                 textStyle={[
//                   FONTS.body5,
//                   {color: COLORS.black, textAlign: 'center'},
//                 ]}
//                 widthArr={[290, 80]}
//                 data={totalData}
//                 style={{height: 50, width: 370}}></Row>
//             </Table>
//             <Text
//               style={[
//                 FONTS.body4,
//                 {color: COLORS.black, marginHorizontal: 10},
//               ]}>
//               Please keep the invoice and show it to the store{'\n'}
//               owner whenclaiming this exclusive offer{'\n'}
//               Thank you for shopping at{'\n'}
//               www.bunchofdeals.com.au
//             </Text>
//             <Text
//               style={[FONTS.h6, {color: COLORS.black, alignSelf: 'center'}]}>
//               BUNCH OF DEALS{'\n'}
//               www.bunchofdeals.com.au{'\n'}
//               ABN : 12 856 025 203
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//       <TouchableOpacity
//         onPress={() => {}}
//         activeOpacity={1}
//         style={GlobalStyle2.InvoiceButton}>
//         <Text
//           onPress={() => {
//             navigation.navigate('Setting');
//           }}
//           style={[FONTS.h4, {color: COLORS.white}]}>
//           Download Invoice
//         </Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default InvoiceDetail;
// new merge code - 25 mar 2023

import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import BunchDealProgressBar from '../../utils/BunchDealProgressBar';

const InvoiceDetail = ({navigation, route}) => {
  const [webViewLoading, setWebViewLoading] = useState(true);
  const showSpinner = () => setWebViewLoading(true);
  const hideSpinner = () => setWebViewLoading(false);

  let {url} = route?.params;
  console.log(url);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={[
          {
            elevation: 10,
            height: 56,

            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: COLORS.white,
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
            FONTS.h4,
            {color: COLORS.colorPrimary, marginHorizontal: 10},
          ]}>
          Bunch of Deals
        </Text>
      </View>
      <BunchDealProgressBar loading={webViewLoading} />
      <WebView
        source={{
          // uri: 'https://bunchofdeals.com.au/APP/index.php/user/Data_Order?Id=MzUz',
          uri: url,
        }}
        onLoadStart={showSpinner}
        onLoadEnd={hideSpinner}
        androidHardwareAccelerationDisabled={true}
        javaScriptEnabled={true}
        injectedJavaScript={'jsCode'}
        javaScriptCanOpenWindowsAutomatically
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        style={{marginTop: 0, flex: 1}}
      />
    </View>
  );
};

export default InvoiceDetail;

const styles = StyleSheet.create({});
