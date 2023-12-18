import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Account from '../screens/Account';
import {COLORS} from '../constants/Colors';
import GeoStore from '../screens/GeoStore';
import InvoiceList from '../screens/Invoice/InvoiceList';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
import {useIsFocused} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  const [userData, setUserData] = useState({});
  const isFocused = useIsFocused();

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
          minHeight: 70,
          paddingTop: 15,
          paddingBottom: 18,
        },
        tabBarItemStyle: {},
      }}
      initialRouteName="Home"
      style={{
        backgroundColor: COLORS.red,
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
                name={'globe'}
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
      {userData?.id_user == null ? null : (
        <Tab.Screen
          name="Orders"
          component={InvoiceList}
          initialParams={{item: {}}}
          options={{
            unmountOnBlur: true,

            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  // marginBottom: focused ? 15 : 0,
                }}>
                <Ionicons
                  name={'ios-cart'}
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
                  Orders{' '}
                </Text>
              </View>
            ),
          }}
        />
      )}
      {userData?.id_user == null ? null : (
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Ionicons
                  name={'ios-person-sharp'}
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
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNav;

const styles = StyleSheet.create({
  text: {
    fontSize: 14.5,
    marginTop: 5,
    fontFamily: 'Montserrat-SemiBold',
    // fontWeight: 'bold',
  },
});
