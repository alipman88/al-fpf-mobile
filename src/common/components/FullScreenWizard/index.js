import React from 'react'
import PropTypes from 'prop-types'

import { HeaderLogo } from '@components/HeaderLogo'
import { Button } from '@components/Button'
import { ScreenContainer } from '@components/ScreenContainer'
import { FormSteps } from '@components/FormSteps'

import lineDivider from '@assets/images/createAccount/line-divider/accountsetup-line-divider.png'

import {
  Divider,
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
  withPadding,
  topPadding,
  grey,
  nextDisabled
}) => {
  const navButtons = (
    <NavButtonWrapper>
      <Button
        onPress={onBackPress}
        bgColor={'rgba(0,0,0,0)'}
        hasBorder={false}
        iconNameLeft='keyboard-arrow-left'
        width={118}
        iconLeft
      >
        Back
      </Button>

      <Button
        onPress={onNextPress}
        iconNameRight='keyboard-arrow-right'
        disabled={nextDisabled}
        bgColor={nextDisabled ? 'rgba(242, 148, 38, 0.5)' : null}
        width={118}
        iconRight
      >
        {nextLabel || 'Continue'}
      </Button>
    </NavButtonWrapper>
  )

  const topSection =
    Boolean(currentStep) && Boolean(steps) ? (
      <TopContainer topPadding={topPadding}>
        <TopHeader>Create Account</TopHeader>
        <FormSteps steps={steps} currentStep={currentStep} />
        <Divider source={lineDivider} resizeMode='stretch' />
      </TopContainer>
    ) : (
      <HeaderLogo />
    )

  return (
    <ScreenContainer
      grassBackground
      grassHeight={80}
      grassControls={navButtons}
      grassBgFixed
      withPadding={withPadding}
      grey={grey}
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
  withPadding: PropTypes.bool,
  topPadding: PropTypes.number,
  grey: PropTypes.bool,
  nextDisabled: PropTypes.bool
}
