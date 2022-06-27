import React, {Dispatch, SetStateAction} from 'react';
import {Modal, StyleSheet, View, TextInput, Alert} from 'react-native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {sendPost} from '@redux/posts/posts_actions';
import {updateUser} from '@redux/user/user_actions';
import {PostSchema} from './lib';
import {Text} from '@components/TextWrapper';
import {Pressable} from '@components/Pressable';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const CreatePostModal = ({showModal, setShowModal}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const _handleSubmit = async (values: any) => {
    try {
      const post = {
        text: values.text,
        author: user._id,
        name: user.name,
        likes: 0,
        image: '',
      };

      const createdPost = await dispatch(sendPost(post));
      const posts = [...(user.posts ?? []), createdPost._id];
      await dispatch(updateUser(user._id, {posts}));
      setShowModal(false);
    } catch (e) {
      console.log(e);
      Alert.alert(e);
    }
  };
  return (
    <Modal animationType={'fade'} transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Formik
            initialValues={{text: ''}}
            onSubmit={_handleSubmit}
            validationSchema={PostSchema}>
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
                  onChangeText={handleChange('text')}
                  onBlur={handleBlur('text')}
                  value={values.text}
                  placeholder={'Post....'}
                  multiline={true}
                  numberOfLines={4}
                  maxLength={300}
                  style={styles.textInput}
                />
                {errors.text && touched.text ? (
                  <Text large color={'red'}>
                    {errors.text}
                  </Text>
                ) : null}
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => handleSubmit()}>
                  <Text large style={styles.textStyle}>
                    Enviar Tweet
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setShowModal(false)}>
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
    height: 300,
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
