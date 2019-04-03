import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, TouchableOpacity, Image } from 'react-native'
import navigationService from '@common/utils/navigationService'

import flatten from 'lodash/flatten'
import keyBy from 'lodash/keyBy'
import uniqWith from 'lodash/uniqWith'

import bird1 from '@assets/images/onboarding/yellow-bird.png'
import bird2 from '@assets/images/onboarding/grey-bird.png'
import bird3 from '@assets/images/bird-eating-birdseed/bird-eating-birdseed.png'

import { Grass } from '@components/Grass'

import { DrawerContext } from '@app/context'
import {
  Container,
  Header,
  ForumText,
  SafeAreaView,
  View,
  Birds
} from './styledComponents'

export const DrawerMenu = ({
  areas,
  currentAreaId,
  currentProfile,
  profiles,
  setCurrentAreaId,
  setCurrentProfileId
}) => {
  const birdies = (
    <Birds>
      {[bird1, bird2, bird3].map((bird, index) => (
        <Image source={bird} key={index} />
      ))}
    </Birds>
  )

  // getting all area ids the user has in profiles as a key value pair
  const areaIds = keyBy(flatten(profiles.map(profile => profile.area_ids)))

  const areasToRender = uniqWith(
    areas.filter(area => areaIds[area.id]),
    (a, b) => a.name === b.name
  )
  areasToRender.sort((a, b) => a.name - b.name)

  return (
    <DrawerContext.Consumer>
      {({ setDrawerOpenState }) => (
        <View>
          <SafeAreaView>
            <Container>
              <ScrollView>
                <Header>Forums</Header>
                {areasToRender.map(area => (
                  <TouchableOpacity
                    key={area.name}
                    onPress={() => {
                      if (currentProfile.area_ids.indexOf(area.id) === -1) {
                        const profile = profiles.find(profile => {
                          if (profile.area_ids.indexOf(area.id) !== -1) {
                            return profile
                          }
                        })

                        if (profile) {
                          setCurrentProfileId(profile.id)
                        }
                      }
                      setCurrentAreaId(area.id)
                      setDrawerOpenState(false)
                      navigationService.navigate('Forum')
                    }}
                  >
                    <ForumText active={area.id === currentAreaId}>
                      {area.name}
                    </ForumText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Container>
            <Grass height={90} content={birdies} />
          </SafeAreaView>
        </View>
      )}
    </DrawerContext.Consumer>
  )
}

DrawerMenu.propTypes = {
  areas: PropTypes.array.isRequired,
  currentAreaId: PropTypes.number.isRequired,
  currentProfile: PropTypes.object.isRequired,
  profiles: PropTypes.array.isRequired,
  setCurrentAreaId: PropTypes.func.isRequired,
  setCurrentProfileId: PropTypes.func.isRequired
}
