import { validateEmail } from '../validations'

describe('LoginFields validations', () => {
  test('it validates emails', () => {
    expect(validateEmail('foo@fpf.com')).toEqual(true)
    expect(validateEmail('foo-bar@fpf.com')).toEqual(true)
    expect(validateEmail('foo_bar@fpf.com')).toEqual(true)
    expect(validateEmail('foo.bar@fpf.com')).toEqual(true)
    expect(validateEmail('foo@f-p-f.com')).toEqual(true)
    expect(validateEmail('foo+bar@fpf.com')).toEqual(true)
    expect(validateEmail('foo@fpf.com')).toEqual(true)
    expect(validateEmail('foo@f.pf')).toEqual(true)
    expect(validateEmail('foo@front.porch.forum.com')).toEqual(true)

    expect(validateEmail('foo')).toEqual(false)
    expect(validateEmail('foo@')).toEqual(false)
    expect(validateEmail('foo@fpf.com.')).toEqual(false)
    expect(validateEmail('.@fpf.com')).toEqual(false)
    expect(validateEmail('foo bar@fpf.com')).toEqual(false)
    expect(validateEmail('foo@fpf.c')).toEqual(false)
    expect(validateEmail('fpf.com')).toEqual(false)
    expect(validateEmail('!!@@##$$')).toEqual(false)
  })
})
