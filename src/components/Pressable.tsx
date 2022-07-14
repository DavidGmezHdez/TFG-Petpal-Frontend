import React from 'react';
import {
  Insets,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

type Props = {
  onPress: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  disabled?: boolean;
  hitSlop?: number | Insets;
  activeOpacity?: number;
};

const PressableOpacity = ({
  onPress,
  style,
  pressedStyle = styles.pressed,
  children,
  disabled,
  hitSlop,
  activeOpacity,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        style,
        pressed ? pressedStyle : {},
        activeOpacity ? {opacity: activeOpacity} : {},
      ]}
      disabled={disabled}
      hitSlop={hitSlop}>
      {children}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.2,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
});

export {PressableOpacity as Pressable};
