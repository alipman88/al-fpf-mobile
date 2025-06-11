import { ActionSheetIOS, Linking, Platform } from 'react-native'

import { composeEmail } from '../actions'

describe('mailApp - actions', () => {
  const dispatch = jest.fn()
  const originalPlatform = Platform.OS

  afterEach(() => {
    dispatch.mockReset()
    Platform.OS = originalPlatform
  })

  describe('composeEmail', () => {
    test('opens a mailto url with no apps installed (Android)', async () => {
      Platform.OS = 'android'

      const canOpenURLSpy = jest
        .spyOn(Linking, 'canOpenURL')
        .mockResolvedValue(false)

      const openURLSpy = jest.spyOn(Linking, 'openURL')

      await composeEmail()(dispatch, () => ({}))
      await composeEmail({ email: 'foo@bar.com', subject: 'foo bar' })(
        dispatch,
        () => ({}),
      )

      expect(openURLSpy).toHaveBeenCalledWith('mailto:?subject=')
      expect(openURLSpy).toHaveBeenCalledWith(
        'mailto:foo@bar.com?subject=foo%20bar',
      )

      openURLSpy.mockRestore()
      canOpenURLSpy.mockRestore()
    })

    test('opens a mailto url with apps installed but none chosen (Android)', async () => {
      Platform.OS = 'android'

      const canOpenURLSpy = jest
        .spyOn(Linking, 'canOpenURL')
        .mockResolvedValue(true)

      const actionSheetSpy = jest
        .spyOn(ActionSheetIOS, 'showActionSheetWithOptions')
        .mockImplementation((options, callback) => {
          callback(options.length - 1)
        })

      const openURLSpy = jest.spyOn(Linking, 'openURL')

      await composeEmail()(dispatch, () => ({}))
      await composeEmail({ email: 'foo@bar.com', subject: 'bar' })(
        dispatch,
        () => ({}),
      )

      expect(openURLSpy).toHaveBeenCalledWith('mailto:?subject=')
      expect(openURLSpy).toHaveBeenCalledWith('mailto:foo@bar.com?subject=bar')

      openURLSpy.mockRestore()
      canOpenURLSpy.mockRestore()
      actionSheetSpy.mockRestore()
    })

    test('opens a mailto url with no apps installed (iOS)', async () => {
      Platform.OS = 'ios'

      const canOpenURLSpy = jest
        .spyOn(Linking, 'canOpenURL')
        .mockResolvedValue(false)

      const openURLSpy = jest.spyOn(Linking, 'openURL')

      await composeEmail()(dispatch, () => ({}))
      await composeEmail({ email: 'foo@bar.com', subject: 'bar' })(
        dispatch,
        () => ({}),
      )

      expect(openURLSpy).toHaveBeenCalledWith('mailto:?subject=')
      expect(openURLSpy).toHaveBeenCalledWith('mailto:foo@bar.com?subject=bar')

      openURLSpy.mockRestore()
      canOpenURLSpy.mockRestore()
    })

    test('opens a gmail url', async () => {
      Platform.OS = 'ios'

      const canOpenURLSpy = jest
        .spyOn(Linking, 'canOpenURL')
        .mockResolvedValue(true)

      const openURLSpy = jest.spyOn(Linking, 'openURL')

      const getState = () => ({ main: { mailApp: { app: 'gmail' } } })

      await composeEmail()(dispatch, getState)
      await composeEmail({ email: 'foo@bar.com', subject: 'bar' })(
        dispatch,
        getState,
      )

      expect(openURLSpy).toHaveBeenCalledWith('googlegmail://co?')
      expect(openURLSpy).toHaveBeenCalledWith(
        'googlegmail://co?to=foo@bar.com&subject=bar',
      )

      openURLSpy.mockRestore()
      canOpenURLSpy.mockRestore()
    })
  })
})
