import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Text} from '@components/TextWrapper';
import {IUser} from '@utils/Types';
import {Pressable} from '@components/Pressable';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import UserService from '@services/UserService';
import {ProtectorAdmin} from './components/ProtectorAdmin';
import {colors} from '@utils/Colors';
import {generalStyles} from '@utils/Styles';

export const ProtectorsAdmin = () => {
  const [protectors, setProtectors] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedProtectors = await (
        await UserService.fetchUsers('Protectora')
      ).data;
      setProtectors(fetchedProtectors);
    } catch (error) {
      console.log(error);
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
      const deletedProtector: IUser = await (
        await UserService.deleteUser(userId, 'Protectora')
      ).data;
      const newProtectors = protectors.filter(
        (prot: IUser) => prot._id !== deletedProtector._id,
      );
      setProtectors(newProtectors);
    } catch (error) {
      console.log("Couldn't delete protector: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const promoteProtector = async (userId: string, promoted: boolean) => {
    setIsLoading(true);
    try {
      const promotedProtector: IUser = await (
        await UserService.updateUser(userId, {promoted}, 'Protectora')
      ).data;
      const newProtectors = protectors.map((prot: IUser) =>
        prot._id === promotedProtector._id ? promotedProtector : prot,
      );
      setProtectors(newProtectors);
    } catch (error) {
      console.log("Couldn't delete protector: ", error);
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
          Protectoras
        </Text>
      </View>

      <View style={styles.buttonFilters}>
        <Pressable style={styles.updatePressable} onPress={handleSearch}>
          <Text large style={generalStyles.textStyle}>
            Buscar
          </Text>
        </Pressable>
      </View>
      {protectors && protectors.length ? (
        <FlashList
          renderItem={(user: ListRenderItemInfo<IUser>) => (
            <ProtectorAdmin
              key={user.item._id}
              user={user.item}
              removeUser={removeUser}
              promoteProtector={promoteProtector}
            />
          )}
          estimatedItemSize={200}
          data={protectors}
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
