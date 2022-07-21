import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Text} from '@components/TextWrapper';
import {IUser} from '@utils/Types';
import {Pressable} from '@components/Pressable';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import UserService from 'services/UserService';
import {ProtectorAdmin} from './components/ProtectorAdmin';

export const ProtectorsAdmin = () => {
  const [protectors, setProtectors] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    const fetchedProtectors = await (
      await UserService.fetchUsers('Protectora')
    ).data;
    setProtectors(fetchedProtectors);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const removeUser = async (userId: string) => {
    setIsLoading(true);
    try {
      const deletedProtector: IUser = await (
        await UserService.deleteUser(userId, 'Protectora')
      ).data;
      const newProtectors = protectors.filter(
        (prot: IUser) => prot._id !== deletedProtector._id,
      );
      setProtectors(newProtectors);
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
      {protectors && protectors.length ? (
        <FlashList
          renderItem={(user: ListRenderItemInfo<IUser>) => (
            <ProtectorAdmin
              key={user.item._id}
              user={user.item}
              removeUser={removeUser}
            />
          )}
          estimatedItemSize={200}
          data={protectors}
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
