import { setupForumData } from '../setupForumData'
import { areas } from '@common/areas/slice'

jest.mock('../issues', () => ({
  getIssues: jest.fn().mockReturnValue('getIssues'),
  issues: require('../issues/slice').issues
}))

jest.mock('../posts', () => ({
  getPosts: jest.fn().mockReturnValue('getPosts')
}))

jest.mock('@common/profile', () => ({
  getProfiles: jest.fn().mockReturnValue('getProfiles'),
  profile: require('../../../../common/profile/slice').profile
}))

jest.mock('@common/appSettings', () => ({
  getAppSettings: jest.fn().mockReturnValue('getAppSettings')
}))

jest.mock('@common/areas', () => ({
  getAreas: jest.fn().mockReturnValue('getAreas'),
  areas: require('../../../../common/areas/slice').areas
}))

describe('setupForumData', () => {
  test('loads profiles, settings, areas, issues, and posts', async () => {
    const dispatch = jest.fn()
    const getState = () => ({
      main: {
        areas: {
          areas: [
            {
              id: 1
            }
          ],
          currentAreaId: 1
        },
        issues: {
          issues: [
            {
              id: 1,
              number: 1
            }
          ],
          currentIssueId: 1
        }
      }
    })
    await setupForumData()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith('getProfiles')
    expect(dispatch).toHaveBeenCalledWith('getAppSettings')
    expect(dispatch).toHaveBeenCalledWith('getAreas')

    expect(dispatch).toHaveBeenCalledTimes(3)
  })

  test('currentAreaId 0, code selects an area from the profile', async () => {
    const dispatch = jest.fn()
    const getState = () => ({
      main: {
        areas: {
          areas: [
            {
              id: 2
            }
          ],
          currentAreaId: 0
        },
        issues: {
          issues: [
            {
              id: 1,
              number: 1
            }
          ],
          currentIssueId: 1
        },
        profile: {
          user: {
            profiles: [
              {
                id: 1,
                area_ids: [2]
              }
            ]
          },
          currentProfileId: 1
        }
      }
    })
    await setupForumData()(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith('getProfiles')
    expect(dispatch).toHaveBeenCalledWith('getAppSettings')
    expect(dispatch).toHaveBeenCalledWith('getAreas')
    expect(dispatch).toHaveBeenCalledWith(areas.actions.setCurrentAreaId(2))

    expect(dispatch).toHaveBeenCalledTimes(4)
  })
})
