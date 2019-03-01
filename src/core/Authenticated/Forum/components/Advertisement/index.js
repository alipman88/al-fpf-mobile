import React from 'react'
import { Linking } from 'react-native'
import PropTypes from 'prop-types'
import IconEvil from 'react-native-vector-icons/EvilIcons'
import { Button } from '@components/Button'

import { AdvertisementPill, Card } from './styledComponents'

import { CardContent, ContentText, Header, Bottom } from '../sharedStyles'

export const Advertisement = ({ ad }) => (
  <Card>
    <AdvertisementPill>Advertisement</AdvertisementPill>
    <CardContent>
      <Header>{ad.headline}</Header>
      <ContentText>{ad.body}</ContentText>
    </CardContent>
    <Bottom>
      <Button color='#fff' onPress={() => Linking.openURL(ad.url)} fullWidth>
        {ad.link_text} <IconEvil color='#fff' name='external-link' size={18} />
      </Button>
    </Bottom>
  </Card>
)

Advertisement.propTypes = {
  ad: PropTypes.object.isRequired
}
