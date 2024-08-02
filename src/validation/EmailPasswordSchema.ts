import * as Yup from 'yup'

export const EmailPasswordSchema = Yup.object({
  email: Yup.string().email('E-mail inválido').required('Obrigatório'),
  password: Yup.string().required('Obrigatório'),
})
