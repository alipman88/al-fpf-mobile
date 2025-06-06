import { ActionSheetIOS, Linking, Platform } from 'react-native'

import { composeEmail, parseMailto } from '../actions'

describe('mailApp - actions', () => {
  const dispatch = jest.fn()
  const originalPlatform = Platform.OS

  afterEach(() => {
    dispatch.mockReset()
    Platform.OS = originalPlatform
  })

  describe('parseMailto', () => {
    test('parses a mailto url', () => {
      expect(parseMailto('mailto:')).toEqual({})

      expect(parseMailto('mailto:me@bar.com')).toEqual({ email: 'me@bar.com' })

      expect(parseMailto('mailto:?subject=foo')).toEqual({ subject: 'foo' })

      expect(parseMailto('mailto:me@bar.com?subject=foobar')).toEqual({
        email: 'me@bar.com',
        subject: 'foobar',
      })

      expect(parseMailto('mailto:me@bar.com?subject=foobar&body=baz')).toEqual({
        email: 'me@bar.com',
        subject: 'foobar',
        body: 'baz',
      })
    })

    test('handles invalid content', () => {
      expect(parseMailto(null)).toEqual(null)
      expect(parseMailto('')).toEqual(null)
      expect(parseMailto('http://foo.com')).toEqual(null)
    })
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

      expect(openURLSpy).toHaveBeenCalledWith('googlegmail://co?subject=&to=')
      expect(openURLSpy).toHaveBeenCalledWith(
        'googlegmail://co?subject=bar&to=foo@bar.com',
      )

      openURLSpy.mockRestore()
      canOpenURLSpy.mockRestore()
    })
  })
})
