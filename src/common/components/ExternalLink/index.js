import React from 'react'
import { Text } from '@components/Text'
import { Linking } from 'react-native'
import { LinkText, Icon } from './styledComponents'
import PropTypes from 'prop-types'

import linkIcon from '@assets/images/global-assets/external-link-icons/external-link-icon-blue.png'

export const ExternalLink = ({ content, url, onPress }) => (
  <LinkText onPress={onPress || (() => Linking.openURL(url))}>
    <Text>{content} </Text>
    <Icon source={linkIcon} />
  </LinkText>
)

ExternalLink.propTypes = {
  content: PropTypes.string.isRequired,
  url: PropTypes.string,
  onPress: PropTypes.func,
}
