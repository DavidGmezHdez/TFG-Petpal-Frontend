import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {Text} from '@components/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {Formik} from 'formik';
import {LoginSchema} from './lib';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'login'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

const _handleSubmit = (values: any) => {
  console.log(values);
};

export const Login = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
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
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholder={'Contraseña'}
            />
            {errors.password && touched.password ? (
              <Text>{errors.password}</Text>
            ) : null}
            <Button onPress={() => handleSubmit()} title="Iniciar Sesión" />
          </View>
        )}
      </Formik>
      <Button
        title="Tabs"
        onPress={() => navigation.navigate('tabs_navigator')}
      />
      <Button
        title="Registrarse"
        onPress={() => navigation.navigate('registerUser')}
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
