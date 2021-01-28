import { responseError } from '../responseError'

describe('responseError', () => {
  test('returns error message', () => {
    expect(responseError(new Error('boom'))).toEqual('boom')
  })

  test('returns error message from response body if it exists', () => {
    const error = new Error('boom')
    error.response = {
      data: {
        errors: 'Request failed',
      },
    }
    expect(responseError(error)).toEqual('Request failed')
  })

  test('returns base error message for errors key', () => {
    const error = new Error('boom')
    error.response = {
      data: {
        errors: {
          base: ['Request failed'],
        },
      },
    }
    expect(responseError(error)).toEqual('Request failed')
  })

  test('returns down-for-maintenance message', () => {
    const error = new Error('boom')
    error.response = {
      status: 503,
      headers: {
        'x-maintenance-mode': 'on',
      },
    }
    expect(responseError(error)).toEqual(
      'Front Porch Forum is temporarily down for maintenance'
    )
  })

  test('returns service unavailable message', () => {
    const error = new Error('boom')
    error.response = {
      status: 503,
    }
    expect(responseError(error)).toEqual(
      'Front Porch Forum is currently unavailable'
    )
  })

  test('returns appropriate error if no response', () => {
    const error = new Error('No response')
    expect(responseError(error)).toEqual('No response')
  })
})
