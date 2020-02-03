import styled from 'styled-components/native'
import { Text } from '@components/Text'

const labelStyles = {
  light_grey: {
    pill_background_color: '#ebecf1',
    text_color: '#999cad'
  },
  dark_grey: {
    pill_background_color: '#999cad',
    text_color: '#ebecf1'
  }
}

export const Pill = styled.View`
  background-color: ${({ labelStyle }) =>
    labelStyle
      ? labelStyles[labelStyle].pill_background_color
      : labelStyles['light_grey'].pill_background_color};
  padding: 1px 10px 1px 10px;
  margin: 0 2px 2px 0;
  border-radius: 5;
  border-color: #355768;
  align-self: flex-start;
`
export const CategoryText = styled(Text)`
  color: ${({ labelStyle }) =>
    labelStyle
      ? labelStyles[labelStyle].text_color
      : labelStyles['light_grey'].text_color};
`
