import React, {useState} from 'react';
import {Button, StyleSheet, View, ScrollView} from 'react-native';
import {Text} from '@components/Text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '@redux/user/user_actions';
import {getLoadingPosts, getPosts} from '@redux/posts/posts_reducer';
import {Post} from './components/Post';
import {fetchPosts} from '@redux/posts/posts_actions';
import {IPost} from 'utils/Types';
import {ActivityIndicator} from 'react-native-paper';
import {CreatePostModal} from '../../modals/CreatePostModal';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'feed'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

export const Feed = ({navigation}: Props) => {
  const dispatch = useDispatch<any>();
  const posts = useSelector(getPosts);
  const isLoading = useSelector(getLoadingPosts);
  const [showModal, setShowModal] = useState<boolean>(false);

  const _handleLogout = () => {
    dispatch(logout());
    navigation.navigate('login');
  };

  const _handleUpdate = () => {
    dispatch(fetchPosts());
  };

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
      <Text>Feed</Text>
      <Text>{isLoading}</Text>
      <ScrollView>
        {posts.length > 0 ? (
          posts.map((post: IPost) => <Post key={post._id} post={post} />)
        ) : (
          <Text>No hay ningún post. Actualiza</Text>
        )}
      </ScrollView>
      <Button title="Actualizar" onPress={_handleUpdate} />
      <Button title="Crear post" onPress={() => setShowModal(true)} />
      <Button title="Logout" onPress={_handleLogout} />
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
