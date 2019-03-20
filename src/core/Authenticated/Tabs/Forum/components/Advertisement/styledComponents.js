import styled from 'styled-components/native'
import { Text } from '@components/Text'

export const Card = styled.View`
  flex: 1;
  border-color: #ebecf1;
  border-width: 1;
  border-radius: 5;
  justify-content: space-between;
  background-color: #fff;
  margin-bottom: 10;
`

export const AdvertisementPill = styled.View`
  background-color: #ebecf1;
  padding: 1px 10px 1px 10px;
  border-radius: 5;
  border-color: #355768;
  align-self: flex-start;
`
export const PillText = styled(Text)`
  color: #999cad;
`
