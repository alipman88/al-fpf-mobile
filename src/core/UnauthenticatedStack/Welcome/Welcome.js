import React from 'react'
import PropTypes from 'prop-types'

import { SwiperComponent } from './Swiper'
import { ScreenContainer } from '@fpf/components/ScreenContainer'
import { HeaderLogo } from '@fpf/components/HeaderLogo'

export class Welcome extends React.Component {
  render() {
    const { navigation } = this.props
    return (
      <ScreenContainer grassBackground>
        <HeaderLogo />
        <SwiperComponent navigation={navigation} />
      </ScreenContainer>
    )
  }
}

Welcome.propTypes = {
  navigation: PropTypes.object.isRequired,
}
