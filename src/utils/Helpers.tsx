import {catRace, dogRace} from './Constants';
import {IUser} from './Types';

export const getRaces = (type: string) => {
  if (type === 'Perro') {
    return dogRace;
  } else if (type === 'Gato') {
    return catRace;
  } else {
    return [];
  }
};

export const hasPermissions = (user: IUser) => {
  return user.rol === 'Moderador' || user.rol === 'Administrador';
};
