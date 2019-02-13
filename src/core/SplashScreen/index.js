import { connect } from 'react-redux'
import { SplashScreen as SplashScreenComponent } from './SplashScreen'
import { currentUser } from '@common/currentUser'

const mapStateToProps = state => ({
  accessToken: currentUser.selectors.getAccessToken(state)
})

export const SplashScreen = connect(mapStateToProps)(SplashScreenComponent)
