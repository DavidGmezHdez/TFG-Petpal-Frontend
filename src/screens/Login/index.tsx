import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {Text} from '@components/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {Formik} from 'formik';
import {LoginSchema} from './lib';
import {useDispatch} from 'react-redux';
import {login} from '@redux/user/user_actions';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'login'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

export const Login = ({navigation}: Props) => {
  const dispatch = useDispatch<any>();

  const _handleSubmit = async (values: any) => {
    console.log(values);
    const {email, password} = values;
    const res = await dispatch(login(email, password));
    console.log(res);
    if (res) {
      navigation.navigate('tabs_navigator');
    }
  };

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
              secureTextEntry
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
