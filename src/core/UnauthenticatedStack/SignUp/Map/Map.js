import React from 'react'

import { FullScreenWizard } from '@components/FullScreenWizard'

export class Map extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return <FullScreenWizard steps={4} currentStep={3} withPadding={false} />
  }
}
