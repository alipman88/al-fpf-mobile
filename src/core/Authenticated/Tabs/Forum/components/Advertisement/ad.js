import React from 'react'
import Autolink from 'react-native-autolink'
import { TouchableOpacity } from 'react-native'
import { openFpfUrl } from '@common/utils/openFpfUrl'
import PropTypes from 'prop-types'
import IconEvil from 'react-native-vector-icons/EvilIcons'
import { Button } from '@components/Button'
import { SizedImage } from '@components/SizedImage'
import { PostCategory } from '@components/PostCategory'
import {
  Disclaimer,
  AutoPostLinkStyle,
} from '@core/Authenticated/Tabs/Forum/components/sharedStyles'
import { Card, CardContent, ContentText, Header, Bottom } from '../sharedStyles'

export const Ad = ({ ad, navigateWithToken }) => (
  <Card>
    <CardContent>
      <Header>{ad.headline}</Header>
      <TouchableOpacity
        onPress={() => openFpfUrl(ad.url)}
        style={{ marginRight: 6, marginBottom: 6 }}
      >
        <SizedImage uri={ad.image_url} maxHeight={100} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigateWithToken('/advertise-on-fpf/why-paid-ads')}
      >
        <PostCategory labelStyle={'dark_grey'}>
          {ad.ad_type === 'featured' ? 'Featured Ad' : 'Paid Ad'}
        </PostCategory>
      </TouchableOpacity>
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
      <Button color='#fff' onPress={() => openFpfUrl(ad.url)} fullWidth>
        {ad.link_text || 'Visit'}{' '}
        <IconEvil color='#fff' name='external-link' size={18} />
      </Button>
    </Bottom>
  </Card>
)

Ad.propTypes = {
  ad: PropTypes.object.isRequired,
  navigateWithToken: PropTypes.func.isRequired,
}

Ad.displayName = 'Ad'
