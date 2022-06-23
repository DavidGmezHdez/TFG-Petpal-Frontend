import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Text} from '@components/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '@redux/user/user_actions';
import {getPosts} from '@redux/posts/posts_reducer';
import {Post} from './components/Post';
import {fetchPosts} from '@redux/posts/posts_actions';
import {store} from '@redux/store';
import {IPost} from 'utils/Types';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'feed'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

export const Feed = ({navigation}: Props) => {
  const dispatch = useDispatch<any>();
  const posts = useSelector(getPosts);
  const state = store.getState();

  console.log({posts, state});

  const _handleLogout = () => {
    dispatch(logout());
    navigation.navigate('login');
  };

  const _handleUpdate = () => {
    dispatch(fetchPosts());
  };

  return (
    <View style={styles.container}>
      <Text>Feed</Text>
      {posts && posts.length
        ? posts.map((post: IPost) => <Post key={post._id} post={post} />)
        : null}
      <Button title="Actualizar" onPress={_handleUpdate} />
      <Button title="Logout" onPress={_handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
