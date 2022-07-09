import React, {Dispatch, SetStateAction} from 'react';
import {Modal, StyleSheet, View, TextInput} from 'react-native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {clearErrorPost, sendComment} from '@redux/posts/posts_actions';
import {CommentSchema} from './lib';
import {Text} from '@components/TextWrapper';
import {Pressable} from '@components/Pressable';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  postId: string;
};

export const SendCommentModal = ({showModal, setShowModal, postId}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);

  const _handleSubmit = async (values: any) => {
    try {
      const comment = {
        comment: values.text,
        author: user._id,
        authorName: user.name,
      };

      const createdPost = await dispatch(sendComment(postId, comment));
      if (createdPost) {
        setShowModal(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const cancel = () => {
    dispatch(clearErrorPost());
    setShowModal(false);
  };

  return (
    <Modal animationType={'fade'} transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Formik
            initialValues={{text: ''}}
            onSubmit={_handleSubmit}
            validationSchema={CommentSchema}>
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
                  placeholder={'Comentario...'}
                  maxLength={30}
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
                    Enviar Comentario
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
