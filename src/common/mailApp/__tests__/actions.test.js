import { ActionSheetIOS, Linking } from 'react-native'

import { chooseMailApp } from '../actions'
// import { mailApp } from '../slice'

describe('mailApp - actions', () => {
  const dispatch = jest.fn()

  afterEach(() => {
    dispatch.mockReset()
  })

  describe('chooseMailApp', () => {
    test('opens a mailto url with no apps installed', async () => {
      const canOpenURLSpy = jest
        .spyOn(Linking, 'canOpenURL')
        .mockResolvedValue(false)

      const openURLSpy = jest.spyOn(Linking, 'openURL')

      await chooseMailApp()(dispatch, () => ({}))
      await chooseMailApp({ toEmail: 'foo@bar.com', subject: 'bar' })(
        dispatch,
        () => ({})
      )

      expect(openURLSpy).toHaveBeenCalledWith('mailto:?subject=')
      expect(openURLSpy).toHaveBeenCalledWith('mailto:foo@bar.com?subject=bar')

      openURLSpy.mockRestore()
      canOpenURLSpy.mockRestore()
    })

    test('opens a mailto url with apps installed but none chosen', async () => {
      const canOpenURLSpy = jest
        .spyOn(Linking, 'canOpenURL')
        .mockResolvedValue(true)

      const actionSheetSpy = jest
        .spyOn(ActionSheetIOS, 'showActionSheetWithOptions')
        .mockImplementation((options, callback) => {
          callback(options.length - 1)
        })

      const openURLSpy = jest.spyOn(Linking, 'openURL')

      await chooseMailApp()(dispatch, () => ({}))
      await chooseMailApp({ toEmail: 'foo@bar.com', subject: 'bar' })(
        dispatch,
        () => ({})
      )

      expect(openURLSpy).toHaveBeenCalledWith('mailto:?subject=')
      expect(openURLSpy).toHaveBeenCalledWith('mailto:foo@bar.com?subject=bar')

      openURLSpy.mockRestore()
      canOpenURLSpy.mockRestore()
      actionSheetSpy.mockRestore()
    })

    test('opens a gmail url', async () => {
      const canOpenURLSpy = jest
        .spyOn(Linking, 'canOpenURL')
        .mockResolvedValue(true)

      const openURLSpy = jest.spyOn(Linking, 'openURL')

      const getState = () => ({ main: { mailApp: { app: 'gmail' } } })

      await chooseMailApp()(dispatch, getState)
      await chooseMailApp({ toEmail: 'foo@bar.com', subject: 'bar' })(
        dispatch,
        getState
      )

      expect(openURLSpy).toHaveBeenCalledWith('googlegmail://co?subject=&to=')
      expect(openURLSpy).toHaveBeenCalledWith(
        'googlegmail://co?subject=bar&to=foo@bar.com'
      )

      openURLSpy.mockRestore()
      canOpenURLSpy.mockRestore()
    })
  })
})
