import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPost} from 'utils/Types';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {deletePost, updatePost} from '@redux/posts/posts_actions';
import {updateUser} from '@redux/user/user_actions';
import {Pressable} from '@components/Pressable';

type Props = {
  post: IPost;
};

export const Post = ({post}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const likedByUser = user.likedPosts?.some(pst => pst === post._id);
  const ownedByUser = user.posts?.some(pst => pst === post._id);

  const _likePost = async (liked: boolean) => {
    try {
      const likedPosts = liked
        ? user.likedPosts?.filter(pst => pst !== post._id)
        : [...(user.likedPosts ?? []), post._id];

      const likes = liked ? post.likes - 1 : post.likes + 1;

      await dispatch(updatePost(post._id, {likes}));
      await dispatch(updateUser(user._id, {likedPosts}));
    } catch (e) {
      console.log(e);
      Alert.alert(e);
    }
  };

  const _deletePost = async () => {
    try {
      const posts = user.posts?.filter(pst => pst !== post._id);
      await dispatch(deletePost(post._id));
      await dispatch(updateUser(user._id, {posts}));
    } catch (e) {
      console.log(e);
      Alert.alert(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text large>Post: {post.text}</Text>
      <Text large>Creador: {post.name}</Text>
      <Text large>
        Fecha:
        {post.createdAt
          ? format(new Date(post.createdAt), 'hh:mm dd-MM-yy')
          : null}{' '}
      </Text>
      <Text large>Likes: {post.likes}</Text>
      {!ownedByUser ? (
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => (likedByUser ? _likePost(true) : _likePost(false))}>
          {likedByUser ? (
            <Text large style={styles.textStyle}>
              Quitar Like
            </Text>
          ) : (
            <Text large style={styles.textStyle}>
              Dar like
            </Text>
          )}
        </Pressable>
      ) : null}

      {ownedByUser ? (
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={_deletePost}>
          <Text large style={styles.textStyle}>
            Borrar Post
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
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
});
