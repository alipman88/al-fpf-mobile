import get from 'lodash/get'

export const responseError = error =>
  get(error, 'response.data.error', error.message)
