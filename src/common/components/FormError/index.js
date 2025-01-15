import React from 'react'
import PropTypes from 'prop-types'

import capitalize from 'lodash/capitalize'

import { FormErrorText } from './styledComponents'

export const FormError = ({ children = '' }) => (
  <FormErrorText>{`${capitalize(children)}`}</FormErrorText>
)

FormError.propTypes = {
  children: PropTypes.string,
}
