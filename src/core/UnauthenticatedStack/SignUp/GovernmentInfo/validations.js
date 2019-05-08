import * as yup from 'yup'

export const validations = yup.object().shape({
  title: yup.string().required(),
  name: yup.string().when('title', {
    is: 'Other',
    then: yup.string().required('Please enter a title.')
  }),
  jurisdiction: yup.string().required(),
  tellUsMore: yup.string()
})
