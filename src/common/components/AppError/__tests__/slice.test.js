import { appError } from '../slice'

describe('appError slice', () => {
  test('message should be empty by default', () => {
    const state = {
      main: {
        appError: appError.reducer(undefined, {})
      }
    }
    expect(appError.selectors.getError(state)).toEqual('')
  })

  test('message should be set when calling setAppError', () => {
    const state = {
      main: {
        appError: appError.reducer(
          undefined,
          appError.actions.setAppError('boom')
        )
      }
    }
    expect(appError.selectors.getError(state)).toEqual('boom')
  })
})
