import * as yup from 'yup'

export const validateGovernmentFieldPresence = (name) => {
  return /\w[^.]/.test(name)
}

export const validations = yup.object().shape({
  title: yup.string().required(),
  name: yup.string().when('title', {
    is: 'Other',
    then: () =>
      yup
        .string()
        .trim()
        .test(
          'name',
          'Name must contain at least two characters',
          validateGovernmentFieldPresence,
        )
        .required('Please enter a title.'),
  }),
  jurisdiction: yup
    .string()
    .trim()
    .test(
      'jurisdiction',
      'Jurisdiction must contain at least two characters',
      validateGovernmentFieldPresence,
    )
    .required(),
  organization: yup
    .string()
    .trim()
    .test(
      'organization',
      'Organization must contain at least two characters',
      validateGovernmentFieldPresence,
    )
    .required(),
  notes: yup.string(),
})
