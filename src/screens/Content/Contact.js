import React, { useState } from 'react';
import {
    FlatList, Image,
    SafeAreaView,
    Text,
    View,
    TextInput
} from 'react-native';
import { COLORS } from '../../constants/Colors';
import { FONTS } from '../../constants/themes';
import GlobalStyle from '../../styles/GlobalStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BunchDealCommonBtn from '../../utils/BunchDealCommonBtn';
import BunchDealEditText from '../../utils/EditText/BunchDealEditText';
import BunchDealProgressBar from '../../utils/BunchDealProgressBar';
import { STRING } from '../../constants/String';

const Contact = ({ navigation }) => {
    return (
        <SafeAreaView style={GlobalStyle.mainContainerwhiteColor}>
            <View style={GlobalStyle.Header}>
                <FontAwesome
                    onPress={() => {
                        navigation.goBack();
                    }}
                    name="arrow-left"
                    size={20}
                    color={COLORS.colorAccent}
                    style={{
                        marginStart: 10,
                    }}
                />
                <Text style={[
                    FONTS.h5,
                    {
                        color: COLORS.colorPrimary,
                        marginHorizontal: 15,
                    },
                ]}>
                    Contact
                </Text>
            </View>
            <View style={{
                marginTop: 70
            }}>
                <TextInput
                    style={[GlobalStyle.ContactTextinput]}
                    placeholder="Enter your name"
                />
            </View>
            <View style={{
                marginTop: 30
            }}>
                <TextInput
                    style={[GlobalStyle.ContactTextinput]}
                    placeholder="Number"
                />
            </View>
            <BunchDealCommonBtn
                height={40}
                backgroundColor={COLORS.colorAccent}
                marginHorizontal={30}
                text={STRING.save}
                textStyle={FONTS.body3}
                textColor={COLORS.white}
                marginTop={60}
                borderRadius={1}
                textSize={18}
            />
        </SafeAreaView >
    )
}

export default Contact