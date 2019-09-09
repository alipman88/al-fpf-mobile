module.exports = {
  Client: function Client() {
    this.setPerson = jest.fn()
    this.clearPerson = jest.fn()
  },
  Configuration: jest.fn()
}
