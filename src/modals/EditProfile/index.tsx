import React, {Dispatch, SetStateAction} from 'react';
import {Modal, StyleSheet, View, TextInput} from 'react-native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {getUser, getUserError, getUserErrorMsg} from '@redux/user/user_reducer';
import {clearErrorUser, updateUser} from '@redux/user/user_actions';
import {Text} from '@components/TextWrapper';
import {Pressable} from '@components/Pressable';
import {UserTypes} from '@screens/RegisterUser/lib';
import {UserSchemaEdit} from './lib';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const EditProfileModal = ({showModal, setShowModal}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const userError = useSelector(getUserError);
  const userErrorMsg = useSelector(getUserErrorMsg);

  const _handleSubmit = async (values: UserTypes) => {
    const sendUser = {
      ...user,
      email: values.email,
      name: values.name,
      password: values.password,
    };

    const finalUser = await dispatch(updateUser(user._id, sendUser, user.rol));
    if (finalUser) setShowModal(false);
    try {
    } catch (e) {
      console.log(e);
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
            }}
            onSubmit={_handleSubmit}
            validationSchema={UserSchemaEdit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.centeredViewForm}>
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
});
