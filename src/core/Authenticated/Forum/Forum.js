import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'

import { createResetStackTo } from '@common/utils/navigation'
import { ScreenContainer } from '@components/ScreenContainer'
import { Text } from '@components/Text'
import { Post } from './posts/Post'

export class Forum extends React.Component {
  static navigationOptions = {
    title: 'Forum'
  }

  componentDidMount() {
    this.props.getAreas()
    this.props.getIssues(this.props.currentAreaId)
  }

  render() {
    const { navigation, setAccessToken } = this.props

    return (
      <ScreenContainer grey>
        <Text>Forum</Text>
        <Post
          post={{
            id: 5046,
            title: "Seeking Child's Snowboard",
            content:`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
            categories: ['Assistance'],
            user_id: 4598,
            user_first_name: 'Carolyn',
            user_last_name: 'McCain',
            user_email: 'user@email.com',
            user_location: 'Thomas Rd',
            user_official_title: 'Mayor',
            area_ids: [294],
            event: {
              title: 'party',
              start_date: {},
              end_date: {},
              parent_event_id: 9275
            }
          }}
        />
      </ScreenContainer>
    )
  }
}

Forum.propTypes = {
  getAreas: PropTypes.func.isRequired,
  getIssues: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  setAccessToken: PropTypes.func.isRequired
}
