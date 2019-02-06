import { responseError } from '../responseError'

describe('responseError', () => {
  test('returns error message', () => {
    expect(responseError(new Error('boom'))).toEqual('boom')
  })

  test('returns error message from response body if it exists', () => {
    const error = new Error('boom')
    error.response = {
      data: {
        error: 'Request failed'
      }
    }
    expect(responseError(error)).toEqual('Request failed')
  })
})
