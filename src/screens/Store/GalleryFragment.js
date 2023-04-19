import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {images, SIZES} from '../../constants';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import {ShowConsoleLogMessage} from '../../utils/Utility';

import TimeZone from 'react-native-timezone';

const GalleryFragment = props => {
  useEffect(() => {
    // ShowConsoleLogMessage('propse -> ' + JSON.stringify(props?.item?.id_store));
    TimeZone.getTimeZone().then(result => {
      // console.log(result);
      setTimezone(result);
    });
    getGalleryList('rest');
  }, []);

  const [timeZone, setTimezone] = useState('');

  const [recentData, setRecentData] = useState([]);

  const [showError, setShowError] = useState(false);
  const getGalleryList = val => {
    let body = {
      module_id: props?.item?.id_store,
      module: 'store',
      limit: '20',
      page: '1',
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_GET_GALLERY, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
          let result = Object.values(response.data?.result);
          // ShowConsoleLogMessage(JSON.stringify(result));
          setShowError(result.length <= 0);
          setRecentData(result);
        } else {
          setRecentData([]);
          setShowError(true);
        }
      })
      .catch(err => {
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
      })
      .finally(() => {});
  };

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: COLORS.white,
        // alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FlatList
        data={recentData}
        style={{
          marginTop: 5,
        }}
        // data={[
        //   'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        //   'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        //   'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
        //   'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg',
        //   'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg',
        //   'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg',
        //   'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg',
        // ]}
        keyExtractor={item => item?.id_store}
        renderItem={renderItem}
        numColumns={4}
      />
    </View>
  );
};

export default GalleryFragment;

const styles = StyleSheet.create({});
const renderItem = ({item}) => {
  // ShowConsoleLogMessage(item);
  let imageUrl = item['200_200'].url;
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <BunchDealImageLoader
        defaultImg={images.def_logo}
        source={imageUrl}
        styles={[
          {
            width: SIZES.width / 4.6,
            height: 80,
            alignSelf: 'center',
            marginVertical: 3,
            marginHorizontal: 3,
          },
        ]}
      />
    </TouchableOpacity>
  );
};
