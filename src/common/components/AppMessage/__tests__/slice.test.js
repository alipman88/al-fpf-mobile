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
    expect(appMessage.selectors.getAutoHide(state)).toEqual(false)
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
    expect(appMessage.selectors.getAutoHide(state)).toEqual(undefined)
  })

  test('it creates a human readable error out of objects', () => {
    const state = {
      main: {
        appMessage: appMessage.reducer(
          undefined,
          appMessage.actions.setAppError({
            title: 'needs a title',
            content: 'needs content'
          })
        )
      }
    }
    expect(appMessage.selectors.getMessage(state)).toEqual(
      'Needs a title, needs content'
    )
    expect(appMessage.selectors.getMessageType(state)).toEqual('danger')
    expect(appMessage.selectors.getAutoHide(state)).toEqual(undefined)
  })

  test('message, type, and autoHide get set for setAppMessage', () => {
    const state = {
      main: {
        appMessage: appMessage.reducer(
          undefined,
          appMessage.actions.setAppMessage({
            message: 'Done!',
            type: 'success',
            autoHide: true
          })
        )
      }
    }

    expect(appMessage.selectors.getMessage(state)).toEqual('Done!')
    expect(appMessage.selectors.getMessageType(state)).toEqual('success')
    expect(appMessage.selectors.getAutoHide(state)).toEqual(true)
  })
})
