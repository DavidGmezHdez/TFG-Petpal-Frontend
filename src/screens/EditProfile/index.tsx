import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, View, TextInput, Image} from 'react-native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {getUser, getUserError, getUserErrorMsg} from '@redux/user/user_reducer';
import {
  clearErrorUser,
  updateUser,
  updateUserProfile,
} from '@redux/user/user_actions';
import {Text} from '@components/TextWrapper';
import {Pressable} from '@components/Pressable';
import {ProtectorSchemaEdit, UserSchemaEdit, UserTypes} from './lib';
import {launchImageLibrary} from 'react-native-image-picker';
import {options, provinces, px} from '@utils/Constants';
import {RootStackParam} from 'navigation/navigation.types';
import {generalStyles, pickerSelectStyles} from '@utils/Styles';

type NavigationStackProp = NativeStackScreenProps<
  RootStackParam,
  'editProfile'
>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

export const EditProfileScreen = ({navigation}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const userError = useSelector(getUserError);
  const userErrorMsg = useSelector(getUserErrorMsg);

  const submit = async (values: UserTypes) => {
    const formData = new FormData();
    const sendUser =
      user.rol === 'Usuario'
        ? {
            ...user,
            email: values.email ?? user.email,
            name: values.name ?? user.name,
            password: values.password ?? user.password,
          }
        : {
            ...user,
            email: values.email ?? user.email,
            name: values.name ?? user.name,
            password: values.password ?? user.password,
            region: values.region ?? user.region,
            direction: values.direction ?? user.direction,
            contactPhone: values.contactPhone ?? user.contactPhone,
          };
    if (values.imageUri) {
      formData.append('image', {
        // @ts-ignore: Type error
        uri: values.imageUri,
        type: values.imageType,
        name: values.name,
      });
      formData.append('_method', 'PATCH');

      await dispatch(updateUserProfile(user._id, formData, user.rol));
    }

    const finalUser = await dispatch(updateUser(user._id, sendUser, user.rol));

    if (finalUser) {
      navigation.navigate('tabs_navigator');
    }
  };

  return (
    <View style={styles.centeredView}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          region: '',
          direction: '',
          contactPhone: '',
          imageUri: '',
          imageType: '',
          imageName: '',
        }}
        onSubmit={submit}
        validationSchema={
          user.rol === 'Usuario' ? UserSchemaEdit : ProtectorSchemaEdit
        }>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          resetForm,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.centeredViewForm}>
            {values.imageUri.length ? (
              <Image source={{uri: values.imageUri}} style={styles.images} />
            ) : null}
            <Pressable
              style={generalStyles.imagePressable}
              onPress={async () => {
                const {assets} = await launchImageLibrary(options);
                setFieldValue('imageUri', assets![0].uri);
                setFieldValue('imageType', assets![0].type);
                setFieldValue('imageName', assets![0].fileName);
              }}>
              <Text large style={generalStyles.textStyle}>
                {user.image ? 'Cambiar foto' : 'Subir foto'}
              </Text>
            </Pressable>

            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder={'Email'}
              style={generalStyles.textInput}
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
              style={generalStyles.textInput}
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
              style={generalStyles.textInput}
            />
            {errors.password && touched.password ? (
              <Text large center style={generalStyles.textError}>
                {errors.password}
              </Text>
            ) : null}

            {user.rol === 'Protectora' ? (
              <>
                <RNPickerSelect
                  onValueChange={value => setFieldValue('region', value)}
                  items={provinces}
                  placeholder={{label: 'Cualquier provincia', value: null}}
                  value={values.region}
                  style={pickerSelectStyles}
                />
                {errors.region && touched.region ? (
                  <Text large center style={generalStyles.textError}>
                    {errors.region}
                  </Text>
                ) : null}

                <TextInput
                  onChangeText={handleChange('direction')}
                  onBlur={handleBlur('direction')}
                  value={values.direction}
                  placeholder={'Direccion'}
                  style={generalStyles.textInput}
                />
                {errors.password && touched.password ? (
                  <Text large center style={generalStyles.textError}>
                    {errors.password}
                  </Text>
                ) : null}

                <TextInput
                  onChangeText={handleChange('contactPhone')}
                  value={values.contactPhone}
                  keyboardType="numeric"
                  placeholder={'Teléfono de contacto'}
                  maxLength={9}
                  style={generalStyles.textInput}
                />
                {errors.contactPhone && touched.contactPhone ? (
                  <Text large center style={generalStyles.textError}>
                    {errors.contactPhone}
                  </Text>
                ) : null}
              </>
            ) : null}

            {userError && userErrorMsg ? (
              <Text large>{userErrorMsg}</Text>
            ) : null}
            <Pressable
              style={generalStyles.mainPressable}
              onPress={handleSubmit}>
              <Text large style={generalStyles.textStyle}>
                Actualizar perfil
              </Text>
            </Pressable>
            <Pressable
              style={generalStyles.cancelPressable}
              onPress={() => {
                dispatch(clearErrorUser());
                navigation.navigate('tabs_navigator');
                resetForm();
              }}>
              <Text large style={generalStyles.textStyle}>
                Cancelar
              </Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredViewForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'space-around',
    height: '50%',
    width: '100%',
    padding: '2%',
  },
  textInput: {
    textAlignVertical: 'top',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 2,
    width: '100%',
    height: 100,
    padding: 10,
    marginBottom: 10,
  },
  images: {
    width: 200 * px,
    height: 200 * px,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
});
