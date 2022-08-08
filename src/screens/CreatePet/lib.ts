import {Asset} from 'react-native-image-picker';
import * as Yup from 'yup';
export const PetSchema = Yup.object().shape({
  name: Yup.string()
    .required('Campo obligatorio')
    .min(1, 'Minimo 1 caracter')
    .max(15, 'Máximo 15 caracteres'),
  type: Yup.string().required('Campo obligatorio'),
  age: Yup.number()
    .required('Campo obligatorio')
    .min(0, 'La edad mínima es de 0 años')
    .max(20, 'La edad máxima es de 20 años'),
  size: Yup.string().required('Campo obligatorio'),
  race: Yup.string().required('Campo obligatorio'),
  description: Yup.string().required('Campo obligatorio'),
  sex: Yup.string().required('Campo obligatorio').nullable(),
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
