import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPets} from '@redux/pets/pets_actions';
import {Text} from '@components/TextWrapper';
import {IPet} from '@utils/Types';
import {getLoadingPets, getPets} from '@redux/pets/posts_reducer';
import {Pet} from './components/Pet';
import {Pressable} from '@components/Pressable';
import RNPickerSelect from 'react-native-picker-select';
import {provinces, types, ages, dogRace, catRace} from '@utils/Constants';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';

export const Pets = () => {
  const dispatch = useDispatch<any>();
  const pets = useSelector(getPets);
  const isLoading = useSelector(getLoadingPets);
  const [region, setRegion] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [age, setAge] = useState<number>(-1);
  const [race, setRace] = useState<string | null>(null);

  const handleSearch = () => {
    dispatch(fetchPets({type, region, age, race}));
  };

  const getRaces = () => {
    if (type === 'Perro') {
      return dogRace;
    } else if (type === 'Gato') {
      return catRace;
    } else {
      return [];
    }
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
      <RNPickerSelect
        onValueChange={value => setRegion(value)}
        items={provinces}
        placeholder={{label: 'Cualquier provincia', value: null}}
        value={region}
      />
      <RNPickerSelect
        onValueChange={value => {
          setType(value);
          setRace(null);
        }}
        items={types}
        placeholder={{label: 'Cualquier tipo', value: null}}
        value={type}
      />
      {type === 'Perro' || type === 'Gato' ? (
        <RNPickerSelect
          onValueChange={value => setRace(value)}
          items={getRaces()}
          placeholder={{label: 'Cualquier raza', value: null}}
          value={race}
        />
      ) : null}

      <RNPickerSelect
        onValueChange={value => setAge(value)}
        items={ages}
        placeholder={{label: 'Cualquier edad', value: null}}
        value={age}
      />
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
            <Pet key={pet.item._id} pet={pet.item} />
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
