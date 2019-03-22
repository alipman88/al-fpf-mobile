import styled from 'styled-components/native'

import { Text } from '@components/Text'

export const Container = styled.View`
  justify-content: center;
  flex-direction: row;
`

export const Step = styled.View`
  border-radius: 12;
  border-width: 1;
  height: 24;
  width: 24;
  margin-horizontal: 2;
  ${({ active, done }) => {
    if (done) {
      return `
        border-color: #97b57b;
        background-color: #e3eddc;
      `
    } else if (active) {
      return `
        border-color: #23282a;
        background-color: #a1b9c2;
      `
    } else {
      return `
        border-color: #23282a;
        background-color: transparent;
      `
    }
  }}

  justify-content: center;
  align-items: center;
`

export const Number = styled(Text)`
  font-size: 12;
  color: #23282a;
`
