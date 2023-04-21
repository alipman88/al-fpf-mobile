import * as yup from 'yup'

export const validateBusinessName = (name) => {
  return /\w[^.]/.test(name)
}

export const validations = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2)
    .test(
      'name',
      'Name must contain at least two characters',
      validateBusinessName
    )
    .required('Name is a required field'),
  description: yup.string().trim().min(1).max(2000),
  businessCategoryId: yup.number().required(),
  url: yup.string(),
  phone: yup.string().min(10).max(20),
})
