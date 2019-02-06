import React from 'react'
import { StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import {
  ContentWrapper,
  SafeAreaViewContainer,
  ScreenWrapper
} from './styledComponents'

export const ScreenContainer = ({ children }) => {
  return (
    <ScreenWrapper>
      <StatusBar barStyle='dark-content' />
      <SafeAreaViewContainer>
        <ContentWrapper>{children}</ContentWrapper>
      </SafeAreaViewContainer>
    </ScreenWrapper>
  )
}

ScreenContainer.propTypes = {
  children: PropTypes.node
}
