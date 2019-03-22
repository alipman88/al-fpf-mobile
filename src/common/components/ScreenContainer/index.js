import React from 'react'
import { StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import {
  ContentWrapper,
  Grass,
  GrassContainer,
  SafeAreaViewContainer,
  ScreenWrapper
} from './styledComponents'

import grassImage from '@assets/images/fpf-grass.png'

export const ScreenContainer = ({
  children,
  grassBackground,
  grassHeight,
  grassControls,
  grassBgFixed,
  grey,
  withPadding
}) => {
  return (
    <ScreenWrapper grey={grey}>
      <StatusBar barStyle='dark-content' />
      <SafeAreaViewContainer>
        <ContentWrapper withPadding={withPadding}>{children}</ContentWrapper>
      </SafeAreaViewContainer>
      {grassBackground && (
        <GrassContainer height={grassHeight}>
          {grassControls}
          <Grass source={grassImage} resizeMode='repeat' />
        </GrassContainer>
      )}
    </ScreenWrapper>
  )
}

ScreenContainer.propTypes = {
  children: PropTypes.node,
  grassBackground: PropTypes.bool,
  grassHeight: PropTypes.number,
  grassControls: PropTypes.node,
  grassBgFixed: PropTypes.bool,
  grey: PropTypes.bool,
  withPadding: PropTypes.bool
}

ScreenContainer.defaultProps = {
  withPadding: true
}
