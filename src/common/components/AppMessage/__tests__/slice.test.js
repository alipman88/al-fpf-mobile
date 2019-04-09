import { appMessage } from '../slice'

describe('appMessage slice', () => {
  test('message should be empty by default', () => {
    const state = {
      main: {
        appMessage: appMessage.reducer(undefined, {})
      }
    }
    expect(appMessage.selectors.getMessage(state)).toEqual('')
    expect(appMessage.selectors.getMessageType(state)).toEqual('')
  })

  test('message should be set when calling setAppError', () => {
    const state = {
      main: {
        appMessage: appMessage.reducer(
          undefined,
          appMessage.actions.setAppError('boom')
        )
      }
    }
    expect(appMessage.selectors.getMessage(state)).toEqual('Boom')
    expect(appMessage.selectors.getMessageType(state)).toEqual('danger')
  })

  test('message & type get set for setAppMessage', () => {
    const state = {
      main: {
        appMessage: appMessage.reducer(
          undefined,
          appMessage.actions.setAppMessage({
            message: 'Done!',
            type: 'success'
          })
        )
      }
    }

    expect(appMessage.selectors.getMessage(state)).toEqual('Done!')
    expect(appMessage.selectors.getMessageType(state)).toEqual('success')
  })
})
