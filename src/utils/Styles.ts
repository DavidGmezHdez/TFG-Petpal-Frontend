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
  loadingContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
  cancelPressable: {
    backgroundColor: colors.secondary,
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
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    width: '90%',
    height: '90%',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredViewForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-around',
    padding: '2%',
    height: '100%',
    width: '100%',
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 800 * px,
    backgroundColor: colors.white,
    margin: '2%',
    padding: '2%',
    textAlign: 'center',
    borderRadius: 8,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    width: '100%',
    backgroundColor: colors.white,
    margin: '2%',
    padding: '2%',
    textAlign: 'center',
    borderRadius: 8,
    borderColor: colors.primary,
    borderWidth: 7,
    borderStyle: 'solid',
  },
});
