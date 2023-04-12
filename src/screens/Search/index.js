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
import {SIZES, STRING, images} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import ApiCall from '../../network/ApiCall';
import {API_END_POINTS} from '../../network/ApiEndPoints';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import BunchDealImageLoader from '../../utils/BunchDealImageLoader';
import BunchDealEditText from '../../utils/EditText/BunchDealEditText';
import {ShowConsoleLogMessage} from '../../utils/Utility';
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
}) => {
  //   const [password, setPassword] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [sliderValue, setSliderValue] = useState(100);

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
          // ShowConsoleLogMessage(JSON.stringify(response?.data?.success));
          let result = Object.values(response.data?.result);
          //   ShowConsoleLogMessage(JSON.stringify(result));
          setCategoryData(result);
        } else {
          setCategoryData([]);
        }
      })
      .catch(err => {
        ShowConsoleLogMessage(
          'Error in get offer recent api call: ' + err.message,
        );
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
    let imageUrl = item.image['560_560'].url;
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

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={show}
      onRequestClose={() => {
        onRequestClose();
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View
            style={{
              paddingHorizontal: 15,
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Montserrat-Bold',
                marginTop: 5,
                color: COLORS.black,
              }}>
              Search on {title}
            </Text>

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
                  marginTop: 5,
                  color: COLORS.black,
                }}>
                Location:{' '}
              </Text>
              <Text
                onPress={onCurrentLocationPress}
                style={{
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  marginTop: 5,
                  color: COLORS.colorAccent,
                  flex: 1,
                  height: 36,
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
                maximumValue={100}
                minimumValue={0}
                onValueChange={value => {
                  setSliderValue(parseInt(value));
                  onChangeRadius(parseInt(value));
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
    height: SIZES.width + 50,
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
