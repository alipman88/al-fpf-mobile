import React from 'react'
import { StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { Grass } from '@components/Grass'
import {
  ContentWrapper,
  SafeAreaViewContainer,
  ScreenWrapper,
} from './styledComponents'

export const ScreenContainer = ({
  children,
  grassBackground,
  grassContent,
  grey,
  withPadding,
}) => {
  return (
    <ScreenWrapper grey={grey}>
      <StatusBar barStyle='dark-content' />
      <SafeAreaViewContainer>
        <ContentWrapper withPadding={withPadding}>{children}</ContentWrapper>
      </SafeAreaViewContainer>
      {grassBackground && <Grass content={grassContent} resizeMode='repeat' />}
    </ScreenWrapper>
  )
}

ScreenContainer.propTypes = {
  children: PropTypes.node,
  grassBackground: PropTypes.bool,
  grassContent: PropTypes.node,
  grey: PropTypes.bool,
  withPadding: PropTypes.bool,
}

ScreenContainer.defaultProps = {
  withPadding: true,
}
