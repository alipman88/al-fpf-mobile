import { areas } from '../slice'

describe('areas - slice', () => {
  test('areas returns an empty array', () => {
    const data = areas.reducer(undefined, {})
    expect(data).toEqual({
      areas: [],
      currentAreaId: 0,
      neighboringAreas: {}
    })
  })

  test('setAreas sets the array', () => {
    const state = areas.reducer(
      undefined,
      areas.actions.setAreas([
        { id: 1, neighbor_areas: [{ id: 2, name: 'neighbor' }] }
      ])
    )
    let data = areas.selectors.getAreas({
      main: {
        areas: state
      }
    })

    expect(data).toEqual([
      { id: 1, neighbor_areas: [{ id: 2, name: 'neighbor' }] }
    ])

    data = areas.selectors.getNeighboringAreas({
      main: {
        areas: state
      }
    })

    expect(data).toEqual({
      2: 'neighbor'
    })
  })

  test('setCurrentAreaId', () => {
    const state = areas.reducer(undefined, areas.actions.setCurrentAreaId(3))
    expect(
      areas.selectors.getCurrentAreaId({
        main: {
          areas: state
        }
      })
    ).toEqual(3)
  })
})
