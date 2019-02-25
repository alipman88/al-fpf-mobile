import React from 'react'
import { Compose } from '../Compose'
import { shallow } from 'enzyme'

describe('Compose', () => {
  const defaultProps = {
    areas: [
      {
        id: 1,
        name: 'Center'
      },
      {
        id: 2,
        name: 'River'
      }
    ],
    currentAreaId: 1,
    getProfiles: jest.fn(),
    loading: false,
    navigation: {},
    profiles: [
      {
        id: 1,
        area_ids: [1]
      },
      {
        id: 2,
        area_ids: [1, 2]
      }
    ],
    submitPost: jest.fn(),
    currentProfileId: 1
  }

  afterEach(() => {
    defaultProps.getProfiles.mockReset()
    defaultProps.submitPost.mockReset()
  })

  describe('componentDidMount', () => {
    test('fetches getProfiles', () => {
      shallow(<Compose {...defaultProps} />)
      expect(defaultProps.getProfiles).toHaveBeenCalled()
    })
  })

  describe('onSubmit', () => {
    test('submits data to action', () => {
      const setSubmitting = jest.fn()
      const wrapper = shallow(<Compose {...defaultProps} />)
      wrapper.instance().onSubmit(
        {
          profile: 1,
          parentPostId: 1,
          subject: 'Hello',
          message: 'Message Body',
          isShared: true,
          forums: [1, 2, 3],
          category: 0
        },
        { setSubmitting }
      )

      expect(defaultProps.submitPost).toHaveBeenCalledWith(
        defaultProps.navigation,
        {
          profile_id: 2,
          parent_post_id: 1,
          title: 'Hello',
          content: 'Message Body',
          is_shared: true,
          area_ids: [1, 2, 3],
          category_ids: [3]
        },
        setSubmitting
      )
    })
  })
})
