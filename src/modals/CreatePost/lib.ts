import * as Yup from 'yup';
export const PostSchema = Yup.object().shape({
  text: Yup.string()
    .required('Campo obligatorio')
    .min(1, 'Minimo 1 caracter')
    .max(300, 'Máximo 300 caracteres'),
});
