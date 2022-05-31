import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {UserSchema, UserTypes} from './lib';
import {Text} from '@components/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {useDispatch} from 'react-redux';
import {register} from '@redux/user/user_actions';
import config from '@config';
import Config from 'react-native-config';

type NavigationStackProp = NativeStackScreenProps<
  RootStackParam,
  'registerUser'
>;

type RegisterUserProps = {
  navigation: NavigationStackProp['navigation'];
};

const REGISTER_PROTECTOR = '¿Quieres registrarte como protectora?';

export const RegisterUser = ({navigation}: RegisterUserProps) => {
  const dispatch = useDispatch();
  const _handleSubmit = async (values: UserTypes) => {
    console.log(values);
    console.log(config.apiUrl);
    console.log('config global', Config.API_URL_LOCAL);
    try {
      const {name, email, password} = values;
      const res = await register(name, email, password);
      console.log(res);
      //navigation.navigate('login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: '', password: '', name: ''}}
        validationSchema={UserSchema}
        onSubmit={_handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
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
            <Button onPress={() => handleSubmit()} title="Registrarme" />
          </View>
        )}
      </Formik>
      <Text>{REGISTER_PROTECTOR}</Text>
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
});
