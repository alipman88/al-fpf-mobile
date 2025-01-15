import { api } from '@fpf/common/api'
import {
  passwordValidation,
  validateFirstName,
  validateLastName,
  validateEmailAvailability,
} from '../validations'

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

  test('it allows correct edge cases in first name', () => {
    expect(validateFirstName('Timmy')).toEqual(true)
    expect(validateFirstName('Timmy123')).toEqual(false)
    expect(validateFirstName('Timmy!$%')).toEqual(false)

    expect(validateFirstName('A')).toEqual(true)
    expect(validateFirstName('jean-claude')).toEqual(true)
    expect(validateFirstName("O'malley")).toEqual(true)
    expect(validateFirstName("'malley")).toEqual(true)
    expect(validateFirstName(' A ')).toEqual(true)
    expect(validateFirstName(' A and andrew')).toEqual(true)
    expect(validateFirstName('.')).toEqual(false)

    const validChars = ['.', "'", '-', ',', '(', ')', '"', '/', '&', 'é', 'ö']
    validChars.forEach((char) => {
      expect(validateFirstName(`a${char}`)).toEqual(true)
    })

    const invalidChars = [
      '~',
      '!',
      '@',
      '#',
      '$',
      '%',
      '^',
      '*',
      '_',
      '+',
      '?',
      '=',
      '{',
      '}',
      '[',
      ']',
      ':',
      ';',
      '<',
      '>',
      '|',
    ]
    invalidChars.forEach((char) => {
      expect(validateFirstName(`a${char}`)).toEqual(false)
    })
  })

  test('it allows correct edge cases in last name', () => {
    expect(validateLastName('Timmy')).toEqual(true)
    expect(validateLastName('Timmy123')).toEqual(false)
    expect(validateLastName('Timmy!$%')).toEqual(false)

    expect(validateLastName('bc')).toEqual(true)
    expect(validateLastName('van-damme, jr.')).toEqual(true)
    expect(validateLastName("O'malley")).toEqual(true)
    expect(validateLastName("'malley")).toEqual(true)
    expect(validateLastName(' Bc ')).toEqual(true)
    expect(validateLastName('b.')).toEqual(false)

    const validChars = ['.', "'", '-', ',', '(', ')', '"', '/', '&', 'é', 'ö']
    validChars.forEach((char) => {
      expect(validateLastName(`bc${char}`)).toEqual(true)
    })

    const invalidChars = [
      '~',
      '!',
      '@',
      '#',
      '$',
      '%',
      '^',
      '*',
      '_',
      '+',
      '?',
      '=',
      '{',
      '}',
      '[',
      ']',
      ':',
      ';',
      '<',
      '>',
      '|',
    ]
    invalidChars.forEach((char) => {
      expect(validateLastName(`bc${char}`)).toEqual(false)
    })
  })

  describe('validateEmailAvailability', () => {
    test('validates by calling check_user_email_availability', async () => {
      const email = 'foo@bar.com'
      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => {
        return Promise.resolve({ data: { available: true } })
      })

      await expect(validateEmailAvailability(email)).resolves.toBe(true)
      expect(api.get).toHaveBeenCalledWith('/check_user_email_availability', {
        params: { email: email },
      })

      getSpy.mockRestore()
    })

    test('handles not available response', async () => {
      const email = 'foo@bar.com'
      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => {
        return Promise.resolve({ data: { available: false } })
      })

      await expect(validateEmailAvailability(email)).resolves.toBe(false)
      expect(api.get).toHaveBeenCalledWith('/check_user_email_availability', {
        params: { email: email },
      })

      getSpy.mockRestore()
    })

    test('validates using a cache', async () => {
      const email = 'foo@bar.com'
      const email2 = 'baz@bar.com'
      const getSpy = jest.spyOn(api, 'get').mockImplementation(() => {
        return Promise.resolve({ data: { available: true } })
      })

      const thisArg = { options: { context: {} } }

      await expect(
        validateEmailAvailability.call(thisArg, email),
      ).resolves.toBe(true)
      await expect(validateEmailAvailability.call(thisArg, email)).toBe(true)
      await expect(
        validateEmailAvailability.call(thisArg, email2),
      ).resolves.toBe(true)
      await expect(validateEmailAvailability.call(thisArg, email2)).toBe(true)

      expect(api.get).toHaveBeenCalledTimes(2)

      expect(api.get).toHaveBeenNthCalledWith(
        1,
        '/check_user_email_availability',
        {
          params: { email: email },
        },
      )

      expect(api.get).toHaveBeenNthCalledWith(
        2,
        '/check_user_email_availability',
        {
          params: { email: email2 },
        },
      )

      getSpy.mockRestore()
    })
  })
})
