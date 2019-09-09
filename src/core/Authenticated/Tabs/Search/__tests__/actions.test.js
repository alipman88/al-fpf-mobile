import * as api from '@common/api'

import { search } from '../actions'

describe('Search - actions', () => {
  describe('search', () => {
    test('requests results from server', async () => {
      const postSpy = jest
        .spyOn(api, 'postAuthorized')
        .mockImplementation(() => ({
          data: {
            results: [],
            pagination: {}
          }
        }))

      const dispatch = jest.fn()

      const date = new Date(2019, 3, 8)

      return await search({
        forums: [1],
        category: { id: 2 },
        fromDate: date,
        toDate: date,
        page: 1,
        count: 10,
        keyword: 'cats'
      })(dispatch, () => ({})).then(data => {
        expect(postSpy).toHaveBeenCalledWith(
          '/posts?count=10&page=1',
          {
            area_ids: [1],
            category_ids: [2],
            from: '2019-04-08',
            to: '2019-04-08',
            query: 'cats'
          },
          {}
        )

        expect(data).toEqual({ results: [], pagination: {} })
        expect(dispatch).not.toHaveBeenCalled()

        postSpy.mockRestore()
      })
    })

    test('no selected forums or categories strips it from request', async () => {
      const postSpy = jest
        .spyOn(api, 'postAuthorized')
        .mockImplementation(() => ({
          data: {
            results: [],
            pagination: {}
          }
        }))

      const dispatch = jest.fn()

      const date = new Date(2019, 3, 8)

      return await search({
        forums: [],
        fromDate: date,
        toDate: date,
        page: 1,
        count: 10,
        keyword: 'cats'
      })(dispatch, () => ({})).then(data => {
        expect(postSpy).toHaveBeenCalledWith(
          '/posts?count=10&page=1',
          {
            area_ids: undefined,
            category_ids: undefined,
            from: '2019-04-08',
            to: '2019-04-08',
            query: 'cats'
          },
          {}
        )

        expect(data).toEqual({ results: [], pagination: {} })
        expect(dispatch).not.toHaveBeenCalled()

        postSpy.mockRestore()
      })
    })

    test('API request failure dispatches error', async () => {
      const error = new Error('boom')

      const postSpy = jest
        .spyOn(api, 'postAuthorized')
        .mockImplementation(() => {
          throw error
        })

      const dispatch = jest.fn()

      const date = new Date(2019, 3, 8)

      return await search({
        forums: [],
        fromDate: date,
        toDate: date,
        page: 1,
        count: 10
      })(dispatch, () => ({})).catch(data => {
        expect(postSpy).toHaveBeenCalledWith(
          '/posts?count=10&page=1',
          {
            area_ids: undefined,
            category_ids: undefined,
            from: '2019-04-08',
            to: '2019-04-08'
          },
          {}
        )

        expect(data).toEqual(error)

        postSpy.mockRestore()
      })
    })
  })
})
