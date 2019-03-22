import get from 'lodash/get'

export const responseError = (error, key = 'errors') =>
  get(
    error,
    'response.data.errors.base[0]',
    get(error, `response.data.${key}`, error.message)
  )
