import React from 'react'
import PropTypes from 'prop-types'
import { Keyboard, ScrollView, StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { HeaderLogo } from '@fpf/components/HeaderLogo'
import { Button } from '@fpf/components/Button'
import { FormSteps } from '@fpf/components/FormSteps'
import { Grass } from '@fpf/components/Grass'
import { IconButton } from '@fpf/components/IconButton'
import { KeyboardOpen } from '@fpf/components/KeyboardOpen'
import { screenSize } from '@fpf/common/styles/screenSizeHelper'

import lineDivider from '@fpf/assets/images/createAccount/line-divider/accountsetup-line-divider.png'

import {
  Divider,
  KeyboardAvoidingView,
  NavButtonWrapper,
  ScreenWrapper,
  TopContainer,
  TopHeader,
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
      currentStep,
      topPadding,
      nextDisabled,
      customHeader,
    } = this.props

    const navButtons = (
      <NavButtonWrapper>
        <Button
          onPress={() => {
            Keyboard.dismiss()
            onBackPress()
          }}
          bgColor={'rgba(0,0,0,0)'}
          hasBorder={false}
          iconNameLeft='keyboard-arrow-left'
          width={118}
          allowFontScaling={false}
          iconLeft
        >
          Back
        </Button>

        <Button
          onPress={() => {
            Keyboard.dismiss()
            onNextPress()
          }}
          iconNameRight='keyboard-arrow-right'
          disabled={nextDisabled}
          bgColor={nextDisabled ? 'rgba(242, 148, 38, 0.5)' : null}
          width={nextWidth || 118}
          allowFontScaling={false}
          iconRight
        >
          {nextLabel}
        </Button>
      </NavButtonWrapper>
    )

    const topSection =
      Boolean(currentStep) && Boolean(steps) ? (
        <TopContainer topPadding={topPadding}>
          <IconButton
            onPress={() => {
              Keyboard.dismiss()
              onBackPress()
            }}
            iconName='keyboard-arrow-left'
            width={40}
          />
          <View>
            <TopHeader>Create Account</TopHeader>
            <FormSteps steps={steps} currentStep={currentStep} />
          </View>
          <IconButton
            onPress={() => {
              Keyboard.dismiss()
              onNextPress()
            }}
            iconName='keyboard-arrow-right'
            disabled={nextDisabled}
            color={nextDisabled ? 'rgba(80, 44, 2, 0.5)' : null}
            width={40}
          />
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
          {/* Use JS-only version of React Native's SafeAreaView so that Grass
              can extend into iOS 12 footer space*/}
          <SafeAreaView style={{ flex: 1 }}>
            {topSection}
            <KeyboardOpen
              render={({ open }) => {
                return (
                  // LATER: use KeyboardAwareScrollView here, but it's not working well:
                  // - it's not actually scrolling inputs into view
                  // - it's adding extra space below the bottom of the scroll content
                  <ScrollView
                    contentContainerStyle={{
                      // https://medium.com/@peterpme/taming-react-natives-scrollview-with-flex-144e6ff76c08
                      flexGrow: 1,
                      justifyContent: 'space-between',
                      ...contentContainerStyle,
                    }}
                  >
                    {children}
                    <Grass
                      height={screenSize({ sm: 80 }, 100)}
                      content={navButtons}
                      resizeMode='repeat'
                    />
                  </ScrollView>
                )
              }}
            />
          </SafeAreaView>
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
  topPadding: PropTypes.number,
  nextDisabled: PropTypes.bool,
}

FullScreenWizard.defaultProps = {
  nextLabel: '    Continue',
}
