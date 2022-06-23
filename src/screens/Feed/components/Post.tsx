import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@components/Text';
import {IPost} from 'utils/Types';
import {format} from 'date-fns';

type Props = {
  post: IPost;
};

export const Post = ({post}: Props) => {
  return (
    <View style={styles.container}>
      <Text>Post: {post.text}</Text>
      <Text>Creador: {post.name}</Text>
      <Text>Fecha: {format(new Date(post.createdAt), 'hh:mm dd-MM-yy')} </Text>
      <Text>Likes: {post.likes}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
