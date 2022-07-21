import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Text} from '@components/TextWrapper';
import {IPet} from '@utils/Types';
import {Pressable} from '@components/Pressable';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import PetsService from 'services/PetsService';
import {PetAdmin} from './components/PetsAdmin';

export const PetsAdmin = () => {
  const [pets, setPets] = useState<IPet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setIsLoading(true);
    const fetchedPets = await (await PetsService.fetchPets({})).data;
    setPets(fetchedPets);
    setIsLoading(false);
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
      <Text large>Mascotas</Text>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={handleSearch}>
        <Text large style={styles.textStyle}>
          Buscar
        </Text>
      </Pressable>
      {pets.length ? (
        <FlashList
          renderItem={(pet: ListRenderItemInfo<IPet>) => (
            <PetAdmin key={pet.item._id} pet={pet.item} />
          )}
          estimatedItemSize={200}
          data={pets}
        />
      ) : (
        <Text large>No existen mascotas con esos parámetros de búsqueda</Text>
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
