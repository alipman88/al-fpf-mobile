import React from 'react'
import { render, screen } from '@testing-library/react-native'

import { WebView } from '../WebView'

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn().mockReturnValue(true),
}))

describe('WebView', () => {
  const setState = jest.fn()
  const useStateMock = (initState) => [initState, setState]
  jest.spyOn(React, 'useState').mockImplementation(useStateMock)

  const navigate = jest.fn(() => true)
  const setOptions = jest.fn()

  const defaultProps = {
    areaIdsBySlug: {},
    navigation: { navigate, setOptions, addListener: jest.fn() },
    navigateWithToken: jest.fn(),
    composeEmail: jest.fn(),
    logoutUser: jest.fn(),
    route: { name: 'foo' },
    initialUrl: 'https://frontporchforum.com/directory',
    rootUrl: 'https://frontporchforum.com/directory',
  }

  afterEach(() => {
    navigate.mockReset()
    setOptions.mockReset()
  })

  test('WebView compose post requests are intercepted', () => {
    render(<WebView {...defaultProps} />)
    screen.getByTestId('webView').props.onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/compose/92?category_id=5&post%5Breferenced_profile_id%5D=123&post%5Btitle%5D=Recommending+Pawnshop+Productions',
    })

    expect(navigate).toHaveBeenCalledWith('Compose', {
      sourceUrl:
        '/compose/92?category_id=5&post%5Breferenced_profile_id%5D=123&post%5Btitle%5D=Recommending+Pawnshop+Productions',
    })
  })

  test('WebView search requests are intercepted', () => {
    render(<WebView {...defaultProps} />)
    screen.getByTestId('webView').props.onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/search?query=foo',
    })

    expect(navigate).toHaveBeenCalledWith('Search', {
      sourceUrl: '/search?query=foo',
    })
  })

  test('WebView search requests are not intercepted when in Search view already', () => {
    render(
      <WebView
        {...defaultProps}
        route={{ ...defaultProps.route, name: 'Search' }}
      />,
    )
    screen.getByTestId('webView').props.onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/search?query=foo',
    })

    expect(navigate).not.toHaveBeenCalled()
  })

  test('WebView directory requests are intercepted', () => {
    render(<WebView {...defaultProps} />)
    screen.getByTestId('webView').props.onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/directory',
    })

    expect(navigate).toHaveBeenCalledWith('Directory', {
      sourceUrl: '/directory',
    })

    screen.getByTestId('webView').props.onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/d/foo',
    })

    expect(navigate).toHaveBeenCalledWith('Directory', {
      sourceUrl: '/d/foo',
    })
  })

  test('WebView directory requests are not intercepted when in Directory view already', () => {
    render(
      <WebView
        {...defaultProps}
        route={{ ...defaultProps.route, name: 'Directory' }}
      />,
    )
    screen.getByTestId('webView').props.onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/directory',
    })

    expect(navigate).not.toHaveBeenCalled()
  })

  test('WebView forum requests are intercepted', () => {
    render(<WebView {...defaultProps} />)
    screen.getByTestId('webView').props.onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/forum',
    })

    expect(navigate).toHaveBeenCalledWith('Forum', {
      sourceUrl: '/forum',
    })

    screen.getByTestId('webView').props.onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/winooski/forum',
    })

    expect(navigate).toHaveBeenCalledWith('Forum', {
      sourceUrl: '/winooski/forum',
    })
  })

  test('WebView forum requests are not intercepted when in Forum view already', () => {
    render(
      <WebView
        {...defaultProps}
        route={{ ...defaultProps.route, name: 'Forum' }}
      />,
    )
    screen.getByTestId('webView').props.onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/forum',
    })

    expect(navigate).not.toHaveBeenCalled()
  })

  test('WebView posts requests are intercepted and routed to Forum', () => {
    render(<WebView {...defaultProps} />)
    screen.getByTestId('webView').props.onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/posts',
    })

    expect(navigate).toHaveBeenCalledWith('Forum', {
      sourceUrl: '/posts',
    })

    screen.getByTestId('webView').props.onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/winooski/posts/123',
    })

    expect(navigate).toHaveBeenCalledWith('Forum', {
      sourceUrl: '/winooski/posts/123',
    })
  })

  test('WebView posts requests are not intercepted when in Forum view already', () => {
    render(
      <WebView
        {...defaultProps}
        route={{ ...defaultProps.route, name: 'Forum' }}
      />,
    )
    screen.getByTestId('webView').props.onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/posts',
    })

    expect(navigate).not.toHaveBeenCalled()

    screen.getByTestId('webView').props.onShouldStartLoadWithRequest({
      url: 'https://frontporchforum.com/winooski/posts/123',
    })

    expect(navigate).not.toHaveBeenCalled()
  })
})
