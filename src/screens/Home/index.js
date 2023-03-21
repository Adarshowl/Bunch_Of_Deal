import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {icons, STRING} from '../../constants';
import {COLORS} from '../../constants/Colors';
import {FONTS} from '../../constants/themes';
import GlobalStyle from '../../styles/GlobalStyle';
import BunchDealCommonToolBar from '../../utils/BunchDealCommonToolBar';
import BunchDealImage from '../../utils/BunchDealImage';
import BunchDealVectorIcon from '../../utils/BunchDealVectorIcon';
import {ShowToastMessage} from '../../utils/Utility';
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
            ShowToastMessage('Coming soon!');
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
            height: 45,
          },
        ]}>
        <Text
          style={[
            FONTS.h6,
            {
              color: percent
                ? COLORS.colorAccent
                : COLORS.shimmer_loading_color,
              fontSize: 16,
            },
          ]}
          onPress={() => {
            setPercent(true);
            setStoreFront(false);
            setToolbarTitle('Offers');
          }}>
          Offers
        </Text>
        <Text
          style={[
            FONTS.h6,
            {
              color: storeFront
                ? COLORS.colorAccent
                : COLORS.shimmer_loading_color,
              fontSize: 16,
            },
          ]}
          onPress={() => {
            setPercent(false);
            setStoreFront(true);
            setToolbarTitle('Store');
          }}>
          Store
        </Text>
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
