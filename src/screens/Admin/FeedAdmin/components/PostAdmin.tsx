import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPost} from 'utils/Types';
import {format} from 'date-fns';

import {Pressable} from '@components/Pressable';
import FastImage from 'react-native-fast-image';
import {px} from '@utils/Constants';

type Props = {
  post: IPost;
  removePost: (postId: string) => void;
  removeComment: (postId: string, commentId: string) => void;
};

export const PostAdmin = ({post, removePost, removeComment}: Props) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const dataForDisplay = expanded ? post.comments : post.comments.slice(0, 2);

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

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => removePost(post._id)}>
        <Text large style={styles.textStyle}>
          Borrar Post
        </Text>
      </Pressable>

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
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => removeComment(post._id, comment._id)}>
                    <Text large style={styles.textStyle}>
                      Borrar Comentario
                    </Text>
                  </Pressable>
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
