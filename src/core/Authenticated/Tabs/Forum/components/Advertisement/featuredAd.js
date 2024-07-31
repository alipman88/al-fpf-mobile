import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { openFpfUrl } from '@common/utils/openFpfUrl'
import PropTypes from 'prop-types'
import { PostCategory } from '@components/PostCategory'
import { SizedImage } from '@components/SizedImage'
import { Card, CardContent, Header, Link, Text } from '../sharedStyles'

export const FeaturedAd = ({ ad, navigateWithToken }) => (
  <Card>
    <CardContent style={{ flexDirection: 'row' }}>
      {ad.image_url && (
        <View style={{ paddingRight: 14 }}>
          <TouchableOpacity onPress={() => openFpfUrl(ad.url)}>
            <SizedImage uri={ad.image_url} maxHeight={100} />
          </TouchableOpacity>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => openFpfUrl(ad.url)}>
          <Header>
            <Link>{ad.headline}</Link>
          </Header>
        </TouchableOpacity>

        {ad.body && (
          <Text
            style={{ marginBottom: 6, fontWeight: 'bold' }}
            selectable={true}
          >
            {ad.body}
          </Text>
        )}

        <TouchableOpacity onPress={() => openFpfUrl(ad.url)}>
          <PostCategory labelStyle={'primary'}>Learn More</PostCategory>
        </TouchableOpacity>
      </View>
    </CardContent>
  </Card>
)

FeaturedAd.propTypes = {
  ad: PropTypes.object.isRequired,
  navigateWithToken: PropTypes.func.isRequired,
}

FeaturedAd.displayName = 'FeaturedAd'
