import styled from 'styled-components/native'
import { Text, TextSemibold } from '@components/Text'

export const Container = styled.View`
  justify-content: space-between;
  align-items: center;
  padding-top: 56;
`

export const Close = styled.TouchableOpacity`
  position: absolute;
  top: 20;
  right: 20;
`

export const Heading = styled(TextSemibold)`
  font-size: 27;
  margin-bottom: 20;
`

export const TextContainer = styled.View`
  padding-horizontal: 30;
  margin-bottom: 30;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`

export const BodyText = styled(Text)`
  font-size: 16;
  text-align: center;
`

export const BodySemibold = styled(TextSemibold)`
  font-size: 16;
  text-align: center;
`

export const Link = styled(BodySemibold)`
  color: #d77400;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const GrassContainer = styled.View`
  background-color: #fff;
  padding-top: 34;
  height: 112;
  width: 100%;
`

// Height of this is the height of this container subtract the container's top padding
export const GrassBg = styled.View`
  background-color: #e3eddd;
  height: 78;
  bottom: 0;
  left: 0;
  right: 0;
`

export const Grass = styled.Image`
  top: 16;
  position: absolute;
  width: 100%;
`

export const GreyBird = styled.Image`
  position: absolute;
  left: 19;
  bottom: 9;
`

export const BirdLetterbox = styled.Image`
  position: absolute;
  right: 0;
  top: 0;
`

export const BirdEatingBirdseed = styled.Image`
  position: absolute;
  left: 88;
  bottom: 11;
`
