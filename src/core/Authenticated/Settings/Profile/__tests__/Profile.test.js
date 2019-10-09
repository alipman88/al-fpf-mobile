import React from 'react'
import { shallow } from 'enzyme'

import { Profile } from '../Profile'
import { ExternalLink } from '../../components/ExternalLink'
import { FieldText } from '../../components/FieldText'

jest.mock('uuid/v4', () => ({
  __esModule: true,
  default: () => 'abcdefgh123'
}))

describe('Profile', () => {
  const defaultProps = {
    navigateWithToken: jest.fn(),
    navigation: {},
    areas: {
      1: {
        name: 'One'
      },
      2: {
        name: 'Two'
      },
      3: {
        name: 'Three'
      }
    },
    profile: {
      id: 4,
      area_ids: [1, 3],
      profile_plan: {
        plan_type: 'neighbor'
      },
      home_nf: 1,
      name: 'foo'
    },
    updateUser: jest.fn()
  }

  afterEach(() => {
    defaultProps.navigateWithToken.mockReset()
  })

  test('areas render as names', () => {
    const wrapper = shallow(<Profile {...defaultProps} />)
    expect(
      wrapper
        .find(FieldText)
        .at(3)
        .text()
    ).toEqual('One')
    expect(
      wrapper
        .find(FieldText)
        .at(4)
        .text()
    ).toEqual('Three')
  })

  test('External links open the right places', () => {
    const wrapper = shallow(<Profile {...defaultProps} />)
    const nodes = wrapper.find(ExternalLink)
    nodes.forEach(node => node.simulate('press'))

    expect(defaultProps.navigateWithToken).toHaveBeenNthCalledWith(
      1,
      '/user/profiles/4/edit'
    )
    expect(defaultProps.navigateWithToken).toHaveBeenCalledWith(
      '/user/profiles/new?disable_plan_type_change=true&profile%5Bprofile_plan_id%5D=3'
    )
    expect(defaultProps.navigateWithToken).toHaveBeenCalledWith(
      '/user/profiles/new?profile%5Bprofile_plan_id%5D=4'
    )
  })
})
