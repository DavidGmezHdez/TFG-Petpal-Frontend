import * as Yup from 'yup';
export const PostSchema = Yup.object().shape({
  text: Yup.string()
    .required('Un post no puede estar vacío')
    .min(1, 'Un post de mínimo 1 caracter')
    .max(300, 'Un post de máximo 300 caracteres'),
});
