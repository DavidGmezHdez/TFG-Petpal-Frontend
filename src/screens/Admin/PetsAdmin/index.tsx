import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Text} from '@components/TextWrapper';
import {IPet} from '@utils/Types';
import {Pressable} from '@components/Pressable';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import PetsService from '@services/PetsService';
import {PetAdmin} from './components/PetsAdmin';
import {generalStyles} from '@utils/Styles';
import {colors} from '@utils/Colors';

export const PetsAdmin = () => {
  const [pets, setPets] = useState<IPet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    const fetchedPets = await (await PetsService.fetchPets({})).data;
    setPets(fetchedPets);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

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
          Mascotas
        </Text>
      </View>

      <View style={styles.buttonFilters}>
        <Pressable style={styles.updatePressable} onPress={handleSearch}>
          <Text large style={generalStyles.textStyle}>
            Buscar
          </Text>
        </Pressable>
      </View>
      {pets.length ? (
        <FlashList
          renderItem={(pet: ListRenderItemInfo<IPet>) => (
            <PetAdmin key={pet.item._id} pet={pet.item} />
          )}
          estimatedItemSize={200}
          data={pets}
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
