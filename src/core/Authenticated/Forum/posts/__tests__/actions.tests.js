import { api } from '@common/api'
import { getPosts } from '../actions'
import { posts } from '../slice'

describe('posts - actions', () => {
  const dispatch = jest.fn()
  const getState = () => ({
    main: {
      issues: {
        issuesByAreaId: {
          55: [
            {
              id: 1,
              number: 32,
              area_id: 55
            }
          ]
        }
      },
      areas: {
        currentAreaId: 55
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
      await getPosts(5)(dispatch, getState)

      expect(getSpy).not.toHaveBeenCalled()
      getSpy.mockRestore()
    })

    test('issue found, fetches posts', async () => {
      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => ({
        data: {
          posts: [{ id: 1 }],
          ads: [{ id: 2 }],
          headlines: ['Headline'],
          news_from_neighboring_nfs: [{ id: 3 }]
        }
      }))
      await getPosts(1)(dispatch, getState)

      expect(getSpy).toHaveBeenCalledWith('/areas/55/issues/32/contents', {
        headers: {
          Authorization: 'Bearer abc123'
        }
      })
      expect(dispatch).toHaveBeenCalledWith(
        posts.actions.setPostsForIssue({
          issueId: 1,
          posts: [{ id: 1 }],
          ads: [{ id: 2 }],
          headlines: ['Headline'],
          newsFromNeighboringNfs: [{ id: 3 }]
        })
      )
      getSpy.mockRestore()
    })
  })
})
