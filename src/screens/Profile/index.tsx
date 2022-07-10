import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '@redux/user/user_actions';
import {ActivityIndicator} from 'react-native-paper';
import {getLoadingUser} from '@redux/user/user_reducer';
import {EditProfileModal} from '@modals/EditProfile';
import {PostsProfileModal} from '@modals/PostsProfile';
import {EventsProfileModal} from '@modals/EventsProfile';
import {Pressable} from '@components/Pressable';
import {Text} from '@components/TextWrapper';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'feed'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

export const Profile = ({navigation}: Props) => {
  const dispatch = useDispatch<any>();
  const isLoading = useSelector(getLoadingUser);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showPostsModal, setShowPostsModal] = useState<boolean>(false);
  const [showEventsModal, setShowEventsModal] = useState<boolean>(false);

  const _handleLogout = () => {
    dispatch(logout());
    navigation.navigate('login');
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <EditProfileModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />
      <PostsProfileModal
        showModal={showPostsModal}
        setShowModal={setShowPostsModal}
      />
      <EventsProfileModal
        showModal={showEventsModal}
        setShowModal={setShowEventsModal}
      />
      <Text large>Perfil</Text>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setShowEditModal(true)}>
        <Text large style={styles.textStyle}>
          Editar Perfil
        </Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setShowPostsModal(true)}>
        <Text large style={styles.textStyle}>
          Ver Posts
        </Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setShowEventsModal(true)}>
        <Text large style={styles.textStyle}>
          Ver mis quedadas
        </Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={_handleLogout}>
        <Text large style={styles.textStyle}>
          Cerrar Sesión
        </Text>
      </Pressable>
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
});
