import styled from 'styled-components/native'

import { paddingHorizontal } from '@common/styles/screenPadding'
import { Text, TextSemibold } from '@components/Text'

export const PaddingContainer = styled.View`
  padding-horizontal: ${paddingHorizontal}px;
`

export const SearchFormContainer = styled.View`
  padding-top: 16px;
  padding-bottom: 18px;
  background: #ebecf1;
`

export const ResultsContainer = styled.View`
  flex: 1;
  background-color: white;
  align-self: stretch;
`

export const DateFieldContainer = styled.View`
  flex: 1;
  margin-right: ${({ marginRight }) => marginRight || 0}px;
`

export const DatesWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const FieldWrapper = styled.View`
  margin-bottom: 12px;
`

export const Filters = styled.View``

export const ClearFilters = styled(TextSemibold)`
  color: #6b6e7d;
  font-size: 14px;
`

export const FiltersText = styled(TextSemibold)`
  color: #6b6e7d;
  font-size: 16px;
  padding-left: 5px;
`

export const FiltersToggle = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 19px;
  margin-bottom: 7px;
`

export const ResultCounts = styled(TextSemibold)`
  color: #999cad;
  font-size: 16px;
  text-align: center;
  flex: 1;
  margin-top: 23px;
  margin-bottom: 12px;
`

export const ResultsDivider = styled.View`
  height: 1px;
  background-color: #d0d1d7;
  width: 100%;
  margin-bottom: 18px;
`

export const PostContainer = styled.View`
  margin-bottom: 33px;
`

export const PostHeader = styled(TextSemibold)`
  font-size: 20px;
  color: #355768;
  margin-bottom: 10px;
`

export const PostAuthor = styled(TextSemibold)`
  color: #4a4a4a;
  font-size: 16px;
  margin-bottom: 7px;
`

export const PostDate = styled(PostAuthor)``

export const PostCategory = styled(Text)`
  color: #999cad;
  font-size: 16px;
`

export const PostBody = styled(Text)`
  color: #4a4a4a;
  font-size: 16px;
  margin-vertical: 10px;
`
