import * as yup from 'yup'

export const validations = yup.object().shape({
  streetNumber: yup
    .string()
    .matches(/^[0-9]*$/, 'Please enter a valid House/building number'),
  streetName: yup.string().required(),
  apt: yup.string(),
  city: yup.string().required(),
  state: yup.string().required(),
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
