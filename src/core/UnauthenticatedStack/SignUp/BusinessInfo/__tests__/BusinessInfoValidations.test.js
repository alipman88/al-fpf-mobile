import { validateBusinessName } from '../validations'

describe('BusinessInfo validations', () => {
  test('it validates business name', () => {
    expect(validateBusinessName('test123!')).toEqual(true)
    expect(validateBusinessName('123!test')).toEqual(true)
    expect(validateBusinessName('123test!')).toEqual(true)

    expect(validateBusinessName('    ')).toEqual(false)
    expect(validateBusinessName('.')).toEqual(false)
  })
})
