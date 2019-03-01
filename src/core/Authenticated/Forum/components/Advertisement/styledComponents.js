import styled from 'styled-components/native'

import { Pill } from '@components/Pill'

export const Card = styled.View`
  flex: 1;
  border-color: #ebecf1;
  border-width: 1;
  border-radius: 5;
  justify-content: space-between;
  background-color: #fff;
  margin-bottom: 10;
`

export const AdvertisementPill = styled(Pill)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-top: 17;
`
