import { responseError } from '../responseError'

describe('responseError', () => {
  test('returns error message', () => {
    expect(responseError(new Error('boom'))).toEqual('boom')
  })

  test('returns error message from response body if it exists', () => {
    const error = new Error('boom')
    error.response = {
      data: {
        errors: 'Request failed'
      }
    }
    expect(responseError(error)).toEqual('Request failed')
  })

  test('returns base error message for errors key', () => {
    const error = new Error('boom')
    error.response = {
      data: {
        errors: {
          base: ['Request failed']
        }
      }
    }
    expect(responseError(error)).toEqual('Request failed')
  })
})
