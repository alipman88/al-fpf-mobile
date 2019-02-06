import * as yup from 'yup'

export const validations = yup.object().shape({
  email: yup
    .string()
    .required()
    .email(),
  password: yup.string().required()
})
