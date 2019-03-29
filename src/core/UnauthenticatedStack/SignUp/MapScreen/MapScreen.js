import React from 'react'
import PropTypes from 'prop-types'
import MapView, { Marker, Polygon } from 'react-native-maps'

import { FullScreenWizard } from '@components/FullScreenWizard'
import { SimpleModal } from '@components/SimpleModal'
import { ForumDetails } from './ForumDetails'
import { profileTypes } from '@common/types/profileTypes'

import { ForumScrollView } from './styledComponents'

export class MapScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    areas: [],
    address: {},
    checkedAreas: {},
    modalOpen: false,
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    }
  }

  componentDidMount() {
    const areas = this.props.navigation.getParam('areas', [])
    const address = this.props.navigation.getParam('address', {})

    let minLat = Number.MAX_SAFE_INTEGER
    let minLong = Number.MAX_SAFE_INTEGER
    let maxLat = -Number.MAX_SAFE_INTEGER
    let maxLong = -Number.MAX_SAFE_INTEGER

    for (const area of areas) {
      for (const coordinate of area.coordinates) {
        const lat = parseFloat(coordinate[0])
        const long = parseFloat(coordinate[1])

        minLat = Math.min(lat, minLat)
        minLong = Math.min(long, minLong)

        maxLat = Math.max(lat, maxLat)
        maxLong = Math.max(long, maxLong)
      }
    }

    if (areas.length === 1) {
      this.setState({ checkedAreas: { [areas[0].id]: true } })
    } else {
      this.setState({ modalOpen: true })
    }

    const latitudeDelta = maxLat - minLat
    const longitudeDelta = maxLong - minLong

    this.setState({
      areas,
      address,
      region: {
        latitude: minLat - latitudeDelta / 3,
        longitude: minLong + longitudeDelta / 2,
        latitudeDelta: latitudeDelta * 3,
        longitudeDelta
      }
    })
  }

  toggleArea(checked, id) {
    const checkedAreas = { ...this.state.checkedAreas }
    checkedAreas[id] = checked

    this.setState({
      checkedAreas
    })
  }

  render() {
    const { navigation, newUser, setNewUserByKey } = this.props
    const { areas, address, region, checkedAreas } = this.state

    return (
      <FullScreenWizard
        onBackPress={() => navigation.goBack()}
        steps={4}
        currentStep={3}
        nextLabel={areas.length > 1 ? 'Confirm your forum' : 'Continue'}
        withPadding={false}
        onNextPress={() => {
          setNewUserByKey({ areas: Object.keys(checkedAreas) })
          if (newUser.profileType === profileTypes.GOVERNMENT) {
            navigation.navigate('GovernmentInfo')
          }
          // TODO navigate for Business & neighbor
        }}
        nextWidth='auto'
        nextDisabled={
          areas.length > 1 && Object.keys(checkedAreas).length === 0
        }
      >
        {region.latitudeDelta > 0 && region.longitudeDelta > 0 && (
          <MapView
            region={this.state.region}
            style={{ flex: 1 }}
            rotateEnabled={false}
            scrollEnabled={false}
            pitchEnabled={false}
            zoomEnabled={false}
            zoomTapEnabled={false}
          >
            {areas.map(area => (
              <Polygon
                key={area.id}
                coordinates={area.coordinates.map(coordinate => ({
                  latitude: parseFloat(coordinate[0]),
                  longitude: parseFloat(coordinate[1])
                }))}
                strokeColor='#ff0000'
                fillColor={
                  this.state.checkedAreas[area.id]
                    ? 'rgba(234, 98, 98, 0.8)'
                    : 'rgba(234, 98, 98, 0.5)'
                }
                onPress={() =>
                  this.toggleArea(!this.state.checkedAreas[area.id], area.id)
                }
                tappable={areas.length > 1}
              />
            ))}
            {Boolean(address.lat) && Boolean(address.lng) && (
              <Marker
                coordinate={{
                  latitude: parseFloat(address.lat),
                  longitude: parseFloat(address.lng)
                }}
              />
            )}
          </MapView>
        )}
        <ForumScrollView
          horizontal
          contentContainerStyle={{
            padding: 10,
            paddingLeft: 50,
            paddingBottom: 30
          }}
        >
          {areas.map(area => (
            <ForumDetails
              key={area.id}
              area={area}
              checkboxValue={this.state.checkedAreas[area.id]}
              hasForumCheckbox={areas.length > 1}
              onPress={value => this.toggleArea(value, area.id)}
            />
          ))}
        </ForumScrollView>
        <SimpleModal
          dark
          open={this.state.modalOpen}
          onClose={() => this.setState({ modalOpen: false })}
        >
          Your address falls near a boundary between two or more local forums.
          Please select which forum(s) you would like to join.
        </SimpleModal>
      </FullScreenWizard>
    )
  }
}

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  newUser: PropTypes.object.isRequired,
  setNewUserByKey: PropTypes.func.isRequired
}
