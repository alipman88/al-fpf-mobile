import * as yup from 'yup'

export const validations = yup.object().shape({
  title: yup.string().required(),
  jurisdiction: yup.string().required(),
  tellUsMore: yup.string()
})
