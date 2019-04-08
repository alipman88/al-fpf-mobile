import * as yup from 'yup'

export const validations = yup.object().shape({
  firstName: yup.string().required('First name is a required field'),
  lastName: yup.string().required('Last name is a required field'),
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
      return /(?=.*[a-zA-Z].*\d.*[!#$%&? "])/.test(password)
    })
    .required(),
  passwordConfirmation: yup
    .string()
    .test(
      'passwordConfirmation',
      'Password and password confirmation must match',
      function(passConfirm) {
        return this.parent.password === passConfirm
      }
    )
    .required('Confirm password is a required field')
})
