import React from 'react'
import { shallow } from 'enzyme'

import { ForumMessage } from '../ForumMessage'
import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { Header } from '../../sharedStyles'

describe('ForumMessage', () => {
  test('if message has empty length, component should render null', () => {
    const emptyMessage = {}
    const wrapper = shallow(<ForumMessage forumMessage={emptyMessage} />)

    expect(wrapper.type()).toEqual(null)
  })

  test('renders with a string', () => {
    const message = {
      content: 'foo',
    }
    const wrapper = shallow(<ForumMessage forumMessage={message} />)

    expect(wrapper.find(Header).length).toEqual(0)
    expect(wrapper.find(Text).length).toEqual(1)
    expect(wrapper.find(Button).length).toEqual(0)
  })

  test('renders with a title', () => {
    const message = {
      title: 'foo',
    }
    const wrapper = shallow(<ForumMessage forumMessage={message} />)

    expect(wrapper.find(Header).length).toEqual(1)
    expect(wrapper.find(Text).length).toEqual(0)
    expect(wrapper.find(Button).length).toEqual(0)
  })

  test('renders with a button', () => {
    const message = {
      button_text: 'foo',
      button_url: 'foo',
    }
    const wrapper = shallow(<ForumMessage forumMessage={message} />)

    expect(wrapper.find(Header).length).toEqual(0)
    expect(wrapper.find(Text).length).toEqual(0)
    expect(wrapper.find(Button).length).toEqual(1)
  })
})
