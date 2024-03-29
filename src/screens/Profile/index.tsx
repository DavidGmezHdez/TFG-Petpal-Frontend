import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParam} from 'navigation/navigation.types';
import FastImage from 'react-native-fast-image';
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
import {generalStyles} from '@utils/Styles';

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
      <Text xxlarge center>{`¡Hola ${user.name}!`}</Text>
      {user.image && user.image.length ? (
        <FastImage
          source={{uri: user.image + '?' + new Date()}}
          style={styles.images}
        />
      ) : null}
      <Pressable
        style={generalStyles.mainPressable}
        onPress={() => navigation.navigate('editProfile')}>
        <Text large center style={generalStyles.textStyle}>
          Editar Perfil
        </Text>
      </Pressable>
      <Pressable
        style={generalStyles.mainPressable}
        onPress={() => setShowPostsModal(true)}>
        <Text large center style={generalStyles.textStyle}>
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
            style={generalStyles.mainPressable}
            onPress={() => setShowEventsModal(true)}>
            <Text large style={generalStyles.textStyle}>
              Ver mis quedadas creadas
            </Text>
          </Pressable>
          <Pressable
            style={generalStyles.mainPressable}
            onPress={() => setShowJoinedEventsModal(true)}>
            <Text large style={generalStyles.textStyle}>
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
            style={generalStyles.mainPressable}
            onPress={() => setShowPetsModal(true)}>
            <Text large style={generalStyles.textStyle}>
              Gestión de mascotas
            </Text>
          </Pressable>
        </>
      ) : null}

      <Pressable style={generalStyles.cancelPressable} onPress={_handleLogout}>
        <Text large style={generalStyles.textStyle}>
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
  images: {
    width: 500 * px,
    height: 500 * px,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
    borderRadius: 100,
  },
});
