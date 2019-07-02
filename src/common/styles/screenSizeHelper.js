import { Dimensions } from 'react-native'

// Height
const screenSizes = [
  {
    name: 'xs',
    height: 568 // iPhone SE
  },
  {
    name: 'sm',
    height: 667 // iPhone 6, 7, 8
  }
]

// Example usage:
// screenSize({xs: 8, sm: 12}, 16)
// screenSize({sm: 12}, 16)
// screenSize({xs: 8}, 16)
export function screenSize(screenSizeOptions, defaultValue) {
  const windowHeight = Dimensions.get('window').height
  const matchedScreenSizes = screenSizes.filter(screenSize => {
    return windowHeight < screenSize.height
  })

  let value
  const hasScreenSizeOption = matchedScreenSizes.some(matchedScreenSize => {
    if (screenSizeOptions.hasOwnProperty(matchedScreenSize.name)) {
      value = screenSizeOptions[matchedScreenSize.name]
      return true
    } else {
      return false
    }
  })
  if (!hasScreenSizeOption) {
    value = defaultValue
  }
  return value
}
