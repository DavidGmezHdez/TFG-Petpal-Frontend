import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '@redux/user/user_actions';
import {ActivityIndicator} from 'react-native-paper';
import {getLoadingUser, getUser} from '@redux/user/user_reducer';
import {PostsProfileModal} from '@modals/PostsProfile';
import {EventsProfileModal} from '@modals/EventsProfile';
import {JoinedEventsProfileModal} from '@modals/JoinedEvents';
import {PetsProfileModal} from '@modals/PetsProfile';
import {Pressable} from '@components/Pressable';
import {Text} from '@components/TextWrapper';
import {px} from '@utils/Constants';

type NavigationStackProp = NativeStackScreenProps<RootStackParam, 'feed'>;

type Props = {
  navigation: NavigationStackProp['navigation'];
};

export const Profile = ({navigation}: Props) => {
  const dispatch = useDispatch<any>();
  const isLoading = useSelector(getLoadingUser);
  const rol = useSelector(getUser).rol;
  const user = useSelector(getUser);
  // TODO: GET RID OF THIS AND MOVE IT TO A USE REDUCER
  const [showPostsModal, setShowPostsModal] = useState<boolean>(false);
  const [showEventsModal, setShowEventsModal] = useState<boolean>(false);
  const [showJoinedEventsModal, setShowJoinedEventsModal] =
    useState<boolean>(false);
  const [showPetsModal, setShowPetsModal] = useState<boolean>(false);

  const _handleLogout = () => {
    dispatch(logout());
    navigation.navigate('login');
  };

  const hanldeAddPet = () => {
    navigation.navigate('createPets');
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
      <PostsProfileModal
        showModal={showPostsModal}
        setShowModal={setShowPostsModal}
      />
      <Text large>Perfil</Text>
      {user.image && user.image.length ? (
        <Image source={{uri: user.image}} style={styles.images} />
      ) : null}
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => navigation.navigate('editProfile')}>
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
      {rol !== 'Protectora' ? (
        <>
          <EventsProfileModal
            showModal={showEventsModal}
            setShowModal={setShowEventsModal}
          />
          <JoinedEventsProfileModal
            showModal={showJoinedEventsModal}
            setShowModal={setShowJoinedEventsModal}
          />
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setShowEventsModal(true)}>
            <Text large style={styles.textStyle}>
              Ver mis quedadas creadas
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setShowJoinedEventsModal(true)}>
            <Text large style={styles.textStyle}>
              Ver mis quedadas apuntadas
            </Text>
          </Pressable>
        </>
      ) : null}

      {rol === 'Protectora' ? (
        <>
          <PetsProfileModal
            showModal={showPetsModal}
            setShowModal={setShowPetsModal}
            navigateCreatePet={hanldeAddPet}
          />
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setShowPetsModal(true)}>
            <Text large style={styles.textStyle}>
              Ver mis mascotas
            </Text>
          </Pressable>
        </>
      ) : null}

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
  images: {
    width: 200 * px,
    height: 200 * px,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
});
