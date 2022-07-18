import React, {Dispatch, SetStateAction} from 'react';
import {Modal, StyleSheet, View, TextInput, Image} from 'react-native';
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
import {options, ProtectorSchemaEdit, UserSchemaEdit, UserTypes} from './lib';
import {launchImageLibrary} from 'react-native-image-picker';
import {provinces, px} from '@utils/Constants';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const EditProfileModal = ({showModal, setShowModal}: Props) => {
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
            email: values.email,
            name: values.name,
            password: values.password,
          }
        : {
            ...user,
            email: values.email,
            name: values.name,
            password: values.password,
            region: values.region,
            direction: values.direction,
            contactPhone: values.contactPhone,
          };

    console.log(user);
    const finalUser = await dispatch(updateUser(user._id, sendUser, user.rol));

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

    if (finalUser) {
      setShowModal(false);
    }
  };

  const cancel = () => {
    dispatch(clearErrorUser());
    setShowModal(false);
  };

  return (
    <Modal animationType={'fade'} transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Formik
            initialValues={{
              name: user.name,
              email: user.email,
              password: '',
              region: user.region ?? '',
              direction: user.direction ?? '',
              contactPhone: user.contactPhone ?? '',
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
              values,
              errors,
              touched,
            }) => (
              <View style={styles.centeredViewForm}>
                {values.imageUri.length ? (
                  <Image
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
                    {user.image ? 'Cambiar foto' : 'Subir foto'}
                  </Text>
                </Pressable>

                <TextInput
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder={'Email'}
                />
                {errors.email && touched.email ? (
                  <Text large>{errors.email}</Text>
                ) : null}

                <TextInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholder={'Nombre'}
                />
                {errors.name && touched.name ? (
                  <Text large>{errors.name}</Text>
                ) : null}

                <TextInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  placeholder={'Contraseña'}
                />
                {errors.password && touched.password ? (
                  <Text large>{errors.password}</Text>
                ) : null}

                {user.rol === 'Protectora' ? (
                  <>
                    <RNPickerSelect
                      onValueChange={value => setFieldValue('region', value)}
                      items={provinces}
                      placeholder={{label: 'Cualquier provincia', value: null}}
                      value={values.region}
                    />
                    {errors.region && touched.region ? (
                      <Text large>{errors.region}</Text>
                    ) : null}

                    <TextInput
                      onChangeText={handleChange('direction')}
                      onBlur={handleBlur('direction')}
                      value={values.direction}
                      placeholder={'Direccion'}
                    />
                    {errors.password && touched.password ? (
                      <Text large>{errors.password}</Text>
                    ) : null}

                    <TextInput
                      onChangeText={handleChange('contactPhone')}
                      value={values.contactPhone}
                      keyboardType="numeric"
                      placeholder={'Teléfono de contacto'}
                      maxLength={9}
                    />
                    {errors.contactPhone && touched.contactPhone ? (
                      <Text large color={'red'}>
                        {errors.contactPhone}
                      </Text>
                    ) : null}
                  </>
                ) : null}

                {userError && userErrorMsg ? (
                  <Text large>{userErrorMsg}</Text>
                ) : null}
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={handleSubmit}>
                  <Text large style={styles.textStyle}>
                    Actualizar perfil
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={cancel}>
                  <Text large style={styles.textStyle}>
                    Cancelar
                  </Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    width: '90%',
    height: '90%',
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
