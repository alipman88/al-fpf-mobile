import { passwordValidation } from '../validations'

describe('BasicInfo validations', () => {
  test('it validates password to include letters, numbers and symbols', () => {
    expect(passwordValidation('test123!')).toEqual(true)
    expect(passwordValidation('123!test')).toEqual(true)
    expect(passwordValidation('123test!')).toEqual(true)

    expect(passwordValidation('123tests')).toEqual(false)
    expect(passwordValidation('tests!!!')).toEqual(false)
    expect(passwordValidation('12345678')).toEqual(false)
    expect(passwordValidation('abcdefgh')).toEqual(false)
    expect(passwordValidation('!!@@##$$')).toEqual(false)
  })
})
