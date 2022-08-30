import React, {Dispatch, SetStateAction} from 'react';
import {Modal, StyleSheet, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {clearErrorUser} from '@redux/user/user_actions';
import {Text} from '@components/TextWrapper';
import {IPost} from '@utils/Types';
import {ProfilePost} from './components/ProfilePost';
import {Pressable} from '@components/Pressable';
import {generalStyles} from '@utils/Styles';

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
      <View style={generalStyles.modalBackground}>
        <View style={generalStyles.modalView}>
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
          <Pressable style={generalStyles.cancelPressable} onPress={cancel}>
            <Text large style={generalStyles.textStyle}>
              Cerrar
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
