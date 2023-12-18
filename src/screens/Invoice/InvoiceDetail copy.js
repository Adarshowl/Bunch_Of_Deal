// react native html to pdf code
/**
 package com.christopherdro.htmltopdf;

 import com.facebook.react.bridge.Arguments;
 import com.facebook.react.bridge.ReactApplicationContext;
 import com.facebook.react.bridge.ReactContextBaseJavaModule;
 import com.facebook.react.bridge.ReactMethod;
 import com.facebook.react.bridge.ReadableMap;
 import com.facebook.react.bridge.Promise;
 import com.facebook.react.bridge.WritableMap;
 import android.os.Build;

 import java.io.File;
 import java.io.IOException;
 import java.util.UUID;

 import android.os.Environment;
 import android.print.PdfConverter;
 import android.print.PrintAttributes;

 public class RNHTMLtoPDFModule extends ReactContextBaseJavaModule {

    private static final String HTML = "html";
    private static final String FILE_NAME = "fileName";
    private static final String DIRECTORY = "directory";
    private static final String BASE_64 = "base64";
    private static final String BASE_URL = "baseURL";
    private static final String HEIGHT = "height";
    private static final String WIDTH = "width";

    private static final String PDF_EXTENSION = ".pdf";
    private static final String PDF_PREFIX = "PDF_";

    private final ReactApplicationContext mReactContext;

  public RNHTMLtoPDFModule(ReactApplicationContext reactContext) {
    super(reactContext);
    mReactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNHTMLtoPDF";
  }

  @ReactMethod
  public void convert(final ReadableMap options, final Promise promise) {
    try {
       File path = null;
      File destinationFile;
      String htmlString = options.hasKey(HTML) ? options.getString(HTML) : null;
      if (htmlString == null) {
        promise.reject(new Exception("RNHTMLtoPDF error: Invalid htmlString parameter."));
        return;
      }

      String fileName;
      if (options.hasKey(FILE_NAME)) {
        fileName = options.getString(FILE_NAME);
        if (!isFileNameValid(fileName)) {
          promise.reject(new Exception("RNHTMLtoPDF error: Invalid fileName parameter."));
          return;
        }
      } else {
        fileName = PDF_PREFIX + UUID.randomUUID().toString();
      }

      if (options.hasKey(DIRECTORY)) {
          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R)
                {
                    path = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOCUMENTS) + "/" + "BOD_INVOICES/");
                }
                else
                {
                    path = new File(Environment.getExternalStorageDirectory() + "/" + "BOD_INVOICES/");
                }
        String state = Environment.getExternalStorageState();
        // File path = (Environment.MEDIA_MOUNTED.equals(state)) ?
        //   new File(mReactContext.getExternalFilesDir(null), options.getString(DIRECTORY)) :
        //   new File(mReactContext.getFilesDir(), options.getString(DIRECTORY));

        if (!path.exists()) {
          if (!path.mkdirs()) {
            promise.reject(new Exception("RNHTMLtoPDF error: Could not create folder structure."));
            return;
          }
        }
        destinationFile = new File(path, fileName + PDF_EXTENSION);
      } else {
        // destinationFile = getTempFile(fileName);
        destinationFile = new File(path, fileName + PDF_EXTENSION);

      }

      PrintAttributes pagesize=null;
      if(options.hasKey(HEIGHT) && options.hasKey(WIDTH)) {
        pagesize=new PrintAttributes.Builder()
                .setMediaSize(new PrintAttributes.MediaSize("custom","CUSTOM",
                        (int)(options.getInt(WIDTH)*1000/72.0),
                        (int)(options.getInt(HEIGHT)*1000/72.0))
                )
                .setResolution(new PrintAttributes.Resolution("RESOLUTION_ID", "RESOLUTION_ID", 600, 600))
                .setMinMargins(PrintAttributes.Margins.NO_MARGINS)
                .build();
      }

      convertToPDF(htmlString,
              destinationFile,
              options.hasKey(BASE_64) && options.getBoolean(BASE_64),
              Arguments.createMap(),
              promise,
              options.hasKey(BASE_URL) ? options.getString(BASE_URL) : null,
              pagesize
              );
    } catch (Exception e) {
      promise.reject(e);
    }
  }

  private void convertToPDF(String htmlString, File file, boolean shouldEncode, WritableMap resultMap, Promise promise,
      String baseURL,PrintAttributes printAttributes) throws Exception {
      PdfConverter pdfConverter=PdfConverter.getInstance();
      if(printAttributes!=null) pdfConverter.setPdfPrintAttrs(printAttributes);
      pdfConverter.convert(mReactContext, htmlString, file, shouldEncode, resultMap, promise, baseURL);
  }

  private File getTempFile(String fileName) throws IOException {
      File outputDir = getReactApplicationContext().getCacheDir();
      return File.createTempFile(fileName, PDF_EXTENSION, outputDir);

  }

  private boolean isFileNameValid(String fileName) throws Exception {
    return new File(fileName).getCanonicalFile().getName().equals(fileName);
  }
}


 */
// new merge code - 12 April 2023

import React, {useEffect, useState} from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import BunchDealProgressBar from '../../utils/BunchDealProgressBar';
import RNFetchBlob from 'rn-fetch-blob';
import crashlytics from '@react-native-firebase/crashlytics';
// import RNFetchBlob from 'react-native-fetch-blob';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {ShowToastMessage} from '../../utils/Utility';
import RNFS from 'react-native-fs';
import notifee, {AndroidImportance} from '@notifee/react-native';

