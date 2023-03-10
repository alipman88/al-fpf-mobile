import React from 'react'
import Autolink from 'react-native-autolink'
import { Linking, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import IconEvil from 'react-native-vector-icons/EvilIcons'
import { Button } from '@components/Button'
import { SizedImage } from '@components/SizedImage'
import { ImageWrapper } from './styledComponents'
import { PostCategory } from '@components/PostCategory'
import {
  Disclaimer,
  AutoPostLinkStyle,
} from '@core/Authenticated/Tabs/Forum/components/sharedStyles'
import { Card, CardContent, ContentText, Header, Bottom } from '../sharedStyles'

export const Advertisement = ({ ad, navigateWithToken }) => (
  <Card>
    <CardContent>
      <Header>{ad.headline}</Header>
      <ImageWrapper>
        <TouchableOpacity onPress={() => Linking.openURL(ad.url)}>
          <SizedImage uri={ad.image_url} maxHeight={100} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateWithToken('/advertise-on-fpf/why-paid-ads')}
        >
          <PostCategory labelStyle={'dark_grey'}>Paid ad</PostCategory>
        </TouchableOpacity>
      </ImageWrapper>
      <ContentText selectable={true}>{ad.body}</ContentText>
      {!!ad.disclaimer?.content_plain && (
        <Disclaimer selectable={true}>
          <Autolink
            url
            email
            text={ad.disclaimer?.content_plain}
            linkStyle={AutoPostLinkStyle.link}
          />
        </Disclaimer>
      )}
    </CardContent>
    <Bottom>
      <Button color='#fff' onPress={() => Linking.openURL(ad.url)} fullWidth>
        {ad.link_text || 'Visit'}{' '}
        <IconEvil color='#fff' name='external-link' size={18} />
      </Button>
    </Bottom>
  </Card>
)

Advertisement.propTypes = {
  ad: PropTypes.object.isRequired,
  navigateWithToken: PropTypes.func.isRequired,
}

Advertisement.displayName = 'Advertisement'
