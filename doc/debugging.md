# Debugging

## React Native code

1. Bring up the React Native Dev Menu (shake device, or press "d" in the running console)
2. Click Open DevTools, which should open Chrome dev tools

## WebView code

Instructions to debug code (JavaScript, HTML, CSS) that runs inside a WebView.

For more info:
https://github.com/react-native-webview/react-native-webview/blob/master/docs/Debugging.md
Note that the `webviewDebuggingEnabled` prop is enabled outside of production.

### iOS WebView code
1. Launch the app in the simulator or on a device
   - If on device you must enable Web Inspector in your device settings:
     Settings -> Safari -> Advanced -> Web Inspector
2. Open Safari
3. In Safari: Develop menu -> [device name] -> [app name] -> [url - title]

### Android WebView code

1. Launch the app in the emulator or on a device
   - If on device you must enable USB debugging in your device settings:
     Settings -> System -> About Phone -> Developer options -> enable USB debugging
2. Open chrome://inspect/#devices on Chrome
3. Select your device on the left and select "Inspect" on the WebView contents
   you'd like to inspect
