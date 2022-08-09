import * as Yup from 'yup';
export const EventSchema = Yup.object().shape({
  reason: Yup.string()
    .required('Campo obligatorio')
    .min(10, 'Minimo 1 caracteres')
    .max(50, 'Máximo 20 caracteres'),
});
