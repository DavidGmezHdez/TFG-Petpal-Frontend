import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from '@components/TextWrapper';
import {IPet} from '@utils/Types';
import {px} from '@utils/Constants';
import {Pressable} from '@components/Pressable';
import {useDispatch, useSelector} from 'react-redux';
import {deletePet} from '@redux/pets/pets_actions';
import {getUser} from '@redux/user/user_reducer';
import {updateUser} from '@redux/user/user_actions';
import {generalStyles} from '@utils/Styles';
import {colors} from '@utils/Colors';
type Props = {
  pet: IPet;
};

export const Pet = ({pet}: Props) => {
  const dispatch = useDispatch<any>();
  const user = useSelector(getUser);

  const hanldeAdoption = async () => {
    await dispatch(deletePet(pet._id));
    const pets = user.pets.filter((upet: IPet) => upet._id !== pet._id);
    await dispatch(updateUser(user._id, {pets}, user.rol));
  };

  return (
    <View style={styles.container}>
      <View style={styles.data}>
        {pet.image && pet.image.length ? (
          <Image source={{uri: pet.image[0]}} style={styles.images} />
        ) : null}
      </View>
      <View style={styles.dataText}>
        <Text large>Nombre: {pet.name}</Text>
        <Text large>Tipo: {pet.type}</Text>
        <Text large>Sexo: {pet.sex}</Text>
        <Text large>Edad: {pet.age} años</Text>
        <Text large>Tamaño: {pet.size}</Text>
        <Text large>Raza: {pet.race}</Text>
        <Text large>Descripcion: {pet.description}</Text>
      </View>
      <View style={styles.data}>
        <Pressable style={styles.updatePressable} onPress={hanldeAdoption}>
          <Text large style={generalStyles.textStyle}>
            {`Marcar como ${
              pet.sex === 'Masculino' ? `adoptado` : `adptadada`
            } y borrar de la lista`}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderColor: colors.bluish,
    borderWidth: 5,
  },
  data: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  dataText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '40%',
  },
  updatePressable: {
    backgroundColor: colors.error,
  },
  images: {
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
    width: '90%',
    height: '50%',
    maxWidth: 250 * px,
    maxHeight: 250 * px,
  },
});
