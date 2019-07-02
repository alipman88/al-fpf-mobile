import React from 'react'
import PropTypes from 'prop-types'

import Swiper from 'react-native-swiper'
import { createResetStackTo } from '@common/utils/navigation'

import {
  Image,
  SlideTitle,
  Slide,
  InactiveDot,
  ActiveDot,
  Bird,
  SlideButton,
  ButtonSpacer
} from './styledComponents'

import speechBubble from '@assets/images/onboarding/speech-bubble.png'
import hand from '@assets/images/onboarding/hand.png'
import logIn from '@assets/images/onboarding/log-in.png'
import yellowBird from '@assets/images/onboarding/yellow-bird.png'
import greyBird from '@assets/images/onboarding/grey-bird.png'
import greenBird from '@assets/images/bird-eating-birdseed/bird-eating-birdseed.png'

export const SwiperComponent = ({ navigation }) => {
  const handleLoginNavigation = () => {
    navigation.navigate('Login')
    navigation.dispatch(createResetStackTo('Login'))
  }
  return (
    <Swiper
      dot={<InactiveDot />}
      activeDot={<ActiveDot />}
      paginationStyle={{
        bottom: 40
      }}
    >
      <Slide>
        <Image width={170} height={120} source={speechBubble} />
        <SlideTitle>
          Your neighbors are talking. Join the conversation!
        </SlideTitle>
        <Bird source={yellowBird} />
      </Slide>
      <Slide>
        <Image width={74} height={120} source={hand} />
        <SlideTitle>
          With FPF mobile, read and compose postings on the go
        </SlideTitle>
        <Bird source={greenBird} left />
      </Slide>
      <Slide>
        <Image width={173} height={120} source={logIn} />
        <SlideTitle>
          With FPF mobile, log in once and stay logged in!
        </SlideTitle>
        <Bird source={yellowBird} left />
      </Slide>
      <Slide>
        <SlideButton
          onPress={handleLoginNavigation}
          width={250}
          tall
          borderColor='#f29426'
        >
          I am already an FPF member
        </SlideButton>
        <ButtonSpacer />
        <SlideButton
          onPress={() => navigation.navigate('ProfileTypes')}
          width={250}
          color='#f29426'
          borderColor='#f29426'
          bgColor='#fff'
          tall
          border
        >
          I am new to FPF. Sign me up!
        </SlideButton>
        <Bird source={greyBird} />
      </Slide>
    </Swiper>
  )
}

SwiperComponent.propTypes = {
  navigation: PropTypes.object.isRequired
}
