import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { currentUser } from '@common/currentUser'
import { AuthenticatedStack } from './Authenticated'
import { UnauthenticatedStack } from './UnauthenticatedStack'

const RootStackComponent = ({ accessToken }) => {
  return accessToken ? <AuthenticatedStack /> : <UnauthenticatedStack />
}

RootStackComponent.propTypes = {
  accessToken: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  accessToken: currentUser.selectors.getAccessToken(state),
})

export const RootStack = connect(mapStateToProps)(RootStackComponent)
