import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-elements';
import {images, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS, SIZES} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import GlobalStyle1 from '../../styles/GlobalStyle1';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import BunchDealEditText from '../../utils/EditText/BunchDealEditText';
import {
  ShowConsoleLogMessage,
  ShowToastMessage,
  Timezone,
} from '../../utils/Utility';
const StoreReview = props => {
  useEffect(() => {
    Timezone.getTimeZone().then(result => {
      setTimezone(result);
    });
    getReviewList('rest');
  }, [isFocused]);

  useEffect(() => {
    // ShowConsoleLogMessage(item);
    setTimeout(async () => {
      await getUserFromStorage();
    }, 0);
  }, []);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            setUserData(JSON.parse(value));
            ShowConsoleLogMessage(JSON.parse(value));
          } else {
            setUserData({});
          }
        }
      });
    } catch (err) {
      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

  useEffect(() => {
    Timezone.getTimeZone().then(result => {
      setTimezone(result);
    });
    getReviewList('rest');
  }, [props?.item?.id_store]);

  const isFocused = useIsFocused();
  const [userData, setUserData] = useState({});

  const [timeZone, setTimezone] = useState('');

  const [recentData, setRecentData] = useState([]);

  const [showError, setShowError] = useState(false);
  const getReviewList = val => {
    let body = {
      store_id: props?.item?.id_store,
      offset: '',
      limit: '',
      page: '',
      mac_adr: '',
    };

    // ShowConsoleLogMessage(JSON.stringify(body));

    // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
    ApiCall('post', body, API_END_POINTS.API_USER_GET_REVIEWS, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          let result = Object.values(response.data?.result);

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

  const addReview = () => {
    if (parseInt(rate) > 0) {
      let body = {
        store_id: props?.item?.id_store,
        rate: rate.toString(),
        review: password,
        guest_id: '1',
        user_id: userData?.id_user,
        pseudo: userData?.username,
        token: 'fjksdjfksdfkdsjflsdjflsdkj',
        mac_adr: '02:00:00:00:00:00',
      };

      ShowConsoleLogMessage(JSON.stringify(body));

      // ShowConsoleLogMessage(API_END_POINTS.API_GET_OFFERS);
      ApiCall('post', body, API_END_POINTS.API_RATING_STORE, {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      })
        .then(response => {
          ShowConsoleLogMessage(JSON.stringify(response));
          if (response?.data?.success == 1) {
            getReviewList('rtest');
          } else {
            ShowConsoleLogMessage('Unable to add review');
          }
        })
        .catch(err => {
          ShowConsoleLogMessage(
            'Error in get offer recent api call: ' + err.message,
          );
        })
        .finally(() => {});
    } else {
      ShowToastMessage('Please select from 1 star to 5 star');
    }
  };

  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  const closeAddReviewModal = () => {
    setShowAddReviewModal(!showAddReviewModal);
  };

  const [fullName, setFullName] = useState('');

  const [password, setPassword] = useState('');

  function ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
    setRate(rating);
  }

  const [rate, setRate] = useState(0);

  const renderAddReviewModal = () => {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={showAddReviewModal}
        onRequestClose={() => {
          closeAddReviewModal();
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <View style={{}}>
              <AirbnbRating
                size={30}
                showRating={false}
                onFinishRating={ratingCompleted}
                starContainerStyle={{
                  marginTop: 20,
                }}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                marginTop: 10,
              }}>
              <BunchDealEditText
                borderBottomWidth={1}
                placeholder={'Pseudo'}
                style={FONTS.body3}
                value={userData?.username}
                onChangeText={val => {}}
                editable={false}
              />
              <BunchDealEditText
                borderBottomWidth={1}
                placeholder={'Write review...'}
                style={FONTS.body3}
                value={password}
                onChangeText={val => {
                  setPassword(val);
                }}
                multiLine={true}
              />
            </View>
            <BunchDealCommonBtn
              height={40}
              width={'97%'}
              backgroundColor={COLORS.colorPrimary}
              marginHorizontal={5}
              text={STRING.add_review}
              textStyle={FONTS.body3}
              textColor={COLORS.white}
              onPress={() => {
                addReview();
                closeAddReviewModal();
              }}
              marginTop={40}
              borderRadius={1}
              textSize={14}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
      }}>
      {/* {recentData?.map(item => {
          return renderItem(item);
        })} */}
      <FlatList
        data={recentData}
        keyExtractor={item => item?.id_store}
        renderItem={renderItem}
      />
      <BunchDealCommonBtn
        height={40}
        backgroundColor={COLORS.colorPrimary}
        marginHorizontal={5}
        text={STRING.add_review}
        textStyle={FONTS.body3}
        textColor={COLORS.white}
        onPress={() => {
          closeAddReviewModal();
        }}
        marginTop={25}
        borderRadius={1}
        textSize={16}
      />
      {renderAddReviewModal()}
    </View>
  );
};

export default StoreReview;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000080',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    height: SIZES.width - 120,
    width: SIZES.width - 80,
    // paddingHorizontal: 20,
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 75,
  },
});
const renderItem = item => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        GlobalStyle1.StoreBOX,
        {
          marginHorizontal: 5,
        },
      ]}>
      <BunchDealImageLoader
        defaultImg={images.def_logo}
        source={item?.image}
        styles={{
          width: 50,
          height: 50,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: COLORS.lightGrey,
          marginTop: 5,
        }}
      />
      <View
        style={{
          marginTop: 5,
          marginEnd: 15,
          marginStart: 10,
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={[
              {
                color: COLORS.black,
                fontSize: 14,
                fontFamily: 'Montserrat-Regular',
                flex: 1,
              },
            ]}
            numberOfLines={2}>
            {item?.pseudo}
          </Text>
          <AirbnbRating
            count={5}
            isDisabled={true}
            showRating={false}
            defaultRating={parseInt(item?.rate)}
            size={15}
          />
        </View>
        <Text
          style={[
            {
              color: COLORS.shimmer_loading_color_darker,
              fontSize: 13,
              fontFamily: 'Montserrat-Regular',
            },
          ]}>
          {item?.review}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
