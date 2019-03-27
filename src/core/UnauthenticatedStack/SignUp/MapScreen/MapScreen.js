import React from 'react'
import PropTypes from 'prop-types'
import MapView, { Marker, Polygon } from 'react-native-maps'

import { FullScreenWizard } from '@components/FullScreenWizard'
import { ForumDetails } from './ForumDetails'

import { ForumScrollView } from './styledComponents'

export class MapScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    areas: [],
    address: {},
    checkedAreas: {},
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    }
  }

  componentDidMount() {
    const areas = this.props.navigation.getParam('areas')
    const address = this.props.navigation.getParam('address')

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
    const { navigation } = this.props
    const { areas, address, region } = this.state

    return (
      <FullScreenWizard
        onBackPress={() => navigation.goBack()}
        steps={4}
        currentStep={3}
        nextLabel={areas.length > 1 ? 'Confirm your forum' : 'Continue'}
        withPadding={false}
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
                fillColor='rgba(234, 98, 98, 0.5)'
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
      </FullScreenWizard>
    )
  }
}

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}
