import * as yup from 'yup'

export const validateName = string => {
  return /^[a-zA-Z]+$/.test(string)
}

export const passwordValidation = password => {
  return /(?=.*[a-zA-Z].*)(?=.*\d.*)(?=.*[!#$%&?@"].*)/.test(password)
}

export const validations = yup.object().shape({
  firstName: yup
    .string()
    .test('firstName', 'First name can only contain letters', function(
      firstName
    ) {
      return validateName(firstName)
    })
    .required('First name is a required field'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters long')
    .test('lastName', 'Last name can only contain letters', function(lastName) {
      return validateName(lastName)
    })
    .required('Last name is a required field'),
  email: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .min(8, 'Password should be at least 8 characters long')
    .max(40, 'Password cannot be longer than 40 characters')
    .test('password', 'Password must contain a number and a symbol', function(
      password
    ) {
      return passwordValidation(password)
    })
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
