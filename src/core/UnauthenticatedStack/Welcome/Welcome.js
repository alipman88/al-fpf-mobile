import React from 'react'
import PropTypes from 'prop-types'

import { SwiperComponent } from './Swiper'
import { ScreenContainer } from '@components/ScreenContainer'
import { Logo, LogoContainer } from './styledComponents'
import { createResetStackTo } from '@common/utils/navigation'

import logoImage from '@assets/images/fpf-logo.png'

export class Welcome extends React.Component {
  constructor(props) {
    super(props)
    const { shouldDisplay, navigation } = props
    if (!shouldDisplay) {
      navigation.navigate('Login')
      navigation.dispatch(createResetStackTo('Login'))
    }
  }

  render() {
    const { navigation, setShouldDisplay } = this.props
    return (
      <ScreenContainer grassBackground grassHeight={110} grassBgFixed>
        <LogoContainer>
          <Logo source={logoImage} resizeMode='contain' />
        </LogoContainer>
        <SwiperComponent
          navigation={navigation}
          setShouldDisplay={setShouldDisplay}
        />
      </ScreenContainer>
    )
  }
}

Welcome.propTypes = {
  navigation: PropTypes.object.isRequired,
  shouldDisplay: PropTypes.bool.isRequired,
  setShouldDisplay: PropTypes.func.isRequired
}
