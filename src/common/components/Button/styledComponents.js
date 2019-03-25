import styled from 'styled-components/native'
import { Text } from '@components/Text'

export const WrapperStyles = `
  padding-horizontal: 10;
  padding-vertical: 10;
  border-radius: 5;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const ButtonText = styled(Text)`
  color: ${props => props.color || '#502c02'};
  text-align: center;
  font-weight: bold;
`
