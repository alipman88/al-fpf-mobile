import styled from 'styled-components/native'

import { Text, TextSemibold } from '@components/Text'
import { StyleSheet } from 'react-native'

export const PostContainer = styled.View`
  margin-bottom: 10;
`

export const PostContainerBordered = styled.View`
  border-color: #ebecf1;
  border-width: 1;
  border-radius: 5;
  background-color: #fff;
  margin-bottom: 10;
  display: flex;
  justify-content: space-between;
  elevation: 1;
`
export const PostBodyContainer = styled.View`
  padding-vertical: ${({ hasBorder }) => (hasBorder ? '16px' : '0')};
  padding-horizontal: ${({ hasBorder }) => (hasBorder ? '10px' : '0')};
`
export const PostHeader = styled(TextSemibold)`
  font-size: 22;
  font-weight: bold;
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

export const PostBody = styled(Text)`
  color: #4a4a4a;
  font-size: 16;
  margin-vertical: 10;
`

export const PostLink = styled(TextSemibold)`
  color: #d77400;
  text-decoration-color: #d77400;
`

export const ShowMoreButton = styled(PostLink)``

export const LinkText = styled(PostAuthor)`
  text-decoration: underline;
`

export const CategoryPosts = styled.View`
  flex: none;
  flex-direction: row;
  flex-wrap: wrap;
`

export const BottomBordered = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px 10px 10px
  align-items: stretch;
`

export const Bottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px 10px 0px
  align-items: stretch;
`

export const ButtonWrapper = styled.View`
  flex: 4;
`

export const ButtonSpacer = styled.View`
  flex: 1;
`

export const AutoPostLinkStyle = StyleSheet.create({
  link: {
    color: '#d77400'
  }
})
