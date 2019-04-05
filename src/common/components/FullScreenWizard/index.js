import React from 'react'
import PropTypes from 'prop-types'
import { Dimensions, ScrollView, StatusBar } from 'react-native'

import { HeaderLogo } from '@components/HeaderLogo'
import { Button } from '@components/Button'
import { FormSteps } from '@components/FormSteps'
import { Grass } from '@components/Grass'
import { KeyboardOpen } from '@components/KeyboardOpen'

import lineDivider from '@assets/images/createAccount/line-divider/accountsetup-line-divider.png'

import {
  Divider,
  KeyboardAvoidingView,
  NavButtonWrapper,
  SafeAreaViewContainer,
  ScreenWrapper,
  TopContainer,
  TopHeader
} from './styledComponents'

export class FullScreenWizard extends React.Component {
  render() {
    const {
      children,
      contentContainerStyle,
      onBackPress,
      onNextPress,
      nextLabel,
      nextWidth,
      steps,
      stretchToHeightOfScreen,
      currentStep,
      topPadding,
      nextDisabled,
      customHeader
    } = this.props

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
          width={nextWidth || 118}
          iconRight
        >
          {nextLabel}
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
      ) : Boolean(customHeader) ? (
        customHeader
      ) : (
        <HeaderLogo />
      )

    return (
      <ScreenWrapper>
        <StatusBar barStyle='dark-content' />
        <KeyboardAvoidingView behavior='padding'>
          <SafeAreaViewContainer>
            {topSection}
            <KeyboardOpen
              render={({ open }) => {
                const style =
                  stretchToHeightOfScreen && !open ? { flex: 1 } : undefined
                return (
                  <ScrollView
                    contentContainerStyle={{
                      ...style,
                      ...contentContainerStyle
                    }}
                  >
                    {children}
                  </ScrollView>
                )
              }}
            />
          </SafeAreaViewContainer>
          <Grass
            height={Dimensions.get('screen').height < 700 ? 80 : 100}
            content={navButtons}
            resizeMode='repeat'
          />
        </KeyboardAvoidingView>
      </ScreenWrapper>
    )
  }
}

FullScreenWizard.propTypes = {
  children: PropTypes.node,
  contentContainerStyle: PropTypes.object,
  customHeader: PropTypes.node,
  currentStep: PropTypes.number,
  nextLabel: PropTypes.string,
  nextWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBackPress: PropTypes.func.isRequired,
  onNextPress: PropTypes.func.isRequired,
  steps: PropTypes.number,
  stretchToHeightOfScreen: PropTypes.bool,
  topPadding: PropTypes.number,
  nextDisabled: PropTypes.bool
}

FullScreenWizard.defaultProps = {
  nextLabel: '    Continue'
}
