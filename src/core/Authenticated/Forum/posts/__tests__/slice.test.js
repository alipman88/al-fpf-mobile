import { posts } from '../slice'

describe('posts - slice', () => {
  test('posts returns an empty object', () => {
    const state = posts.reducer(undefined, {})
    expect(state).toEqual({
      headlinesByIssue: {},
      postsByIssue: {},
      adsByIssue: {},
      newsFromNeighboringNfsByIssue: {}
    })
  })

  describe('setPostsForIssue', () => {
    test('sets posts by issue number', () => {
      const state = posts.reducer(
        undefined,
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
    })
  })
})
