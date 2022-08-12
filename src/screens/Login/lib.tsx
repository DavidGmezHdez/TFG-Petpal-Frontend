import * as Yup from 'yup';
export const LoginSchema = Yup.object().shape({
  password: Yup.string().required('El campo contraseña no puede estar vacío'),
  email: Yup.string()
    .email('Email invalido')
    .required('El campo email no puede estar vacío'),
});

export type LoginTypes = {
  email: string;
  password: string;
};
