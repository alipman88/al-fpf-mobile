import styled from 'styled-components/native'
import { Pill } from '@components/Pill'
import { Text } from '@components/Text'

export const Card = styled.View`
  min-height: 328;
  max-height: 520;
  border-color: #ebecf1;
  border-width: 1;
  border-radius: 5;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  margin-bottom: 10;
`
export const CardContent = styled.View`
  padding: 16px;
`
export const Header = styled(Text)`
  font-size: 22;
  font-weight: bold;
  color: #355768;
`
export const Name = styled(Text)`
  font-weight: bold;
  color: black;
  padding-top: 10px;
`
export const ContentText = styled(Text)`
  font-size: 16;
  padding-top: 14px;
`
export const CategoryContainer = styled.View`
  flex-direction: row;
`
export const Category = styled(Pill)`
  margin-top: 12;
  margin-bottom: 12;
  margin-right: 10;
`
export const Bottom = styled.View`
  height: 64;
  border-top-width: 1;
  border-top-color: #ebecf1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`
export const PostButton = styled.View`
  width: 124;
  align-items: stretch;
`
export const VerticalDivider = styled.View`
  width: 1;
  height: 100%;
  background-color: #ebecf1;
`