const InvoiceDetail = ({navigation, route}) => {
  const [webViewLoading, setWebViewLoading] = useState(true);
  const [downloaded, setisdownloaded] = useState(true);
  const showSpinner = () => setWebViewLoading(true);
  const hideSpinner = () => setWebViewLoading(false);

  const permissionFunc = async () => {
    if (Platform.OS == 'ios') {
      createPDF();
    } else {
      if (downloaded) {
        // try {
        //   const granted = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        //   );
        //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await createPDF();
        //   } else {
        //     ShowToastMessage(
        //       'You need to give storage permission to download the file',
        //     );
        // }
        // } catch (err) {
        //   crashlytics().recordError(err);
        //
        //   console.warn(err);
        // }
      } else {
        ShowToastMessage('File is already downloaded.');
      }
    }
  };

  const jsCode =
    'window.ReactNativeWebView.postMessage(document.documentElement.innerHTML)';

  let {url} = route?.params;
  let {order_id} = route?.params;

  const [htmlData, setHtmlData] = useState('');

  function makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const [number, setNumber] = useState('');
  useEffect(() => {
    setNumber(makeid(5));
  }, []);

  // console.log(url);

  const createPDF = async () => {
    if (Platform.OS == 'android') {
      try {
        const {dirs} = RNFetchBlob.fs;
        const path = RNFS.ExternalStorageDirectoryPath;
        const dirToSave =
          Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;

        let options = {
          html: htmlData,
          fileName: 'BOD_OrderID' + '_' + order_id,
          directory: Platform.OS == 'ios' ? dirToSave : path,
        };

        let file = await RNHTMLtoPDF.convert(options);

        const destinationPath = RNFS.DownloadDirectoryPath;
        const FileName = 'BOD_OrderID' + '_' + order_id + '.pdf';
        const destinationFile = destinationPath + '/' + FileName;
        RNFS.copyFile(file.filePath, destinationFile)
          .then(result => {
            // Delete a file on the project path using RNFS.unlink
            return (
              RNFS.unlink(file.filePath)
                .then(() => {
                  console.log('FILE DELETED');
                })
                // `unlink` will throw an error, if the item to unlink does not exist
                .catch(err => {
                  console.log(err.message);
                })
            );
          })
          .catch(err => {
            console.log('err', err);
          });
        // ShowToastMessage('File Downloaded Successfully');
        Alert.alert(
          'File Downloaded Successfully',
          'File saved to : Downloads/BOD_OrderID' + '_' + order_id + '.pdf',
        );

        await DisplayNotification('show');
      } catch (err) {
        crashlytics().recordError(err);

        ShowToastMessage('Failed to download invoice');
      }
    } else {
      const {dirs} = RNFetchBlob.fs;
      const dirToSave =
        Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
      console.log(dirToSave);
      let options = {
        html: htmlData,
        fileName: 'BOD_OrderID' + '_' + order_id,
        directory: dirToSave,
      };

      let file = await RNHTMLtoPDF.convert(options);

      const destinationPath = dirToSave;
      const FileName = 'BOD_OrderID' + '_' + order_id + '.pdf';
      const destinationFile = destinationPath + '/' + FileName;
      RNFS.copyFile(file.filePath, destinationFile)
        .then(result => {
          // Delete a file on the project path using RNFS.unlink
          return (
            RNFS.unlink(file.filePath)
              .then(() => {
                console.log('FILE DELETED');
              })
              // `unlink` will throw an error, if the item to unlink does not exist
              .catch(err => {
                console.log(err.message);
              })
          );
        })
        .catch(err => {
          console.log('err', err);
        });

      Alert.alert(
        'File Downloaded Successfully',
        'File saved to : Downloads/BOD_OrderID' + '_' + order_id + '.pdf',
      );
      await DisplayNotification('show');
      console.log(file?.filePath);
    }
  };

  const DisplayNotification = async remoteMessage => {
    const channelId = await notifee.createChannel({
      id: 'BUNCH_OF_DEALS',
      name: 'BUNCH_OF_DEALS',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Invoice Downloaded.',
      body:
        'BOD_OrderID' +
        '_' +
        order_id +
        '.pdf downloaded successfully and saved to downloads.',

      android: {
        channelId: channelId,
        loopSound: false,
        sound: 'default',
        smallIcon: 'ic_launcher_full_latest',
      },
    });

    notifee.onBackgroundEvent(event => {
      console.log('on background event notifee -=> ' + JSON.stringify(event));
    });
  };

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
        // injectedJavaScript={'jsCode'}
        injectedJavaScript={jsCode}
        javaScriptCanOpenWindowsAutomatically
        domStorageEnabled={true}
        startInLoadingState={false}
        scalesPageToFit={true}
        style={{marginTop: 0, flex: 1}}
        onMessage={event => {
          setHtmlData(event.nativeEvent.data + '');
          // console.log('Received: ', event.nativeEvent.data);
        }}
      />

      <BunchDealCommonBtn
        height={50}
        width={'100%'}
        backgroundColor={COLORS.colorAccent}
        text={'Download Invoice'}
        textStyle={FONTS.body3}
        textColor={COLORS.white}
        onPress={() => {
          permissionFunc();
        }}
        borderRadius={1}
        textSize={16}
      />
    </View>
  );
};

export default InvoiceDetail;

const styles = StyleSheet.create({});
