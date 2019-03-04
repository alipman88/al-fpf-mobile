import styled from 'styled-components/native'
import { Pill } from '@components/Pill'
import { Text } from '@components/Text'

export const Card = styled.View`
  min-height: 328;
  border-color: #ebecf1;
  border-width: 1;
  border-radius: 5;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  margin-bottom: 10;
`

export const Name = styled(Text)`
  font-weight: bold;
  color: black;
  padding-top: 10px;
`
export const CategoryContainer = styled.View`
  flex-direction: row;
`
export const Category = styled(Pill)`
  margin-top: 12;
  margin-bottom: 12;
  margin-right: 10;
`
export const PostButton = styled.View`
  width: 124;
  align-items: stretch;
`
