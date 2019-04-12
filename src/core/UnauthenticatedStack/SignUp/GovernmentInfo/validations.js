import * as yup from 'yup'

export const validations = yup.object().shape({
  title: yup.string().required(),
  jurisdiction: yup.string().trim().required(),
  tellUsMore: yup.string().trim()
})
