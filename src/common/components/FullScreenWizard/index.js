import React from 'react'
import PropTypes from 'prop-types'

import logoImage from '@assets/images/fpf-logo.png'
import { Button } from '@components/Button'
import { ScreenContainer } from '@components/ScreenContainer'

import { Logo, LogoContainer, NavButtonWrapper } from './styledComponents'

export const FullScreenWizard = ({ children, onBackPress, onNextPress }) => {
  const navButtons = (
    <NavButtonWrapper>
      <Button
        width={100}
        onPress={onBackPress}
        bgColor={'rgba(0,0,0,0)'}
        iconNameLeft='keyboard-arrow-left'
        iconLeft
      >
        Back
      </Button>

      <Button
        width={150}
        onPress={onNextPress}
        iconNameRight='keyboard-arrow-right'
        iconRight
      >
        Continue
      </Button>
    </NavButtonWrapper>
  )

  return (
    <ScreenContainer
      grassBackground
      grassHeight={110}
      grassControls={navButtons}
      grassBgFixed
    >
      <LogoContainer>
        <Logo source={logoImage} resizeMode='contain' />
      </LogoContainer>

      {children}
    </ScreenContainer>
  )
}

FullScreenWizard.propTypes = {
  children: PropTypes.node,
  onBackPress: PropTypes.func.isRequired,
  onNextPress: PropTypes.func.isRequired
}
