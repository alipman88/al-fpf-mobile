import React from 'react'
import PropTypes from 'prop-types'
import MapView, { Polygon } from 'react-native-maps'

import { FullScreenWizard } from '@components/FullScreenWizard'
import { ForumDetails } from './ForumDetails'

import { ForumScrollView } from './styledComponents'

export class MapScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    checkedAreas: {},
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    }
  }

  componentDidMount() {
    let minLat = Number.MAX_SAFE_INTEGER
    let minLong = Number.MAX_SAFE_INTEGER
    let maxLat = -Number.MAX_SAFE_INTEGER
    let maxLong = -Number.MAX_SAFE_INTEGER

    for (const area of this.props.areas) {
      for (const coordinate of area.coordinates) {
        const lat = parseFloat(coordinate[0])
        const long = parseFloat(coordinate[1])

        minLat = Math.min(lat, minLat)
        minLong = Math.min(long, minLong)

        maxLat = Math.max(lat, maxLat)
        maxLong = Math.max(long, maxLong)
      }
    }

    if (this.props.areas.length === 1) {
      this.setState({ checkedAreas: { [this.props.areas[0].id]: true } })
    }

    const latitudeDelta = maxLat - minLat
    const longitudeDelta = maxLong - minLong

    this.setState({
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
    const { areas } = this.props
    const { region } = this.state

    return (
      <FullScreenWizard
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
  areas: PropTypes.array.isRequired
}

// TODO: Delete once screen is connected
MapScreen.defaultProps = {
  areas: [
    {
      id: 1,
      name: 'Montpelier',
      coordinates: [
        ['44.2754625053638', '-72.5587006775838'],
        ['44.2777466879789', '-72.5571441650391'],
        ['44.2806655701753', '-72.5656414031982'],
        ['44.2881003833413', '-72.5630664825439'],
        ['44.2896363844741', '-72.5674867630005'],
        ['44.2963021639324', '-72.5618648529053'],
        ['44.2997729845374', '-72.5713920593262'],
        ['44.3099999618495', '-72.5644826889038'],
        ['44.3133164367269', '-72.5727653503418'],
        ['44.286318571705', '-72.5928497314453'],
        ['44.286318571705', '-72.5930213928223'],
        ['44.261426885504', '-72.6105964881061'],
        ['44.2614290023829', '-72.61061668396'],
        ['44.2586935797809', '-72.6125907897949'],
        ['44.2581710688527', '-72.6103591918945'],
        ['44.256695718815', '-72.6058959960938'],
        ['44.2544518863407', '-72.6056385040283'],
        ['44.2528842265491', '-72.6019048690796'],
        ['44.2512243059266', '-72.5998449325562'],
        ['44.246674653687', '-72.5952529907227'],
        ['44.2438463141091', '-72.5903177261353'],
        ['44.2350222505403', '-72.5532817840576'],
        ['44.2384659449938', '-72.5511360168457'],
        ['44.2400032435201', '-72.5496768951416'],
        ['44.2399724979432', '-72.5486469268799'],
        ['44.240956348435', '-72.5478744506836'],
        ['44.2419709270234', '-72.5468873977661'],
        ['44.2414482675114', '-72.5461578369141'],
        ['44.2412945432419', '-72.5445699691772'],
        ['44.2421553939779', '-72.5431108474731'],
        ['44.2424013490175', '-72.5404930114746'],
        ['44.2404336799097', '-72.53173828125'],
        ['44.247074299401', '-72.5267601013184'],
        ['44.2470877120551', '-72.5268146065631'],
        ['44.2493491540551', '-72.5248718261719'],
        ['44.2555584445627', '-72.5392484664916'],
        ['44.2613675336099', '-72.5360298156738'],
        ['44.2698188867933', '-72.5569725036621'],
        ['44.272615248831', '-72.5550842285156'],
        ['44.273475641152', '-72.5562429428101'],
        ['44.2746432962969', '-72.555513381958'],
        ['44.2754625053638', '-72.5587006775838']
      ],
      households: 1500,
      postings: 4342,
      members: 820,
      created_at: '2006-08-09'
    },
    {
      id: 76,
      name: 'Huntington',
      marketing_name: 'Huntington',
      slug: 'huntington',
      status: 'enabled',
      show_city_name: true,
      coordinates: [
        ['44.307996', '-73.02287'],
        ['44.362734', '-73.032465'],
        ['44.328739', '-72.879766'],
        ['44.308803', '-72.893685'],
        ['44.281642', '-72.910173'],
        ['44.275591', '-72.895334'],
        ['44.160449', '-72.952776'],
        ['44.293408', '-72.974232'],
        ['44.301006', '-73.020396'],
        ['44.307996', '-73.02287']
      ],
      households: 760,
      created_at: '2006-08-09',
      members: 1391,
      postings: 26502
    }
  ]
}
