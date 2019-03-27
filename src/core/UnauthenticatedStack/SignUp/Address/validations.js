import * as yup from 'yup'

export const validations = yup.object().shape({
  streetNumber: yup.number().required(),
  streetName: yup.string().required(),
  apt: yup.string(),
  city: yup.string().required(),
  state: yup
    .array()
    .min(1)
    .max(1)
})
