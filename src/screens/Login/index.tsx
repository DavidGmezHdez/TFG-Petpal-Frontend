import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {Formik} from 'formik';
import {LoginSchema} from './lib';
import {useDispatch, useSelector} from 'react-redux';
import {clearErrorUser, login} from '@redux/user/user_actions';
import {getUserError, getUserErrorMsg} from '@redux/user/user_reducer';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'login'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

export const Login = ({navigation}: Props) => {
  const dispatch = useDispatch<any>();
  const authErrors = useSelector(getUserError);
  const authErrorsMsg = useSelector(getUserErrorMsg);

  const _handleSubmit = async (values: any) => {
    const {email, password} = values;
    const userLogged = await dispatch(login(email, password));
    if (userLogged.token) {
      navigation.navigate('tabs_navigator');
    }
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: 'test@test.co', password: 'test12341234'}}
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
            {authErrors ? <Text large>{authErrorsMsg}</Text> : null}
            <Button onPress={() => handleSubmit()} title="Iniciar Sesión" />
          </View>
        )}
      </Formik>
      <Button
        title="Registrarse"
        onPress={() => {
          dispatch(clearErrorUser());
          navigation.navigate('registerUser');
        }}
      />
      <Button
        title="Registrarse como protectora"
        onPress={() => {
          dispatch(clearErrorUser());
          navigation.navigate('registerProtector');
        }}
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
