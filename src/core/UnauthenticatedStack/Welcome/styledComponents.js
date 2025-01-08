import styled from 'styled-components/native'
import { Text } from '@fpf/components/Text'
import { Button } from '@fpf/components/Button'

export const Image = styled.Image`
  ${({ width }) => width && `width: ${width}px;`}
  ${({ height }) => height && `height: ${height}px;`}
  margin-bottom: 20px;
`

export const SlideTitle = styled(Text)`
  font-size: 18px;
  text-align: center;
  margin-horizontal: 50px;
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
  ${({ left }) => (left ? 'left: 30px;' : 'right: 30px;')}
`
export const Seeds = styled.Image`
  position: absolute;
  bottom: 0;
  right: 30px;
`

export const InactiveDot = styled.View`
  background-color: #ebecf1;
  width: 11px;
  height: 11px;
  border-radius: 7px;
  margin-left: 7px;
  margin-right: 7px;
`

export const ActiveDot = styled(InactiveDot)`
  background-color: #f29426;
  border-width: 2px;
  border-color: #f29426;
`

export const SlideButton = styled(Button)``

export const ButtonSpacer = styled.View`
  height: 20px;
  width: 100%;
`
