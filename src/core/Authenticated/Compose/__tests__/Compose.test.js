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
    categories: [
      {
        id: 3,
        name: 'Lost and Found',
        faq: 'About L&F'
      },
      {
        id: 4,
        name: 'Announcements',
        faq: 'Announcements to the community'
      }
    ],
    currentAreaId: 1,
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
    defaultProps.submitPost.mockReset()
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
        expect.any(Function),
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
