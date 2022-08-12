import React from 'react';
import {ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import FastImage from 'react-native-fast-image';
import {ProtectorSchema, ProtectorTypes} from './lib';
import {Text} from '@components/TextWrapper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {clearErrorUser, register} from '@redux/user/user_actions';
import {useDispatch, useSelector} from 'react-redux';
import {getUserError, getUserErrorMsg} from '@redux/user/user_reducer';
import {options, provinces, px} from '@utils/Constants';
import {Pressable} from '@components/Pressable';
import {launchImageLibrary} from 'react-native-image-picker';
import {colors} from '@utils/Colors';
import {generalStyles} from '@utils/Styles';

type NavigationStackProp = NativeStackScreenProps<
  RootStackParam,
  'registerProtector'
>;

type RegisterProtectorProps = {
  navigation: NavigationStackProp['navigation'];
};

export const RegisterProtector = ({navigation}: RegisterProtectorProps) => {
  const dispatch = useDispatch<any>();
  const authErrors = useSelector(getUserError);
  const authErrorsMsg = useSelector(getUserErrorMsg);

  const submit = async (values: ProtectorTypes) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('region', values.region);
      formData.append('direction', values.direction);
      formData.append('contactPhone', values.contactPhone);
      formData.append('rol', 'Protectora');

      if (values.imageUri) {
        formData.append('image', {
          // @ts-ignore: Type error
          uri: values.imageUri,
          type: values.imageType,
          name: values.name,
        });
      }

      const res = await dispatch(register(formData, 'Protectora'));
      if (res) {
        navigation.navigate('login');
        dispatch(clearErrorUser());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={generalStyles.container}>
      <View style={styles.header}>
        <Text center xxxxlarge>
          REGISTRO PROTECTORA
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={generalStyles.scrollViewStyles}
        showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            email: '',
            password: '',
            name: '',
            region: '',
            contactPhone: '',
            direction: '',
            imageUri: '',
            imageType: '',
            imageName: '',
          }}
          validationSchema={ProtectorSchema}
          onSubmit={submit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            resetForm,
          }) => (
            <>
              <View>
                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder={'Email'}
                  style={styles.input}
                />
                {errors.email && touched.email ? (
                  <Text large center style={generalStyles.textError}>
                    {errors.email}
                  </Text>
                ) : null}

                <TextInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholder={'Nombre'}
                  style={styles.input}
                />
                {errors.name && touched.name ? (
                  <Text large center style={generalStyles.textError}>
                    {errors.name}
                  </Text>
                ) : null}

                <TextInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  placeholder={'Contraseña'}
                  style={styles.input}
                />
                {errors.password && touched.password ? (
                  <Text large center style={generalStyles.textError}>
                    {errors.password}
                  </Text>
                ) : null}

                <RNPickerSelect
                  onValueChange={value => setFieldValue('region', value)}
                  items={provinces}
                  placeholder={{label: 'Cualquier provincia', value: null}}
                  value={values.region}
                  style={pickerSelectStyles}
                />
                {errors.region && touched.region ? (
                  <Text large center style={generalStyles.textError}>
                    {errors.region}
                  </Text>
                ) : null}

                <TextInput
                  onChangeText={handleChange('direction')}
                  onBlur={handleBlur('direction')}
                  value={values.direction}
                  placeholder={'Direccion'}
                  style={styles.input}
                />
                {errors.password && touched.password ? (
                  <Text large center style={generalStyles.textError}>
                    {errors.password}
                  </Text>
                ) : null}

                <TextInput
                  onChangeText={handleChange('contactPhone')}
                  value={values.contactPhone}
                  keyboardType="numeric"
                  placeholder={'Teléfono de contacto'}
                  maxLength={9}
                  style={styles.input}
                />
                {errors.contactPhone && touched.contactPhone ? (
                  <Text large center style={generalStyles.textError}>
                    {errors.contactPhone}
                  </Text>
                ) : null}

                <Pressable
                  style={styles.imagePressable}
                  onPress={async () => {
                    const {assets} = await launchImageLibrary(options);
                    setFieldValue('imageUri', assets![0].uri);
                    setFieldValue('imageType', assets![0].type);
                    setFieldValue('imageName', assets![0].fileName);
                  }}>
                  <Text large center style={generalStyles.textStyle}>
                    Subir Foto
                  </Text>
                </Pressable>
                {values.imageUri.length ? (
                  <View style={styles.imageWrapper}>
                    <FastImage
                      source={{uri: values.imageUri}}
                      style={styles.images}
                    />
                  </View>
                ) : null}
                {authErrors ? (
                  <Text large center style={generalStyles.textError}>
                    {authErrorsMsg}
                  </Text>
                ) : null}
                <Pressable
                  style={generalStyles.mainPressable}
                  onPress={handleSubmit}>
                  <Text xxlarge center style={generalStyles.textStyle}>
                    Registrarme
                  </Text>
                </Pressable>
              </View>
              <View>
                <Text xxlarge center>
                  ¿Quieres registrate como usuario?
                </Text>
                <Pressable
                  style={styles.secondaryPressables}
                  onPress={() => {
                    resetForm();
                    navigation.navigate('registerUser');
                  }}>
                  <Text xxlarge center style={generalStyles.textStyle}>
                    Registrarme como usuario
                  </Text>
                </Pressable>
                <Text center xxlarge>
                  ¿Ya tienes cuenta? ¡Inicia sesión!
                </Text>
                <Pressable
                  style={styles.secondaryPressables}
                  onPress={() => {
                    resetForm();
                    navigation.navigate('login');
                  }}>
                  <Text center xxlarge style={generalStyles.textStyle}>
                    Volver a inicio de sesión
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60 * px,
    padding: '2%',
    backgroundColor: colors.lightBlue,
    width: '100%',
  },
  input: {
    width: 800 * px,
    backgroundColor: colors.white,
    margin: '2%',
    padding: '2%',
    textAlign: 'center',
    borderRadius: 8,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  secondaryPressables: {
    backgroundColor: colors.shadowBlue,
    width: 800 * px,
  },
  imagePressable: {
    backgroundColor: colors.profileGradientEnd,
    width: 800 * px,
  },
  imageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  images: {
    width: 400 * px,
    height: 400 * px,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
});

const pickerSelectStyles = StyleSheet.create({
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
    width: 800 * px,
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
