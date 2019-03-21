import styled from 'styled-components/native'

import { Text, TextSemibold } from '@components/Text'

export const PostContainer = styled.View`
  margin-bottom: 33;
`

export const PostContainerBordered = styled.View`
  border-color: #ebecf1;
  border-width: 1;
  border-radius: 5;
  background-color: #fff;
  margin-bottom: 10;
  display: flex;
  justify-content: space-between;
`
export const PostBodyContainer = styled.View`
  padding-vertical: ${({ hasBorder }) => (hasBorder ? '16px' : '0')};
  padding-horizontal: ${({ hasBorder }) => (hasBorder ? '10px' : '0')};
`
export const PostHeader = styled(TextSemibold)`
  font-size: 20;
  color: #355768;
  margin-bottom: 10;
`

export const PostAuthor = styled(TextSemibold)`
  color: #4a4a4a;
  font-size: 16;
  margin-bottom: 7;
`

export const PostShared = styled(TextSemibold)`
  color: #4a4a4a;
  font-size: 14;
  margin-bottom: 7;
`

export const PostDate = styled(PostAuthor)``

export const PostCategory = styled(Text)`
  color: #999cad;
  font-size: 16;
`

export const PostBody = styled(Text)`
  color: #4a4a4a;
  font-size: 16;
  margin-vertical: 10;
`

export const PostLink = styled(TextSemibold)`
  color: #d77400;
  text-decoration-color: #d77400;
`

export const ShowMoreButton = styled(PostLink)`
  margin-top: 10;
`
