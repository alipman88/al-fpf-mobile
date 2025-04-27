## Debugging

[http://facebook.github.io/react-native/docs/debugging](http://facebook.github.io/react-native/docs/debugging) has a lot of information on debugging, tailing logs, etc. You can use Chrome for debugging, but the react plugin for example doesnt work properly. I recommend installing [React Native Debugger](https://github.com/jhen0409/react-native-debugger) by doing:

```
brew cask install react-native-debugger
```

Then before running `yarn ios` or `yarn android`, start the node server yourself by running `yarn startdebug` then run the respected command to run on iOS or Android.

When you open the developer menu in the app, and click to start debugging, the React Native Debugger app will launch.

## iOS

### Build Errors

#### Cleaning Xcode derived data

Xcode caches various files to speed up the build process. Over time, these cached files can accumulate and lead to build errors. When encountering an iOS build error, try the following:

1. Close Xcode (if open)
2. Delete the contents of `~/Library/Developer/Xcode/DerivedData`.
3. Delete and reinstall pods (`cd ios; rm -rf Pods; pod install; cd ..`)

## Android

### Build Errors

If the app errors during build when running `yarn android`, first try increasing the Internal Storage and SD Card Storage settings to at least 4098 MB. Next, try setting your system's Java version to 11 or later.

### Runtime Errors

#### Troubleshooting Android Java runtime errors

Most Java errors will be encountered during compilation, and come with fairly
descriptive messages. Runtime errors are trickier to trace – typically the app
just crashes.

To view Java logs, open Android studio, and from your operating system's menu
bar, select "View" > "Tool Windows" > "Logcat".