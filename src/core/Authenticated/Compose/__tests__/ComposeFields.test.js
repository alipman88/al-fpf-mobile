import React from 'react'
import { ComposeFields } from '../ComposeFields'
import { shallow } from 'enzyme'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'

import { Select } from '@components/Select'

describe('Compose', () => {
  const defaultProps = {
    areas: [
      {
        id: 1,
        name: 'Center',
        neighbor_areas: [
          {
            name: 'Alpha'
          },
          {
            name: 'Beta'
          }
        ]
      },
      {
        id: 2,
        name: 'River',
        neighbor_areas: [
          {
            name: 'Charlie'
          },
          {
            name: 'Beta'
          }
        ]
      },
      {
        id: 3,
        name: 'Lake',
        neighbor_areas: [
          {
            name: 'Alpha'
          },
          {
            name: 'Delta'
          }
        ]
      }
    ],
    errors: {},
    handleSubmit: jest.fn(),
    loading: false,
    profiles: [
      {
        id: 1,
        area_ids: [1]
      },
      {
        id: 2,
        area_ids: [2, 3]
      }
    ],
    setFieldTouched: jest.fn(),
    setFieldValue: jest.fn(),
    touched: {},
    values: {}
  }

  afterEach(() => {
    defaultProps.handleSubmit.mockReset()
    defaultProps.setFieldTouched.mockReset()
    defaultProps.setFieldValue.mockReset()
  })

  describe('defaultProps', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<ComposeFields {...defaultProps} />)
    })

    test('Select profile renders', () => {
      const hasProfile = wrapper.find(Select).reduce((prevVal, component) => {
        if (component.props().label === 'Profile') {
          return true
        }

        return prevVal
      }, false)
      expect(hasProfile).toBe(true)
    })

    test('Select profile onValueChange changes the areas available', () => {
      let componentCalled = false
      wrapper.find(Select).forEach(component => {
        if (component.props().label === 'Profile') {
          componentCalled = true
          component.props().onValueChange(1)
        }
      })

      // just a sanity check
      expect(componentCalled).toEqual(true)
      expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('profile', true)
      expect(defaultProps.setFieldValue).toHaveBeenCalledWith('profile', 1)
      expect(defaultProps.setFieldValue).toHaveBeenCalledWith('forums', [2])
    })

    test('area selection does not render', () => {
      expect(wrapper.find(SectionedMultiSelect).length).toEqual(0)
    })
  })

  test('profiles len = 1, Select doesnt render', () => {
    const wrapper = shallow(
      <ComposeFields {...defaultProps} profiles={[{ id: 1, area_ids: [1] }]} />
    )

    const hasProfile = wrapper.find(Select).reduce((prevVal, component) => {
      if (component.props().label === 'Profile') {
        return true
      }

      return prevVal
    }, false)
    expect(hasProfile).toBe(false)
  })

  test('with using other profile id, multi select forums renders', () => {
    const wrapper = shallow(
      <ComposeFields
        {...defaultProps}
        currentProfileId={2}
        values={{ profile: 1 }}
      />
    )

    expect(wrapper.find(SectionedMultiSelect).length).toEqual(1)
  })

  describe('getAreasForProfile', () => {
    test('returns areas for the given profile', () => {
      const wrapper = shallow(<ComposeFields {...defaultProps} />)
      let areas = wrapper
        .instance()
        .getAreasForProfile(defaultProps.profiles, defaultProps.areas, 0)
      expect(areas.map(area => area.id)).toEqual([1])

      areas = wrapper
        .instance()
        .getAreasForProfile(defaultProps.profiles, defaultProps.areas, 1)
      expect(areas.map(area => area.id)).toEqual([2, 3])
    })
  })
})
