import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from '@components/Text';
import {IPost} from 'utils/Types';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {updatePost} from '@redux/posts/posts_actions';
import {updateUser} from '@redux/user/user_actions';

type Props = {
  post: IPost;
};

export const Post = ({post}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const likedByUser = user.likedPosts?.find(pst => pst === post._id);

  const likePost = async (liked: boolean) => {
    const likedPosts = liked
      ? user.likedPosts?.filter(pst => pst !== post._id)
      : [...(user.likedPosts ?? []), post._id];

    const likes = liked ? post.likes - 1 : post.likes + 1;

    await dispatch(updatePost(post._id, {likes}));
    await dispatch(updateUser(user._id, {likedPosts}));
  };

  return (
    <View style={styles.container}>
      <Text>Post: {post.text}</Text>
      <Text>Creador: {post.name}</Text>
      <Text>Fecha: {format(new Date(post.createdAt), 'hh:mm dd-MM-yy')} </Text>
      <Text>Likes: {post.likes}</Text>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => (likedByUser ? likePost(true) : likePost(false))}>
        {likedByUser ? (
          <Text style={styles.textStyle}>Quitar Like</Text>
        ) : (
          <Text style={styles.textStyle}>Dar like</Text>
        )}
      </Pressable>
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
