import React from 'react'
import { shallow } from 'enzyme'

import { DrawerMenu } from '../DrawerMenu'

import { ForumText } from '../styledComponents'

describe('DrawerMenu', () => {
  const defaultProps = {
    areas: [
      {
        id: 1,
        name: 'C'
      },
      {
        id: 2,
        name: 'B'
      },
      {
        id: 3,
        name: 'A'
      }
    ],
    currentAreaId: 1,
    currentProfile: {
      id: 1,
      area_ids: [1, 3]
    },
    profiles: [
      {
        id: 1,
        area_ids: [1, 3]
      },
      {
        id: 2,
        area_ids: [1]
      }
    ],
    setCurrentAreaId: jest.fn(),
    setCurrentProfileId: jest.fn()
  }

  test('renders areas that are part of the profiles', () => {
    const outer = shallow(<DrawerMenu {...defaultProps} />)
    const Children = outer.prop('children')
    const wrapper = shallow(<Children />)

    expect(wrapper.find(ForumText).length).toEqual(2)
  })
})
