import React from 'react'
import { shallow } from 'enzyme'
import MapView, { Polygon, Marker } from 'react-native-maps'

import { MapScreen } from '../MapScreen'
import { ForumDetails } from '../ForumDetails'
import { FullScreenWizard } from '@components/FullScreenWizard'

describe('MapScreen', () => {
  const defaultProps = {
    navigation: {
      getParam: key => {
        const data = {
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
          ],
          address: {
            lat: '21.32',
            lng: '-24.3'
          }
        }
        return data[key]
      }
    },
    setNewUserByKey: jest.fn()
  }

  afterEach(() => {
    defaultProps.setNewUserByKey.mockReset()
  })

  test('sets region based on min & max values, as well as data from params', () => {
    const wrapper = shallow(<MapScreen {...defaultProps} />)

    expect(wrapper.state()).toEqual({
      checkedAreas: {
        1: true
      },
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
      ],
      address: {
        lat: '21.32',
        lng: '-24.3'
      },
      modalOpen: false,
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

  test('submit button sets the checkedAreas', () => {
    const wrapper = shallow(<MapScreen {...defaultProps} />)
    wrapper.setState({ checkedAreas: [1, 2] })
    wrapper
      .find(FullScreenWizard)
      .props()
      .onNextPress()
    expect(defaultProps.setNewUserByKey).toHaveBeenCalled()
  })

  test('map has polygons & details for each area', () => {
    const wrapper = shallow(
      <MapScreen
        navigation={{
          getParam: key => {
            const data = {
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
                },
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
              ],
              address: {
                lat: '21.32',
                lng: '-24.3'
              }
            }
            return data[key]
          }
        }}
      />
    )

    expect(wrapper.state().modalOpen).toEqual(true)

    expect(wrapper.find(Polygon).length).toEqual(2)
    expect(wrapper.find(ForumDetails).length).toEqual(2)
    expect(wrapper.find(Marker).length).toEqual(1)
  })
})
