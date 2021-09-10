import React from 'react'
import navigationService from '@common/utils/navigationService'
import { WebView } from '@components/WebView'
import { shallow } from 'enzyme'

describe('WebView', () => {
  const setState = jest.fn()
  const useStateMock = (initState) => [initState, setState]
  jest.spyOn(React, 'useState').mockImplementation(useStateMock)

  const navigateMock = (route, param) => true
  const navigate = jest
    .spyOn(navigationService, 'navigate')
    .mockImplementation(navigateMock)

  const defaultProps = {
    navigation: { state: {} },
    source: {
      uri: 'https://frontporchforum.com/directory',
    },
  }

  afterEach(() => {
    navigate.mockReset()
  })

  test('WebView compose post requests are intercepted', () => {
    const wrapper = shallow(<WebView {...defaultProps} />)
    wrapper.find('WebView').props().onShouldStartLoadWithRequest({
      url:
        'https://frontporchforum.com/areas/92/posts/new?category_id=5&post%5Breferenced_profile_id%5D=123&post%5Btitle%5D=Recommending+Pawnshop+Productions',
    })

    expect(navigate).toHaveBeenCalledWith('Compose', {
      areaId: 92,
      categoryId: 5,
      referencedProfileId: 123,
      shouldResetForm: true,
      title: 'Recommending Pawnshop Productions',
    })
  })

  test('WebView search requests are intercepted', () => {
    const wrapper = shallow(<WebView {...defaultProps} />)
    wrapper.find('WebView').props().onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/search?query=foo',
    })

    expect(navigate).toHaveBeenCalledWith('Search', {
      sourceUrl: '/search?query=foo',
    })
  })

  test('WebView search requests are not intercepted when in Search view already', () => {
    const wrapper = shallow(
      <WebView
        {...defaultProps}
        navigation={{ state: { routeName: 'Search' } }}
      />
    )
    wrapper.find('WebView').props().onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/search?query=foo',
    })

    expect(navigate).not.toHaveBeenCalled()
  })

  test('WebView directory requests are intercepted', () => {
    const wrapper = shallow(<WebView {...defaultProps} />)
    wrapper.find('WebView').props().onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/directory',
    })

    expect(navigate).toHaveBeenCalledWith('Directory', {
      sourceUrl: '/directory',
    })

    wrapper.find('WebView').props().onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/d/foo',
    })

    expect(navigate).toHaveBeenCalledWith('Directory', {
      sourceUrl: '/d/foo',
    })
  })

  test('WebView directory requests are not intercepted when in Directory view already', () => {
    const wrapper = shallow(
      <WebView
        {...defaultProps}
        navigation={{ state: { routeName: 'Directory' } }}
      />
    )
    wrapper.find('WebView').props().onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/directory',
    })

    expect(navigate).not.toHaveBeenCalled()
  })
})
