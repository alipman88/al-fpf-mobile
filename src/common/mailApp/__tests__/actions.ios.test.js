import { Linking, Platform } from 'react-native'

import { composeEmail } from '../actions'

const describeios = Platform.OS === 'ios' ? describe : describe.skip

describeios('mailApp - actions', () => {
  const dispatch = jest.fn()

  afterEach(() => {
    dispatch.mockReset()
  })

  describe('composeEmail', () => {
    test('opens a mailto url with no apps installed', async () => {
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

      expect(openURLSpy).toHaveBeenCalledWith('googlegmail://co?')
      expect(openURLSpy).toHaveBeenCalledWith(
        'googlegmail://co?to=foo@bar.com&subject=bar',
      )

      openURLSpy.mockRestore()
      canOpenURLSpy.mockRestore()
    })
  })
})
