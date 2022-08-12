import {Asset} from 'react-native-image-picker';
import * as Yup from 'yup';
export const PetSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre debe estar relleno')
    .min(1, 'Minimo 1 caracter')
    .max(15, 'Máximo 15 caracteres'),
  type: Yup.string().required('El tipo de mascota debe tener un valor'),
  age: Yup.number()
    .required('La edad es obligatoria')
    .min(0, 'La edad mínima es de 0 años')
    .max(20, 'La edad máxima es de 20 años'),
  size: Yup.string().required('El tamaño es obligatorio'),
  race: Yup.string().required('La raza es obligatoria'),
  description: Yup.string().required(
    'Una descripción del animal es obligatorio',
  ),
  sex: Yup.string().required('El sexo del animal es obligatorio').nullable(),
});

export type petValuesTypes = {
  name: string;
  description: string;
  type: string;
  sex: string;
  age: string;
  race: string;
  size: string;
  images: Asset[];
};

export const initialValues: petValuesTypes = {
  name: '',
  description: '',
  sex: '',
  type: '',
  age: '',
  race: '',
  size: '',
  images: [],
};
