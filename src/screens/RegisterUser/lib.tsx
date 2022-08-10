import * as Yup from 'yup';
export const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe de tener más de 2 caracteres')
    .max(50, 'El nombre no puede superar los 50 caracteres')
    .required('El campo nombre es obligatorio'),
  password: Yup.string()
    .min(10, 'La contraseña debe tener mínimo 10 caracteres')
    .max(30, 'La contraseña no puede ser más larga de 30 caracteres')
    .required('El campo contraseña es obligatorio'),
  email: Yup.string()
    .email('Email invalido')
    .required('El campo email es obligatorio'),
});

export type UserTypes = {
  email: string;
  password: string;
  name: string;
  imageUri: string;
  imageType: string;
  imageName: string;
};
