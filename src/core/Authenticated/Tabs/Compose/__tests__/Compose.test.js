import React from 'react'
import { shallow } from 'enzyme'

import { Compose } from '../Compose'
import { WebView } from '@fpf/components/WebView'

// Mock Config module
jest.mock('@fpf/common/config', () => ({
  Config: {
    WEBSITE_HOST: 'https://frontporchforum.com',
  },
}))

describe('Compose', () => {
  const defaultProps = {
    accessToken: 'test-token',
    navigation: {
      addListener: jest.fn(() => jest.fn()),
      setParams: jest.fn(),
      navigate: jest.fn(),
    },
    navigateWithToken: jest.fn(),
    route: {
      params: {},
      path: '/compose',
    },
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('WebView initialUrl includes resetToken query parameter', () => {
    const wrapper = shallow(<Compose {...defaultProps} />)
    const webView = wrapper.find(WebView)

    expect(webView.prop('initialUrl')).toBe(
      'https://frontporchforum.com/compose?resetToken=0',
    )
  })

  test('WebView initialUrl updates when resetToken changes', () => {
    const propsWithResetToken = {
      ...defaultProps,
      route: {
        ...defaultProps.route,
        params: { resetToken: 5 },
      },
    }

    const wrapper = shallow(<Compose {...propsWithResetToken} />)
    const webView = wrapper.find(WebView)

    expect(webView.prop('initialUrl')).toBe(
      'https://frontporchforum.com/compose?resetToken=5',
    )
  })

  test('WebView initialUrl with sourceUrl includes resetToken', () => {
    const propsWithSourceUrl = {
      ...defaultProps,
      route: {
        ...defaultProps.route,
        params: {
          sourceUrl: '/compose/92?category_id=5',
          resetToken: 2,
        },
      },
    }

    const wrapper = shallow(<Compose {...propsWithSourceUrl} />)
    const webView = wrapper.find(WebView)

    expect(webView.prop('initialUrl')).toBe(
      'https://frontporchforum.com/compose/92?category_id=5&resetToken=2',
    )
  })

  test('reset() method increments resetToken', () => {
    const wrapper = shallow(<Compose {...defaultProps} />)
    const instance = wrapper.instance()

    // Call reset method
    instance.reset()

    expect(defaultProps.navigation.setParams).toHaveBeenCalledWith({
      submittedContentType: null,
      resetToken: 1, // 0 + 1
    })
  })

  test('blur() calls reset() when modalVisible is true', () => {
    const propsWithModal = {
      ...defaultProps,
      route: {
        ...defaultProps.route,
        params: { submittedContentType: 'post' },
      },
    }

    const wrapper = shallow(<Compose {...propsWithModal} />)
    const instance = wrapper.instance()
    const resetSpy = jest.spyOn(instance, 'reset')

    // Call blur method
    instance.blur()

    expect(resetSpy).toHaveBeenCalled()
  })

  test('blur() calls reset() when postSubmittedConfirmation is true', () => {
    const propsWithConfirmation = {
      ...defaultProps,
      route: {
        ...defaultProps.route,
        params: { postSubmittedConfirmation: true },
      },
    }

    const wrapper = shallow(<Compose {...propsWithConfirmation} />)
    const instance = wrapper.instance()
    const resetSpy = jest.spyOn(instance, 'reset')

    // Call blur method
    instance.blur()

    expect(resetSpy).toHaveBeenCalled()
  })

  test('blur() calls reset() when both modalVisible and postSubmittedConfirmation are true', () => {
    const propsWithBoth = {
      ...defaultProps,
      route: {
        ...defaultProps.route,
        params: {
          submittedContentType: 'post',
          postSubmittedConfirmation: true,
        },
      },
    }

    const wrapper = shallow(<Compose {...propsWithBoth} />)
    const instance = wrapper.instance()
    const resetSpy = jest.spyOn(instance, 'reset')

    // Call blur method
    instance.blur()

    expect(resetSpy).toHaveBeenCalled()
  })

  test('blur() does not call reset() when neither modalVisible nor postSubmittedConfirmation are true', () => {
    const wrapper = shallow(<Compose {...defaultProps} />)
    const instance = wrapper.instance()
    const resetSpy = jest.spyOn(instance, 'reset')

    // Call blur method
    instance.blur()

    expect(resetSpy).not.toHaveBeenCalled()
  })
})
