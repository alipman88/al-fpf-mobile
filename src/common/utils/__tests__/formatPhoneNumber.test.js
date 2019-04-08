import { formatPhoneNumber } from '../formatPhoneNumber'

describe('formatPhoneNumber', () => {
  test('it formats regular 10 digit numbers', () => {
    const formatted = formatPhoneNumber('4169671111')
    expect(formatted).toEqual('416-967-1111')
  })

  test('it allows for extension codes', () => {
    const formatted = formatPhoneNumber('4169671111 ex 666')
    expect(formatted).toEqual('416-967-1111 ex 666')
  })

  test('it allows for nothing', () => {
    const formatted = formatPhoneNumber('')
    expect(formatted).toEqual('')

    const formatted2 = formatPhoneNumber(null)
    expect(formatted2).toEqual(null)
  })

  test('it fails silently if you throw in nonsense', () => {
    const formatted = formatPhoneNumber('3334/.<44**777 extension 8888')
    expect(formatted).toEqual('3334/.<44**777 extension 8888')
  })
})
