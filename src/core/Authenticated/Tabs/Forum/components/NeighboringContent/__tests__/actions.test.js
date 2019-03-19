import { fetchNeighboringIssue } from '../actions'
import { areas } from '@common/areas'

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
    })
  })
})
