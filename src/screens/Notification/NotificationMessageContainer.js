import React, {useEffect, useState} from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import PushNotification from 'react-native-push-notification';
import {ShowConsoleLogMessage} from '../../utils/Utility';

import {useNavigation} from '@react-navigation/native';
import {Avatar} from 'react-native-elements';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import GlobalStyle1 from '../../styles/GlobalStyle1';

const NotificationMsg = ({message, title, show, data, imageUrl}) => {
  // console.log("lllllllllllllll",imageurl)

  const [images, setImages] = useState([]);
  console.log('yyyyyyyyyyyyyyyyyy', data);
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));
  useEffect(() => {
    (async function () {
      if (show) {
        // Slide in animation
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();

        // Slide out animation after 3 seconds
        setTimeout(() => {
          Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 6000);
      }
    })();
  }, [show]);

  const translateAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  //      useEffect(() => {
  //       // Register event listener for notification clicks
  //       PushNotification.configure({
  //         onNotification: function (notification) {
  //           console.log('Notification clicked!', notification);
  //           handleNotificationClick();
  //         },
  //         },
  //       );

  //       const handleNotificationClick = (notification) => {
  //         console.log("messageeeeeeeeeee",notification)

  //         const module_name = notification.data.module_name;
  //         const module_id = notification.data.module_id;
  //         const cam_id = notification.data.cam_id;
  //         if (module_name === 'store') {
  //           navigation.navigate('StoreDetails', {
  //             item: {
  //               store_id: module_id,
  //               intentFromNotification: true,
  //               cid: cam_id || '',
  //             },
  //           });
  //         } else if (module_name === 'offer') {
  //           navigation.navigate('OfferDetails', {
  //             item: {
  //               id_offer: module_id,
  //               intentFromNotification: true,
  //               cid: cam_id || '',
  //             },
  //           });
  //         }
  //       };

  //     return () => {
  //       // Clean up the event listener when the component is unmounted
  //       PushNotification.removeListeners();
  //     };
  //   }, []);

  const handleNotificationClick = () => {
    // karo send Notification
    const module_name = data?.data?.module_name;
    const module_id = data?.data?.module_id;
    const cam_id = data?.data?.cam_id;

    if (module_name === 'store') {
      ShowConsoleLogMessage(
        module_name +
          '  if abody******** ' +
          module_id +
          '************ ' +
          cam_id,
      );

      navigation.navigate('StoreDetails', {
        item: {
          store_id: module_id,
          intentFromNotification: true,
          cid: cam_id || '',
        },
      });
    } else if (module_name === 'offer') {
      ShowConsoleLogMessage(
        module_name +
          ' else body  ******** ' +
          module_id +
          '************ ' +
          cam_id,
      );

      navigation.navigate('OfferDetails', {
        item: {
          id_offer: module_id,
          intentFromNotification: true,
          cid: cam_id || '',
        },
      });
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {transform: [{translateY: translateAnimation}]},
      ]}>
      <TouchableOpacity
        onPress={() => {
          handleNotificationClick();
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        }}>
        {/* <Image
                     size={22}
                    //  source={data?.image[0]?.['560_560']?.url + ''}
                    // source={data.image.url}
                    style={{
                        alignItems:'center'
                    }}
                    /> */}
        {/* <Ionicons
                    name={'notifications'}
                    color={COLORS.colorPrimary}
                    size={22}
                    style={{
                        marginEnd: 12,
                    }}
                /> */}
        <BunchDealImageLoader
          defaultImg={images.def_logo}
          source={imageUrl}
          styles={[
            GlobalStyle1.images,
            {
              alignSelf: 'flex-start',
              marginTop: 5,
            },
          ]}

          // source={uri:item?.images}
          //   source={item?.images['0']?.['560_560']?.url + ''}
          // source={item?.images['0']['560_560'] +url ''}

          //   styles={styles.image}
        />

        {/* <Avatar
                
                    rounded
                    size={50}
                      source={imageUrl}
                    // source={{
                    //     uri:
                    //       'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    //   }}
                /> */}
        <View
          style={{
            flex: 1,
            marginLeft: 8,
          }}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.message} numberOfLines={3}>
            {message}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
// ab aap notifcation ke icon par notifcation se o image aa rahi set kar dena
// thik lekin ye jo white scrren aa rhihe uoer notification se
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS == 'android' ? 0 : StatusBar.currentHeight,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 5,
    borderRadius: 10,
    // padding: 20,
    // marginTop:30
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    alignItems: 'center',
    marginTop: 2,
    marginLeft: 10,
  },
  message: {
    fontSize: 13,
    color: '#000',
    marginTop: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default NotificationMsg;
