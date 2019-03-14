import styled from 'styled-components/native'

import { Text, TextSemibold } from '@components/Text'

export const ResultsContainer = styled.View`
  flex: 1;
  background-color: white;
  align-self: stretch;
`

export const ResultCounts = styled(TextSemibold)`
  color: #999cad;
  font-size: 16;
  text-align: center;
  flex: 1;
  margin-top: 23;
  margin-bottom: 12;
`

export const ResultsDivider = styled.View`
  height: 1;
  background-color: #d0d1d7;
  width: 100%;
  margin-bottom: 18;
`

export const PostContainer = styled.View`
  margin-bottom: 33;
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

export const ShowMoreButton = styled(TextSemibold)`
  color: #d77400;
  text-decoration-color: #d77400;
  margin-top: 10;
`

export const LoadMoreContainer = styled.View`
  padding-bottom: 10;
`
