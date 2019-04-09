import snakeCase from 'lodash/snakeCase'

export const snakeCaseData = data => {
  let newObj = {}
  Object.entries(data).forEach(([key, value]) => {
    newObj = { ...newObj, [snakeCase(key)]: value }
  })
  return newObj
}
