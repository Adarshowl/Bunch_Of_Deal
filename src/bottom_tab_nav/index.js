import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import {COLORS} from '../constants/Colors';
import GeoStore from '../screens/GeoStore';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import MyStuffScreen from '../screens/Account/MyStuffScreen';
import Category from '../screens/Category';
import Octicons from 'react-native-vector-icons/Octicons';
import Favorite from '../screens/Favorite';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  const [userData, setUserData] = useState({});
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    getUserFromStorage();
    if (isFocused) {
      getUserFromStorage();
    }
  }, [isFocused]);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem('userData', (error, value) => {
        if (error) {
        } else {
          if (value !== null) {
            setUserData(JSON.parse(value));
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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          minHeight: 20,
          // paddingTop: 5,
          // paddingBottom: 15,
        },
        tabBarItemStyle: {},
      }}
      initialRouteName="Home"
      style={{
        // backgroundColor: COLORS.red,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
              }}>
              <Entypo
                name={'home'}
                size={22}
                color={focused ? COLORS.colorPrimary : COLORS.grey_20}
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: focused ? COLORS.colorPrimary : COLORS.grey_20,
                  },
                ]}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Geo Store"
        component={GeoStore}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                // marginBottom: focused ? 15 : 0,
              }}>
              <Entypo
                name={'location'}
                size={22}
                color={focused ? COLORS.colorPrimary : COLORS.grey_20}
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: focused ? COLORS.colorPrimary : COLORS.grey_20,
                  },
                ]}>
                Geo Store
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                // marginBottom: focused ? 15 : 0,
              }}>
              <Octicons
                name={'three-bars'}
                size={22}
                color={focused ? COLORS.colorPrimary : COLORS.grey_20}
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: focused ? COLORS.colorPrimary : COLORS.grey_20,
                  },
                ]}>
                Category
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
              }}>
              <FontAwesome
                name={focused ? 'heart' : 'heart-o'}
                size={22}
                color={focused ? COLORS.colorPrimary : COLORS.grey_20}
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: focused ? COLORS.colorPrimary : COLORS.grey_20,
                  },
                ]}>
                Favorite
              </Text>
            </View>
          ),
        }}
      />
      {/*{userData?.id_user == null ? null : (*/}
      {/*  <Tab.Screen*/}
      {/*    name="Orders"*/}
      {/*    component={InvoiceList}*/}
      {/*    initialParams={{item: {}}}*/}
      {/*    options={{*/}
      {/*      unmountOnBlur: true,*/}

      {/*      tabBarIcon: ({focused}) => (*/}
      {/*        <View*/}
      {/*          style={{*/}
      {/*            alignItems: 'center',*/}
      {/*            // marginBottom: focused ? 15 : 0,*/}
      {/*          }}>*/}
      {/*          <Ionicons*/}
      {/*            name={'ios-cart'}*/}
      {/*            size={22}*/}
      {/*            color={focused ? COLORS.colorPrimary : COLORS.grey_20}*/}
      {/*          />*/}
      {/*          <Text*/}
      {/*            style={[*/}
      {/*              styles.text,*/}
      {/*              {*/}
      {/*                color: focused ? COLORS.colorPrimary : COLORS.grey_20,*/}
      {/*              },*/}
      {/*            ]}>*/}
      {/*            Orders{' '}*/}
      {/*          </Text>*/}
      {/*        </View>*/}
      {/*      ),*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{userData?.id_user == null ? null : (*/}
      {/*  <Tab.Screen*/}
      {/*    name="Account"*/}
      {/*    component={Account}*/}
      {/*    options={{*/}
      {/*      unmountOnBlur: true,*/}
      {/*      tabBarIcon: ({focused}) => (*/}
      {/*        <View*/}
      {/*          style={{*/}
      {/*            alignItems: 'center',*/}
      {/*          }}>*/}
      {/*          <Ionicons*/}
      {/*            name={'ios-person-sharp'}*/}
      {/*            size={22}*/}
      {/*            color={focused ? COLORS.colorPrimary : COLORS.grey_20}*/}
      {/*          />*/}
      {/*          <Text*/}
      {/*            style={[*/}
      {/*              styles.text,*/}
      {/*              {*/}
      {/*                color: focused ? COLORS.colorPrimary : COLORS.grey_20,*/}
      {/*              },*/}
      {/*            ]}>*/}
      {/*            Profile*/}
      {/*          </Text>*/}
      {/*        </View>*/}
      {/*      ),*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
      <Tab.Screen
        name="My Stuff"
        component={MyStuffScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <TouchableOpacity
              onPress={() => {
                navigation?.toggleDrawer();
              }}
              style={{
                alignItems: 'center',
              }}>
              <FontAwesome
                name={'user-o'}
                // name={'menu'}
                size={22}
                color={focused ? COLORS.colorPrimary : COLORS.grey_20}
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: focused ? COLORS.colorPrimary : COLORS.grey_20,
                  },
                ]}>
                My Stuff
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    marginTop: 2,
    fontFamily: 'Montserrat-SemiBold',
    // fontWeight: 'bold',
  },
});
