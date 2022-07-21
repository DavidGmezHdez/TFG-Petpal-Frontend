import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Text} from '@components/TextWrapper';
import {IUser} from '@utils/Types';
import {Pressable} from '@components/Pressable';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import PetsService from 'services/PetsService';
import {UserAdmin} from './components/UserAdmin';
import UserService from 'services/UserService';

export const UsersAdmin = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setIsLoading(true);
    const fetchedUsers = await (await PetsService.fetchPets({})).data;
    setUsers(fetchedUsers);
    setIsLoading(false);
  };

  const removeUser = async (userId: string) => {
    setIsLoading(true);
    try {
      const deletedUser: IUser = await (
        await UserService.deleteUser(userId, 'Usuario')
      ).data;
      const newUsers = users.filter(
        (usr: IUser) => usr._id !== deletedUser._id,
      );
      setUsers(newUsers);
    } catch (error) {
      console.log("Couldn't delete user: ", error);
    } finally {
      setIsLoading(false);
    }
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
      <Text large>Usuarios</Text>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={handleSearch}>
        <Text large style={styles.textStyle}>
          Buscar
        </Text>
      </Pressable>
      {users && users.length ? (
        <FlashList
          renderItem={(user: ListRenderItemInfo<IUser>) => (
            <UserAdmin
              key={user.item._id}
              user={user.item}
              removeUser={removeUser}
            />
          )}
          estimatedItemSize={200}
          data={users}
        />
      ) : (
        <Text large>No existen usuarios</Text>
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
});
