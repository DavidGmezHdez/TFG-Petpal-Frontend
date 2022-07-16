import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPet} from '@utils/Types';
import {px} from '@utils/Constants';
type Props = {
  pet: IPet;
};

export const Pet = ({pet}: Props) => {
  return (
    <View style={styles.container}>
      <Text large>Nombre: {pet.name}</Text>
      <Text large>Tipo: {pet.type}</Text>
      <Text large>Sexo: {pet.sex}</Text>
      <Text large>Edad: {pet.age}</Text>
      <Text large>Tamaño: {pet.size}</Text>
      <Text large>Raza: {pet.race}</Text>
      <Text large>Descripcion: {pet.description}</Text>
      <Text large>Rasgos especiales</Text>
      <Text large>Nombre protectora: {pet.protector.name}</Text>
      <Text large>Telefono de contacto: {pet.protector.contactPhone}</Text>
      <Text large>Direccion: {pet.protector.direction}</Text>
      <Text large>Provincia: {pet.protector.region}</Text>
      {pet.image ? (
        <Image source={{uri: pet.image}} style={styles.images} />
      ) : null}
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
  images: {
    width: 200 * px,
    height: 200 * px,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
});
