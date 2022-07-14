import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPet} from 'utils/Types';
type Props = {
  pet: IPet;
};

export const Pet = ({pet}: Props) => {
  return (
    <View style={styles.container}>
      <Text large>Nombre: {pet.name}</Text>
      <Text large>Tipo: {pet.type}</Text>
      <Text large>Edad: {pet.age}</Text>
      <Text large>Color: {pet.color}</Text>
      <Text large>Tamaño: {pet.size}</Text>
      <Text large>Raza: {pet.race}</Text>
      <Text large>Descripcion: {pet.description}</Text>
      <Text large>Rasgos especiales</Text>
      {pet.specialTraits && pet.specialTraits.length ? (
        pet.specialTraits.map((trait: string) => <Text large>{trait}</Text>)
      ) : (
        <Text large>Esta mascota no tiene rasgos especiales</Text>
      )}
      <Text large>Nombre protectora: {pet.protector.name}</Text>
      <Text large>Telefono de contacto: {pet.protector.contactPhone}</Text>
      <Text large>Direccion: {pet.protector.direction}</Text>
      <Text large>Provincia: {pet.protector.region}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
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
