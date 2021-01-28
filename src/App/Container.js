import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SideMenu from 'react-native-side-menu'

import { currentUser } from '@common/currentUser'
import { DrawerContext } from './context'
import { DrawerMenu } from '@components/DrawerMenu'
import { SwitchNavigatorContainer } from '@core/switchNavigator'
import { Spinner } from './Spinner'
import { getDimensions, isTabletWidth } from '@common/utils/size'
import navigationService from '@common/utils/navigationService'

class ContainerComponent extends React.Component {
  constructor(props) {
    super(props)

    // defined here so we can put it in inital state
    this.setDrawerOpenState = (open) => {
      this.setState(() => ({
        open,
      }))
    }

    this.state = {
      open: false,
      setDrawerOpenState: this.setDrawerOpenState,
    }
  }

  render() {
    const { accessToken, handleNavigationChange } = this.props
    return (
      <DrawerContext.Provider value={this.state}>
        <SideMenu
          menu={<DrawerMenu />}
          isOpen={this.state.open}
          onChange={(open) => this.setDrawerOpenState(open)}
          openMenuOffset={
            isTabletWidth()
              ? (getDimensions().width * 1) / 3
              : (getDimensions().width * 2) / 3
          }
          bounceBackOnOverdraw={false}
          disableGestures={!accessToken}
        >
          <Spinner />
          <SwitchNavigatorContainer
            onNavigationStateChange={handleNavigationChange}
            ref={(navigatorRef) => {
              navigationService.setTopLevelNavigator(navigatorRef)
            }}
          />
        </SideMenu>
      </DrawerContext.Provider>
    )
  }
}

ContainerComponent.propTypes = {
  accessToken: PropTypes.string,
  handleNavigationChange: PropTypes.func,
}

const mapStateToProps = (state) => ({
  accessToken: currentUser.selectors.getAccessToken(state),
})

export const Container = connect(mapStateToProps)(ContainerComponent)
