import React from 'react'
import PropTypes from 'prop-types'
import { FullScreenWizard } from '@components/FullScreenWizard'
import { Text } from '@components/Text'

export class ProfileTypes extends React.Component {
  render() {
    return (
      <FullScreenWizard>
        <Text>Content here!</Text>
      </FullScreenWizard>
    )
  }
}

ProfileTypes.PropTypes = {}
