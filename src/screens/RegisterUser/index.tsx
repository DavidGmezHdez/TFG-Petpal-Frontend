import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
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
import {colors} from '@utils/Colors';
import {generalStyles} from '@utils/Styles';
import {ScrollView} from 'react-native-gesture-handler';

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
    <View style={generalStyles.container}>
      <View style={styles.header}>
        <Text center xxxxlarge>
          REGISTRO USUARIO
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
                  maxLength={20}
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
                  maxLength={30}
                />
                {errors.password && touched.password ? (
                  <Text large center style={generalStyles.textError}>
                    {errors.password}
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
                    Subir Foto de perfil
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
                {authErrors ? <Text large>{authErrorsMsg}</Text> : null}
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
                  {REGISTER_PROTECTOR}
                </Text>
                <Pressable
                  style={styles.secondaryPressables}
                  onPress={() => {
                    resetForm();
                    navigation.navigate('registerProtector');
                  }}>
                  <Text xxlarge center style={generalStyles.textStyle}>
                    Registrarme como protectora
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
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
  textError: {
    color: colors.error,
  },
});
