import styled from 'styled-components/native'
import { TextSemibold } from '@components/Text'

export const Container = styled.View`
  border-width: 1px;
  border-color: #d2d4db;
  background-color: #ebecf1;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 10px;
`

export const Heading = styled(TextSemibold)`
  font-size: 20px;
  margin-bottom: 14px;
  color: #000000;
`

export const ListItem = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`

export const ListItemText = styled(TextSemibold)`
  color: #355768;
  font-size: 16px;
`

export const ListItemBullet = styled(ListItemText)`
  margin-right: 10px;
`
