import React from 'react'
import { shallow } from 'enzyme'
import { OtherIssues } from '../OtherIssues'
import { IssueTab } from '../IssueTab'

describe('OtherIssues selector', () => {
  const defaultProps = {
    issues: [
      { id: 1, number: 10, sent_at: '01-01-2001' },
      { id: 2, number: 20, sent_at: '02-01-2001' },
      { id: 3, number: 30, sent_at: '03-01-2001' },
      { id: 4, number: 40, sent_at: '04-01-2001' },
      { id: 5, number: 50, sent_at: '05-01-2001' }
    ],
    currentIssueId: 1,
    getPosts: jest.fn(),
    setCurrentIssueId: jest.fn()
  }

  test('it creates 5 tabs to choose from', () => {
    const wrapper = shallow(<OtherIssues {...defaultProps} />)
    expect(wrapper.find(IssueTab).length).toEqual(5)
  })

  test('it sets the currentIssueId onPress', () => {
    const wrapper = shallow(<OtherIssues {...defaultProps} />)

    wrapper
      .find(IssueTab)
      .findWhere(i => i.props().issue.number === 40)
      .first()
      .props()
      .onTapIssue(4)

    expect(defaultProps.setCurrentIssueId).toHaveBeenCalledWith(4)
    expect(defaultProps.getPosts).toHaveBeenCalledWith(4)
  })
})
