import React from 'react'
import PropTypes from 'prop-types'

import { SwiperComponent } from './Swiper'
import { ScreenContainer } from '@components/ScreenContainer'
import { HeaderLogo } from '@components/HeaderLogo'
import { createResetStackTo } from '@common/utils/navigation'

export class Welcome extends React.Component {
  constructor(props) {
    super(props)
    const { shouldDisplay, navigation } = props
    if (!shouldDisplay) {
      navigation.dispatch(createResetStackTo('Login'))
    }
  }

  render() {
    const { navigation, setShouldDisplay } = this.props
    return (
      <ScreenContainer grassBackground grassHeight={110} grassBgFixed>
        <HeaderLogo />
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
