import React, {Dispatch, SetStateAction, useCallback} from 'react';
import {Modal, StyleSheet, View, TextInput} from 'react-native';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {getUser} from '@redux/user/user_reducer';
import {clearErrorPost, sendPost} from '@redux/posts/posts_actions';
import {updateUser} from '@redux/user/user_actions';
import {PostSchema} from './lib';
import {Text} from '@components/TextWrapper';
import {Pressable} from '@components/Pressable';
import FastImage from 'react-native-fast-image';

import {options, px} from '@utils/Constants';
import {generalStyles} from '@utils/Styles';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const CreatePostModal = ({showModal, setShowModal}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);

  const _handleSubmit = useCallback(
    async (values: any) => {
      try {
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('text', values.text);
        formData.append('author', user._id);

        if (values.imageUri) {
          formData.append('image', {
            // @ts-ignore: Type error
            uri: values.imageUri,
            type: values.imageType,
            name: user.name,
          });
        }

        const createdPost = await dispatch(sendPost(formData));
        if (createdPost) {
          const posts = [...(user.posts ?? []), createdPost._id];
          await dispatch(updateUser(user._id, {posts}, user.rol));
          setShowModal(false);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch, setShowModal, user],
  );

  const cancel = useCallback(() => {
    dispatch(clearErrorPost());
    setShowModal(false);
  }, [dispatch, setShowModal]);

  return (
    <Modal animationType={'fade'} transparent={true} visible={showModal}>
      <View style={generalStyles.modalBackground}>
        <View style={generalStyles.modalView}>
          <Formik
            initialValues={{
              text: '',
              imageUri: '',
              imageType: '',
              imageName: '',
            }}
            onSubmit={_handleSubmit}
            validationSchema={PostSchema}>
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
                <TextInput
                  onChangeText={handleChange('text')}
                  onBlur={handleBlur('text')}
                  value={values.text}
                  placeholder={'Post....'}
                  multiline={true}
                  numberOfLines={4}
                  maxLength={60}
                  style={styles.textInput}
                />
                {errors.text && touched.text ? (
                  <Text large center style={generalStyles.textError}>
                    {errors.text}
                  </Text>
                ) : null}

                {!values.imageUri ? (
                  <Pressable
                    style={generalStyles.imagePressable}
                    onPress={async () => {
                      const {assets} = await launchImageLibrary(options);
                      setFieldValue('imageUri', assets![0].uri);
                      setFieldValue('imageType', assets![0].type);
                      setFieldValue('imageName', assets![0].fileName);
                    }}>
                    <Text large center style={generalStyles.textStyle}>
                      Subir Foto
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={generalStyles.imagePressable}
                    onPress={async () => {
                      setFieldValue('imageUri', '');
                      setFieldValue('imageType', '');
                      setFieldValue('imageName', '');
                    }}>
                    <Text large center style={generalStyles.textStyle}>
                      Borrar foto
                    </Text>
                  </Pressable>
                )}

                {values.imageUri.length ? (
                  <FastImage
                    source={{uri: values.imageUri}}
                    style={styles.images}
                  />
                ) : null}
                <Pressable
                  style={generalStyles.mainPressable}
                  onPress={() => handleSubmit()}>
                  <Text large center style={generalStyles.textStyle}>
                    Enviar Post
                  </Text>
                </Pressable>
                <Pressable
                  style={generalStyles.cancelPressable}
                  onPress={cancel}>
                  <Text large center style={generalStyles.textStyle}>
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
