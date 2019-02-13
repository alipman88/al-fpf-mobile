import { NavigationActions, StackActions } from 'react-navigation'
import { createResetStackTo } from '../navigation'

describe('navigation', () => {
  describe('createResetStackTo', () => {
    test('creates the right stack action', () => {
      const action = createResetStackTo('Home', { title: 'Hi' }, 'blah')
      expect(action).toEqual(
        StackActions.reset({
          index: 0,
          key: 'blah',
          actions: [
            NavigationActions.navigate({ routeName: 'Home', title: 'Hi' })
          ]
        })
      )
    })
  })
})
