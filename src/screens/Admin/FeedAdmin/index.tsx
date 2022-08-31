import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPost} from 'utils/Types';
import {useDispatch} from 'react-redux';
import {deleteComment, deletePost} from '@redux/posts/posts_actions';
import {ActivityIndicator} from 'react-native-paper';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import PostsService from '@services/PostsService';
import {PostAdmin} from './components/PostAdmin';
import {generalStyles} from '@utils/Styles';
import {Pressable} from '@components/Pressable';
import {colors} from '@utils/Colors';

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
      <View style={styles.header}>
        <Text style={generalStyles.textStyle} center xxxxlarge>
          Tablón
        </Text>
        <View style={styles.pressables}>
          <Pressable style={styles.updatePressable} onPress={_handleUpdate}>
            <Text style={generalStyles.textStyle} center xxlarge>
              Actualizar
            </Text>
          </Pressable>
        </View>
      </View>
      {posts && posts.length ? (
        <FlashList
          showsVerticalScrollIndicator={false}
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
        <View style={styles.notFound}>
          <Text center xxlarge>
            No hay posts disponibles en el tablón, ¡actualiza!
          </Text>
        </View>
      )}
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
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.lightBlue,
    height: '20%',
  },
  pressables: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80%',
  },
  updatePressable: {
    backgroundColor: colors.blue,
  },
});
