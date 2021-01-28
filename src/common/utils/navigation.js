import { NavigationActions, StackActions } from 'react-navigation'

export const createResetStackTo = (nextScreen, params = {}, key) =>
  StackActions.reset({
    index: 0,
    key,
    actions: [NavigationActions.navigate({ routeName: nextScreen, ...params })],
  })
