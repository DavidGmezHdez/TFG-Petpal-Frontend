import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {ProtectorSchema, ProtectorTypes} from './lib';
import {Text} from '@components/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';

type NavigationStackProp = NativeStackScreenProps<
  RootStackParam,
  'registerProtector'
>;

type RegisterProtectorProps = {
  navigation: NavigationStackProp['navigation'];
};

const REGISTER_USER = '¿Quieres registrarte como usuario?';

export const RegisterProtector = ({navigation}: RegisterProtectorProps) => {
  const _handleSubmit = (values: ProtectorTypes) => {};

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: '', password: '', name: ''}}
        validationSchema={ProtectorSchema}
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
              placeholder={'Contraseña'}
            />
            {errors.password && touched.password ? (
              <Text>{errors.password}</Text>
            ) : null}
            <Button onPress={() => handleSubmit()} title="Registrarme" />
          </View>
        )}
      </Formik>
      <Text>{REGISTER_USER}</Text>
      <Button
        onPress={() => {
          navigation.navigate('registerUser');
        }}
        title="Registrarme como usuario"
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
