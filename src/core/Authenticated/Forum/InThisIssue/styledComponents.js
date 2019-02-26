import styled from 'styled-components/native'
import { TextSemibold } from '@components/Text'

export const Container = styled.View`
  border-width: 1;
  border-color: #d2d4db;
  background-color: #ebecf1;
  border-radius: 4;
  padding: 16px;
  margin-bottom: 10;
`

export const Heading = styled(TextSemibold)`
  font-size: 20;
  margin-bottom: 14;
`

export const ListItem = styled.View`
  flex-direction: row;
  margin-bottom: 5;
`

export const ListItemText = styled(TextSemibold)`
  color: #355768;
  font-size: 16;
`

export const ListItemBullet = styled(ListItemText)`
  margin-right: 10;
`
