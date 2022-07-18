import {ImageLibraryOptions} from 'react-native-image-picker';
import * as Yup from 'yup';
export const UserSchemaEdit = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe de tener más de 2 caracteres')
    .max(50, 'El nombre no puede superar los 50 caracteres'),
  password: Yup.string()
    .min(10, 'La contraseña debe tener mínimo 10 caracteres')
    .max(30, 'La contraseña no puede ser más larga de 30 caracteres'),
  email: Yup.string().email('Email invalido'),
});

export const ProtectorSchemaEdit = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe de tener más de 2 caracteres')
    .max(50, 'El nombre no puede superar los 50 caracteres'),
  password: Yup.string()
    .min(10, 'La contraseña debe tener mínimo 10 caracteres')
    .max(30, 'La contraseña no puede ser más larga de 30 caracteres'),
  email: Yup.string().email('Email invalido'),
  region: Yup.string(),
  direction: Yup.string(),
  contactPhone: Yup.string(),
});

export type UserTypes = {
  email: string;
  password: string;
  name: string;
  imageUri: string;
  imageType: string;
  imageName: string;
  region: string;
  direction: string;
  contactPhone: string;
};

export const options: ImageLibraryOptions = {
  mediaType: 'photo',
  selectionLimit: 1,
};
