import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Linking } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconEvil from 'react-native-vector-icons/EvilIcons'
import { Modal } from '@components/Modal'

import grassImage from '@assets/images/fpf-grass.png'
import greyBird from '@assets/images/global-assets/grey-bird/grey-bird.png'
import birdLetterbox from '@assets/images/bird-letterbox/bird-letterbox.png'
import birdEatingBirdseed from '@assets/images/bird-eating-birdseed/bird-eating-birdseed.png'

import {
  BirdEatingBirdseed,
  BirdLetterbox,
  BodySemibold,
  BodyText,
  Close,
  Container,
  Grass,
  GrassBg,
  GrassContainer,
  GreyBird,
  Heading,
  Link,
  TextContainer
} from './styledComponents'

export const Success = ({ onClose }) => (
  <Modal>
    <Container>
      <Close onPress={() => onClose()}>
        <Icon size={18} name='close' color='#c5c5c5' />
      </Close>
      <Heading>Success!</Heading>
      <TextContainer>
        <BodyText>
          Your posting will appear in the next issue of your local FPF, which
          will be published today or soon after.
        </BodyText>
      </TextContainer>
      <TextContainer>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://frontporchforum.com/user/posts')
          }
        >
          <BodyText>
            To <BodySemibold>edit</BodySemibold> or{' '}
            <BodySemibold>delete</BodySemibold> your posting before publication,
            <Link>
              {' '}
              click here{' '}
              <IconEvil color='#d77400' name='external-link' size={18} />
            </Link>
          </BodyText>
        </TouchableOpacity>
      </TextContainer>
    </Container>
    <GrassContainer>
      <GrassBg />
      <Grass source={grassImage} />
      <BirdEatingBirdseed source={birdEatingBirdseed} />
      <BirdLetterbox source={birdLetterbox} />
      <GreyBird source={greyBird} />
    </GrassContainer>
  </Modal>
)

Success.propTypes = {
  onClose: PropTypes.func.isRequired
}
