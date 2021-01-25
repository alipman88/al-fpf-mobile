import styled from 'styled-components/native'
import { Text } from '@components/Text'

export const CheckboxWrapper = styled.View`
  min-height: 80px;
  padding: 20px;
  background-color: #fff;
  border-bottom-width: ${({ last }) => (last ? 0 : 1)}px;
  border-color: #d5dde1;
  ${({ last }) =>
    last
      ? `
      borderBottomRightRadius: 10;
      borderBottomLeftRadius: 10;
    `
      : ''}
  ${({ first }) =>
    first
      ? `
      borderTopRightRadius: 10;
      borderTopLeftRadius: 10;
    `
      : ''}
  justify-content: flex-start;
  align-items: center;
`
export const CreateAccountWrapper = styled.View`
  width: 300px;
  border-width: 1px;
  border-color: #d5dde1;
  border-radius: 10px;
  align-self: center;
`
export const LinkWrapper = styled.View`
  justify-content: flex-start
  align-items: flex-start
  width: 80%;
`

export const LinkText = styled(Text)`
  color: #f29426;
  font-weight: bold;
`
export const RequiredText = styled(Text)`
  color: #86a0ad;
`
