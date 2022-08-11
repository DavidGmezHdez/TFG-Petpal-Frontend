import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {Formik} from 'formik';
import {LoginSchema} from './lib';
import {useDispatch, useSelector} from 'react-redux';
import {clearErrorUser, login} from '@redux/user/user_actions';
import {getUserError, getUserErrorMsg} from '@redux/user/user_reducer';
import {IUser} from '@utils/Types';
import {colors} from '@utils/Colors';
import {Pressable} from '@components/Pressable';
import {px} from '@utils/Constants';
import {generalStyles} from '@utils/Styles';

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
    const userLogged: IUser = await dispatch(login(email, password));
    if (userLogged.token) {
      if (userLogged.rol === 'Administrador') {
        navigation.navigate('tabs_navigator_admin');
      } else {
        navigation.navigate('tabs_navigator');
      }
    }
  };
  return (
    <View style={generalStyles.container}>
      <View style={styles.header}>
        <Text center xxxxlarge>
          PET PAL
        </Text>
      </View>

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
              {authErrors ? (
                <Text large center style={generalStyles.textError}>
                  {authErrorsMsg}
                </Text>
              ) : null}
              <Pressable
                style={generalStyles.mainPressable}
                onPress={() => handleSubmit()}>
                <Text style={generalStyles.textStyle} center xxlarge>
                  Iniciar Sesión
                </Text>
              </Pressable>
            </View>
            <View style={styles.underForm}>
              <Text xxlarge center style={generalStyles.textStyle}>
                ¿No tienes cuenta? ¡Regístrate!
              </Text>
              <View style={styles.flexRow}>
                <Pressable
                  style={styles.secondaryPressables}
                  onPress={() => {
                    dispatch(clearErrorUser());
                    navigation.navigate('registerUser');
                  }}>
                  <Text style={generalStyles.textStyle} xxlarge center>
                    Registrarse como usuario
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.secondaryPressables}
                  onPress={() => {
                    dispatch(clearErrorUser());
                    resetForm();
                    navigation.navigate('registerProtector');
                  }}>
                  <Text style={generalStyles.textStyle} xxlarge center>
                    Registrarse como protectora
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.secondaryPressables}
                  onPress={() => {
                    dispatch(clearErrorUser());
                    resetForm();
                    navigation.navigate('welcome');
                  }}>
                  <Text style={generalStyles.textStyle} xxlarge center>
                    Volver pantalla bienvenida
                  </Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.lightCyan,
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
    fontSize: 48 * px,
  },

  underForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
    backgroundColor: colors.forestGreen,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  flexRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: '2%',
    padding: '2%',
  },

  secondaryPressables: {
    backgroundColor: colors.shadowBlue,
    width: 800 * px,
  },
});
