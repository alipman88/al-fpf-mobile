import React from 'react'
import { shallow } from 'enzyme'
import { OtherIssues } from '../OtherIssues/OtherIssues'
import { IssueTab } from '../OtherIssues/IssueTab'

describe('OtherIssues selector', () => {
  const defaultProps = {
    issues: [
      { id: 1, number: 10, sent_at: '01-01-2001' },
      { id: 2, number: 20, sent_at: '02-01-2001' },
      { id: 3, number: 30, sent_at: '03-01-2001' },
      { id: 4, number: 40, sent_at: '04-01-2001' },
      { id: 5, number: 50, sent_at: '05-01-2001' }
    ],
    currentIssueNumber: 1,
    getPosts: jest.fn(),
    setCurrentIssueNumber: jest.fn()
  }

  test('it creates 5 tabs to choose from', () => {
    const wrapper = shallow(<OtherIssues {...defaultProps} />)
    expect(wrapper.find(IssueTab).length).toEqual(5)
  })

  test('it sets the currentIssueNumber onPress', () => {
    const wrapper = shallow(<OtherIssues {...defaultProps} />)

    wrapper
      .find(IssueTab)
      .findWhere(i => i.props().issue.number === 40)
      .first()
      .props()
      .onTapIssue(40)

    expect(defaultProps.setCurrentIssueNumber).toHaveBeenCalledWith(40)
    expect(defaultProps.getPosts).toHaveBeenCalledWith(40)
  })
})
