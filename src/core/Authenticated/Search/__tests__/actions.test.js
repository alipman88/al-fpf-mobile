import * as api from '@common/api'

import { appError } from '@components/AppError/slice'
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

      const setSubmitting = jest.fn()
      const cb = jest.fn()
      const dispatch = jest.fn()

      const date = new Date()

      await search(
        {
          forums: [1],
          category: { id: 2 },
          fromDate: date,
          toDate: date,
          page: 1,
          count: 10,
          keyword: 'cats'
        },
        setSubmitting,
        cb
      )(dispatch, () => ({}))

      expect(postSpy).toHaveBeenCalledWith(
        '/posts?count=10&page=1',
        {
          area_ids: [1],
          category_ids: [2],
          from: date,
          to: date,
          query: 'cats'
        },
        {}
      )

      expect(setSubmitting).toHaveBeenCalledWith(false)
      expect(setSubmitting).toHaveBeenCalledWith(true)
      expect(cb).toHaveBeenCalledWith({ results: [], pagination: {} })
      expect(dispatch).not.toHaveBeenCalled()

      postSpy.mockRestore()
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

      const setSubmitting = jest.fn()
      const cb = jest.fn()
      const dispatch = jest.fn()

      const date = new Date()

      await search(
        {
          forums: [],
          fromDate: date,
          toDate: date,
          page: 1,
          count: 10,
          keyword: 'cats'
        },
        setSubmitting,
        cb
      )(dispatch, () => ({}))

      expect(postSpy).toHaveBeenCalledWith(
        '/posts?count=10&page=1',
        {
          area_ids: undefined,
          category_ids: undefined,
          from: date,
          to: date,
          query: 'cats'
        },
        {}
      )

      expect(setSubmitting).toHaveBeenCalledWith(false)
      expect(setSubmitting).toHaveBeenCalledWith(true)
      expect(cb).toHaveBeenCalledWith({ results: [], pagination: {} })
      expect(dispatch).not.toHaveBeenCalled()

      postSpy.mockRestore()
    })

    test('API request failure dispatches error', async () => {
      const postSpy = jest
        .spyOn(api, 'postAuthorized')
        .mockImplementation(() => {
          throw new Error('boom')
        })

      const setSubmitting = jest.fn()
      const cb = jest.fn()
      const dispatch = jest.fn()

      const date = new Date()

      await search(
        {
          forums: [],
          fromDate: date,
          toDate: date,
          page: 1,
          count: 10
        },
        setSubmitting,
        cb
      )(dispatch, () => ({}))

      expect(postSpy).toHaveBeenCalledWith(
        '/posts?count=10&page=1',
        {
          area_ids: undefined,
          category_ids: undefined,
          from: date,
          to: date
        },
        {}
      )

      expect(setSubmitting).toHaveBeenCalledWith(false)
      expect(setSubmitting).toHaveBeenCalledWith(true)
      expect(cb).not.toHaveBeenCalled()
      expect(dispatch).toHaveBeenCalledWith(
        appError.actions.setAppError('boom')
      )

      postSpy.mockRestore()
    })
  })
})
