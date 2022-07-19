import React from 'react';
import {Button, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import FastImage from 'react-native-fast-image';
import {ProtectorSchema, ProtectorTypes} from './lib';
import {Text} from '@components/TextWrapper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {register} from '@redux/user/user_actions';
import {useDispatch, useSelector} from 'react-redux';
import {getUserError, getUserErrorMsg} from '@redux/user/user_reducer';
import {options, provinces, px} from '@utils/Constants';
import {Pressable} from '@components/Pressable';
import {launchImageLibrary} from 'react-native-image-picker';

type NavigationStackProp = NativeStackScreenProps<
  RootStackParam,
  'registerProtector'
>;

type RegisterProtectorProps = {
  navigation: NavigationStackProp['navigation'];
};

const REGISTER_USER = '¿Quieres registrarte como usuario?';

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
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
          }) => (
            <View>
              {values.imageUri.length ? (
                <FastImage
                  source={{uri: values.imageUri}}
                  style={styles.images}
                />
              ) : null}
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={async () => {
                  const {assets} = await launchImageLibrary(options);
                  setFieldValue('imageUri', assets![0].uri);
                  setFieldValue('imageType', assets![0].type);
                  setFieldValue('imageName', assets![0].fileName);
                }}>
                <Text large style={styles.textStyle}>
                  Subir Foto
                </Text>
              </Pressable>

              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder={'Email'}
              />
              {errors.email && touched.email ? (
                <Text large>{errors.email}</Text>
              ) : null}

              <TextInput
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                placeholder={'Nombre'}
              />
              {errors.name && touched.name ? (
                <Text large>{errors.name}</Text>
              ) : null}

              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
                placeholder={'Contraseña'}
              />
              {errors.password && touched.password ? (
                <Text large>{errors.password}</Text>
              ) : null}

              <RNPickerSelect
                onValueChange={value => setFieldValue('region', value)}
                items={provinces}
                placeholder={{label: 'Cualquier provincia', value: null}}
                value={values.region}
              />
              {errors.region && touched.region ? (
                <Text large>{errors.region}</Text>
              ) : null}

              <TextInput
                onChangeText={handleChange('direction')}
                onBlur={handleBlur('direction')}
                value={values.direction}
                placeholder={'Direccion'}
              />
              {errors.password && touched.password ? (
                <Text large>{errors.password}</Text>
              ) : null}

              <TextInput
                onChangeText={handleChange('contactPhone')}
                value={values.contactPhone}
                keyboardType="numeric"
                placeholder={'Teléfono de contacto'}
                maxLength={9}
              />
              {errors.contactPhone && touched.contactPhone ? (
                <Text large color={'red'}>
                  {errors.contactPhone}
                </Text>
              ) : null}
              {authErrors ? <Text large>{authErrorsMsg}</Text> : null}
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={handleSubmit}>
                <Text large style={styles.textStyle}>
                  Registrarme
                </Text>
              </Pressable>
            </View>
          )}
        </Formik>

        <Text large>{REGISTER_USER}</Text>
        <Button
          onPress={() => {
            navigation.navigate('registerUser');
          }}
          title="Registrarme como usuario"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
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
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  images: {
    width: 200 * px,
    height: 200 * px,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
});
