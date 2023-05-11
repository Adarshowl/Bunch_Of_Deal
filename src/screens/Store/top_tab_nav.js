import React, {useEffect, useState} from 'react';

import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SIZES} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {ShowConsoleLogMessage} from '../../utils/Utility';
import GalleryFragment from './GalleryFragment';
import StoreOffer from './StoreOffer';
import StoreReview from './StoreReview';
const Tab = createMaterialTopTabNavigator();

const CAMERA_TAB_ITEM_WIDTH = SIZES.width * 0.1;
const NORMAL_TAB_ITEM_WIDTH = SIZES.width / 2;

const MyTabBar = ({state, descriptors, navigation, position}) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUserFromStorage();
  }, []);

  const getUserFromStorage = async item => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            ShowConsoleLogMessage(value);
            setUserData(JSON.parse(value));
            ShowConsoleLogMessage(item);
            if (item?.cid != undefined || null) {
              markAsRead(item?.cid, JSON.parse(value)?.id_user);
            }
          } else {
          }
        }
      });
    } catch (err) {
      crashlytics().recordError(err);

      console.log('ERROR IN GETTING USER FROM STORAGE');
    }
  };

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
          if (userData?.id_user == null && label == 'Review') {
            navigation.navigate('Auth', {
              screen: 'Login',
              params: {
                screen: 'Login',
              },
            });
          } else {
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({
                name: route.name,
                merge: true,
              });
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const [recentData, setRecentData] = useState([]);

        const [showError, setShowError] = useState(false);

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
              backgroundColor: isFocused ? COLORS.white : COLORS.colorAccent,
              paddingHorizontal: 10,
              borderColor: COLORS.white,
              borderWidth: 0.5,
              flexDirection: 'row',
            }}>
            {label == 'Review' ? (
              <Ionicons
                name="chatbox-sharp"
                color={isFocused ? COLORS.colorAccent : COLORS.white}
                size={18}
                style={{
                  marginEnd: 10,
                }}
              />
            ) : label == 'Gallery' ? (
              <MaterialCommunityIcons
                name="view-gallery"
                color={isFocused ? COLORS.colorPrimary : COLORS.white}
                size={18}
                style={{
                  marginEnd: 10,
                }}
              />
            ) : label == 'Offers' ? (
              <MaterialIcons
                name="local-offer"
                color={isFocused ? COLORS.colorPrimary : COLORS.white}
                size={18}
                style={{
                  marginEnd: 10,
                }}
              />
            ) : null}
            <Animated.Text
              style={{
                color: isFocused ? COLORS.colorPrimary : COLORS.white,
                fontFamily: 'Montserrat-Medium',
                textTransform: 'uppercase',
                fontSize: 12,
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
      <Tab.Screen
        name="Offers"
        children={item => <StoreOffer item={items} />}
      />

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
