import React from 'react'
import { shallow } from 'enzyme'

import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import subYears from 'date-fns/sub_years'

import { SearchResults } from '../SearchResults'
import { SearchHistory } from '../../SearchHistory'
import { Post } from '../Post'
import { ResultCounts, PostContainer } from '../styledComponents'

describe('SearchResults', () => {
  const defaultProps = {
    categories: [],
    minResultRange: 1,
    pageItemCount: 25,
    postTruncateLength: 100,
    total: 25,
    search: jest.fn(),
    searched: false,
    searchResults: [],
    setFieldTouched: jest.fn(),
    setFieldValue: jest.fn()
  }

  afterEach(() => {
    defaultProps.setFieldTouched.mockReset()
    defaultProps.setFieldValue.mockReset()
    defaultProps.search.mockReset()
  })

  test('no search results, no ResultCounts', () => {
    const wrapper = shallow(<SearchResults {...defaultProps} />)
    expect(wrapper.find(ResultCounts).length).toEqual(0)
    expect(wrapper.find(PostContainer).length).toEqual(0)
  })

  test('search results render content on screen', () => {
    const wrapper = shallow(
      <SearchResults
        {...defaultProps}
        searchResults={[
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
        ]}
      />
    )

    const resultCounts = wrapper.find(ResultCounts)
    expect(resultCounts.length).toEqual(1)
    expect(resultCounts.text()).toEqual(
      'Displaying postings 1 - 25 of 25 in total'
    )
    expect(wrapper.find(Post).length).toEqual(1)
  })

  test('renders search history', () => {
    const wrapper = shallow(<SearchResults {...defaultProps} />)
    expect(wrapper.find(SearchHistory).length).toEqual(1)
  })

  test('search history hidden after search', () => {
    const wrapper = shallow(<SearchResults {...defaultProps} searched />)
    expect(wrapper.find(SearchHistory).length).toEqual(0)
  })

  test('pressing search history calls search function', () => {
    const wrapper = shallow(<SearchResults {...defaultProps} />)

    wrapper
      .find(SearchHistory)
      .props()
      .onEntryPress('my search')

    expect(defaultProps.search).toHaveBeenCalledWith({
      forums: [],
      keyword: 'my search',
      fromDate: startOfDay(subYears(new Date(), 2)),
      toDate: endOfDay(new Date())
    })
  })

  test('no results, but search was performed, shows no posts msg', () => {
    const wrapper = shallow(<SearchResults {...defaultProps} searched />)

    expect(wrapper.find(ResultCounts).text()).toEqual('No posts found')
  })
})
