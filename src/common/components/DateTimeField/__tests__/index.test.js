import React from 'react'
import { shallow } from 'enzyme'
import { DateTimeField } from '../index'
import { Input } from '../styledComponents'
import { FormError } from '@components/FormError'
import { FormFieldLabel } from '@components/FormFieldLabel'

describe('DateTimeField', () => {
  const defaultProps = {
    dateLabel: 'Date',
    error: '',
    label: 'Start Date',
    onChangeValue: jest.fn(),
    timeLabel: 'Time',
    touched: false,
    value: new Date()
  }

  afterEach(() => {
    defaultProps.onChangeValue.mockReset()
  })

  test('no FormFieldLabel if theres no label', () => {
    const wrapper = shallow(<DateTimeField {...defaultProps} label='' />)
    expect(wrapper.find(FormFieldLabel).length).toEqual(0)
  })

  test('sets date & time state based on value prop', () => {
    const wrapper = shallow(
      <DateTimeField
        {...defaultProps}
        value={new Date(2019, 0, 10, 11, 5, 0)}
      />
    )
    const state = wrapper.state()
    expect(state.date).toEqual(new Date(2019, 0, 10))
    expect(state.time).toEqual(new Date(2019, 0, 10, 11, 5, 0))
  })

  test('updateFormDateValue combines date & time from state', () => {
    const wrapper = shallow(<DateTimeField {...defaultProps} />)

    wrapper.instance().updateFormDateValue({
      date: new Date(2019, 2, 10, 0, 0, 0),
      time: new Date(2018, 5, 15, 10, 10, 0)
    })

    const arg = defaultProps.onChangeValue.mock.calls[0][0]
    expect(arg.getFullYear()).toEqual(2019)
    expect(arg.getMonth()).toEqual(2)
    expect(arg.getDate()).toEqual(10)
    expect(arg.getHours()).toEqual(10)
    expect(arg.getMinutes()).toEqual(10)
    expect(arg.getSeconds()).toEqual(0)
  })

  test('componentDidUpdate should set dates in state from value prop when date changes', () => {
    const wrapper = shallow(<DateTimeField {...defaultProps} />)
    wrapper.setProps({
      value: new Date(2018, 11, 15, 10, 10, 0)
    })

    const date = wrapper.state().date
    expect(date.getFullYear()).toEqual(2018)
    expect(date.getMonth()).toEqual(11)
    expect(date.getDate()).toEqual(15)

    const time = wrapper.state().time
    expect(time.getFullYear()).toEqual(2018)
    expect(time.getMonth()).toEqual(11)
    expect(time.getDate()).toEqual(15)
    expect(time.getHours()).toEqual(10)
    expect(time.getMinutes()).toEqual(10)
    expect(time.getSeconds()).toEqual(0)
  })

  test('renders form error', () => {
    const wrapper = shallow(
      <DateTimeField {...defaultProps} touched error='Invalid' />
    )
    expect(wrapper.find(FormError).length).toEqual(1)
  })

  test('dateOnly doesnt render time field', () => {
    const wrapper = shallow(<DateTimeField {...defaultProps} dateOnly />)

    const input = wrapper.find(Input)
    expect(input.length).toEqual(1)
    expect(input.props().marginRight).toEqual(0)
  })
})
