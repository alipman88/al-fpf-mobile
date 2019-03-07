import { Dimensions } from 'react-native'

export const getDimensions = () => Dimensions.get('screen')

// this amount is arbitrary, but given mobile has landscape disabled, and tablets are bigger than 700px in either direction
// this should be sufficient
export const isTabletWidth = () => Dimensions.get('screen').width > 700
