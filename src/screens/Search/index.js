import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Slider} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {images, SIZES, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';

import {API_END_POINTS} from '../../network/ApiEndPoints';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import BunchDealEditText from '../../utils/EditText/BunchDealEditText';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import crashlytics from '@react-native-firebase/crashlytics';
import BunchDealProgressBar from '../../utils/BunchDealProgressBar';
import GlobalStyle from '../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
const SearchDialog = ({
  show,
  onPress,
  title,
  onRequestClose,
  searchText,
  onChangeText,
  onChangeRadius,
  onChangeCategoryId,
  onCurrentLocationPress,
  onSearchByTitle,
  radius,
  categoryId,
  catId,
  location,
  selectedTab,
  dataChange,

  // new
  handleTabChange,
  changeTwo,
  changeOne,
}) => {
  //   const [password, setPassword] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [sliderValue, setSliderValue] = useState(100);
  const [maxSliderValue, setMaxSliderValue] = useState(100); // Add this state for dynamic maximum value

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showPlacePickModal, setShowPlacePickModal] = useState(false);
  const [showPlaceChooseModal, setShowPlaceChooseModal] = useState(false);

  const [toolbarTitle, setToolbarTitle] = useState('');

  const [update, setUpdate] = useState(false);
  const [storeUpdate, setStoreUpdate] = useState(false);
  const handleSearchButtonClick = () => {
    closeSearchModal();
    setUpdate(true);
    setToolbarTitle(true);
  };
  // const [searchText, setSearchText] = useState('');
  // const [categoryId, setCategoryId] = useState('');
  // const [radius, setRadius] = useState('');

  const handleStoreSearchButtonClick = () => {
    closeSearchModal();
    setStoreUpdate(true);
    setToolbarTitle(true);
  };

  const closeSearchModal = () => {
    setUpdate(false);
    setStoreUpdate(false);
    setShowSearchModal(!showSearchModal);
  };

  const closePlacePickModal = () => {
    if (showPlaceChooseModal) {
      closePlaceChooseModal();
    }
    setShowPlacePickModal(!showPlacePickModal);
  };
  const closePlaceChooseModal = () => {
    setShowPlaceChooseModal(!showPlaceChooseModal);
  };

  const [percent, setPercent] = useState(true);
  const [storeFront, setStoreFront] = useState(false);
  const handleSearchByTitle = selectedTitle => {
    // Handle the search based on the selected title
    if (selectedTitle === 'offers') {
      // Perform offer search logic
      console.log('Performing offer search...');
    } else if (selectedTitle === 'stores') {
      // Perform store search logic
      console.log('Performing store search...');
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    getCategoryList('rest');
  }, []);

  const getCategoryList = val => {
    ApiCall('get', null, API_END_POINTS.API_USER_GET_CATEGORY, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
      .then(response => {
        if (response?.data?.success == 1) {
          // ShowConsoleLogMessage(JSON.stringify(response?.data));
          let result = Object.values(response.data?.result);
          setCategoryData(result);
        } else {
          setCategoryData([]);
        }
      })
      .catch(err => {
        crashlytics().recordError(err);

        ShowConsoleLogMessage('Error in get offer recent api call: ' + err);
      })
      .finally(() => {});
  };

  const onItemClick = idx => {
    let a = categoryData.map((data, index) => {
      let temp = Object.assign(data, {});
      if (index == idx) {
        temp.selected = true;
        // console.log(temp);
        onChangeCategoryId(temp?.id_category, temp?.name);
      } else {
        temp.selected = false;
      }
      return temp;
    });
    setCategoryData(a);
  };

  const renderItem = ({item, index}) => {
    let imageUrl = item.image['560_560']?.url;
    // ShowConsoleLogMessage(item.image['560_560'].url);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          onItemClick(index);
        }}
        style={{
          width: 70,
          height: 70,
          backgroundColor: 'white',
          margin: 10,
          borderRadius: 15,
          //   justifyContent: 'center',
          //   alignItems: 'center',
        }}>
        <BunchDealImageLoader
          defaultImg={images.def_logo}
          source={
            // 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
            imageUrl
          }
          styles={{
            width: 70,
            height: 70,
            borderRadius: 15,
            borderColor: item?.selected
              ? COLORS.colorAccent
              : COLORS.transparent,
            borderWidth: 3,
          }}
        />
        <LinearGradient
          colors={[COLORS.transparent, '#00000080', '#00000090']}
          style={{
            width: 70,
            height: 70,
            position: 'absolute',
            bottom: 0,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 10.5,
              fontFamily: 'Montserrat-SemiBold',
              color: COLORS.white,
              textAlign: 'center',
            }}>
            {item?.name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  const [loading, setLoading] = useState(false);

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={show}
      onRequestClose={() => {
        onRequestClose();
      }}>
      <BunchDealProgressBar loading={loading} />

      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View
            style={{
              paddingHorizontal: 15,
              marginTop: 10,
            }}>
            <View style={[GlobalStyle.flexRowAlignCenter]}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Montserrat-Bold',
                  marginTop: 5,
                  color: COLORS.black,
                  flex: 1,
                }}>
                Search
              </Text>
              <Ionicons
                onPress={() => {
                  onRequestClose();
                }}
                name={'close-circle-outline'}
                size={30}
                color={COLORS.black}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 10,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  // flexGrow: 1,
                  alignItems: 'center',
                  marginStart: 10,
                }}
                // onPress={() => {
                //   // setPercent(true);
                //   // // handleSearchButtonClick()
                //   // setStoreFront(false);
                //   // setToolbarTitle('Offers');
                //   // setUpdate(false);
                //   // setStoreUpdate(false);
                // }}
                onPress={() => handleTabChange(1)}>
                <Text
                  style={[
                    FONTS.h6,
                    {
                      color:
                        selectedTab === 1
                          ? COLORS.colorAccent
                          : COLORS.shimmer_loading_color,

                      fontSize: 18,
                    },
                  ]}>
                  Offers
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  // flexGrow: 1,
                  alignItems: 'center',
                  marginEnd: 10,
                }}
                onPress={() => handleTabChange(2)}
                //   onPress={() => {
                //   // setPercent(false);
                //   // setStoreFront(true);
                //   // // handleStoreSearchButtonClick()
                //   // setToolbarTitle('Stores');
                //   // setStoreUpdate(false);
                //   // setUpdate(false);
                // }}
              >
                <Text
                  style={[
                    FONTS.h6,
                    {
                      color:
                        selectedTab === 2
                          ? COLORS.colorAccent
                          : COLORS.shimmer_loading_color,

                      fontSize: 18,
                    },
                  ]}>
                  Stores
                </Text>
              </TouchableOpacity>

              {/* <SearchDialog
                show={showSearchModal}
                onPress={
                  percent ? handleSearchButtonClick : handleStoreSearchButtonClick
                }
                title={percent ? 'offers' : 'stores'}
                onRequestClose={closeSearchModal}
                searchText={searchText}
                onChangeText={onChangeText}
                // onChangeText={val => {
                //   setSearchText(val);
                // }}
                onCurrentLocationPress={() => {
                  closeSearchModal();
                  closePlacePickModal();
                  closePlaceChooseModal();
                }}
                onChangeRadius={radius}
                onChangeCategoryId={catId}
                // onChangeRadius={val => {
                //   setRadius(val);
                // }}
                // onChangeCategoryId={val => {
                //   setCategoryId(val);
                // }}
              /> */}
            </View>

            {/* <View style={{}}>
              <View
                style={{
                  backgroundColor: COLORS.lightGrey,
                  height: 0.5,
                  width: '100%',
                }}
              />
              <View style={{ flexDirection: 'row' }}>
                {percent ? (
                  <Offer
                    searchText={searchText}
                    location={STRING.SEARCH_LOCATION}
                    radius={radius}
                    catId={catId}
                    dataChange={update}
                  />
                ) : null}
                {storeFront ? (
                  <Store
                    searchText={searchText}
                    location={STRING.SEARCH_LOCATION}
                    radius={radius}
                    catId={catId}
                    dataChange={storeUpdate}
                  />
                ) : null}
              </View> */}
            {/* </View> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Montserrat-SemiBold',
                  marginTop: 10,
                  color: COLORS.black,
                  flex: 1,
                  //height: 36,
                }}>
                Location:{' '}
                <Text
                  onPress={onCurrentLocationPress}
                  style={{
                    fontSize: 14,
                    fontFamily: 'Montserrat-Medium',

                    color: COLORS.colorAccent,

                    textAlignVertical: 'center',
                  }}
                  numberOfLines={2}>
                  <FontAwesome
                    name="dot-circle-o"
                    size={13}
                    style={{
                      marginEnd: 5,
                    }}
                    color={COLORS.colorAccent}
                  />{' '}
                  {STRING.SEARCH_LOCATION}
                </Text>
              </Text>
            </View>

            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Montserrat-Bold',
                marginTop: 20,
                color: COLORS.editTextBorder,
              }}>
              Category:
            </Text>
            <FlatList
              style={{
                marginTop: 3,
                marginStart: 5,
              }}
              data={categoryData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />

            <View
              style={
                {
                  // backgroundColor: 'red',
                }
              }>
              <BunchDealEditText
                borderBottomWidth={1}
                placeholder={'Search for location, address...'}
                // style={FONTS.body3}
                value={searchText}
                onChangeText={onChangeText}
                style={{
                  fontSize: 15,
                  fontFamily: 'Montserrat-Regular',
                }}
                multiLine={true}
              />
            </View>
            <Text
              style={{
                fontSize: 19,
                fontFamily: 'Montserrat-SemiBold',
                marginTop: 20,
                color: COLORS.black,
              }}>
              {sliderValue >= 100 ? '+' : ''}
              {sliderValue} KM
            </Text>
            <View
              style={{
                alignItems: 'stretch',
                justifyContent: 'center',
                height: 30,
                marginHorizontal: 10,
              }}>
              <Slider
                thumbStyle={{
                  height: 15,
                  width: 15,
                  backgroundColor: COLORS.colorPrimary,
                }}
                thumbTintColor={COLORS.red}
                trackStyle={{
                  backgroundColor: COLORS.red,
                  height: 2.5,
                }}
                minimumTrackTintColor={COLORS.colorAccent}
                maximumTrackTintColor={COLORS.editTextBorder}
                value={sliderValue}
                // maximumValue={100}
                minimumValue={0}
                // maximumValue={maxSliderValue} // Set maximum value dynamically
                maximumValue={100} // Set the maximum value to any positive number you want
                // onSlidingComplete={value => {
                //   setSliderValue(parseInt(value));
                //   onChangeRadius(parseInt(value));
                // }}
                onValueChange={value => {
                  setSliderValue(parseInt(value));
                  onChangeRadius(parseInt(value));
                  // setMaxSliderValue(200); // You can set it to any value you want
                }}
              />
            </View>
          </View>

          <BunchDealCommonBtn
            height={50}
            width={'97%'}
            backgroundColor={COLORS.colorAccent}
            marginHorizontal={5}
            text={'Search'}
            textStyle={FONTS.body3}
            textColor={COLORS.white}
            onPress={onPress}
            marginTop={30}
            borderRadius={1}
            textSize={14}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SearchDialog;

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
    minHeight: SIZES.width + 50,
    width: SIZES.width - 80,
    // paddingHorizontal: 20,
    paddingBottom: 10,
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 75,
  },
});
