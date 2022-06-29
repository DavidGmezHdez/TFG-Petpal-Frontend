import React, {ReactNode} from 'react';
import {Text, StyleProp, TextStyle} from 'react-native';
import {px} from '@utils/Constants';

interface Props {
  semibold?: boolean;
  bold?: boolean;
  bolder?: boolean;
  center?: boolean;
  color?: string;
  children: ReactNode;
  italic?: boolean;
  large?: boolean;
  medium?: boolean;
  mediumFont?: boolean;
  style?: StyleProp<TextStyle>;
  underline?: boolean;
  xlarge?: boolean;
  xxlarge?: boolean;
  xxxlarge?: boolean;
  small?: boolean;
  xsmall?: boolean;
  xxsmall?: boolean;
  xxxxlarge?: boolean;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

const Fonts = {
  normal: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
    bolder: 'Inter-ExtraBold',
  },
};

const TextWrapper = (props: Props) => {
  let color = 'black';
  let fontSize = 12 * px;
  let fontStyle: TextStyle['fontStyle'] = 'normal';
  let textAlign: TextStyle['textAlign'] = 'left';
  let fonts = Fonts.normal;
  let fontFamily: TextStyle['fontFamily'] = fonts.regular;
  let textDecorationLine: TextStyle['textDecorationLine'] = 'none';
  const numberOfLines = props.numberOfLines || 0;
  const ellipsizeMode = props.ellipsizeMode || 'tail';

  if (props.mediumFont) {
    fontFamily = fonts.medium;
  } else if (props.semibold) {
    fontFamily = fonts.semibold;
  } else if (props.bold) {
    fontFamily = fonts.bold;
  } else if (props.bolder) {
    fontFamily = fonts.bolder;
  }

  if (props.center) {
    textAlign = 'center';
  }

  if (props.color) {
    color = props.color;
  }

  if (props.italic) {
    fontStyle = 'italic';
  }

  if (props.small) {
    fontSize = 24 * px;
  }

  if (props.xsmall) {
    fontSize = 18 * px;
  }

  if (props.xxsmall) {
    fontSize = 12 * px;
  }

  if (props.medium) {
    fontSize = 30 * px;
  }

  if (props.large) {
    fontSize = 36 * px;
  }

  if (props.xlarge) {
    fontSize = 42 * px;
  }

  if (props.xxlarge) {
    fontSize = 48 * px;
  }

  if (props.xxxlarge) {
    fontSize = 54 * px;
  }

  if (props.xxxxlarge) {
    fontSize = 60 * px;
  }

  if (props.underline) {
    textDecorationLine = 'underline';
  }

  const style: TextStyle = {
    color,
    fontSize,
    fontStyle,
    textAlign,
    textDecorationLine,
    fontFamily,
  };

  return (
    <Text
      style={[style, props.style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}>
      {props.children}
    </Text>
  );
};

export {TextWrapper as Text};
