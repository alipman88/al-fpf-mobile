import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'

import range from 'lodash/range'

import { Container, Number, Step } from './styledComponents'

export const FormSteps = ({ currentStep, steps }) => (
  <Container>
    {range(steps).map(i => (
      <Step key={i} active={i === currentStep - 1} done={i < currentStep - 1}>
        {i < currentStep - 1 ? (
          <Icon size={12} name='check' color='#97b57b' />
        ) : (
          <Number>{i + 1}</Number>
        )}
      </Step>
    ))}
  </Container>
)

FormSteps.propTypes = {
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.number.isRequired
}
