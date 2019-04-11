import { passwordValidation, validateName } from '../validations'

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

  test('it only allows letters in first and last name', () => {
    expect(validateName('Timmy')).toEqual(true)
    expect(validateName('Timmy123')).toEqual(false)
    expect(validateName('Timmy!$%')).toEqual(false)
  })
})
