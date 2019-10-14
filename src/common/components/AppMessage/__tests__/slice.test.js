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
          appMessage.actions.setAppError('Boom')
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
            title: 'Needs a title',
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

  test('it handles unexpected message types', () => {
    const messages = [null, undefined, jest.fn(), 123]

    for (const message of messages) {
      const state = {
        main: {
          appMessage: appMessage.reducer(
            message,
            appMessage.actions.setAppError(null)
          )
        }
      }
      expect(appMessage.selectors.getMessage(state)).toEqual(
        'An error occurred'
      )
      expect(appMessage.selectors.getMessageType(state)).toEqual('danger')
      expect(appMessage.selectors.getAutoHide(state)).toEqual(undefined)
    }
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
