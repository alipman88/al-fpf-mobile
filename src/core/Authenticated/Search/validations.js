import * as yup from 'yup'

export const validations = yup.object().shape({
  forums: yup.array(),
  category: yup.number().nullable(),
  fromDate: yup.date().required(),
  toDate: yup.date().required(),
  keyword: yup.string().required()
})
