import get from 'lodash/get'

export const responseError = error =>
  get(
    error,
    'response.data.errors.base[0]',
    get(error, 'response.data.errors', error.message)
  )
