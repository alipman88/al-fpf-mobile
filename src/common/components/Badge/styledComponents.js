import styled from 'styled-components/native'
import { Text } from '@components/Text'

const backgroundColor = (bg) => {
  switch (bg) {
    case 'primary':
      return '#e87211'
    case 'secondary':
    case 'success':
      return '#3a860c'
    case 'danger':
      return '#c62308'
    case 'warning':
      return '#fbd203'
    case 'info':
      return '#84c0c6'
    case 'light':
      return '#e8e9f2'
    case 'dark':
      return '#333'
    default:
      return ''
  }
}

const textColor = (bg) => {
  switch (bg) {
    case 'warning':
    case 'info':
    case 'light':
      return '#000'
    case 'primary':
    case 'secondary':
    case 'success':
    case 'danger':
    case 'dark':
    default:
      return '#fff'
  }
}

const borderLeftColor = (bg) => {
  switch (bg) {
    case 'primary':
      return '#a2500c'
    case 'secondary':
    case 'success':
      return '#295e08'
    case 'danger':
      return '#8b1906'
    case 'warning':
      return '#b09302'
    case 'info':
      return '#5c868b'
    case 'light':
      return '#a2a3a9'
    case 'dark':
      return '#707070'
    default:
      return ''
  }
}

export const Container = styled.View`
  background-color: ${({ bg }) => backgroundColor(bg)};
  border-left-color: ${({ bg }) => borderLeftColor(bg)};

  align-self: flex-start;
  border-left-width: 8px;
  border-radius: 2px;
  padding: 5.6px 10.4px;
`

export const ContainerText = styled(Text)`
  color: ${({ bg }) => textColor(bg)};

  font-weight: bold;
`
