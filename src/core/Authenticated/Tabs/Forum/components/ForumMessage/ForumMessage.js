import React from 'react'
import { openFpfUrl } from '@common/utils/openFpfUrl'
import Autolink from 'react-native-autolink'
import PropTypes from 'prop-types'
import IconEvil from 'react-native-vector-icons/EvilIcons'

import { Button } from '@components/Button'
import { Text } from '@components/Text'
import { Card, CardContent, Header, Bottom } from '../sharedStyles'
import { AutoMessageLinkStyle } from './styledComponents'

export const ForumMessage = ({ forumMessage }) => {
  if (forumMessageEmpty(forumMessage)) {
    return null
  }
  return (
    <Card>
      <CardContent>
        {Boolean(forumMessage.title) && <Header>{forumMessage.title}</Header>}
        {Boolean(forumMessage.content) && (
          <Text style={{ fontSize: '16px' }}>
            <Autolink
              url
              email
              text={forumMessage.content}
              linkStyle={AutoMessageLinkStyle.link}
            />
          </Text>
        )}
      </CardContent>
      {Boolean(forumMessage.button_text) &&
        Boolean(forumMessage.button_url) && (
          <Bottom>
            <Button
              color='#fff'
              onPress={() => openFpfUrl(forumMessage.button_url)}
              fullWidth
            >
              {forumMessage.button_text}{' '}
              <IconEvil color='#fff' name='external-link' size={18} />
            </Button>
          </Bottom>
        )}
    </Card>
  )
}

const forumMessageEmpty = (forumMessage) => {
  return (
    forumMessage === undefined ||
    forumMessage === null ||
    !(
      forumMessage.title ||
      forumMessage.content ||
      (forumMessage.button_text && forumMessage.button_url)
    )
  )
}

ForumMessage.propTypes = {
  forumMessage: PropTypes.object,
}

ForumMessage.defaultProps = {
  forumMessage: {
    title: '',
    content: '',
    button_text: '',
    button_url: '',
  },
}
