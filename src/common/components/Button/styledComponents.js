import styled from 'styled-components/native'
import { Text } from '@components/Text'

export const WrapperStyles = `
  padding-horizontal: 10;
  padding-vertical: 10;
  background-color: #f29426;
  border-radius: 8;
`

export const ButtonText = styled(Text)`
  color: ${props => props.color || '#502c02'};
  text-align: center;
  font-weight: bold;
`
