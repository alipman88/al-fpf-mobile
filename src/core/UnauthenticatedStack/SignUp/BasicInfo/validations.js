import * as yup from 'yup'
import { api } from '@common/api'

export const validateFirstName = string => {
  return /^(?=.*[a-zA-Z\u00C0-\u017F])[a-zA-Z\u00C0-\u017F.'"\-,/ ()&]*$/.test(
    string
  )
}

export const validateLastName = string => {
  return /^(?=.*[a-zA-Z\u00C0-\u017F]{2})[a-zA-Z\u00C0-\u017F.'"\-,/ ()&]*$/.test(
    string
  )
}

export const passwordValidation = password => {
  return /(?=.*[a-zA-Z].*)(?=.*\d.*)(?=.*[!#$%&?@"].*)/.test(password)
}

export const validateEmail = email => {
  if (email) {
    return api
      .get('/check_user_email_availability', { params: { email: email } })
      .then(resp => {
        return resp.data.available === true
      })
  }
  return false
}

export const validations = yup.object().shape({
  firstName: yup
    .string()
    .test('firstName', 'First name can only contain letters', validateFirstName)
    .required('First name is a required field'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters long')
    .test('lastName', 'Last name can only contain letters', validateLastName)
    .required('Last name is a required field'),
  email: yup
    .string()
    .required()
    .email()
    .test('email', 'email is already in use', validateEmail),
  password: yup
    .string()
    .min(8, 'Password should be at least 8 characters long')
    .max(40, 'Password cannot be longer than 40 characters')
    .test(
      'password',
      'Password must contain a number and a symbol',
      passwordValidation
    )
    .required(),
  passwordConfirmation: yup
    .string()
    .test(
      'passwordConfirmation',
      'Password and confirm password must match',
      function(passConfirm) {
        return this.parent.password === passConfirm
      }
    )
    .required('Confirm password is a required field')
})
