import React, {useState} from 'react';
import {Button, StyleSheet, View, ScrollView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPets} from '@redux/pets/pets_actions';
import {Text} from '@components/TextWrapper';
import {IPet} from '@utils/Types';
import {getLoadingPets, getPets} from '@redux/pets/posts_reducer';
import {Pet} from './components/Pet';

export const Pets = () => {
  const dispatch = useDispatch<any>();
  const pets = useSelector(getPets);
  const isLoading = useSelector(getLoadingPets);

  const handleSearch = () => {
    dispatch(fetchPets());
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  // TODO: Make this infinite scroller / lazyload
  return (
    <View style={styles.container}>
      <Text large>Mascotas</Text>
      <Button title="Buscar" onPress={handleSearch} />
      <ScrollView>
        {pets.length > 0 ? (
          pets.map((pet: IPet) => <Pet key={pet._id} pet={pet} />)
        ) : (
          <Text large>
            No hay ninguna mascota que cumpla los requisitos. Busca con otro
            filtro
          </Text>
        )}
      </ScrollView>
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
});
