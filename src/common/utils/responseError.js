import get from 'lodash/get'

const customizedMessageFor = (error) => {
  if (!error.response) return error.message

  const status = error.response.status,
    headers = error.response.headers || {}

  switch (status) {
    case 503:
      if (headers['x-maintenance-mode'])
        return 'Front Porch Forum is temporarily down for maintenance'
      else return 'Front Porch Forum is currently unavailable'
    default:
      return error.message
  }
}

export const responseError = (error, key = 'errors') =>
  get(
    error,
    'response.data.errors.base[0]',
    get(error, `response.data.${key}`, customizedMessageFor(error))
  )
