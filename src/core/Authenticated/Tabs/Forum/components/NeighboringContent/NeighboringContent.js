import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import {
  Card,
  Divider,
  Link,
  NewsBody,
  NewsHeader,
  Row,
  SectionContainer,
  SectionHeader,
} from './styledComponents'

export const NeighboringContent = ({
  fetchSpecificIssue,
  newsFromNeighboringNfs,
  navigation,
}) => {
  if (newsFromNeighboringNfs.length === 0) {
    return null
  }
  return (
    <SectionContainer>
      <SectionHeader>Today's news from neighboring FPFs</SectionHeader>
      <Card>
        {newsFromNeighboringNfs.map((news, i) => (
          <Row key={`${news.area_id}_${news.issue_number}`}>
            <NewsHeader>{news.area_name}</NewsHeader>
            <NewsBody>
              {news.first_post_title}
              {news.first_post_user_full_name ? ' - ' : ''}
              {news.first_post_user_full_name}
            </NewsBody>
            <TouchableOpacity
              onPress={() =>
                fetchSpecificIssue(
                  news.area_id,
                  news.issue_id,
                  news.issue_number,
                  navigation
                )
              }
            >
              <Link>
                Read posting{' '}
                {news.additional_posts_count > 0
                  ? `and ${news.additional_posts_count} more`
                  : ''}
              </Link>
            </TouchableOpacity>
            {i < newsFromNeighboringNfs.length - 1 && <Divider />}
          </Row>
        ))}
      </Card>
    </SectionContainer>
  )
}

NeighboringContent.propTypes = {
  fetchSpecificIssue: PropTypes.func.isRequired,
  newsFromNeighboringNfs: PropTypes.array,
  navigation: PropTypes.object,
}

NeighboringContent.defaultProps = {
  newsFromNeighboringNfs: [],
}
