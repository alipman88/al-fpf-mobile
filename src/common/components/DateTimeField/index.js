import React from 'react'
import PropTypes from 'prop-types'
import DateTimePicker from 'react-native-modal-datetime-picker'
import format from 'date-fns/format'
import isEqual from 'date-fns/is_equal'
import isDate from 'date-fns/is_date'

import { FormFieldLabel } from '@components/FormFieldLabel'
import { FormError } from '@components/FormError'
import {
  Container,
  Icon,
  Input,
  InputText,
  InputContainer
} from './styledComponents'

export class DateTimeField extends React.Component {
  state = {
    dateVisible: false,
    timeVisible: false,
    date: null,
    time: null
  }

  componentDidUpdate(prevProps) {
    if (
      isDate(this.props.value) &&
      !isEqual(this.props.value, prevProps.value)
    ) {
      const date = this.props.value

      this.setState({
        date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        time: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds()
        )
      })
    }
  }

  showDatePicker = () => {
    this.setState({ dateVisible: true })
  }

  hideDatePicker = () => {
    this.setState({ dateVisible: false })
  }

  handleDatePicked = date => {
    let updatedState
    if (!this.state.time) {
      updatedState = { date, time: this.props.defaultTimeForDate(date) }
    } else {
      updatedState = { date, time: this.state.time }
    }

    this.setState(updatedState)
    this.updateFormDateValue(updatedState)
    this.hideDatePicker()
  }

  showTimePicker = () => {
    this.setState({ timeVisible: true })
  }

  hideTimePicker = () => {
    this.setState({ timeVisible: false })
  }

  handleTimePicked = time => {
    let updatedState
    if (!this.state.date) {
      updatedState = { date: time, time }
    } else {
      updatedState = { date: this.state.date, time }
    }
    this.setState(updatedState)
    this.updateFormDateValue(updatedState)
    this.hideTimePicker()
  }

  updateFormDateValue(updatedState) {
    const combinedDate = new Date()
    const { date, time } = updatedState
    combinedDate.setFullYear(date.getFullYear())
    combinedDate.setMonth(date.getMonth())
    combinedDate.setDate(date.getDate())
    combinedDate.setHours(time.getHours())
    combinedDate.setMinutes(time.getMinutes())
    combinedDate.setSeconds(time.getSeconds())

    this.props.onChangeValue(combinedDate)
  }

  render() {
    const { error, dateLabel, label, timeLabel, touched, value } = this.props
    const { date, time } = this.state

    return (
      <Container>
        <FormFieldLabel>{label}</FormFieldLabel>
        <InputContainer>
          <Input
            onPress={this.showDatePicker}
            hasError={Boolean(error) && touched}
            marginRight={10}
          >
            <Icon size={18} color='#c5c5c5' name='ios-calendar' />
            <InputText touched={touched}>
              {(date && format(date, 'MMM Do, YYYY')) || dateLabel}
            </InputText>
          </Input>
          <DateTimePicker
            mode='date'
            date={value || new Date()}
            isVisible={this.state.dateVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDatePicker}
          />

          <Input
            onPress={this.showTimePicker}
            hasError={Boolean(error) && touched}
          >
            <Icon size={18} color='#c5c5c5' name='md-time' />
            <InputText touched={touched}>
              {(time && format(time, 'hh:mma')) || timeLabel}
            </InputText>
          </Input>
          <DateTimePicker
            mode='time'
            date={value || new Date()}
            isVisible={this.state.timeVisible}
            onConfirm={this.handleTimePicked}
            onCancel={this.hideTimePicker}
          />
        </InputContainer>
        {touched && Boolean(error) && <FormError>{error}</FormError>}
      </Container>
    )
  }
}

DateTimeField.propTypes = {
  dateLabel: PropTypes.string,
  // this function is called when a date is selected and there's no time
  // what do we default to?
  defaultTimeForDate: PropTypes.func,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  timeLabel: PropTypes.string,
  touched: PropTypes.bool,
  value: PropTypes.object
}

DateTimeField.defaultProps = {
  defaultTimeForDate: date => date
}
