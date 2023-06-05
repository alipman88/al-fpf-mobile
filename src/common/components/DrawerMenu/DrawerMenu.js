import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import bird1 from '@assets/images/onboarding/yellow-bird.png'
import bird2 from '@assets/images/onboarding/grey-bird.png'
import bird3 from '@assets/images/bird-eating-birdseed/bird-eating-birdseed.png'

import { Grass } from '@components/Grass'

import {
  Container,
  Header,
  ForumText,
  SafeAreaView,
  View,
  Birds,
} from './styledComponents'

export const DrawerMenu = ({
  areas,
  currentAreaId,
  currentProfile,
  profiles,
  setCurrentAreaId,
  setCurrentProfileId,
  setOpen,
}) => {
  const navigation = useNavigation()

  const birdies = (
    <Birds>
      {[bird1, bird2, bird3].map((bird, index) => (
        <Image source={bird} key={index} />
      ))}
    </Birds>
  )

  return (
    <View>
      <SafeAreaView>
        <Container>
          <ScrollView>
            <Header>Forums</Header>
            {areas.map((area) => (
              <TouchableOpacity
                key={area.name}
                onPress={() => {
                  if (
                    !currentProfile ||
                    !currentProfile.area_ids.includes(area.id)
                  ) {
                    const profile = profiles.find((profile) => {
                      return profile.area_ids.includes(area.id)
                    })

                    if (profile) {
                      setCurrentProfileId(profile.id)
                    }
                  }

                  setCurrentAreaId(area.id)
                  setOpen(false)
                  navigation.navigate('Forum')
                }}
              >
                <ForumText
                  active={area.id === currentAreaId}
                  access={area.access}
                >
                  {area.name}
                </ForumText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Container>
        <Grass height={90} content={birdies} />
      </SafeAreaView>
    </View>
  )
}

DrawerMenu.propTypes = {
  areas: PropTypes.array.isRequired,
  currentAreaId: PropTypes.number,
  currentProfile: PropTypes.object,
  profiles: PropTypes.array.isRequired,
  setCurrentAreaId: PropTypes.func.isRequired,
  setCurrentProfileId: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
}
