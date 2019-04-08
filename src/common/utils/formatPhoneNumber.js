export const formatPhoneNumber = phoneNumber => {
  if (phoneNumber && phoneNumber.trim().length >= 10) {
    const num = phoneNumber
      .replace(/[^\w\s]/gi, '')
      .match(/(\d{3})(\d{3})(\d{4})(.*)?/)
    const newNum = num
      ? `${num[1]}-${num[2]}-${num[3]} ${num[4] ? num[4].trim() : ''}`.trim()
      : phoneNumber
    return newNum
  }
  return phoneNumber
}
