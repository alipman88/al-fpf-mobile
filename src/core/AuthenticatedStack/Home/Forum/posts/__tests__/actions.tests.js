import { api } from '@common/api'
import { getPosts } from '../actions'
import { posts } from '../slice'

describe('posts - actions', () => {
  const dispatch = jest.fn()
  const getState = () => ({
    main: {
      issues: {
        issues: [
          {
            number: 32,
            id: 1,
            area_id: 55
          }
        ]
      }
    },
    secured: {
      currentUser: {
        accessToken: 'abc123'
      }
    }
  })

  afterEach(() => {
    dispatch.mockReset()
  })

  describe('getPosts', () => {
    test('issue number not found, no API requests made', async () => {
      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => {})
      await getPosts(1)(dispatch, getState)

      expect(getSpy).not.toHaveBeenCalled()
      getSpy.mockRestore()
    })

    test('issue found, fetches posts', async () => {
      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => ({
        data: {
          posts: [{ id: 1 }]
        }
      }))
      await getPosts(32)(dispatch, getState)

      expect(getSpy).toHaveBeenCalledWith('/areas/55/issues/32/posts', {
        headers: {
          Authorization: 'Bearer abc123'
        }
      })
      expect(dispatch).toHaveBeenCalledWith(
        posts.actions.setPostsForIssue({ issueNumber: 32, posts: [{ id: 1 }] })
      )
      getSpy.mockRestore()
    })
  })
})
