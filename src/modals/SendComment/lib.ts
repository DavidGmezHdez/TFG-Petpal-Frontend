import * as Yup from 'yup';
export const CommentSchema = Yup.object().shape({
  text: Yup.string()
    .required('El comentario no puede estar vacío')
    .min(1, 'Minimo 1 caracter')
    .max(30, 'Máximo 300 caracteres'),
});
