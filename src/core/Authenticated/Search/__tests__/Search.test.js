import React from 'react'
import { shallow } from 'enzyme'
import { Formik } from 'formik'

import { Search } from '../Search'

describe('Search', () => {
  const defaultProps = {
    addSearchToHistory: jest.fn(),
    areas: [],
    categories: [],
    search: jest.fn()
  }

  afterEach(() => {
    defaultProps.addSearchToHistory.mockReset()
    defaultProps.search.mockReset()
  })

  describe('nextPage', () => {
    test('updates current page and calls search', () => {
      const wrapper = shallow(<Search {...defaultProps} />)
      const searchSpy = jest
        .spyOn(wrapper.instance(), 'search')
        .mockImplementation(() => {})

      wrapper.instance().nextPage({ keyword: 'test' })
      expect(wrapper.state().page).toEqual(2)
      expect(searchSpy).toHaveBeenCalled()
    })
  })

  describe('search', () => {
    test('when requesting pages higher than 1, concat the results', () => {
      const wrapper = shallow(<Search {...defaultProps} />)
      wrapper.setState({ page: 2, searchResults: [{ id: 1 }] })

      wrapper.instance().search({ keyword: 'test' })

      expect(defaultProps.search).toHaveBeenCalledWith(
        {
          keyword: 'test',
          page: 2,
          count: 25
        },
        expect.any(Function),
        expect.any(Function)
      )

      defaultProps.search.mock.calls[0][2]({
        pagination: { total: 15, page: 2, pages: 3, page_item_count: 5 },
        results: [{ id: 2 }, { id: 3 }, { id: 4 }]
      })

      expect(wrapper.state()).toEqual({
        loading: false,
        searched: true,
        searchResults: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        total: 15,
        page: 2,
        pages: 3,
        pageItemCount: 5
      })
    })
  })

  describe('onSubmit', () => {
    test('calls search', async () => {
      const wrapper = shallow(<Search {...defaultProps} />)

      const setSubmitting = jest.fn()
      await wrapper
        .find(Formik)
        .props()
        .onSubmit({ forums: [], keyword: 'test' }, { setSubmitting })

      expect(defaultProps.search).toHaveBeenCalledWith(
        { forums: [], page: 1, count: 25, keyword: 'test' },
        expect.any(Function),
        expect.any(Function)
      )

      const post = {
        id: 1,
        title: 'abc',
        user_first_name: 'john',
        user_last_name: 'smith',
        user_email: 'test@example.com',
        user_profile_name: 'profile name',
        event: {},
        categories: ['Lost and found']
      }

      defaultProps.search.mock.calls[0][2]({
        pagination: { total: 5, page: 1, pages: 2, page_item_count: 3 },
        results: [post]
      })

      expect(defaultProps.addSearchToHistory).toHaveBeenCalledWith('test')
      expect(setSubmitting).toHaveBeenCalledTimes(2)
      expect(setSubmitting).toHaveBeenCalledWith(true)
      expect(setSubmitting).toHaveBeenCalledWith(false)

      expect(wrapper.state()).toEqual({
        loading: false,
        searched: true,
        searchResults: [post],
        total: 5,
        page: 1,
        pages: 2,
        pageItemCount: 3
      })
    })
  })
})
