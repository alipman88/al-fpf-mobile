import * as yup from 'yup'

export const validations = yup.object().shape({
  streetNumber: yup.number().required('Street number is a required field'),
  streetName: yup.string().required('Street name is a required field'),
  apt: yup.string(),
  city: yup.string().required(),
  state: yup.string().required()
})
