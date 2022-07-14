import {Dimensions} from 'react-native';

export const px = 1 / Dimensions.get('screen').scale;

// TODO: MOVE TO BACKEND
export const provinces = [
  {
    label: 'Álava',
    value: 'Álava',
  },
  {
    label: 'Albacete',
    value: 'Albacete',
  },
  {
    label: 'Almería',
    value: 'Almería',
  },
  {
    label: 'Alicante/Alacant',
    value: 'Alicante/Alacant',
  },
  {
    label: 'Ávila',
    value: 'Ávila',
  },
  {
    label: 'Asturias',
    value: 'Asturias',
  },
  {
    label: 'A Coruña',
    value: 'A Coruña',
  },
  {
    label: 'Barcelona',
    value: 'Barcelona',
  },
  {
    label: 'Badajoz',
    value: 'Badajoz',
  },
  {
    label: 'Burgos',
    value: 'Burgos',
  },
  {
    label: 'Bizkaia',
    value: 'Bizkaia',
  },
  {
    label: 'Cáceres',
    value: 'Cáceres',
  },
  {
    label: 'Cádiz',
    value: 'Cádiz',
  },
  {
    label: 'Cantabria',
    value: 'Cantabria',
  },
  {
    label: 'Castellón/Castelló',
    value: 'Castellón/Castelló',
  },
  {
    label: 'Ceuta',
    value: 'Ceuta',
  },
  {
    label: 'Cuenca',
    value: 'Cuenca',
  },
  {
    label: 'Ciudad Real',
    value: 'Ciudad Real',
  },
  {
    label: 'Córdoba',
    value: 'Córdoba',
  },
  {
    label: 'Gipuzkoa',
    value: 'Gipuzkoa',
  },
  {
    label: 'Girona',
    value: 'Girona',
  },
  {
    label: 'Granada',
    value: 'Granada',
  },
  {
    label: 'Guadalajara',
    value: 'Guadalajara',
  },
  {
    label: 'Huelva',
    value: 'Huelva',
  },
  {
    label: 'Huesca',
    value: 'Huesca',
  },
  {
    label: 'Illes Balears',
    value: 'Illes Balears',
  },
  {
    label: 'Jaén',
    value: 'Jaén',
  },
  {
    label: 'La Rioja',
    value: 'La Rioja',
  },
  {
    label: 'Las Palmas',
    value: 'Las Palmas',
  },
  {
    label: 'León',
    value: 'León',
  },
  {
    label: 'Lleida',
    value: 'Lleida',
  },
  {
    label: 'Lugo',
    value: 'Lugo',
  },
  {
    label: 'Madrid',
    value: 'Madrid',
  },
  {
    label: 'Málaga',
    value: 'Málaga',
  },
  {
    label: 'Melilla',
    value: 'Melilla',
  },
  {
    label: 'Murcia',
    value: 'Murcia',
  },

  {
    label: 'Navarra',
    value: 'Navarra',
  },
  {
    label: 'Ourense',
    value: 'Ourense',
  },

  {
    label: 'Palencia',
    value: 'Palencia',
  },
  {
    label: 'Pontevedra',
    value: 'Pontevedra',
  },
  {
    label: 'Salamanca',
    value: 'Salamanca',
  },
  {
    label: 'Santa Cruz de Tenerife',
    value: 'Santa Cruz de Tenerife',
  },
  {
    label: 'Segovia',
    value: 'Segovia',
  },
  {
    label: 'Sevilla',
    value: 'Sevilla',
  },
  {
    label: 'Soria',
    value: 'Soria',
  },
  {
    label: 'Tarragona',
    value: 'Tarragona',
  },
  {
    label: 'Teruel',
    value: 'Teruel',
  },
  {
    label: 'Toledo',
    value: 'Toledo',
  },
  {
    label: 'Valencia/València',
    value: 'Valencia/València',
  },
  {
    label: 'Valladolid',
    value: 'Valladolid',
  },
  {
    label: 'Zamora',
    value: 'Zamora',
  },
  {
    label: 'Zaragoza',
    value: 'Zaragoza',
  },
];

export const types = [
  {
    label: 'Perro',
    value: 'Perro',
  },
  {
    label: 'Gato',
    value: 'Gato',
  },
  {
    label: 'Otro',
    value: 'Otro',
  },
];

export const ages = [
  {
    label: 'Entre 0 y 5 años',
    value: 0,
  },
  {
    label: 'Entre 5 y 10 años',
    value: 1,
  },
  {
    label: 'Entre 10 y 15 años',
    value: 2,
  },
  {
    label: 'Entre 15 y 20 años',
    value: 3,
  },
];

export const dogRace = [
  {
    label: 'Labrador',
    value: 'Labrador',
  },
  {
    label: 'Pastor Alemán',
    value: 'Pastor Alemán',
  },
  {
    label: 'Beagle',
    value: 'Beagle',
  },
  {
    label: 'Dálmata',
    value: 'Dálmata',
  },
];

export const catRace = [
  {
    label: 'Gato Persa',
    value: 'Gato Persa',
  },
  {
    label: 'Bengala',
    value: 'Bengala',
  },
  {
    label: 'Siberiano',
    value: 'Siberiano',
  },
  {
    label: 'Gato siamés',
    value: 'Gato siamés',
  },
];
