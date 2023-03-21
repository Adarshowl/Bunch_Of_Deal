import React from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {SIZES} from '../../constants';
import {COLORS} from '../../constants/Colors';
import StoreOffer from './StoreOffer';
import StoreReview from './StoreReview';
import GalleryFragment from './GalleryFragment';
const Tab = createMaterialTopTabNavigator();

const CAMERA_TAB_ITEM_WIDTH = SIZES.width * 0.1;
const NORMAL_TAB_ITEM_WIDTH = SIZES.width / 2;

const MyTabBar = ({state, descriptors, navigation, position}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 10,
        // backgroundColor: 'white',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const tabBarItemWidth = NORMAL_TAB_ITEM_WIDTH;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({
              name: route.name,
              merge: true,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              height: 45,
              backgroundColor: isFocused ? COLORS.white : COLORS.colorPrimary,
              paddingHorizontal: 10,
              borderColor: COLORS.white,
              borderWidth: 0.5,
            }}>
            <Animated.Text
              style={{
                color: isFocused ? COLORS.colorPrimary : COLORS.white,
                fontFamily: 'Montserrat-Regular',
              }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TopTabBar = ({items}) => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="Offer"
      style={{
        backgroundColor: COLORS.transparent,
      }}>
      <Tab.Screen name="Offer" children={item => <StoreOffer item={items} />} />
      <Tab.Screen
        name="Review"
        children={item => <StoreReview item={items} />}
      />
      <Tab.Screen
        name="Gallery"
        children={item => <GalleryFragment item={items} />}
      />
    </Tab.Navigator>
  );
};

export default TopTabBar;
const styles = StyleSheet.create({});
