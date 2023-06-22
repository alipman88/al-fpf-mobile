import styled from 'styled-components/native'

import { Text, TextSemibold } from '@components/Text'

export const PostContainer = styled.View`
  margin-bottom: 10px;
  background-color: ${({ isClosed }) => (isClosed ? '#e8e9f2' : '#fff')};
`

export const PostContainerBordered = styled.View`
  border-color: #ebecf1;
  border-width: 1px;
  border-radius: 5px;
  background-color: ${({ isClosed }) => (isClosed ? '#e8e9f2' : '#fff')};
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  elevation: 1;
`
export const PostBodyContainer = styled.View`
  padding-vertical: ${({ hasBorder }) => (hasBorder ? '16px' : '0')};
  padding-horizontal: ${({ hasBorder }) => (hasBorder ? '10px' : '0')};
`
export const PostHeader = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
`

export const PostTitle = styled(TextSemibold)`
  font-size: 22px;
  font-weight: bold;
  color: #355768;
`

export const PostAuthor = styled(TextSemibold)`
  color: #4a4a4a;
  font-size: 16px;
  margin-bottom: 7px;
`

export const PostShared = styled(TextSemibold)`
  color: #4a4a4a;
  font-size: 14px;
  margin-bottom: 7px;
`

export const PostDate = styled(Text)`
  color: #4a4a4a;
  font-size: 16px;
  margin-top: 7px;
`

export const PostLocation = styled(Text)`
  color: #4a4a4a;
  font-size: 16px;
`

export const PostUrl = styled(Text)`
  color: #d77400;
  text-decoration-color: #d77400;
`

export const PostBody = styled(Text)`
  color: #4a4a4a;
  font-size: 16px;
  margin-vertical: 10px;
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

export const Pill = styled.View`
  background-color: #ebecf1;
  padding: 1px 10px 1px 10px;
  margin: 0 2px 2px 0;
  border-radius: 5px;
  border-color: #355768;
  align-self: flex-start;
`

export const PillText = styled(Text)`
  color: #ffffff;
`

export const PillPrimary = styled(Pill)`
  background-color: #f29426;
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
