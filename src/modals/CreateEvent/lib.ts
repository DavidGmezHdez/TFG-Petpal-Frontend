import * as Yup from 'yup';
export const EventSchema = Yup.object().shape({
  title: Yup.string()
    .required('Campo obligatorio')
    .min(1, 'Minimo 1 caracter')
    .max(20, 'Máximo 300 caracteres'),
  description: Yup.string()
    .required('Campo obligatorio')
    .min(1, 'Minimo 1 caracter')
    .max(300, 'Máximo 300 caracteres'),
  price: Yup.number().optional(),
  place: Yup.string()
    .required('Campo obligatorio')
    .min(5, 'Minimo 5 caracteres'),
  date: Yup.date()
    .required('Campo obligatorio')
    .min(new Date(), 'Elige una fecha superior al día y hora de hoy'),
});
