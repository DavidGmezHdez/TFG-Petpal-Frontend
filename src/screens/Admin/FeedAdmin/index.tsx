import React, {useCallback, useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPost} from 'utils/Types';
import {ActivityIndicator} from 'react-native-paper';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import PostsService from '@services/PostsService';
import {PostAdmin} from './components/PostAdmin';
import {useSelector} from 'react-redux';
import {getUser} from '@redux/user/user_reducer';

export const FeedAdmin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const user = useSelector(getUser);

  console.log(user);

  const _handleUpdate = useCallback(async () => {
    setIsLoading(true);
    const fetchedPosts = await (await PostsService.fetchPosts()).data;
    setPosts(fetchedPosts);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    _handleUpdate();
  }, [_handleUpdate]);

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
            <PostAdmin key={post.item._id} post={post.item} />
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
