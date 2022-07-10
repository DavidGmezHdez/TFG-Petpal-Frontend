import React, {Dispatch, SetStateAction, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPost} from 'utils/Types';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';
import {deletePost} from '@redux/posts/posts_actions';
import {updateUser} from '@redux/user/user_actions';
import {Pressable} from '@components/Pressable';

type Props = {
  post: IPost;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export const ProfilePost = ({post, setShowModal}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const ownedByUser = user.posts?.some(pst => pst._id === post._id);

  const [expanded, setExpanded] = useState<boolean>(false);

  const dataForDisplay = expanded ? post.comments : post.comments.slice(0, 2);

  const _deletePost = async () => {
    try {
      const posts = user.posts?.filter(pst => pst !== post._id);
      await dispatch(deletePost(post._id));
      await dispatch(updateUser(user._id, {posts}, user.rol));
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
          : null}
      </Text>
      <Text large>Likes: {post.likes}</Text>
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
              return (
                <View key={index}>
                  <Text large>
                    {comment.authorName} dice {comment.comment}
                  </Text>
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
      </View>
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
