import React from 'react'
import PropTypes from 'prop-types'

import difference from 'lodash/difference'
import isDate from 'date-fns/is_date'
import isEqual from 'date-fns/is_equal'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import debounce from 'lodash/debounce'

import Spinner from 'react-native-loading-spinner-overlay'

import { store } from '@common/store'
import * as api from '@common/api'
import { responseError } from '@common/utils/responseError'
import { DateTimeField } from '@components/DateTimeField'
import { FieldWrapper } from '../styledComponents'
import { EventResultsRow } from './EventResultsRow'
import { Container, EventResultsContainer } from './styledComponents'

export class Event extends React.Component {
  state = {
    loading: false,
    similarEvents: [],
    selectedDuplicate: 0
  }

  constructor(props) {
    super(props)
    this._debouncedSearchEvents = debounce(this.searchEvents, 1000)
  }

  componentDidUpdate(prevProps) {
    const { setFieldTouched, setFieldValue } = this.props

    const { subject, forums, fromDate, toDate } = this.props.values

    const {
      subject: prevSubject,
      forums: prevForums,
      fromDate: prevFromDate
    } = prevProps.values

    const fromDateChanged = !isEqual(prevFromDate, fromDate)

    if (
      subject &&
      forums.length > 0 &&
      isDate(fromDate) &&
      (fromDateChanged ||
        prevSubject !== subject ||
        difference(prevForums, forums).length > 0)
    ) {
      if (prevSubject !== subject) {
        this._debouncedSearchEvents()
      } else {
        this.searchEvents()
      }
    }

    if (fromDateChanged && !isDate(toDate)) {
      setFieldTouched('toDate')
      setFieldValue('toDate', endOfDay(fromDate))
    }
  }

  searchEvents = async () => {
    const { subject, forums, fromDate } = this.props.values
    try {
      this.setState({ loading: true })
      const response = await api.postAuthorized(
        '/events',
        { query: subject, area_ids: forums, start_date: fromDate },
        store.getState()
      )
      const { results } = response.data
      this.setState({ similarEvents: results })
    } catch (e) {
      this.props.setAppError(responseError(e))
    } finally {
      this.setState({ loading: false })
    }
  }

  setSelectedDuplicate = index => {
    this.setState({ selectedDuplicate: index })
    this.props.setDuplicateState(index > 0)
  }

  render() {
    const {
      blurTextInputs,
      errors,
      setFieldValue,
      setFieldTouched,
      touched,
      values
    } = this.props

    const { loading, selectedDuplicate, similarEvents } = this.state

    return (
      <Container>
        <Spinner visible={loading} />
        {similarEvents.length > 0 && (
          <EventResultsContainer>
            <EventResultsRow
              active={selectedDuplicate === 0}
              label='My event is different from all of the options below'
              onPress={() => this.setSelectedDuplicate(0)}
            />
            {similarEvents.map((event, i) => (
              <EventResultsRow
                key={`event_row_${i + 1}`}
                active={selectedDuplicate === i + 1}
                label={event.title}
                fromDate={new Date(event.start_date)}
                toDate={new Date(event.end_date)}
                onPress={() => this.setSelectedDuplicate(i + 1)}
              />
            ))}
          </EventResultsContainer>
        )}
        {selectedDuplicate === 0 && (
          <React.Fragment>
            <FieldWrapper>
              <DateTimeField
                label='From'
                dateLabel='Start Date'
                defaultTimeForDate={startOfDay}
                timeLabel='Start Time'
                onChangeValue={date => {
                  setFieldValue('fromDate', date)
                  setFieldTouched('fromDate')
                }}
                error={errors.fromDate}
                onPress={blurTextInputs}
                touched={!!touched.fromDate}
                value={values.fromDate}
              />
            </FieldWrapper>
            <FieldWrapper>
              <DateTimeField
                label='To'
                dateLabel='End Date'
                defaultTimeForDate={endOfDay}
                timeLabel='End Time'
                onChangeValue={date => {
                  setFieldValue('toDate', date)
                  setFieldTouched('toDate')
                }}
                error={errors.toDate}
                onPress={blurTextInputs}
                touched={!!touched.toDate}
                value={values.toDate}
              />
            </FieldWrapper>
          </React.Fragment>
        )}
      </Container>
    )
  }
}

Event.propTypes = {
  blurTextInputs: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setAppError: PropTypes.func.isRequired,
  setDuplicateState: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
}
