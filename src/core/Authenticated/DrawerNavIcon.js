import React from 'react'

import { DrawerContext } from '@app/context'
import trioBirds from '@assets/images/global-assets/trio-birds.png'
import { TopNavIcon } from './TopNavIcon'

export const DrawerNavIcon = () => (
  <DrawerContext.Consumer>
    {({ setDrawerOpenState }) => (
      <TopNavIcon
        source={trioBirds}
        width={36}
        height={26}
        onPress={() => {
          setDrawerOpenState(true)
        }}
      />
    )}
  </DrawerContext.Consumer>
)
