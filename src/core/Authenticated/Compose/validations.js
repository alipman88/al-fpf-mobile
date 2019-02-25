import * as yup from 'yup'

export const validations = yup.object().shape({
  forums: yup
    .array()
    .required()
    .min(1),
  category: yup.number().required(),
  profile: yup.number().required(),
  subject: yup.string().required(),
  message: yup.string().required()
})
