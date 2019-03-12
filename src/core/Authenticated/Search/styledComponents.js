import styled from 'styled-components/native'

import { paddingHorizontal } from '@common/styles/screenPadding'
import { Text, TextSemibold } from '@components/Text'

export const PaddingContainer = styled.View`
  padding-horizontal: ${paddingHorizontal};
`

export const SearchFormContainer = styled.View`
  padding-top: 16;
  padding-bottom: 18;
  background: #ebecf1;
`

export const ResultsContainer = styled.View`
  flex: 1;
  background-color: white;
  align-self: stretch;
`

export const DateFieldContainer = styled.View`
  flex: 1;
  margin-right: ${({ marginRight }) => marginRight || 0};
`

export const DatesWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const FieldWrapper = styled.View`
  margin-bottom: 12;
`

export const Filters = styled.View`
  padding-top: 7;
`

export const ClearFilters = styled(TextSemibold)`
  color: #6b6e7d;
  font-size: 14;
`

export const FiltersText = styled(TextSemibold)`
  color: #6b6e7d;
  font-size: 16;
  padding-left: 5;
`

export const FiltersToggle = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 19;
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
