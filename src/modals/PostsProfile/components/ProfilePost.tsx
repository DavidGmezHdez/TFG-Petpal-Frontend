import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPost} from 'utils/Types';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {getUser} from '@redux/user/user_reducer';
import {deletePost} from '@redux/posts/posts_actions';
import {updateUser} from '@redux/user/user_actions';
import {Pressable} from '@components/Pressable';
import {colors} from '@utils/Colors';
import {px} from '@utils/Constants';

type Props = {
  post: IPost;
};

export const ProfilePost = ({post}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);
  const ownedByUser = user.posts?.some(pst => pst._id === post._id);
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
      <View style={styles.headerPost}>
        <View>
          <Text xxlarge center>
            {post.createdAt
              ? format(new Date(post.createdAt), 'hh:mm dd-MM-yy')
              : null}
          </Text>
        </View>
      </View>

      <View style={styles.bodyPost}>
        <View style={styles.postWrapper}>
          <View>
            <Text xxxxlarge center>
              {post.text}
            </Text>
          </View>

          {post.image ? (
            <FastImage source={{uri: post.image}} style={styles.imagesPost} />
          ) : null}
        </View>
        <View style={styles.likesWrapper}>
          <Text xxxxlarge>Likes: {post.likes}</Text>
          {ownedByUser ? (
            <Pressable style={styles.deletePressable} onPress={_deletePost}>
              <Text large style={styles.textStyle}>
                Borrar Post
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    display: 'flex',
    borderColor: colors.green,
    borderWidth: 5,
    flexDirection: 'column',
  },
  headerPost: {
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    margin: '2%',
  },
  userData: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    margin: '2%',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  profileImage: {
    width: 200 * px,
    height: 200 * px,
    borderColor: colors.darkGray,
    borderWidth: 1,
    marginHorizontal: 3,
    borderRadius: 50,
  },

  bodyPost: {
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
  },

  postWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '2%',
    margin: '2%',
    width: '80%',
  },

  likesWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '2%',
    margin: '2%',
  },
  updatePressable: {
    backgroundColor: colors.primaryLight,
  },
  deletePressable: {
    backgroundColor: colors.secondary,
  },

  commentSection: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
  },
  comment: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: '2%',
    margin: '2%',
    width: '90%',
  },

  titleComment: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
  },
  textComment: {
    width: '70%',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagesPost: {
    width: 400 * px,
    height: 400 * px,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
  },
});
