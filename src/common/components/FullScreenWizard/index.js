import React from 'react'
import PropTypes from 'prop-types'

import logoImage from '@assets/images/fpf-logo.png'
import { Button } from '@components/Button'
import { ScreenContainer } from '@components/ScreenContainer'
import { FormSteps } from '@components/FormSteps'

import lineDivider from '@assets/images/createAccount/line-divider/accountsetup-line-divider.png'

import {
  Divider,
  Logo,
  LogoContainer,
  NavButtonWrapper,
  TopContainer,
  TopHeader
} from './styledComponents'

export const FullScreenWizard = ({
  children,
  onBackPress,
  onNextPress,
  nextLabel,
  steps,
  currentStep,
  withPadding
}) => {
  const navButtons = (
    <NavButtonWrapper>
      <Button
        onPress={onBackPress}
        bgColor={'rgba(0,0,0,0)'}
        iconNameLeft='keyboard-arrow-left'
        iconLeft
      >
        Back
      </Button>

      <Button
        onPress={onNextPress}
        iconNameRight='keyboard-arrow-right'
        iconRight
      >
        {nextLabel}
      </Button>
    </NavButtonWrapper>
  )

  const topSection =
    Boolean(currentStep) && Boolean(steps) ? (
      <TopContainer>
        <TopHeader>Create Account</TopHeader>
        <FormSteps steps={steps} currentStep={currentStep} />
        <Divider source={lineDivider} resizeMode='repeat' />
      </TopContainer>
    ) : (
      <LogoContainer>
        <Logo source={logoImage} resizeMode='contain' />
      </LogoContainer>
    )

  return (
    <ScreenContainer
      grassBackground
      grassHeight={80}
      grassControls={navButtons}
      grassBgFixed
      withPadding={withPadding}
    >
      {topSection}
      {children}
    </ScreenContainer>
  )
}

FullScreenWizard.propTypes = {
  children: PropTypes.node,
  currentStep: PropTypes.number,
  nextLabel: PropTypes.string,
  onBackPress: PropTypes.func.isRequired,
  onNextPress: PropTypes.func.isRequired,
  steps: PropTypes.number,
  withPadding: PropTypes.bool
}

FullScreenWizard.propTypes = {
  nextLabel: 'Continue'
}
