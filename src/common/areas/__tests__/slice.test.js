import { areas } from '../slice'

describe('areas - slice', () => {
  test('areas returns an empty array', () => {
    const data = areas.reducer(undefined, {})
    expect(data).toEqual({
      areas: [],
      currentAreaId: 0,
      loading: false,
      neighboringAreas: {}
    })
  })

  test('setLoading sets the loading state', () => {
    let state = areas.reducer(undefined, areas.actions.setLoading(true))

    const data = areas.selectors.getLoading({
      main: {
        areas: state
      }
    })

    expect(data).toEqual(true)
  })

  test('setAreas sets the array', () => {
    let state = areas.reducer(undefined, areas.actions.setLoading(true))

    state = areas.reducer(
      state,
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

    data = areas.selectors.getLoading({
      main: {
        areas: state
      }
    })

    expect(data).toEqual(false)
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

  test('getFullAreasList', () => {
    const state = areas.reducer(
      undefined,
      areas.actions.setAreas([
        { id: 1, name: 'zzzz', neighbor_areas: [{ id: 2, name: 'neighbor' }] }
      ])
    )

    const data = areas.selectors.getFullAreasList({
      main: {
        areas: state
      }
    })

    expect(data).toEqual([{ id: 2, name: 'neighbor' }, { id: 1, name: 'zzzz' }])
  })
})
