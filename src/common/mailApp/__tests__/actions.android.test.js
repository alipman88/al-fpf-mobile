import { Linking, Platform } from 'react-native'

import { composeEmail } from '../actions'

const describeandroid = Platform.OS === 'android' ? describe : describe.skip

describeandroid('mailApp - actions', () => {
  const dispatch = jest.fn()

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
  })
})
