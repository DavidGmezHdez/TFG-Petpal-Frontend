import React, {useCallback, useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {useDispatch, useSelector} from 'react-redux';
import {getLoadingPosts, getPosts} from '@redux/posts/posts_reducer';
import {Post} from './components/Post';
import {fetchPosts} from '@redux/posts/posts_actions';
import {IPost} from 'utils/Types';
import {ActivityIndicator} from 'react-native-paper';
import {CreatePostModal} from '@modals/CreatePost';
import {SendCommentModal} from '@modals/SendComment';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import {colors} from '@utils/Colors';
import {generalStyles} from '@utils/Styles';
import {Pressable} from '@components/Pressable';

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

  useEffect(() => {
    _handleUpdate();
  }, [_handleUpdate]);

  if (isLoading) {
    return (
      <View style={generalStyles.loadingContainer}>
        <ActivityIndicator size={'large'} color={colors.springGreen} />
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
          <Pressable
            style={styles.updatePressable}
            onPress={() => setShowModal(true)}>
            <Text style={generalStyles.textStyle} center xxlarge>
              Crear post
            </Text>
          </Pressable>
        </View>
      </View>
      {posts && posts.length ? (
        <FlashList
          showsVerticalScrollIndicator={false}
          renderItem={(post: ListRenderItemInfo<IPost>) => (
            <Post
              key={post.item._id}
              post={post.item}
              setShowModal={setShowModalComment}
              setPostId={setPostId}
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
