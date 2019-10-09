import React from 'react'
import { shallow } from 'enzyme'
import endOfDay from 'date-fns/end_of_day'

import * as api from '@common/api'
import { Event } from '../Event'
import { EventResultsRow } from '../EventResultsRow'

describe('Event', () => {
  const defaultProps = {
    errors: {},
    setAppError: jest.fn(),
    setDuplicateState: jest.fn(),
    setFieldTouched: jest.fn(),
    setFieldValue: jest.fn(),
    blurTextInputs: jest.fn(),
    touched: {},
    values: {}
  }

  afterEach(() => {
    defaultProps.setAppError.mockReset()
    defaultProps.setDuplicateState.mockReset()
    defaultProps.setFieldTouched.mockReset()
    defaultProps.setFieldValue.mockReset()
  })

  describe('has similar events', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<Event {...defaultProps} />)
      wrapper.setState({
        similarEvents: [
          {
            id: 1,
            start_time: new Date().toISOString(),
            end_time: new Date().toISOString(),
            title: 'some event'
          }
        ]
      })
    })

    test('shows event results if there are similar events', () => {
      expect(wrapper.find(EventResultsRow).length).toEqual(2)
    })

    test('pressing first row sets index to 0, and setDuplicateState called with false', () => {
      wrapper
        .find(EventResultsRow)
        .first()
        .simulate('press')
      expect(wrapper.state().selectedDuplicate).toEqual(0)
      expect(defaultProps.setDuplicateState).toHaveBeenCalledWith(false)
    })

    test('pressing second row sets index to 1, and setDuplicateState called with false', () => {
      wrapper
        .find(EventResultsRow)
        .at(1)
        .simulate('press')
      expect(wrapper.state().selectedDuplicate).toEqual(1)
      expect(defaultProps.setDuplicateState).toHaveBeenCalledWith(true)
    })
  })

  describe('componentDidUpdate', () => {
    test('calls searchEvent when form has enough data, and values change', () => {
      const wrapper = shallow(<Event {...defaultProps} />)
      const spy = jest
        .spyOn(wrapper.instance(), 'searchEvents')
        .mockImplementation(() => ({}))
      const debounceSpy = jest
        .spyOn(wrapper.instance(), '_debouncedSearchEvents')
        .mockImplementation(() => ({}))

      wrapper.setProps({ values: { subject: 'new subject 1', forums: [] } })
      expect(spy).not.toHaveBeenCalled()

      wrapper.setProps({ values: { subject: 'new subject 1', forums: [1] } })
      expect(spy).not.toHaveBeenCalled()

      const fromDate = new Date()

      wrapper.setProps({
        values: { subject: 'new subject 1', forums: [1], fromDate }
      })
      expect(spy).toHaveBeenCalled()
      spy.mockReset()

      wrapper.setProps({
        values: { subject: 'new subject 1', forums: [1], fromDate }
      })
      expect(spy).not.toHaveBeenCalled()

      // call because subject changed
      wrapper.setProps({
        values: { subject: 'new subject 2', forums: [1], fromDate }
      })
      expect(debounceSpy).toHaveBeenCalled()
      debounceSpy.mockReset()

      // call because forums changed
      wrapper.setProps({
        values: { subject: 'new subject 2', forums: [2], fromDate }
      })
      expect(spy).toHaveBeenCalled()
      spy.mockReset()

      // call because fromDate changed
      wrapper.setProps({
        values: { subject: 'new subject 2', forums: [2], fromDate: new Date() }
      })
      expect(spy).toHaveBeenCalled()

      spy.mockRestore()
      debounceSpy.mockRestore()
    })

    test('sets toDate if fromDate is changed, and toDate is unset', () => {
      const wrapper = shallow(<Event {...defaultProps} />)
      const fromDate = new Date()
      wrapper.setProps({ values: { fromDate } })
      expect(defaultProps.setFieldValue).toHaveBeenCalledWith(
        'toDate',
        endOfDay(fromDate)
      )
    })
  })

  describe('searchEvents', () => {
    test('requests existing events from API', async () => {
      const fromDate = new Date()
      const wrapper = shallow(
        <Event
          {...defaultProps}
          values={{ subject: 'AB', forums: [1], fromDate }}
        />
      )
      const apiSpy = jest
        .spyOn(api, 'postAuthorized')
        .mockImplementation(() => ({
          data: {
            results: [
              {
                id: 1,
                title: 'ABC'
              }
            ]
          }
        }))

      await wrapper.instance().searchEvents()

      expect(apiSpy).toHaveBeenCalledWith(
        '/events',
        {
          query: 'AB',
          area_ids: [1],
          start_date: fromDate
        },
        expect.any(Object)
      )

      expect(wrapper.state().similarEvents).toEqual([
        {
          id: 1,
          title: 'ABC'
        }
      ])

      apiSpy.mockRestore()
    })
  })
})
