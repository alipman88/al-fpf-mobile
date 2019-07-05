# Front Porch Forum Mobile App

## Setup

### Native Tools Setup

First you'll need to setup iOS & Android dev tools. Install [XCode](https://itunes.apple.com/ca/app/xcode/id497799835?mt=12) and [Android Studio](https://developer.android.com/studio)

Once XCode is installed, be sure to install xcode command line tools `xcode-select --install`.

Launch Android studio, and install the latest SDK version & SDK Tools. We're using SDK 28 for this app.

Add the `ANDROID_HOME` variable to your .bash_profile or .bashrc

```
export ANDROID_HOME=$HOME/Library/Android/sdk
```

### JS tools

Install watchman so the node server that delivers our JS code can work.

```
brew install watchman
```

Then install the node dependencies using yarn.

```
yarn install
```

Copy `.env.example` as `.env` and populate it with values.

Note that the Android emulator runs in its own network, which maps 10.0.2.2
to the host.  So for Android testing, `API_HOST` should likely be
http://10.0.2.2:3000/api/v1.

## Run

To run on iOS, simply use:

```
yarn ios
```

Or to select a different emulator than the default:

```
xcrun simctl list devices
yarn ios --simulator="iPhone 5s"
```

To run on android, you need to start up an emulator first.

Open android studio, and open the project for this app (this is just so you can access menus in android studio). Then look for the mobile phone icon near the top, AVD Manager. Use that to create an emulator. This may take some time to download images. Once the emulator is running you can run:

```
yarn android
```

## Debugging

[http://facebook.github.io/react-native/docs/debugging](http://facebook.github.io/react-native/docs/debugging) has a lot of information on debugging, tailing logs, etc. You can use Chrome for debugging, but the react plugin for example doesnt work properly. I recommend installing [React Native Debugger](https://github.com/jhen0409/react-native-debugger) by doing:

```
brew cask install react-native-debugger
```

Then before running `yarn ios` or `yarn android`, start the node server yourself by running `yarn startdebug` then run the respected command to run on iOS or Android.

When you open the developer menu in the app, and click to start debugging, the React Native Debugger app will launch.

### Hot Reloading

To enable hot reloading, press Cmd-D (for iOS) or Cmd-M (for Android) in the simulator to open the debug menu, then select "Enable Hot Reloading".

https://facebook.github.io/react-native/docs/debugging

## Redux

Redux boilerplate handled by using [https://redux-starter-kit.js.org/](https://redux-starter-kit.js.org/)

## Linting & Prettier

This project uses ESLint & prettier. The project has the necessary dependencies, but you can also configure your editor to leverage the eslint config & to use prettier formatting on save

Try to avoid using default exports. While default exports can be useful, across a project it can be tricky to know what exports as default and what does not. Use named exports instead to keep this simple.

## Styling

We're using [Styled Components](https://www.styled-components.com/) to do component styling. Since React Native styling is not cascading, it means that to apply `font-family: Helvetica` for example, every text node that needs to have that font, needs to declare that style. It does not get inherited from the parent. To get around the duplication, one can use https://www.styled-components.com/docs/basics#extending-styles to create a component with a base style, then extend it as needed for different sizes & colours.
