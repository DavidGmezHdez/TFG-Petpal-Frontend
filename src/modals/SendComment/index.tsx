import React, {Dispatch, SetStateAction} from 'react';
import {Modal, StyleSheet, View, TextInput} from 'react-native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {clearErrorPost, sendComment} from '@redux/posts/posts_actions';
import {CommentSchema} from './lib';
import {Text} from '@components/TextWrapper';
import {Pressable} from '@components/Pressable';
import {generalStyles} from '@utils/Styles';

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
      <View style={generalStyles.modalBackground}>
        <View style={generalStyles.modalView}>
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
              <View style={generalStyles.centeredViewForm}>
                <TextInput
                  onChangeText={handleChange('text')}
                  onBlur={handleBlur('text')}
                  value={values.text}
                  placeholder={'Comentario...'}
                  maxLength={30}
                  style={styles.textInput}
                />
                {errors.text && touched.text ? (
                  <Text large center style={generalStyles.textError}>
                    {errors.text}
                  </Text>
                ) : null}
                <Pressable
                  style={generalStyles.mainPressable}
                  onPress={() => handleSubmit()}>
                  <Text large style={generalStyles.textStyle}>
                    Enviar Comentario
                  </Text>
                </Pressable>
                <Pressable
                  style={generalStyles.cancelPressable}
                  onPress={cancel}>
                  <Text large style={generalStyles.textStyle}>
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
