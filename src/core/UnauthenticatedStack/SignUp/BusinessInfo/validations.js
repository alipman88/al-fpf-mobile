import * as yup from 'yup'

export const validations = yup.object().shape({
  name: yup.string().required('Name of business is a required field'),
  businessCategoryId: yup.number().required(),
  url: yup.string(),
  phone: yup.string()
})
