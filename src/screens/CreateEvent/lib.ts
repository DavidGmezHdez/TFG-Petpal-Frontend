import * as Yup from 'yup';
export const EventSchema = Yup.object().shape({
  title: Yup.string()
    .required('Campo obligatorio')
    .min(1, 'Minimo 1 caracter')
    .max(20, 'Máximo 20 caracteres'),
  description: Yup.string()
    .required('Campo obligatorio')
    .min(1, 'Mínimo 1 caracter')
    .max(300, 'Máximo 300 caracteres'),
  price: Yup.number().optional(),
  place: Yup.string()
    .required('Campo obligatorio')
    .min(5, 'Mínimo 5 caracteres'),
  date: Yup.date()
    .required('Campo obligatorio')
    .min(new Date(), 'Elige una fecha superior al día y hora de hoy'),
  region: Yup.string().required('Campo obligatorio'),
});
