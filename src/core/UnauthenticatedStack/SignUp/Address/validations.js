import * as yup from 'yup'

export const validations = yup.object().shape({
  streetNumber: yup
    .string()
    .matches(/^[0-9]*$/, 'Please enter a valid House/building number')
    .required('Street number is a required field'),
  streetName: yup
    .string()
    .trim()
    .required('Street name is a required field'),
  apt: yup.string(),
  city: yup
    .string()
    .trim()
    .required(),
  state: yup.string().required()
})
