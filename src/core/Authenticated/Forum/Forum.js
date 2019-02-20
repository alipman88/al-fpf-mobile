import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'

import { createResetStackTo } from '@common/utils/navigation'
import { ScreenContainer } from '@components/ScreenContainer'
import { Text } from '@components/Text'

export class Forum extends React.Component {
  static navigationOptions = {
    title: 'Forum'
  }

  componentDidMount() {
    this.props.getAreas()
  }

  render() {
    const { navigation, setAccessToken } = this.props

    return (
      <ScreenContainer grey>
        <Text>Forum</Text>
        <TouchableOpacity
          onPress={() => {
            setAccessToken('')
            navigation.navigate('UnauthenticatedStack')
            navigation.dispatch(createResetStackTo('Login'))
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </ScreenContainer>
    )
  }
}

Forum.propTypes = {
  getAreas: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  setAccessToken: PropTypes.func.isRequired
}
