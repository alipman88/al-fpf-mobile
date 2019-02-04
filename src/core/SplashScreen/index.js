import { connect } from 'react-redux'
import { SplashScreen as SplashScreenComponent } from './SplashScreen'
import { appError } from '@components/AppError/slice'

export const SplashScreen = connect(
  null,
  { setAppError: appError.actions.setAppError }
)(SplashScreenComponent)
