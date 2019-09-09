import React from 'react'
import { Keyboard } from 'react-native'
import { shallow } from 'enzyme'
import { Formik } from 'formik'

import { Search } from '../Search'

describe('Search', () => {
  const defaultProps = {
    addSearchToHistory: jest.fn(),
    areas: [],
    categories: [],
    currentAreaId: 1,
    search: jest.fn(),
    navigation: {
      getParam: jest.fn()
    },
    setAppError: jest.fn()
  }

  afterEach(() => {
    defaultProps.addSearchToHistory.mockReset()
    defaultProps.search.mockReset()
  })

  test('it prepopulates cateogry when passed through navigation params', () => {
    const categoryName = 'Lost and Found'
    const navigation = {
      getParam: jest.fn(() => categoryName)
    }
    const categories = [
      { id: 1, name: categoryName },
      { id: 2, name: 'Another Category' }
    ]
    const wrapper = shallow(
      <Search
        {...defaultProps}
        navigation={navigation}
        categories={categories}
      />
    )
    wrapper.instance().componentDidMount()
    expect(wrapper.state().categoryFromLink).toEqual({
      id: 1,
      name: categoryName
    })

    wrapper.setProps({
      navigation: {
        getParam: jest.fn(() => 'Another Category')
      }
    })

    expect(wrapper.state().categoryFromLink).toEqual({
      id: 2,
      name: 'Another Category'
    })
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

      defaultProps.search.mockResolvedValue({
        pagination: { total: 15, page: 2, pages: 3, page_item_count: 5 },
        results: [{ id: 2 }, { id: 3 }, { id: 4 }]
      })

      return wrapper
        .instance()
        .search({ keyword: 'test' })
        .then(() => {
          expect(defaultProps.search).toHaveBeenCalledWith({
            keyword: 'test',
            page: 2,
            count: 25
          })

          expect(wrapper.state()).toEqual({
            categoryFromLink: undefined,
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
  })

  describe('onSubmit', () => {
    test('calls search', async () => {
      const wrapper = shallow(<Search {...defaultProps} />)
      const dismissSpy = jest.spyOn(Keyboard, 'dismiss')

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

      defaultProps.search.mockResolvedValue({
        pagination: { total: 5, page: 1, pages: 2, page_item_count: 3 },
        results: [post]
      })

      const setSubmitting = jest.fn()
      await wrapper
        .find(Formik)
        .props()
        .onSubmit({ forums: [], keyword: 'test' }, { setSubmitting })

      expect(defaultProps.search).toHaveBeenCalledWith({
        forums: [],
        page: 1,
        count: 25,
        keyword: 'test'
      })

      expect(defaultProps.addSearchToHistory).toHaveBeenCalledWith('test')
      expect(setSubmitting).toHaveBeenCalledTimes(2)
      expect(setSubmitting).toHaveBeenCalledWith(true)
      expect(setSubmitting).toHaveBeenCalledWith(false)
      expect(dismissSpy).toHaveBeenCalled()
      dismissSpy.mockRestore()

      expect(wrapper.state()).toEqual({
        categoryFromLink: undefined,
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
