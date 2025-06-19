module.exports = {
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => children, // Render children directly
    Screen: ({ children }) => children, // Render children directly
  }),
}
