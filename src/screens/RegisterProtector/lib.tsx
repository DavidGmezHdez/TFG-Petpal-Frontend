import * as Yup from 'yup';
export const ProtectorSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe de tener más de 2 caracteres')
    .max(50, 'El nombre no puede superar los 50 caracteres')
    .required('Campo obligatorio'),
  password: Yup.string()
    .min(10, 'La contraseña debe tener mínimo 10 caracteres')
    .max(30, 'La contraseña no puede ser más larga de 30 caracteres')
    .required('Campo obligatorio'),
  email: Yup.string().email('Email invalido').required('Campo obligatorio'),
  region: Yup.string().required('Campo obligatorio').nullable(),
  direction: Yup.string().required('Campo obligatorio'),
  contactPhone: Yup.string().required('Campo obligatorio'),
});

export type ProtectorTypes = {
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
