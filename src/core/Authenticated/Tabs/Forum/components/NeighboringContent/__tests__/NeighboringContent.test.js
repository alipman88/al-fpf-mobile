import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity } from 'react-native'

import { NeighboringContent } from '../NeighboringContent'
import { Link, Row } from '../styledComponents'

describe('NeighboringContent', () => {
  test('if news has empty length, component should render null', () => {
    const wrapper = shallow(
      <NeighboringContent
        fetchSpecificIssue={() => ({})}
        newsFromNeighboringNfs={[]}
      />
    )

    expect(wrapper.type()).toEqual(null)
  })

  test('renders a sub items with news content & press handler', () => {
    const fetchSpecificIssue = jest.fn()

    const wrapper = shallow(
      <NeighboringContent
        fetchSpecificIssue={fetchSpecificIssue}
        newsFromNeighboringNfs={[
          {
            area_id: 1,
            issue_number: 123,
            area_name: 'City',
            first_post_title: 'Post title',
            first_post_user_full_name: 'John Smith',
            additional_posts_count: 1,
          },
          {
            area_id: 2,
            issue_number: 34,
            area_name: 'Other place',
            first_post_title: 'Second title',
            first_post_user_full_name: 'Jess Smith',
            additional_posts_count: 0,
          },
        ]}
      />
    )

    expect(wrapper.find(Row).length).toEqual(2)

    const firstRow = wrapper.find(Row).at(0)
    expect(firstRow.find(Link).text()).toEqual('Read posting and 1 more')

    firstRow.find(TouchableOpacity).simulate('press')
    expect(fetchSpecificIssue).toHaveBeenCalled()

    const secondRow = wrapper.find(Row).at(1)
    expect(secondRow.find(Link).text()).toEqual('Read posting ')
  })
})
