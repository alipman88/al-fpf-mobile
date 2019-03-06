import { fetchNeighboringIssue } from '../actions'
import { areas } from '@common/areas'
import { issues, getIssues } from '../../../issues'
import { getPosts } from '../../../posts'

jest.mock('../../../issues', () => ({
  getIssues: jest.fn().mockReturnValue('getIssues'),
  issues: require('../../../issues/slice').issues
}))

jest.mock('../../../posts', () => ({
  getPosts: jest.fn().mockReturnValue('getPosts')
}))

jest.mock('@common/areas', () => ({
  getAreas: jest.fn().mockReturnValue('getAreas'),
  areas: require('../../../../../../common/areas/slice').areas
}))

describe('NeighboringContent - actions', () => {
  describe('fetchNeigboringIssue', () => {
    test('dispatches to fetch areas, issues, and posts', async () => {
      const dispatch = jest.fn()
      const getState = () => ({
        main: {
          issues: {
            issuesByAreaId: {
              50: [
                {
                  number: 26,
                  id: 4
                },
                {
                  number: 10,
                  id: 2
                }
              ]
            }
          }
        }
      })

      await fetchNeighboringIssue({ area_id: 50, issue_number: 26 })(
        dispatch,
        getState
      )

      expect(dispatch).toHaveBeenCalledWith(areas.actions.setCurrentAreaId(50))
      expect(getIssues).toHaveBeenCalledWith(50)
      expect(dispatch).toHaveBeenCalledWith('getIssues')
      expect(dispatch).toHaveBeenCalledWith(issues.actions.setCurrentIssueId(4))
      expect(dispatch).toHaveBeenCalledWith('getPosts')
      expect(getPosts).toHaveBeenCalledWith(4)
    })
  })
})
