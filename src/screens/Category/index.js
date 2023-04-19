import {StyleSheet, Text, View, FlatList, TouchableOpacity,SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import ApiCall from '../../network/ApiCall';
import {images} from '../../constants';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import NoResult from '../../utils/NoResult';

const Category = ({navigation}) => {
  const [listData, setListData] = useState([]);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCategoryList();
  }, []);

  const onReloadBtn = () => {
    setShowError(false);
    getCategoryList();
  };

  const getCategoryList = () => {
    setLoading(true);

    ApiCall('get', null, API_END_POINTS.API_USER_GET_CATEGORY, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          let result = Object.values(response.data?.result);
          setListData(result);
          setShowError(result.length <= 0);
        } else if (response.data?.success == 0) {
          console.log('error');
          setShowError(true);
        } else {
          setShowError(true);
        }
      })
      .catch(error => {
        console.log('ERROR IN GET USer PROFILE => ', error);
        setShowError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CategoryList', {
            item: item,
          });
        }}
        activeOpacity={0.8}
        style={{
          width: '100%',
          height: 150,
          marginVertical: 3,
        }}>
        <BunchDealImageLoader
          defaultImg={images.def_logo}
          source={item?.image['560_560'].url + ''}
          styles={{
            // flex: 1,
            width: '100%',
            height: 150,
          }}
          // blurRadius={1.5}
        />
        <View
          style={{
            position: 'absolute',
            right: 0,
            left: 0,
            bottom: 0,
            top: 0,
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={styles.name}
            onPress={() => {
              navigation.navigate('CategoryList', {
                item: item,
              });
            }}>
            {item?.name}
          </Text>
          <View
            style={{
              borderWidth: 2,
              borderColor: COLORS.white,
              borderRadius: 50,
              paddingHorizontal: 5,
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons
              name="location-sharp"
              color={COLORS.white}
              style={{
                marginHorizontal: 5,
              }}
              onPress={() => {
                navigation.navigate('CategoryList', {
                  item: item,
                });
              }}
            />
            <Text
              style={styles.email}
              onPress={() => {
                navigation.navigate('CategoryList', {
                  item: item,
                });
              }}>
              {item?.nbr_stores} {item?.nbr_stores > 1 ? 'Stores' : 'Store'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.backgroundColor}}>
      <View
        style={[
          {
            height: 56,
            width: '100%',
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
          marginStart={15}
          color={COLORS.colorPrimary}
          name="ios-arrow-back-sharp"
          size={25}
        />

        <Text
          style={[
            FONTS.body2,
            {
              color: COLORS.colorPrimary,
              marginHorizontal: 10,
            },
          ]}>
          Category
        </Text>
      </View>
      <View
        style={{
          flexGrow: 1,
          height: '90%',
        }}>
        {!showError ? (
          <FlatList
            data={listData}
            extraData={listData}
            renderItem={renderItem}
          />
        ) : (
          <NoResult onReloadBtn={onReloadBtn} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    color: COLORS.white,
    marginTop: 15,
    fontFamily: 'Montserrat-Medium',
  },
  email: {
    fontSize: 14,
    color: COLORS.white,
    fontFamily: 'Montserrat-Medium',
  },
});
