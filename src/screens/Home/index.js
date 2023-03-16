import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {icons, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import GlobalStyle from '../../styles/GlobalStyle';
import BunchDealCommonToolBar from '../../utils/BunchDealCommonToolBar';
import BunchDealImage from '../../utils/BunchDealImage';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';
import Offer from '../Offer';
import Store from '../Store';

const Home = ({navigation}) => {
  const [toolbarTitle, setToolbarTitle] = useState('Offers');

  const [percent, setPercent] = useState(true);
  const [storeFront, setStoreFront] = useState(false);

  return (
    <View style={GlobalStyle.mainContainerBgColor}>
      <View style={GlobalStyle.commonToolbarBG}>
        <BunchDealVectorIcon
          title={Entypo}
          name={'menu'}
          color={COLORS.colorPrimary}
          size={25}
          style={GlobalStyle.marginHorizontal15}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
        <BunchDealCommonToolBar title={toolbarTitle} />
        <BunchDealVectorIcon
          title={Fontisto}
          name={'search'}
          color={COLORS.colorPrimary}
          size={18}
          style={GlobalStyle.marginHorizontal10}
          onPress={() => {
            navigation.navigate('About');
          }}
        />
        <BunchDealVectorIcon
          title={MaterialIcons}
          name={'notifications'}
          color={COLORS.colorPrimary}
          size={25}
          style={GlobalStyle.marginHorizontal15}
          onPress={() => {
            navigation.navigate('Notification');
          }}
        />
      </View>

      <View
        style={[
          GlobalStyle.commonToolbarBG,
          {
            justifyContent: 'space-around',
            height: 35,
          },
        ]}>
        <BunchDealImage
          source={icons.ic_percent}
          style={[
            {
              tintColor: percent
                ? COLORS.colorPrimary
                : COLORS.shimmer_loading_color,
            },
            GlobalStyle.homeTabImageStyle,
          ]}
          wrapperStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setPercent(true);
            setStoreFront(false);
            setToolbarTitle(STRING.offers);
          }}
        />
        <BunchDealImage
          source={icons.ic_storefront}
          style={[
            {
              tintColor: storeFront
                ? COLORS.colorPrimary
                : COLORS.shimmer_loading_color,
            },
            GlobalStyle.homeTabImageStyle,
          ]}
          wrapperStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setStoreFront(true);
            setPercent(false);
            setToolbarTitle(STRING.stores);
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: COLORS.lightGrey,
          height: 0.5,
          width: '100%',
        }}
      />
      {percent ? <Offer /> : null}
      {storeFront ? <Store /> : null}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
