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
import {colors} from '@utils/Colors';

type Props = {
  post: IPost;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setPostId: Dispatch<SetStateAction<string>>;
};

export const Post = ({post, setShowModal, setPostId}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const likedByUser = user.likedPosts?.some(pst => pst === post._id);
  const ownedByUser = post.author._id === user._id;

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
      const posts = user.posts?.filter(pst => pst._id !== post._id);
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
      <View style={styles.headerPost}>
        <View style={styles.userData}>
          <View style={styles.imageWrapper}>
            {post.author.image ? (
              <FastImage
                source={{uri: post.author.image}}
                style={styles.profileImage}
              />
            ) : null}
          </View>
          <Text center xxxxlarge>
            {`${post.author.name} dice:`}
          </Text>
        </View>
        <View>
          <Text xxlarge center>
            {post.createdAt
              ? format(new Date(post.createdAt), 'hh:mm dd-MM-yy')
              : null}
          </Text>
        </View>
      </View>

      <View style={styles.bodyPost}>
        <View style={styles.postWrapper}>
          <View>
            <Text xxxxlarge center>
              {post.text}
            </Text>
          </View>

          {post.image ? (
            <FastImage source={{uri: post.image}} style={styles.imagesPost} />
          ) : null}
        </View>
        <View style={styles.likesWrapper}>
          <Text xxxxlarge>Likes: {post.likes}</Text>
          {!ownedByUser ? (
            <Pressable
              style={styles.updatePressable}
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
            <Pressable style={styles.deletePressable} onPress={_deletePost}>
              <Text large style={styles.textStyle}>
                Borrar Post
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      <View style={styles.commentSection}>
        <Text xxxlarge center>
          Comentarios
        </Text>
        <Pressable
          style={styles.updatePressable}
          onPress={() => {
            setShowModal(true);
            setPostId(post._id);
          }}>
          <Text large style={styles.textStyle}>
            Comentar
          </Text>
        </Pressable>
        <View style={styles.commentSection}>
          {dataForDisplay && dataForDisplay.length > 0 ? (
            <>
              {dataForDisplay.map((comment, index) => {
                const commentOwnedByUser = comment.author === user._id;
                return (
                  <View style={styles.comment} key={index}>
                    <View style={styles.titleComment}>
                      <Text xxlarge>{`${comment.authorName} comenta:`}</Text>
                    </View>

                    <View style={styles.headerPost}>
                      <View style={styles.textComment}>
                        <Text xxlarge center>
                          {comment.comment}
                        </Text>
                      </View>
                      {commentOwnedByUser ? (
                        <Pressable
                          style={styles.deletePressable}
                          onPress={() => _deleteComment(comment._id)}>
                          <Text large style={styles.textStyle}>
                            Borrar Comentario
                          </Text>
                        </Pressable>
                      ) : null}
                    </View>
                  </View>
                );
              })}

              {post.comments.length > 2 ? (
                <Pressable
                  style={styles.updatePressable}
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
            <Text xxlarge center>
              Este post no tiene comentarios
            </Text>
          )}
        </View>
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
    flexDirection: 'column',
  },
  headerPost: {
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    margin: '2%',
  },
  userData: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    margin: '2%',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  profileImage: {
    width: 200 * px,
    height: 200 * px,
    borderColor: colors.darkGray,
    borderWidth: 1,
    marginHorizontal: 3,
    borderRadius: 50,
  },

  bodyPost: {
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
  },

  postWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '2%',
    margin: '2%',
    width: '80%',
  },

  likesWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '2%',
    margin: '2%',
  },
  updatePressable: {
    backgroundColor: colors.primaryLight,
  },
  deletePressable: {
    backgroundColor: colors.secondary,
  },

  commentSection: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
  },
  comment: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '2%',
    margin: '2%',
    width: '90%',
  },

  titleComment: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
  },
  textComment: {
    width: '70%',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagesPost: {
    width: 400 * px,
    height: 400 * px,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },
});
