import React from 'react'
import { shallow } from 'enzyme'
import { Button } from '@components/Button'
import { Category } from '../components/styledComponents'
import { Post } from '../components/Post'

describe('Forum', () => {
  const defaultProps = {
    onButtonPress: jest.fn(),
    post: {
      id: 1,
      content: 'Test test test testereeno',
      title: 'Test',
      categories: ['test'],
      user_first_name: 'test',
      user_last_name: 'test',
      user_email: 'test@testmail.test',
      user_profile_name: 'Mayor, Test Ontario'
    }
  }

  afterEach(() => {
    defaultProps.onButtonPress.mockReset()
  })

  test('it renders correct number of categories', () => {
    const props = {
      ...defaultProps,
      post: { ...defaultProps.post, categories: ['test', 'test1'] }
    }
    const wrapper = shallow(<Post {...props} />)
    expect(wrapper.find(Category).length).toEqual(2)
  })

  test('tapping buttons does stuff', () => {
    const wrapper = shallow(<Post {...defaultProps} />)
    wrapper
      .find(Button)
      .last()
      .simulate('press')
    expect(defaultProps.onButtonPress).toHaveBeenCalledWith('reply')
  })
})
