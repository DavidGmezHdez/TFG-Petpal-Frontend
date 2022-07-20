import React, {Dispatch, SetStateAction, useCallback, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPost} from 'utils/Types';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {
  deleteComment,
  deletePost,
  updatePost,
} from '@redux/posts/posts_actions';
import {updateUser} from '@redux/user/user_actions';
import {Pressable} from '@components/Pressable';
import FastImage from 'react-native-fast-image';
import {px} from '@utils/Constants';

type Props = {
  post: IPost;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setPostId: Dispatch<SetStateAction<string>>;
};

export const Post = ({post, setShowModal, setPostId}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const likedByUser = user.likedPosts?.some(pst => pst === post._id);
  const ownedByUser = post.author === user._id;

  const [expanded, setExpanded] = useState<boolean>(false);

  const dataForDisplay = expanded ? post.comments : post.comments.slice(0, 2);

  const likePost = useCallback(
    async (liked: boolean) => {
      try {
        const likedPosts = liked
          ? user.likedPosts?.filter(pst => pst !== post._id)
          : [...(user.likedPosts ?? []), post._id];

        const likes = liked ? post.likes - 1 : post.likes + 1;

        await dispatch(updatePost(post._id, {likes}));
        await dispatch(updateUser(user._id, {likedPosts}, user.rol));
      } catch (e) {
        console.log(e);
        Alert.alert(e);
      }
    },
    [dispatch, post, user],
  );

  const _deletePost = useCallback(async () => {
    try {
      const posts = user.posts?.filter(pst => pst !== post._id);
      await dispatch(deletePost(post._id));
      await dispatch(updateUser(user._id, {posts}, user.rol));
    } catch (e) {
      console.log(e);
      Alert.alert(e);
    }
  }, [dispatch, post, user]);

  const _deleteComment = useCallback(
    async (commentId: string) => {
      try {
        await dispatch(deleteComment(post._id, commentId));
      } catch (e) {
        console.log(e);
        Alert.alert(e);
      }
    },
    [dispatch, post._id],
  );

  return (
    <View style={styles.container}>
      <Text large>Post: {post.text}</Text>
      <Text large>Creador: {post.name}</Text>
      <Text large>
        Fecha:
        {post.createdAt
          ? format(new Date(post.createdAt), 'hh:mm dd-MM-yy')
          : null}
      </Text>
      <Text large>Likes: {post.likes}</Text>
      {post.image ? (
        <FastImage source={{uri: post.image}} style={styles.images} />
      ) : null}
      {!ownedByUser ? (
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => (likedByUser ? likePost(true) : likePost(false))}>
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

      <Text large>Comentarios:</Text>
      <View>
        {dataForDisplay && dataForDisplay.length > 0 ? (
          <>
            {dataForDisplay.map((comment, index) => {
              const commentOwnedByUser = comment.author === user._id;
              return (
                <View key={index}>
                  <Text large>
                    {comment.authorName} dice {comment.comment}
                  </Text>
                  {commentOwnedByUser ? (
                    <Pressable
                      style={[styles.button, styles.buttonOpen]}
                      onPress={() => _deleteComment(comment._id)}>
                      <Text large style={styles.textStyle}>
                        Borrar Comentario
                      </Text>
                    </Pressable>
                  ) : null}
                </View>
              );
            })}

            {post.comments.length > 2 ? (
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                  setExpanded(!expanded);
                }}>
                <Text large style={styles.textStyle}>
                  {expanded ? 'Mostrar menos ' : 'Mostrar mas'}
                </Text>
              </Pressable>
            ) : null}
          </>
        ) : (
          <Text large>Este post no tiene comentarios</Text>
        )}
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => {
            setShowModal(true);
            setPostId(post._id);
          }}>
          <Text large style={styles.textStyle}>
            Comentar
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    display: 'flex',
    borderColor: '#2196F3',
    borderWidth: 5,
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
  images: {
    width: 200 * px,
    height: 200 * px,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
});
