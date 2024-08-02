import * as Yup from 'yup'

export const RegistrationSchema = Yup.object({
  name: Yup.string().required('Obrigatório'),
  occupation: Yup.string().required('Obrigatório'),
  state: Yup.string().required('Obrigatório'),
  city: Yup.string().required('Obrigatório'),
  university: Yup.string().required('Obrigatório'),
  course: Yup.string().required('Obrigatório'),
  linkedin: Yup.string().url('URL inválida'),
  sendEmail: Yup.string().email('E-mail inválido').required('Obrigatório'),
  bio: Yup.string()
    .required('Obrigatório')
    .max(350, 'Máximo de 350 caracteres'),
})
