import React from 'react'
import { StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import {
  ContentWrapper,
  Grass,
  GrassBg,
  GrassContainer,
  SafeAreaViewContainer,
  ScreenWrapper
} from './styledComponents'

import grassImage from '@assets/images/fpf-grass.png'

export const ScreenContainer = ({
  children,
  grassBackground,
  grey,
  withPadding
}) => {
  return (
    <ScreenWrapper grey={grey}>
      <StatusBar barStyle='dark-content' />
      {grassBackground && (
        <GrassContainer>
          <GrassBg />
          <Grass source={grassImage} />
        </GrassContainer>
      )}
      <SafeAreaViewContainer>
        <ContentWrapper withPadding={withPadding}>{children}</ContentWrapper>
      </SafeAreaViewContainer>
    </ScreenWrapper>
  )
}

ScreenContainer.propTypes = {
  children: PropTypes.node,
  grassBackground: PropTypes.bool,
  grey: PropTypes.bool,
  withPadding: PropTypes.bool
}

ScreenContainer.defaultProps = {
  withPadding: true
}
