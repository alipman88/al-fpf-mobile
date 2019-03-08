import React from 'react'
import { TouchableOpacity } from 'react-native'
import { shallow } from 'enzyme'

import { IssueTab } from '../IssueTab'
import { Triangle } from '../styledComponents'

describe('IssueTab', () => {
  const defaultProps = {
    issue: {
      number: 122,
      sent_date: new Date().toISOString(),
      id: 55
    },
    focused: true,
    isUnread: false,
    currentAreaId: 1,
    onTapIssue: jest.fn(),
    toggleIssueUnread: jest.fn()
  }

  afterEach(() => {
    defaultProps.onTapIssue.mockReset()
  })

  test('calls onTapIssue', () => {
    const wrapper = shallow(<IssueTab {...defaultProps} />)

    wrapper.find(TouchableOpacity).simulate('press')
    expect(defaultProps.onTapIssue).toHaveBeenCalledWith(55)
  })

  test('contains triangle', () => {
    const wrapper = shallow(<IssueTab {...defaultProps} />)
    expect(wrapper.find(Triangle).length).toEqual(1)
  })

  test('focused = false, does not contain triangle', () => {
    const wrapper = shallow(<IssueTab {...defaultProps} focused={false} />)
    expect(wrapper.find(Triangle).length).toEqual(0)
  })
})
