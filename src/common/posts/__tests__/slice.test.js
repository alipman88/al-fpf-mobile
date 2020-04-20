import { posts } from '../slice'

describe('posts - slice', () => {
  test('posts returns an empty object', () => {
    const state = posts.reducer(undefined, {})
    expect(state).toEqual({
      headlinesByIssue: {},
      postsByIssue: {},
      adsByIssue: {},
      placementDateByIssue: {},
      sharedPostsByIssue: {},
      loading: false,
      newsFromNeighboringNfsByIssue: {},
      ocmMessageByIssue: {}
    })
  })

  describe('setContentsForIssue', () => {
    test('setLoading sets loading state', () => {
      const state = posts.reducer(undefined, posts.actions.setLoading(true))

      expect(
        posts.selectors.getLoading({
          main: {
            posts: state
          }
        })
      ).toEqual(true)
    })

    test('sets posts by issue number', () => {
      let state = posts.reducer(undefined, posts.actions.setLoading(true))

      state = posts.reducer(
        state,
        posts.actions.setContentsForIssue({
          issueId: 1,
          posts: [
            {
              id: 1
            },
            {
              id: 2
            }
          ],
          headlines: ['An interesting headline'],
          newsFromNeighboringNfs: [
            {
              area_name: 'Other Area'
            }
          ]
        })
      )

      let data = posts.selectors.getPostsByIssue({
        main: {
          posts: state
        }
      })

      expect(data).toEqual({
        1: [
          {
            id: 1
          },
          {
            id: 2
          }
        ]
      })

      data = posts.selectors.getHeadlinesByIssue({
        main: {
          posts: state
        }
      })

      expect(data).toEqual({
        1: ['An interesting headline']
      })

      data = posts.selectors.getNewsFromNeighboringNfsByIssue({
        main: {
          posts: state
        }
      })

      expect(data).toEqual({
        1: [
          {
            area_name: 'Other Area'
          }
        ]
      })

      expect(
        posts.selectors.getLoading({
          main: {
            posts: state
          }
        })
      ).toEqual(false)
    })
  })

  describe('setAdsForIssue', () => {
    test('setLoading sets loading state', () => {
      const state = posts.reducer(undefined, posts.actions.setLoading(true))

      expect(
        posts.selectors.getLoading({
          main: {
            posts: state
          }
        })
      ).toEqual(true)
    })

    test('sets ads by issue number', () => {
      let state = posts.reducer(undefined, posts.actions.setLoading(true))

      state = posts.reducer(
        state,
        posts.actions.setAdsForIssue({
          issueId: 1,
          ads: [
            {
              id: 1
            },
            {
              id: 2
            }
          ]
        })
      )

      let data = posts.selectors.getAdsByIssue({
        main: {
          posts: state
        }
      })

      expect(data).toEqual({
        1: [
          {
            id: 1
          },
          {
            id: 2
          }
        ]
      })

      expect(
        posts.selectors.getLoading({
          main: {
            posts: state
          }
        })
      ).toEqual(false)
    })
  })
})
