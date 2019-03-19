import { posts } from '../slice'

describe('posts - slice', () => {
  test('posts returns an empty object', () => {
    const state = posts.reducer(undefined, {})
    expect(state).toEqual({
      headlinesByIssue: {},
      postsByIssue: {},
      adsByIssue: {},
      loading: false,
      newsFromNeighboringNfsByIssue: {}
    })
  })

  describe('setPostsForIssue', () => {
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
        posts.actions.setPostsForIssue({
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
          ads: [
            {
              id: 5
            }
          ],
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

      data = posts.selectors.getAdsByIssue({
        main: {
          posts: state
        }
      })

      expect(data).toEqual({
        1: [
          {
            id: 5
          }
        ]
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
})
