import { posts } from '../slice'

describe('posts - slice', () => {
  test('posts returns an empty object', () => {
    const state = posts.reducer(undefined, {})
    expect(state).toEqual({
      postsByIssue: {}
    })
  })

  describe('setPostsForIssue', () => {
    test('sets posts by issue number', () => {
      const state = posts.reducer(
        undefined,
        posts.actions.setPostsForIssue({
          issueNumber: 1,
          posts: [
            {
              id: 1
            },
            {
              id: 2
            }
          ]
        })
      )

      const data = posts.selectors.getPostsByIssue({
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
    })
  })
})
