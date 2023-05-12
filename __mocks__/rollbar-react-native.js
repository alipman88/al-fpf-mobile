module.exports = {
  Client: function Client() {
    this.setPerson = jest.fn()
    this.clearPerson = jest.fn()
    this.info = jest.fn()
  },
  Configuration: jest.fn(),
}
