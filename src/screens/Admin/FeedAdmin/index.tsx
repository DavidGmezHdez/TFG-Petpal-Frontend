import React, {useCallback, useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPost} from 'utils/Types';
import {useDispatch} from 'react-redux';
import {deleteComment, deletePost} from '@redux/posts/posts_actions';
import {ActivityIndicator} from 'react-native-paper';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import PostsService from '@services/PostsService';
import {PostAdmin} from './components/PostAdmin';

export const FeedAdmin = () => {
  const dispatch = useDispatch<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  const _handleUpdate = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await (await PostsService.fetchPosts()).data;
      setPosts(fetchedPosts);
    } catch (error) {
      console.log(error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    _handleUpdate();
  }, [_handleUpdate]);

  const removePost = useCallback(
    async (postId: string) => {
      try {
        setIsLoading(true);
        const deletedPost = await dispatch(deletePost(postId));
        const newPosts = posts.filter(
          (pst: IPost) => pst._id !== deletedPost._id,
        );
        setPosts(newPosts);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, posts],
  );

  const removeComment = useCallback(
    async (postId: string, commentId: string) => {
      try {
        setIsLoading(true);
        const updatedPost = await dispatch(deleteComment(postId, commentId));
        const newPosts = posts.map((pst: IPost) =>
          pst._id === updatedPost._id ? updatedPost : pst,
        );
        setPosts(newPosts);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, posts],
  );

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
      <Text>Tablón Admin</Text>
      {posts && posts.length ? (
        <FlashList
          renderItem={(post: ListRenderItemInfo<IPost>) => (
            <PostAdmin
              key={post.item._id}
              post={post.item}
              removePost={removePost}
              removeComment={removeComment}
            />
          )}
          estimatedItemSize={200}
          data={posts}
        />
      ) : (
        <Text large>No existen posts</Text>
      )}
      <Button title="Actualizar" onPress={_handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});
