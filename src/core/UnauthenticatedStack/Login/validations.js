import * as yup from 'yup'
import { validateEmail } from '@common/validations'

export const validations = yup.object().shape({
  email: yup
    .string()
    .required()
    .test('email', 'email must be a valid email', validateEmail),
  password: yup.string().required(),
})
