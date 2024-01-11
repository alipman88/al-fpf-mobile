import { api } from '@common/api'
import { getContents } from '../actions'
import { posts } from '../slice'
import endOfDay from 'date-fns/end_of_day'

describe('posts - actions', () => {
  const dispatch = jest.fn()
  const defaultPlacementDateByIssue = {
    2: endOfDay(new Date()),
  }
  const getState = (placementDates = defaultPlacementDateByIssue) => {
    return () => ({
      main: {
        issues: {
          issuesByAreaId: {
            55: [
              {
                id: 1,
                number: 32,
                area_id: 55,
              },
              {
                id: 2,
                number: 2,
                area_id: 10,
              },
            ],
          },
        },
        areas: {
          currentAreaId: 55,
        },
        posts: {
          postsByIssue: {
            2: [
              {
                id: 1,
              },
            ],
          },
          adsByIssue: {
            2: [
              {
                id: 1,
              },
            ],
          },
          featuredAdCampaignsByIssue: {},
          placementDateByIssue: placementDates,
        },
      },
      secured: {
        currentUser: {
          accessToken: 'abc123',
        },
      },
    })
  }

  afterEach(() => {
    dispatch.mockReset()
  })

  describe('getContents', () => {
    test('issue number not found, no API requests made', async () => {
      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => {})
      await getContents(5)(dispatch, getState())

      expect(getSpy).not.toHaveBeenCalled()
      getSpy.mockRestore()
    })

    test('doesnt fetch posts if we have posts for that issue', () => {
      const getSpy = jest.spyOn(api, 'get')

      getContents(2)(dispatch, getState())

      expect(getSpy).not.toHaveBeenCalled()
      getSpy.mockRestore()
    })

    test('issue found, fetches posts', async () => {
      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => ({
        data: {
          posts: [{ id: 1 }],
          ads: [{ id: 2 }],
          headlines: ['Headline'],
          news_from_neighboring_nfs: [{ id: 3 }],
        },
      }))
      await getContents(1)(dispatch, getState())

      expect(getSpy).toHaveBeenCalledWith('/areas/55/issues/32/contents', {
        headers: {
          Authorization: 'Bearer abc123',
        },
      })
      expect(dispatch).toHaveBeenCalledWith(
        posts.actions.setContentsForIssue({
          issueId: 1,
          posts: [{ id: 1 }],
          ads: [{ id: 2 }],
          placementDate: endOfDay(new Date()),
          headlines: ['Headline'],
          newsFromNeighboringNfs: [{ id: 3 }],
        })
      )
      getSpy.mockRestore()
    })

    test('issue found, force refresh posts', async () => {
      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => ({
        data: {
          posts: [{ id: 1 }],
          ads: [{ id: 2 }],
          headlines: ['Headline'],
          news_from_neighboring_nfs: [{ id: 3 }],
        },
      }))
      await getContents(2, null, { force: true })(dispatch, getState())

      expect(getSpy).toHaveBeenCalledWith('/areas/10/issues/2/contents', {
        headers: {
          Authorization: 'Bearer abc123',
        },
      })
      expect(dispatch).toHaveBeenCalledWith(
        posts.actions.setContentsForIssue({
          issueId: 2,
          posts: [{ id: 1 }],
          ads: [{ id: 2 }],
          placementDate: endOfDay(new Date()),
          headlines: ['Headline'],
          newsFromNeighboringNfs: [{ id: 3 }],
        })
      )
      getSpy.mockRestore()
    })

    test('issue found, old ads found, fetches ads', async () => {
      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => ({
        data: {
          ads: [{ id: 2 }],
        },
      }))
      await getContents(2)(
        dispatch,
        getState({
          2: new Date(2020, 1, 1),
        })
      )

      expect(getSpy).toHaveBeenCalledWith('/areas/10/issues/2/ads', {
        headers: {
          Authorization: 'Bearer abc123',
        },
      })
      expect(dispatch).toHaveBeenCalledWith(
        posts.actions.setAdsForIssue({
          issueId: 2,
          ads: [{ id: 2 }],
          placementDate: endOfDay(new Date()),
        })
      )
      getSpy.mockRestore()
    })

    test('issue found, recent ads found, does not fetch ads', async () => {
      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => ({
        data: {
          ads: [{ id: 2 }],
        },
      }))
      await getContents(2)(dispatch, getState())

      expect(getSpy).not.toHaveBeenCalled()
      getSpy.mockRestore()
    })
  })
})
