import { appSettings } from '../slice'

describe('appSettings - slice', () => {
  test('initialState', () => {
    const state = appSettings.reducer(undefined, {})
    expect(state).toEqual({
      forumPostTruncateLength: 1000,
      searchPostTruncateLength: 1000,
      categories: [],
      businessCategories: {},
      onboardingProfilePlans: [],
      governmentTitles: [],
      loading: false
    })
  })

  describe('setAppSettings', () => {
    test('saves the settings, and returns the values', () => {
      const state = appSettings.reducer(
        undefined,
        appSettings.actions.setAppSettings({
          forum_posting_truncate_length: 450,
          search_posting_truncate_length: 550,
          categories: [
            {
              id: 1,
              name: 'Lost and found',
              faq: 'Seeking lost items'
            }
          ],
          business_categories: {
            Animals: [['Pet Shop', 1], ['Animal rescue', 2]]
          }
        })
      )

      let data = appSettings.selectors.getAppSettings({
        main: {
          appSettings: state
        }
      })

      expect(data).toEqual({
        forumPostTruncateLength: 450,
        searchPostTruncateLength: 550,
        categories: [
          {
            id: 1,
            name: 'Lost and found',
            faq: 'Seeking lost items'
          }
        ],
        businessCategories: {
          Animals: [['Pet Shop', 1], ['Animal rescue', 2]]
        },
        loading: false
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
