import React from 'react'
import TestRenderer from 'react-test-renderer'

import { DrawerMenu } from '../DrawerMenu'

import { ForumText } from '../styledComponents'

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}))

describe('DrawerMenu', () => {
  const defaultProps = {
    areas: [
      {
        id: 1,
        name: 'C',
      },
      {
        id: 2,
        name: 'B',
      },
      {
        id: 3,
        name: 'A',
      },
    ],
    currentAreaId: 1,
    currentProfile: {
      id: 1,
      area_ids: [1, 3],
    },
    profiles: [
      {
        id: 1,
        area_ids: [1, 3],
      },
      {
        id: 2,
        area_ids: [1],
      },
    ],
    setCurrentAreaId: jest.fn(),
    setCurrentProfileId: jest.fn(),
  }

  test('renders areas', () => {
    const wrapper = TestRenderer.create(<DrawerMenu {...defaultProps} />).root
    expect(wrapper.findAllByType(ForumText).length).toEqual(3)
  })
})
