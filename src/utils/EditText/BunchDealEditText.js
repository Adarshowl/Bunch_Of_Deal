import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {COLORS} from '../../constants/Colors';
import styles from './styles';

const BunchDealEditText = ({
  onChangeText,
  iconPosition,
  icon,
  style,
  value,
  label = '',
  error,
  star,
  keyBoardType,
  maxLength,
  secureTextEntry,
  backgroundColor,
  borderWidth,
  borderRadius,
  borderColor,
  borderBottomWidth,
  borderBottomColor,
  placeholder,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);

  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };

  const getBorderColor = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused) {
      return COLORS.colorPrimary;
    } else {
      return COLORS.editTextBorder;
    }
  };

  const getShadowColor = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused) {
      return COLORS.grey;
    } else {
      // return COLORS.transparent;
      return COLORS.grey;
    }
  };

  const getBgColor = () => {
    if (error) {
      return COLORS.red;
    }

    if (focused) {
      return COLORS.white;
    } else {
      return COLORS.white;
    }
  };
  return (
    <View style={[styles.inputContainer]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {star}
        </Text>
      )}
      <View
        style={[
          styles.wrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {
            borderBottomColor: getBorderColor(),
            flexDirection: getFlexDirection(),
          },
          // {shadowColor: getShadowColor()},
          // {shadowOpacity: 1},
          {
            shadowOffset: {
              width: 5,
              height: 5,
            },
          },
          {
            backgroundColor: getBgColor(),
            borderColor: borderColor,
            borderWidth: borderWidth,
            borderBottomWidth: borderBottomWidth,
            borderRadius: borderRadius,
          },
        ]}>
        <View>{icon && icon}</View>
        <TextInput
          autoCapitalize="none"
          style={[styles.textInput, style]}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.editTextBorder}
          value={value}
          placeholder={placeholder}
          keyboardType={keyBoardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
      </View>
    </View>
  );
};

export default BunchDealEditText;
