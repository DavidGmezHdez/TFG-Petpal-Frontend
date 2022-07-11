import React, {useCallback, useState} from 'react';
import {Button, StyleSheet, View, ScrollView} from 'react-native';
import {Text} from '@components/Text';
import {useDispatch, useSelector} from 'react-redux';
import {getLoadingPosts, getPosts} from '@redux/posts/posts_reducer';
import {Post} from './components/Post';
import {fetchPosts} from '@redux/posts/posts_actions';
import {IPost} from 'utils/Types';
import {ActivityIndicator} from 'react-native-paper';
import {CreatePostModal} from '@modals/CreatePost';
import {SendCommentModal} from '@modals/SendComment';

export const Feed = () => {
  const dispatch = useDispatch<any>();
  const posts = useSelector(getPosts);
  const isLoading = useSelector(getLoadingPosts);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalComment, setShowModalComment] = useState<boolean>(false);
  const [postId, setPostId] = useState<string>('');

  const _handleUpdate = useCallback(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  // TODO: Make this infinite scroller / lazyload
  return (
    <View style={styles.container}>
      <CreatePostModal showModal={showModal} setShowModal={setShowModal} />
      <SendCommentModal
        showModal={showModalComment}
        setShowModal={setShowModalComment}
        postId={postId}
      />
      <Text>Tablón</Text>
      <ScrollView>
        {posts.length > 0 ? (
          posts.map((post: IPost) => (
            <Post
              key={post._id}
              post={post}
              setShowModal={setShowModalComment}
              setPostId={setPostId}
            />
          ))
        ) : (
          <Text>No hay ningún post. Actualiza</Text>
        )}
      </ScrollView>
      <Button title="Actualizar" onPress={_handleUpdate} />
      <Button title="Crear post" onPress={() => setShowModal(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
