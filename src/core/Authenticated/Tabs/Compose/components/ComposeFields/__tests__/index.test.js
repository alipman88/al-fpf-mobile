import React from 'react'
import { ComposeFields } from '../index'
import { shallow } from 'enzyme'

import { Multiselect } from '@components/Multiselect'
import { Checkbox } from '@components/Checkbox'
import { TextInput } from '@components/TextInput'
import { Select } from '@components/Select'
import { FormError } from '@components/FormError'

describe('Compose', () => {
  const defaultProps = {
    areas: [
      {
        id: 1,
        name: 'Center',
        neighbor_areas: [
          {
            name: 'Alpha',
          },
          {
            name: 'Beta',
          },
        ],
      },
      {
        id: 2,
        name: 'River',
        neighbor_areas: [
          {
            name: 'Charlie',
          },
          {
            name: 'Beta',
          },
        ],
      },
      {
        id: 3,
        name: 'Lake',
        neighbor_areas: [
          {
            name: 'Alpha',
          },
          {
            name: 'Delta',
          },
        ],
      },
    ],
    categories: [
      {
        id: 3,
        name: 'Lost and Found',
        faq: 'About L&F',
      },
      {
        id: 4,
        name: 'Announcements',
        faq: 'Announcements to the community',
      },
    ],
    errors: {},
    handleSubmit: jest.fn(),
    loading: false,
    navigation: {
      navigate: jest.fn(),
      setParams: jest.fn(),
    },
    user: {},
    profiles: [
      {
        id: 1,
        area_ids: [1],
      },
      {
        id: 2,
        area_ids: [2, 3],
      },
    ],
    resetForm: jest.fn(),
    setFieldTouched: jest.fn(),
    setFieldValue: jest.fn(),
    touched: {},
    values: {},
  }

  afterEach(() => {
    defaultProps.handleSubmit.mockReset()
    defaultProps.setFieldTouched.mockReset()
    defaultProps.setFieldValue.mockReset()
    defaultProps.resetForm.mockReset()
    defaultProps.navigation.navigate.mockReset()
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
      wrapper.find(Select).forEach((component) => {
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
      expect(wrapper.find(Multiselect).length).toEqual(0)
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

  test('notifies user if no active profiles', () => {
    const wrapper = shallow(<ComposeFields {...defaultProps} profiles={[]} />)

    expect(wrapper.find(FormError).children().text()).toEqual(
      'You will not be able to submit without any active profiles.'
    )
  })

  test('notifies user if not allowed to post', () => {
    const user = {
      permissions: ['cannot_create_post'],
    }

    const wrapper = shallow(<ComposeFields {...defaultProps} user={user} />)

    expect(wrapper.find(FormError).children().text()).toEqual(
      'You do not have access to submit postings.'
    )
  })

  test('notifies user if read only profile does not allow posting', () => {
    const readOnlyProfiles = [
      {
        id: 1,
        area_ids: [1],
        access: 'read_only',
      },
      {
        id: 2,
        area_ids: [2, 3],
        access: 'read_only',
      },
    ]

    const wrapper = shallow(
      <ComposeFields {...defaultProps} profiles={readOnlyProfiles} />
    )

    expect(wrapper.find(FormError).children().text()).toEqual(
      'You are not allowed to submit postings for this profile.'
    )
  })

  test('notifies user if cannot create post profile does not allow posting', () => {
    const readOnlyProfiles = [
      {
        id: 3,
        area_ids: [2, 3],
        access: 'owner',
        permissions: ['cannot_create_post'],
      },
    ]

    const wrapper = shallow(
      <ComposeFields {...defaultProps} profiles={readOnlyProfiles} />
    )

    expect(wrapper.find(FormError).children().text()).toEqual(
      'You are not allowed to submit postings for this profile.'
    )
  })

  test('with using other profile id, multi select forums renders', () => {
    const wrapper = shallow(
      <ComposeFields
        {...defaultProps}
        currentProfileId={2}
        values={{ profile: 1 }}
      />
    )

    expect(wrapper.find(Multiselect).length).toEqual(1)
  })

  test('it resets the form on navigation', () => {
    const wrapper = shallow(<ComposeFields {...defaultProps} />)
    wrapper.setProps({ shouldResetForm: true })
    expect(defaultProps.resetForm).toHaveBeenCalled()
  })

  test('Hide message & checkbox if theres a duplicate post', () => {
    const wrapper = shallow(
      <ComposeFields
        {...defaultProps}
        values={{ category: { is_event: true } }}
      />
    )
    wrapper.setState({ duplicatePost: true })

    expect(wrapper.find(Checkbox).length).toEqual(0)
    const labels = wrapper
      .find(TextInput)
      .map((component) => component.props().label)
    expect(labels).toEqual(['Subject'])
  })

  describe('handleSubmit', () => {
    test('duplicate post, it resets the form and navigates the user', () => {
      const wrapper = shallow(<ComposeFields {...defaultProps} />)
      wrapper.setState({ duplicatePost: true })

      wrapper.instance().handleSubmit()
      expect(defaultProps.resetForm).toHaveBeenCalled()
      expect(wrapper.state().duplicatePost).toEqual(false)
      expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('Forum')
    })

    test('no duplicate post, calls handleSumbit prop', () => {
      const wrapper = shallow(<ComposeFields {...defaultProps} />)
      wrapper.instance().handleSubmit()
      expect(defaultProps.handleSubmit).toHaveBeenCalled()
    })
  })

  describe('getAreasForProfile', () => {
    test('returns areas for the given profile', () => {
      const wrapper = shallow(<ComposeFields {...defaultProps} />)
      let areas = wrapper
        .instance()
        .getAreasForProfile(defaultProps.profiles, defaultProps.areas, 0)
      expect(areas.map((area) => area.id)).toEqual([1])

      areas = wrapper
        .instance()
        .getAreasForProfile(defaultProps.profiles, defaultProps.areas, 1)
      expect(areas.map((area) => area.id)).toEqual([2, 3])
    })
  })

  // its' a simple function, but useful to test since it gets passed to the Event component
  describe('setDuplicateState', () => {
    test('it changes the state value', () => {
      const wrapper = shallow(<ComposeFields {...defaultProps} />)
      wrapper.instance().setDuplicateState(true)
      expect(wrapper.state().duplicatePost).toEqual(true)
    })
  })
})
