import React from 'react';
import {Text as SText, StyleSheet} from 'react-native';
import {colors} from 'utils/Colors';
import {fonts} from 'utils/Fonts';

type Props = {
  style?: any;
  bold?: boolean;
  light?: boolean;
  white?: boolean;
  underline?: boolean;
  hCenter?: boolean;
  lineThrough?: boolean;
  color?: boolean;
  size?: boolean;
  children: any;
};

const customizeStyles = ({
  style,
  bold,
  light,
  white,
  underline,
  hCenter,
  lineThrough,
  color,
  size,
}: Props) => {
  return [
    style && style,
    bold && styles.bold,
    light && styles.light,
    white && styles.white,
    underline && styles.underline,
    hCenter && {textAlign: 'center'},
    lineThrough && styles.lineThrough,
    color && {color},
    size && {fontSize: size},
  ];
};

export const Text = (props: Props) => {
  const finalStyle = [styles.default, ...customizeStyles(props)];

  return (
    <SText {...props} style={finalStyle}>
      {props.children}
    </SText>
  );
};

export const Title = (props: Props) => {
  const finalStyle = [styles.default, styles.title, ...customizeStyles(props)];

  return <SText {...props} style={finalStyle} />;
};

const styles = StyleSheet.create({
  default: {
    fontFamily: fonts.primaryRegular,
  },
  bold: {
    fontFamily: fonts.primaryBold,
  },
  light: {
    fontFamily: fonts.primaryLight,
  },
  title: {
    fontSize: 18,
  },
  caption: {
    fontSize: 13,
  },
  underline: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: colors.gray,
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
  white: {
    color: colors.white,
  },
});
