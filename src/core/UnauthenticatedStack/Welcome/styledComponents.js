import styled from 'styled-components/native'
import { Text } from '@components/Text'
import { Button } from '@components/Button'

export const LogoContainer = styled.View`
  position: absolute;
  top: -10;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`

export const Logo = styled.Image`
  width: 150;
`

export const Image = styled.Image`
  ${({ width }) => width && `width: ${width};`}
  ${({ height }) => height && `height: ${height};`}
  margin-bottom: 20;
`

export const SlideTitle = styled(Text)`
  font-size: 18;
  text-align: center;
  margin-horizontal: 50;
`

export const Slide = styled.View`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

export const Bird = styled.Image`
  position: absolute;
  bottom: 0;
  ${({ left }) => (left ? 'left: 30;' : 'right: 30;')}
`
export const Seeds = styled.Image`
  position: absolute;
  bottom: 0;
  right: 30;
`

export const InactiveDot = styled.View`
  background-color: #ebecf1;
  width: 11;
  height: 11;
  border-radius: 7;
  margin-left: 7;
  margin-right: 7;
`

export const ActiveDot = styled(InactiveDot)`
  background-color: #f29426;
  border-width: 2;
  border-color: #f29426;
`

export const SlideButton = styled(Button)``

export const ButtonSpacer = styled.View`
  height: 20;
  width: 100%;
`
