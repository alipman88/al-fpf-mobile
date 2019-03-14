import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, TouchableOpacity } from 'react-native'

import { DrawerContext } from '@app/context'
import {
  Container,
  Header,
  ForumText,
  SafeAreaView,
  View
} from './styledComponents'

export const DrawerMenu = ({
  areas,
  currentAreaId,
  currentProfile,
  profiles,
  setCurrentAreaId,
  setCurrentProfileId
}) => {
  return (
    <DrawerContext.Consumer>
      {({ setDrawerOpenState }) => (
        <View>
          <SafeAreaView>
            <Container>
              <ScrollView>
                <Header>Forums</Header>
                {areas.map(area => (
                  <TouchableOpacity
                    key={area.name}
                    onPress={() => {
                      if (currentProfile.area_ids.indexOf(area.id) === -1) {
                        const profile = profiles.find(profile => {
                          if (profile.area_ids.indexOf(area.id) !== -1) {
                            return profile
                          }
                          return false
                        })

                        setCurrentProfileId(profile.id)
                      }
                      setCurrentAreaId(area.id)
                      setDrawerOpenState(false)
                    }}
                  >
                    <ForumText active={area.id === currentAreaId}>
                      {area.name}
                    </ForumText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Container>
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
