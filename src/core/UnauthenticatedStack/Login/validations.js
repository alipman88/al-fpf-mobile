import * as yup from 'yup'

export const validateEmail = string => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(string.toLowerCase())
}

export const validations = yup.object().shape({
  email: yup
    .string()
    .required()
    .test('email', 'email must be a valid email', validateEmail),
  password: yup.string().required()
})
