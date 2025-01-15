import React from 'react'

import { Logo, LogoContainer } from './styledComponents'

import logoImage from '@fpf/assets/images/fpf-logo.png'

export const HeaderLogo = () => (
  <LogoContainer>
    <Logo source={logoImage} resizeMode='contain' />
  </LogoContainer>
)
