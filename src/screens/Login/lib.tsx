import * as Yup from 'yup';
export const LoginSchema = Yup.object().shape({
  password: Yup.string().required('Campo obligatorio'),
  email: Yup.string().email('Email invalido').required('Campo obligatorio'),
});

export type LoginTypes = {
  email: string;
  password: string;
};
