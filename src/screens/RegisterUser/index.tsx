import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';
import {UserSchema, UserTypes} from './lib';
import {Text} from '@components/TextWrapper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '@redux/user/user_actions';
import {Pressable} from '@components/Pressable';
import {getUserError, getUserErrorMsg} from '@redux/user/user_reducer';
import {options, px} from '@utils/Constants';

type NavigationStackProp = NativeStackScreenProps<
  RootStackParam,
  'registerUser'
>;

type RegisterUserProps = {
  navigation: NavigationStackProp['navigation'];
};

const REGISTER_PROTECTOR = '¿Quieres registrarte como protectora?';

export const RegisterUser = ({navigation}: RegisterUserProps) => {
  const dispatch = useDispatch<any>();
  const authErrors = useSelector(getUserError);
  const authErrorsMsg = useSelector(getUserErrorMsg);

  const _handleSubmit = async (values: UserTypes) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('rol', 'Usuario');

    if (values.imageUri) {
      formData.append('image', {
        // @ts-ignore: Type error
        uri: values.imageUri,
        type: values.imageType,
        name: values.name,
      });
    }
    const res = await dispatch(register(formData, 'Usuario'));
    if (res) {
      navigation.navigate('login');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          name: '',
          imageUri: '',
          imageName: '',
          imageType: '',
        }}
        validationSchema={UserSchema}
        onSubmit={_handleSubmit}>
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
                Subir Foto de perfil
              </Text>
            </Pressable>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder={'Email'}
            />
            {errors.email && touched.email ? <Text>{errors.email}</Text> : null}

            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              placeholder={'Nombre'}
            />
            {errors.name && touched.name ? <Text>{errors.name}</Text> : null}

            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
              placeholder={'Contraseña'}
            />
            {errors.password && touched.password ? (
              <Text>{errors.password}</Text>
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
      <Text large>{REGISTER_PROTECTOR}</Text>
      <Button
        onPress={() => {
          navigation.navigate('registerProtector');
        }}
        title="Registrarme como protectora"
      />
    </View>
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
