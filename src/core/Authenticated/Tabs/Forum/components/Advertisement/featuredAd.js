import React from 'react'
import { TouchableOpacity } from 'react-native'
import { openFpfUrl } from '@common/utils/openFpfUrl'
import PropTypes from 'prop-types'
import { SizedImage } from '@components/SizedImage'
import { Card, CardContent, Header, Link, Text } from '../sharedStyles'

export const FeaturedAd = ({ ad, navigateWithToken }) => (
  <Card>
    <CardContent>
      <TouchableOpacity
        onPress={() => openFpfUrl(ad.url)}
        style={{ marginBottom: 6 }}
      >
        <SizedImage uri={ad.image_url} maxHeight={100} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => openFpfUrl(ad.url)}
        style={{ marginRight: 6, marginBottom: 6 }}
      >
        <Header>
          <Link>{ad.headline}</Link>
        </Header>
      </TouchableOpacity>

      {ad.body && (
        <Text style={{ fontWeight: 'bold' }} selectable={true}>
          {ad.body}
        </Text>
      )}
    </CardContent>
  </Card>
)

FeaturedAd.propTypes = {
  ad: PropTypes.object.isRequired,
  navigateWithToken: PropTypes.func.isRequired,
}

FeaturedAd.displayName = 'FeaturedAd'
