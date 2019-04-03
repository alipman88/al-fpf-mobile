import React from 'react'
import { shallow } from 'enzyme'

import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import subYears from 'date-fns/sub_years'

import { Button } from '@components/Button'
import { Post } from '@components/Post'
import { SearchResults } from '../SearchResults'
import { SearchHistory } from '../../SearchHistory'
import { ResultCounts, ResultsDivider } from '../styledComponents'

describe('SearchResults', () => {
  const defaultProps = {
    postTruncateLength: 10,
    categories: [],
    navigation: {},
    nextPage: jest.fn(),
    total: 1,
    search: jest.fn(),
    searched: false,
    searchResults: [],
    setFieldTouched: jest.fn(),
    setFieldValue: jest.fn()
  }

  afterEach(() => {
    defaultProps.nextPage.mockReset()
    defaultProps.setFieldTouched.mockReset()
    defaultProps.setFieldValue.mockReset()
    defaultProps.search.mockReset()
  })

  test('no search results, no ResultCounts', () => {
    const wrapper = shallow(<SearchResults {...defaultProps} />)
    expect(wrapper.find(ResultCounts).length).toEqual(0)
    expect(wrapper.find(Post).length).toEqual(0)
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
      'Displaying postings 1 - 1 of 1 in total'
    )
    expect(wrapper.find(Post).length).toEqual(1)
    // just one separating result count & results
    expect(wrapper.find(ResultsDivider).length).toEqual(1)
  })

  test('two results, separated by divider', () => {
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
          },
          {
            id: 2,
            title: 'other post',
            user_first_name: 'jane',
            user_last_name: 'smith',
            user_email: 'test@example.com',
            user_profile_name: 'profile name',
            event: {},
            categories: ['Announcement']
          }
        ]}
      />
    )

    expect(wrapper.find(ResultsDivider).length).toEqual(2)
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

  test('load more button visible when there are more results', () => {
    const wrapper = shallow(
      <SearchResults
        {...defaultProps}
        total={10}
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

    expect(wrapper.find(Button).length).toEqual(1)
  })

  test('load more button calls nextPage prop', () => {
    const wrapper = shallow(
      <SearchResults
        {...defaultProps}
        total={10}
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

    wrapper.find(Button).simulate('press')
    expect(defaultProps.nextPage).toHaveBeenCalled()
  })
})
