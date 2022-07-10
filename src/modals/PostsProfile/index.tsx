import React, {Dispatch, SetStateAction} from 'react';
import {Modal, StyleSheet, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {clearErrorUser} from '@redux/user/user_actions';
import {Text} from '@components/TextWrapper';
import {IPost} from '@utils/Types';
import {ProfilePost} from './components/ProfilePost';
import {Pressable} from '@components/Pressable';

type Props = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const PostsProfileModal = ({showModal, setShowModal}: Props) => {
  const dispatch = useDispatch<any>();
  const posts = useSelector(getUser).posts;

  const cancel = () => {
    dispatch(clearErrorUser());
    setShowModal(false);
  };

  return (
    <Modal animationType={'fade'} transparent={true} visible={showModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text large>Mis Posts</Text>
          <ScrollView>
            {posts.length > 0 ? (
              posts.map((post: IPost) => (
                <ProfilePost key={post._id} post={post} />
              ))
            ) : (
              <Text large>No has enviado ningún post</Text>
            )}
          </ScrollView>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={cancel}>
            <Text large style={styles.textStyle}>
              Cerrar
            </Text>
          </Pressable>
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
