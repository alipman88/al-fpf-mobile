import { areas } from '../slice'

describe('areas - slice', () => {
  test('areas returns an empty array', () => {
    const data = areas.reducer(undefined, {})
    expect(data).toEqual({
      areas: []
    })
  })

  test('setAreas sets the array', () => {
    const state = areas.reducer(undefined, areas.actions.setAreas([{ id: 1 }]))
    const data = areas.selectors.getAreas({
      main: {
        areas: state
      }
    })

    expect(data).toEqual([{ id: 1 }])
  })
})
