import React from 'react'
import PropTypes from 'prop-types'

import { SwiperComponent } from './Swiper'
import { ScreenContainer } from '@components/ScreenContainer'
import { HeaderLogo } from '@components/HeaderLogo'

export class Welcome extends React.Component {
  render() {
    const { navigation } = this.props
    return (
      <ScreenContainer grassBackground grassHeight={110} grassBgFixed>
        <HeaderLogo />
        <SwiperComponent navigation={navigation} />
      </ScreenContainer>
    )
  }
}

Welcome.propTypes = {
  navigation: PropTypes.object.isRequired
}
