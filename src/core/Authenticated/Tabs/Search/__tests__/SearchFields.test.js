import React from 'react'
import { TouchableOpacity } from 'react-native'
import { shallow } from 'enzyme'

import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import subYears from 'date-fns/sub_years'

import { DateTimeField } from '@components/DateTimeField'
import { TextInput } from '@components/TextInput'
import { SearchFields } from '../SearchFields'
import { FieldWrapper, FiltersToggle } from '../styledComponents'
import { Multiselect } from '@components/Multiselect'
import { Select } from '@components/Select'

describe('SearchFields', () => {
  const defaultProps = {
    areas: [{ id: 1, name: 'Area one', status: 'enabled' }],
    categories: [
      { id: 1, name: 'one' },
      { id: 2, name: 'two' },
      { id: 3, name: 'cat' }
    ],
    errors: {},
    handleSubmit: jest.fn(),
    onClearSearch: jest.fn(),
    setFieldTouched: jest.fn(),
    setFieldValue: jest.fn(),
    isSubmitting: false,
    touched: {},
    values: {},
    showFilters: false
  }

  afterEach(() => {
    defaultProps.setFieldTouched.mockReset()
    defaultProps.setFieldValue.mockReset()
    defaultProps.handleSubmit.mockReset()
  })

  test('showFilters shows filters on mount', () => {
    const wrapper = shallow(<SearchFields {...defaultProps} showFilters />)

    expect(wrapper.state().showAdvanced).toEqual(true)
    expect(wrapper.find(Multiselect).length).toEqual(1)
    expect(wrapper.find(FieldWrapper).length).toEqual(4)
  })

  test('FiltersToggle changes showAdvanced state', () => {
    const wrapper = shallow(<SearchFields {...defaultProps} />)

    expect(wrapper.find(Multiselect).length).toEqual(0)
    expect(wrapper.find(FieldWrapper).length).toEqual(0)

    wrapper.find(FiltersToggle).simulate('press')
    expect(wrapper.state().showAdvanced).toEqual(true)
    expect(wrapper.find(Multiselect).length).toEqual(1)
    expect(wrapper.find(FieldWrapper).length).toEqual(4)

    wrapper.find(FiltersToggle).simulate('press')
    expect(wrapper.state().showAdvanced).toEqual(false)
  })

  test('passes id & name of areas to multiselect', () => {
    const wrapper = shallow(<SearchFields {...defaultProps} />)
    wrapper.setState({ showAdvanced: true })
    expect(wrapper.find(Multiselect).props().items).toEqual([
      { id: 1, name: 'Area one' }
    ])
  })

  test('changing multiselect calls the prop callbacks', () => {
    const wrapper = shallow(<SearchFields {...defaultProps} />)
    wrapper.setState({ showAdvanced: true })

    wrapper
      .find(Multiselect)
      .props()
      .onSelectedItemsChange([1])
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('forums', true)
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('forums', [1])
  })

  test('changing select calls the prop callbacks', () => {
    const wrapper = shallow(<SearchFields {...defaultProps} />)
    wrapper.setState({ showAdvanced: true })

    wrapper
      .find(Select)
      .props()
      .onValueChange(2)
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('category', true)
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('category', {
      id: 3,
      name: 'cat'
    })
  })

  test('changing DateTimeField calls the prop callbacks', () => {
    const wrapper = shallow(<SearchFields {...defaultProps} />)
    wrapper.setState({ showAdvanced: true })

    const date = new Date()
    const fields = wrapper.find(DateTimeField)

    fields
      .at(0)
      .props()
      .onChangeValue(date)
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('fromDate')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('toDate')
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('fromDate', date)

    defaultProps.setFieldTouched.mockReset()
    defaultProps.setFieldValue.mockReset()

    fields
      .at(1)
      .props()
      .onChangeValue(date)
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('fromDate')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('toDate')
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('toDate')
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('toDate', date)
  })

  test('clear filters resets values', () => {
    const wrapper = shallow(<SearchFields {...defaultProps} />)
    wrapper.setState({ showAdvanced: true })

    wrapper.find(TouchableOpacity).simulate('press')
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('forums', [])
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith(
      'fromDate',
      startOfDay(subYears(new Date(), 2))
    )
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith(
      'toDate',
      endOfDay(new Date())
    )
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('category', null)

    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('forums', false)
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('fromDate', false)
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('toDate', false)
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('category', false)
  })

  test('tapping clear icon on text input, calls prop', () => {
    const wrapper = shallow(<SearchFields {...defaultProps} />)
    wrapper
      .find(TextInput)
      .props()
      .onTapIcon()

    expect(defaultProps.onClearSearch).toHaveBeenCalled()
    expect(defaultProps.setFieldTouched).toHaveBeenCalledWith('keyword', false)
    expect(defaultProps.setFieldValue).toHaveBeenCalledWith('keyword', '')
  })

  test('no keyword does not pass an icon to text field', () => {
    const wrapper = shallow(<SearchFields {...defaultProps} />)
    expect(wrapper.find(TextInput).props().tapIcon).toEqual(null)
  })

  test('keyword sets the tapIcon to a component', () => {
    const wrapper = shallow(
      <SearchFields {...defaultProps} values={{ keyword: 'test' }} />
    )
    expect(wrapper.find(TextInput).props().tapIcon).not.toBe(null)
  })
})
