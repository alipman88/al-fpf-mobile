import React from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import IconEvil from 'react-native-vector-icons/EvilIcons'

import { Button } from '@components/Button'
import { PostCategory } from '@components/PostCategory'
import { Card, CardContent, ContentText, Header, Bottom } from '../sharedStyles'

export const Advertisement = ({ ad, navigateWithToken }) => (
  <Card>
    <CardContent>
      <Header>{ad.headline}</Header>
      <TouchableOpacity
        onPress={() => navigateWithToken('/advertise-on-fpf/why-paid-ads')}
      >
        <PostCategory labelStyle={'dark_grey'}>Paid ad</PostCategory>
      </TouchableOpacity>
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
  ad: PropTypes.object.isRequired,
  navigateWithToken: PropTypes.func.isRequired
}

Advertisement.displayName = 'Advertisement'
