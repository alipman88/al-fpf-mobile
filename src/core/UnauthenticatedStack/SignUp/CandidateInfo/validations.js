import * as yup from 'yup'

export const validateCandidateFieldPresence = (name) => {
  return /\w[^.]/.test(name)
}

export const validations = yup.object().shape({
  name: yup
    .string()
    .trim()
    .test(
      'name',
      'Campaign must contain at least two characters',
      validateCandidateFieldPresence,
    )
    .required(),
  jurisdiction: yup
    .string()
    .trim()
    .test(
      'jurisdiction',
      'Jurisdiction must contain at least two characters',
      validateCandidateFieldPresence,
    )
    .required(),
  title: yup
    .string()
    .trim()
    .test(
      'title',
      'Office must contain at least two characters',
      validateCandidateFieldPresence,
    )
    .required(),
  notes: yup.string(),
})
