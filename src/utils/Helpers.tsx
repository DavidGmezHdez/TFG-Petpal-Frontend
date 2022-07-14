import {catRace, dogRace} from './Constants';

export const getRaces = (type: string) => {
  if (type === 'Perro') {
    return dogRace;
  } else if (type === 'Gato') {
    return catRace;
  } else {
    return [];
  }
};
