import React from 'react'
import PropTypes from 'prop-types'

import { ScreenContainer } from '@components/ScreenContainer'
import { Button } from '@components/Button'

import offline from '@assets/images/offline/offline.png'

import {
  Body,
  Content,
  Image,
  FullscreenContainer,
  OfflineHeader
} from './styledComponents'

export class Offline extends React.Component {
  render() {
    const { updateConnectionStatus } = this.props
    return (
      <FullscreenContainer>
        <ScreenContainer grey>
          <Content>
            <Image source={offline} />
            <OfflineHeader>Whoops</OfflineHeader>
            <Body>
              Your wifi signal seems kind of pooped, please check your
              connection and try again.
            </Body>
            <Button onPress={() => updateConnectionStatus()}>
              Retry connection
            </Button>
          </Content>
        </ScreenContainer>
      </FullscreenContainer>
    )
  }
}

Offline.propTypes = {
  updateConnectionStatus: PropTypes.func.isRequired
}
