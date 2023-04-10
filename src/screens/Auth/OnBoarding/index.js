import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {images, SIZES, STRING} from '../../../constants';
import {COLORS} from '../../../constants/Colors';
import {FONTS} from '../../../constants/themes';
import GlobalStyle from '../../../styles/GlobalStyle';
const OnBoarding = ({navigation}) => {
  useEffect(() => {
    AsyncStorage.setItem(STRING.onBoardComplete, 'true');
    AsyncStorage.setItem(STRING.isFirstTime, 'true');
  }, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef();

  let colorsActive = [
    COLORS.dot_light_screen1,
    COLORS.dot_light_screen2,
    COLORS.dot_light_screen3,
    COLORS.dot_light_screen4,
    COLORS.dot_light_screen1,
    COLORS.dot_light_screen2,
    COLORS.dot_light_screen3,
    COLORS.dot_light_screen4,
    COLORS.dot_light_screen1,
  ];

  let colorsInactive = [
    COLORS.dot_dark_screen1,
    COLORS.dot_dark_screen2,
    COLORS.dot_dark_screen3,
    COLORS.dot_dark_screen4,
    COLORS.dot_dark_screen1,
    COLORS.dot_dark_screen2,
    COLORS.dot_dark_screen3,
    COLORS.dot_dark_screen4,
    COLORS.dot_dark_screen1,
  ];

  const [data, setData] = useState([
    {
      image: images.intro_1,
      selected: true,
    },
    {
      image: images.intro_2,
      selected: false,
    },
    {
      image: images.intro_3,
      selected: false,
    },
    {
      image: images.intro_4,
      selected: false,
    },
    {
      image: images.intro_5,
      selected: false,
    },
    {
      image: images.intro_6,
      selected: false,
    },
    {
      image: images.intro_7,
      selected: false,
    },
    {
      image: images.intro_8,
      selected: false,
    },
    {
      image: images.intro_9,
      selected: false,
    },
  ]);

  const renderItems = ({item}) => {
    return <Image source={item.image} style={styles.image} />;
  };

  const renderDotItems = ({item, index}) => {
    return (
      <View
        style={[
          styles.dot,
          {
            backgroundColor: item?.selected
              ? colorsActive[activeIndex]
              : colorsInactive[activeIndex],
          },
        ]}
      />
    );
  };

  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    // console.log('roundIndex:', roundIndex);
    setActiveIndex(roundIndex);
    activateColor(roundIndex);
  }, []);

  const handleSkipBtnClick = () => {
    // navigation.replace('Login');
    navigation.replace('MainContainer');
  };

  const handleNextBtnClick = () => {
    let active = activeIndex + 1;
    activateColor(active);
    if (active < data.length) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: active,
      });
      setActiveIndex(activeIndex + 1);
    } else {
      // navigation.replace('Login');
      navigation.replace('MainContainer');
    }
  };

  const activateColor = index => {
    let arr = data.map((item, idx) => {
      let temp = Object.assign({}, item);
      if (index == idx) {
        temp.selected = !temp?.selected;
      } else {
        temp.selected = false;
      }
      return temp;
    });
    setData(arr);
  };

  return (
    <View style={GlobalStyle.mainContainerBgColor}>
      <FlatList
        data={data}
        ref={flatListRef}
        renderItem={renderItems}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        initialScrollIndex={activeIndex}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        onScroll={onScroll}
      />
      <View style={GlobalStyle.OnBoardingFooter}>
        <Text
          style={[FONTS.body4, GlobalStyle.skipNextText]}
          onPress={handleSkipBtnClick}>
          {STRING.skip}
        </Text>
        <View style={GlobalStyle.OnBoardingCenter}>
          <FlatList data={data} renderItem={renderDotItems} horizontal />
        </View>
        <Text
          style={[FONTS.body4, GlobalStyle.skipNextText]}
          onPress={handleNextBtnClick}>
          {STRING.next}
        </Text>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  image: {
    width: SIZES.width,
    height: SIZES.height - 40,
    resizeMode: 'stretch',
  },
  dot: {
    width: 7,
    height: 7,
    margin: 3,
    borderRadius: 15,
  },
});
