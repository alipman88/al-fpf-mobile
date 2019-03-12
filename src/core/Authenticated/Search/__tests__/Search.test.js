import React from 'react'
import { shallow } from 'enzyme'
import { Formik } from 'formik'

import { Search } from '../Search'
import {
  ResultCounts,
  PostCategory,
  PostContainer,
  PostDate
} from '../styledComponents'

describe('Search', () => {
  const defaultProps = {
    categories: [],
    search: jest.fn()
  }

  afterEach(() => {
    defaultProps.search.mockReset()
  })

  test('no search results, no ResultCounts', () => {
    const wrapper = shallow(<Search {...defaultProps} />)
    expect(wrapper.find(ResultCounts).length).toEqual(0)
    expect(wrapper.find(PostContainer).length).toEqual(0)
  })

  test('search results render content on screen', () => {
    const wrapper = shallow(<Search {...defaultProps} />)

    wrapper.setState({
      searchResults: [
        {
          id: 1,
          title: 'abc',
          user_first_name: 'john',
          user_last_name: 'smith',
          user_email: 'test@example.com',
          user_profile_name: 'profile name',
          event: {},
          categories: ['Lost and found']
        }
      ],
      total: 1,
      page: 1,
      pages: 1,
      pageItemCount: 25
    })

    const resultCounts = wrapper.find(ResultCounts)
    expect(resultCounts.length).toEqual(1)
    expect(resultCounts.text()).toEqual(
      'Displaying postings 1 - 1 of 1 in total'
    )
    expect(wrapper.find(PostCategory).length).toEqual(1)
    expect(wrapper.find(PostDate).length).toEqual(0)
  })

  test('renders post date', () => {
    const wrapper = shallow(<Search {...defaultProps} />)

    wrapper.setState({
      searchResults: [
        {
          id: 1,
          title: 'abc',
          user_first_name: 'john',
          user_last_name: 'smith',
          user_email: 'test@example.com',
          user_profile_name: 'profile name',
          event: {
            start_date: new Date()
          },
          categories: ['Lost and found']
        }
      ],
      total: 1,
      page: 1,
      pages: 1,
      pageItemCount: 25
    })

    expect(wrapper.find(PostDate).length).toEqual(1)
  })

  test('no results, but search was performed, shows no posts msg', () => {
    const wrapper = shallow(<Search {...defaultProps} />)

    wrapper.setState({
      searchResults: [],
      searched: true
    })

    expect(wrapper.find(ResultCounts).text()).toEqual('No posts found')
  })

  describe('onSubmit', () => {
    test('calls search', async () => {
      const wrapper = shallow(<Search {...defaultProps} />)

      const setSubmitting = jest.fn()
      await wrapper
        .find(Formik)
        .props()
        .onSubmit({ forums: [] }, { setSubmitting })

      expect(defaultProps.search).toHaveBeenCalledWith(
        { forums: [], page: 1, count: 25 },
        setSubmitting,
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

      expect(wrapper.state()).toEqual({
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
