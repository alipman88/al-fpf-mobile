import React from 'react'
import { Compose } from '../Compose'
import { shallow } from 'enzyme'
import { Formik } from 'formik'

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
      },
      {
        id: 5,
        name: 'Event',
        is_event: true
      },
      {
        id: 6,
        name: 'Make Recommendation',
        faq: 'Where to find the good dumplings'
      }
    ],
    currentAreaId: 1,
    loading: false,
    navigation: {
      getParam: jest.fn(),
      navigate: jest.fn()
    },
    navigateWithToken: jest.fn(),
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

  test('Formik has correct initialValues', () => {
    const wrapper = shallow(<Compose {...defaultProps} />)
    expect(wrapper.find(Formik).props().initialValues).toEqual({
      forums: [1],
      profile: 0,
      referencedProfileId: null,
      category: null,
      subject: '',
      message: '',
      isShared: true,
      fromDate: null,
      toDate: null
    })
  })

  test('Formik accepts navigation parameters', () => {
    const navParams = {
      referencedProfileId: 123,
      categoryId: 6,
      title: 'Recommending Pawn B Productions'
    }
    const navigationProps = {
      ...defaultProps,
      navigation: {
        getParam: jest.fn(param => navParams[param])
      }
    }
    const wrapper = shallow(<Compose {...navigationProps} />)
    expect(wrapper.find(Formik).props().initialValues).toEqual({
      forums: [1],
      profile: 0,
      referencedProfileId: 123,
      category: {
        id: 6,
        name: 'Make Recommendation',
        faq: 'Where to find the good dumplings'
      },
      subject: 'Recommending Pawn B Productions',
      message: '',
      isShared: true,
      fromDate: null,
      toDate: null
    })
  })

  describe('onSubmit', () => {
    test('submits data to action', () => {
      const setSubmitting = jest.fn()
      const wrapper = shallow(<Compose {...defaultProps} />)
      wrapper.instance().onSubmit(
        {
          profile: 1,
          subject: 'Hello',
          message: 'Message Body',
          isShared: true,
          forums: [1, 2, 3],
          category: {
            id: 3,
            name: 'Lost and Found',
            faq: 'About L&F'
          }
        },
        { setSubmitting }
      )

      expect(defaultProps.submitPost).toHaveBeenCalledWith(
        expect.any(Function),
        {
          profile_id: 2,
          parent_post_id: null,
          title: 'Hello',
          content: 'Message Body',
          is_shared: true,
          area_ids: [1, 2, 3],
          category_ids: [3],
          event: {}
        },
        setSubmitting,
        defaultProps.navigation
      )
    })

    test('submits event data', () => {
      const setSubmitting = jest.fn()
      const wrapper = shallow(<Compose {...defaultProps} />)

      const toDate = new Date()
      const fromDate = new Date()
      wrapper.instance().onSubmit(
        {
          profile: 1,
          subject: 'Hello',
          message: 'Message Body',
          isShared: true,
          forums: [1, 2, 3],
          category: {
            id: 5,
            name: 'Event',
            is_event: true
          },
          fromDate,
          toDate
        },
        { setSubmitting }
      )

      expect(defaultProps.submitPost).toHaveBeenCalledWith(
        expect.any(Function),
        {
          profile_id: 2,
          title: 'Hello',
          content: 'Message Body',
          is_shared: true,
          area_ids: [1, 2, 3],
          category_ids: [5],
          parent_post_id: null,
          event: {
            parent_event_id: null,
            start_date: fromDate,
            end_date: toDate,
            title: 'Hello'
          }
        },
        setSubmitting,
        defaultProps.navigation
      )
    })

    test('it submits parent post id', () => {
      const props = {
        ...defaultProps,
        navigation: {
          getParam: jest.fn(param => (param === 'subject' ? 'Test' : 200)),
          state: {
            params: {
              subject: 'Test',
              parentPostId: 200
            }
          }
        }
      }

      const setSubmitting = jest.fn()
      const wrapper = shallow(<Compose {...props} />)
      wrapper.instance().onSubmit(
        {
          profile: 1,
          parentPostId: 1,
          subject: `Re: Test`,
          message: 'Message Body',
          isShared: true,
          forums: [1, 2, 3],
          category: {
            id: 3,
            name: 'Lost and Found',
            faq: 'About L&F'
          }
        },
        { setSubmitting }
      )
      expect(props.submitPost).toHaveBeenCalledWith(
        expect.any(Function),
        {
          profile_id: 2,
          parent_post_id: 200,
          title: 'Re: Test',
          content: 'Message Body',
          is_shared: true,
          area_ids: [1, 2, 3],
          category_ids: [3],
          event: {}
        },
        setSubmitting,
        props.navigation
      )
    })

    test('it submits can submit with no category', () => {
      const props = {
        ...defaultProps,
        navigation: {
          getParam: jest.fn(param => (param === 'subject' ? 'Test' : 200)),
          state: {
            params: {
              subject: 'Test',
              parentPostId: 200
            }
          }
        }
      }

      const setSubmitting = jest.fn()
      const wrapper = shallow(<Compose {...props} />)
      wrapper.instance().onSubmit(
        {
          profile: 1,
          parentPostId: 1,
          subject: `Re: Test`,
          message: 'Message Body',
          isShared: true,
          forums: [1, 2, 3],
          category: {
            id: -1,
            name: 'None Apply'
          }
        },
        { setSubmitting }
      )
      expect(props.submitPost).toHaveBeenCalledWith(
        expect.any(Function),
        {
          profile_id: 2,
          parent_post_id: 200,
          title: 'Re: Test',
          content: 'Message Body',
          is_shared: true,
          area_ids: [1, 2, 3],
          category_ids: [''],
          event: {}
        },
        setSubmitting,
        props.navigation
      )
    })

    test('it sets state and navigates back to Forum', () => {
      const wrapper = shallow(<Compose {...defaultProps} />)
      wrapper.setState({ modalVisible: true })
      wrapper.instance().onModalClose(jest.fn())
      expect(wrapper.state().modalVisible).toEqual(false)
      expect(defaultProps.navigation.navigate).toHaveBeenCalledWith('Forum')
    })
  })
})
