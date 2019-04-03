import styled from 'styled-components/native'

export const CheckboxWrapper = styled.View`
  min-height: 80;
  padding: 20px;
  background-color: #fff;
  border-bottom-width: ${({ last }) => (last ? 0 : 1)};
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
  justify-content: center;
  align-items: center;
`
export const CreateAccountWrapper = styled.View`
  width: 300;
  border-width: 1;
  border-color: #d5dde1;
  border-radius: 10;
  align-self: center;
`
