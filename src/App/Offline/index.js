import React from 'react'

import { ScreenContainer } from '@components/ScreenContainer'

import offline from '@assets/images/offline/offline.png'

import {
  Body,
  Content,
  Image,
  FullscreenContainer,
  OfflineHeader
} from './styledComponents'

export const Offline = () => (
  <FullscreenContainer>
    <ScreenContainer grey>
      <Content>
        <Image source={offline} />
        <OfflineHeader>Whoops</OfflineHeader>
        <Body>
          Your wifi signal seems kind of pooped, please check your connection
          and try again.
        </Body>
      </Content>
    </ScreenContainer>
  </FullscreenContainer>
)
