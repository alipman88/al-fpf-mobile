import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import format from 'date-fns/format'

import {
  Container,
  Date,
  Label,
  RadioButtonActive,
  RadioButtonCircle,
  RadioButtonContainer,
  RowContent
} from './styledComponents'

export const EventResultsRow = ({
  active,
  fromDate,
  onPress,
  toDate,
  label
}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <Container>
      <RadioButtonContainer>
        <RadioButtonCircle>{active && <RadioButtonActive />}</RadioButtonCircle>
      </RadioButtonContainer>
      <RowContent>
        <Label>{label}</Label>
        {Boolean(fromDate) && Boolean(toDate) && (
          <Date>
            {format(fromDate, 'MMM Do, YY hh:mma')} -{' '}
            {format(toDate, 'MMM Do, YY hh:mma')}
          </Date>
        )}
      </RowContent>
    </Container>
  </TouchableWithoutFeedback>
)

EventResultsRow.propTypes = {
  active: PropTypes.bool,
  fromDate: PropTypes.object,
  toDate: PropTypes.object,
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}
