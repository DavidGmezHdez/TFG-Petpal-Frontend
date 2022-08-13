import * as Yup from 'yup';
export const EventSchema = Yup.object().shape({
  title: Yup.string()
    .required('El título no puede estar vacío')
    .min(1, 'Minimo 1 caracter')
    .max(20, 'Máximo 20 caracteres'),
  description: Yup.string()
    .required('Debes escribir una descripción del evento')
    .min(1, 'Mínimo 1 caracter')
    .max(300, 'Máximo 300 caracteres'),
  price: Yup.number().optional().typeError('El valor sólo puede ser un número'),
  place: Yup.string()
    .required('Debes especificar un lugar de encuentro')
    .min(5, 'Mínimo 5 caracteres'),
  date: Yup.date()
    .required('La fecha del evento debe ser obligatoria')
    .min(new Date(), 'Elige una fecha superior al día y hora de hoy')
    .typeError('Debes especificar una fecha válida'),
  region: Yup.string().required(
    'La provincia donde se va a desarrollar la actividad es obligatoria',
  ),
});
