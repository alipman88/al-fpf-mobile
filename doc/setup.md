## OS Support

- iOS 15.1 - 18 -- see `ios/Podfile` and `ios/FrontPorchForum.xcodeproj/project.pbxproj`
- Android 9 - 15 (API 28 - 35) -- see `android/build.gradle`

(Last updated 1/7/25)

## Setup

Install homebrew if not already installed.

### Xcode

Install [XCode](https://itunes.apple.com/ca/app/xcode/id497799835?mt=12).

Once XCode is installed, be sure to install xcode command line tools `xcode-select --install`.

#### Cleaning Xcode derived data

Xcode caches various files to speed up the build process. Over time, these cached files can accumulate and lead to build errors. When encountering an iOS build error, try the following:

1. Close Xcode (if open)
2. Delete the contents of `~/Developer/Library/Xcode/DerivedData`.
3. Delete and reinstall pods (`cd ios; rm -rf Pods; pod install; cd ..`)

### Android Studio

For more information, see https://reactnative.dev/docs/environment-setup.

Install [Android Studio](https://developer.android.com/studio).

Install OpenJDK 17:

```
brew tap homebrew/cask-versions
brew install --cask zulu17
```

Launch Android studio. When asked to open a project, open fpf-mobile/android
(not the project's root directory) – this enables Android Studio's built-in tools (like
the Logcat debugger) to function.

Install the latest SDK version & SDK Tools.  See `android/build.gradle` for the
currently supported SDK versions.

Ensure JDK 17 is used if running the app from within Android Studio:
Android Studio > Preferences > Build, Execution, Deployment > Build Tools > Gradle > Gradle JDK

Add to your `.bash_profile` or `.bashrc`:
```
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

#### Troubleshooting Android Java runtime errors

Most Java errors will be encountered during compilation, and come with fairly
descriptive messages. Runtime errors are trickier to trace – typically the app
just crashes.

To view Java logs, open Android studio, and from your operating system's menu
bar, select "View" > "Tool Windows" > "Logcat".

### Tools

Install the following tools:

```
brew install yarn
brew install node@22
brew install watchman
sudo gem install cocoapods
```

If you have already installed Node on your system, make sure it matches the version
used in `fpf-mobile/.travis.yml`.

Watchman is a tool by Facebook for watching changes in the filesystem. It is
highly recommended you install it for better performance.

Install npm packages:

```
yarn install --immutable
```

Install pods (which are specified in `ios/Podfile`):

```
cd ios ; pod install ; cd ..
```

### Environment config

Copy `.env.example` as `.env` and populate it with values for:
- `API_KEY`
- `BASIC_AUTH_PASSWORD`
- `GOOGLE_MAPS_API_KEY`
- `ROLLBAR_API_KEY`
- `LOCAL_DEVICE_DEV_API_HOST` and `LOCAL_DEVICE_DEV_WEBSITE_HOST` for testing
  with a device on your network

Note that the Android emulator runs in its own network, which maps 10.0.2.2
to the host.  So for Android testing, `API_HOST` should likely be
http://10.0.2.2:3000/api/v1.

## Run

### Run on iOS

To run on iOS, simply use:

```
yarn ios
```

Or to select a different emulator than the default:

```
xcrun simctl list devices
yarn ios --simulator="iPhone 5s (11.4)"
```

Or to run on a connected (via USB cord) actual device (which might take 5 minutes
to build and install the first time):

```
npm install -g ios-deploy # first time only
yarn ios --device
```

### Run on Android

To run on android, you need to start up an emulator first.

Open android studio, and open the project for this app (this is just so you can access menus in android studio). Then look for the mobile phone icon near the top, AVD Manager. Use that to create an emulator. This may take some time to download images. Once the emulator is running you can run:

Or run an emulator from the command line:

```
emulator -list-avds
emulator @avd_name
```

Then:

```
yarn android
```