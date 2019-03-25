import React from 'react'
import { shallow } from 'enzyme'
import MapView, { Polygon } from 'react-native-maps'

import { MapScreen } from '../MapScreen'
import { ForumDetails } from '../ForumDetails'

describe('MapScreen', () => {
  const defaultProps = {
    areas: [
      {
        id: 1,
        name: 'test',
        coordinates: [
          ['20.5', '-23.3'],
          ['20.56', '-23.0'],
          ['21.2', '-26.0'],
          ['20.5', '-23.3']
        ]
      }
    ]
  }

  test('sets region based on min & max values', () => {
    const wrapper = shallow(<MapScreen {...defaultProps} />)

    expect(wrapper.state()).toEqual({
      checkedAreas: {
        1: true
      },
      region: {
        latitude: 20.266666666666666,
        longitude: -24.5,
        latitudeDelta: 2.099999999999998, // darn floats
        longitudeDelta: 3
      }
    })
  })

  test('with coordinate data, MapView is rendered', () => {
    const wrapper = shallow(<MapScreen {...defaultProps} />)

    expect(wrapper.find(MapView).length).toEqual(1)
  })

  test('map has polygons & details for each area', () => {
    const wrapper = shallow(
      <MapScreen
        {...defaultProps}
        areas={defaultProps.areas.concat([
          {
            id: 2,
            name: 'test two',
            coordinates: [
              ['22.5', '-25.3'],
              ['22.56', '-25.0'],
              ['23.2', '-28.0'],
              ['22.5', '-25.3']
            ]
          }
        ])}
      />
    )

    expect(wrapper.find(Polygon).length).toEqual(2)
    expect(wrapper.find(ForumDetails).length).toEqual(2)
  })
})
