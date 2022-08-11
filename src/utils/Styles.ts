import {StyleSheet} from 'react-native';
import {colors} from './Colors';
import {px} from './Constants';

export const generalStyles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.lightCyan,
    height: '100%',
  },
  mainPressable: {
    backgroundColor: colors.forestGreen,
    width: 800 * px,
  },
  secondaryPressables: {
    backgroundColor: colors.shadowBlue,
    width: 800 * px,
  },
  imagePressable: {
    backgroundColor: colors.profileGradientEnd,
    width: 800 * px,
  },
  images: {
    width: 200 * px,
    height: 200 * px,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  textError: {
    color: colors.error,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollViewStyles: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
