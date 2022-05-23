import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {UserSchema, UserTypes} from './lib';
import {Text} from 'components/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {TouchableOpacity} from 'react-native-gesture-handler';

type NavigationStackProp = NativeStackScreenProps<
  RootStackParam,
  'registerUser'
>;

type RegisterUserProps = {
  navigation: NavigationStackProp['navigation'];
};

export const RegisterUser = ({navigation}: RegisterUserProps) => {
  const _handleSubmit = (values: UserTypes) => {
    console.log(values);
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
              placeholder={'Contraseña'}
            />
            {errors.password && touched.password ? (
              <Text>{errors.password}</Text>
            ) : null}
            <TouchableOpacity onPress={handleSubmit} title="Registrarme" />
          </View>
        )}
      </Formik>
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
