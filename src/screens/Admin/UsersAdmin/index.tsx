import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Text} from '@components/TextWrapper';
import {IUser} from '@utils/Types';
import {Pressable} from '@components/Pressable';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import {UserAdmin} from './components/UserAdmin';
import UserService from '@services/UserService';
import {colors} from '@utils/Colors';
import {generalStyles} from '@utils/Styles';

export const UsersAdmin = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedUsers = await (await UserService.fetchUsers('Usuario')).data;
      setUsers(fetchedUsers);
    } catch (error) {
      console.log(error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

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
      <View style={styles.header}>
        <Text style={generalStyles.textStyle} center xxxxlarge>
          Usuarios
        </Text>
      </View>

      <View style={styles.buttonFilters}>
        <Pressable style={styles.updatePressable} onPress={handleSearch}>
          <Text large style={generalStyles.textStyle}>
            Buscar
          </Text>
        </Pressable>
      </View>
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
        <Text xxlarge center color={colors.error}>
          No existen mascotas con esos parámetros de búsqueda
        </Text>
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
    height: '10%',
  },
  filters: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonFilters: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.lightBlue,
    width: '100%',
  },
  updatePressable: {
    backgroundColor: colors.blue,
    width: '45%',
  },
});
