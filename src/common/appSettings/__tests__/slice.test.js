import { appSettings } from '../slice'

describe('appSettings - slice', () => {
  test('initialState', () => {
    const state = appSettings.reducer(undefined, {})
    expect(state).toEqual({
      postTruncateLength: 1000,
      categories: [],
      loading: false
    })
  })

  describe('setAppSettings', () => {
    test('saves the settings, and returns the values', () => {
      const state = appSettings.reducer(
        undefined,
        appSettings.actions.setAppSettings({
          posting_truncate_length: 450,
          categories: [
            {
              id: 1,
              name: 'Lost and found',
              faq: 'Seeking lost items'
            }
          ]
        })
      )

      let data = appSettings.selectors.getAppSettings({
        main: {
          appSettings: state
        }
      })

      expect(data).toEqual({
        postTruncateLength: 450,
        categories: [
          {
            id: 1,
            name: 'Lost and found',
            faq: 'Seeking lost items'
          }
        ]
      })

      data = appSettings.selectors.getCategories({
        main: {
          appSettings: state
        }
      })

      expect(data).toEqual([
        {
          id: 1,
          name: 'Lost and found',
          faq: 'Seeking lost items'
        }
      ])
    })
  })

  describe('setLoading', () => {
    test('sets loading state', () => {
      const state = appSettings.reducer(
        undefined,
        appSettings.actions.setLoading(true)
      )

      const loading = appSettings.selectors.getLoading({
        main: {
          appSettings: state
        }
      })

      expect(loading).toEqual(true)
    })
  })
})
