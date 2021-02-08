# Front Porch Forum Mobile App

## OS Support

- iOS 11 - 14
- Android 7 - 11 (API 24 - 30)

(Last updated 1/15/21)

## Setup

### Xcode and Android Studio

First you'll need to setup iOS & Android dev tools. Install
[XCode](https://itunes.apple.com/ca/app/xcode/id497799835?mt=12) and
[Android Studio](https://developer.android.com/studio).

Once XCode is installed, be sure to install xcode command line tools `xcode-select --install`.

Launch Android studio, and install the latest SDK version & SDK Tools. We're using SDK 28 for this app.

Add the `ANDROID_HOME` variable to your .bash_profile or .bashrc

```
export ANDROID_HOME=$HOME/Library/Android/sdk
```

### Tools

Install homebrew if not already installed.

Install the following tools:

```
brew install yarn
brew install node
brew install watchman
sudo gem install cocoapods
```

If you have already installed Node on your system, make sure it is Node 8.3 or newer.

Watchman is a tool by Facebook for watching changes in the filesystem. It is
highly recommended you install it for better performance.

Install npm packages:

```
yarn install --frozen-lockfile
```

Install pods (which are specified in `ios/Podfile`):

```
cd ios ; pod install ; cd ..
```

### Environment config

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
yarn ios --simulator="iPhone 5s (11.4)"
```

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


## Deploy

### Staging deployment

1. Merge `master` to `staging`
2. In [App Center](https://appcenter.ms/), open the iOS and Android FPF apps,
  and do the following for each
    - https://appcenter.ms/orgs/Front-Porch-Forum/apps/Front-Porch-Forum-Android
    - https://appcenter.ms/orgs/Front-Porch-Forum/apps/Front-Porch-Forum-iOS
3. Switch to the Build tab
4. Select the staging branch
5. Click the Build Now button and wait for the build to complete successfully,
  which takes around 10-15 minutes for each app
6. Switch to the Distribute tab
7. Click on the new release
8. Click the three dot icon, then Edit release
9. Enter release notes that specify what stories are included in this release,
  then save
10. People should be automatically notified of the new release based on
  distribution groups

### Production deployment
1. Update the version number in the following files and commit:
    - fpf-mobile/ios/FrontPorchForum/Info.plist
    - fpf-mobile/ios/FrontPorchForum-tvOS/Info.plist
    - fpf-mobile/ios/FrontPorchForum-tvOSTests/Info.plist
    - fpf-mobile/ios/FrontPorchForumTests/Info.plist
    - fpf-mobile/android/app/build.gradle
2. Merge `staging` to `production` (which will require a non-fast forward merge
  because the production branch includes details that can't be merged to staging)
3. Merge `staging` to `master`
4. In [App Center](https://appcenter.ms/), open the iOS and Android FPF apps,
  and do the following for each:
5. Switch to the Build tab
6. Select the production branch
7. Click the Build Now button and wait for the build to complete successfully
8. Click the Distribute button, then "Store", then the appropriate store, then Next
    - "Production (Google Play)" for Android
    - "Production (App Store)" for iOS
9. Enter release notes
10. Click the Distribute button.  After a few moments, you should see a success
  notification and a link to view the status, which should go from "processing"
  to "submitted".
11. Wait while the stores process the new releases, which may take a few hours
  to a few days.  Note that in iTunes Connect the build will take some time to
  be processed, and then the new app version will automatically be submitted
  for review.  Check the status on the developer site or the app page:
    - [Google Play Console](https://play.google.com/apps/publish/?account=7669883795652962257#AppDashboardPlace:p=com.frontporchforum&appid=4973842490929321153)
    - [Google Play Store](https://play.google.com/store/apps/details?id=com.frontporchforum)
    - [iTunes Connect](https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/ng/app/1458651656)
    - [iOS App Store](https://apps.apple.com/us/app/front-porch-forum/id1458651656)
12. Tag the release:

        `git tag -a v1.2.3 -m "1.2.3 release"`
        `git push --tags`

13. Update the Pivotal Tracker release story's release date and finish the release
14. Add the `released` label to stories in Pivotal Tracker that have the released
  version's label
15. Post release notes to Slack


## Xcode workspace

To open the app in Xcode, only open the workspace file at `ios/FrontPorchForum.xcworkspace`,
not the project file at `ios/FrontPorchForum.xcodeproj` (the latter won't correctly
build the cocoapods Pods project).

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

## Misc iOS tips

### Notifications

iOS Notifications may be pushed from the command line using the xcrun utility.

Save the following JSON to an `alert.json` file in the project's root directory:

```
{
  "aps" : {
    "alert" : {
      "title": "New Montpelier FPF issue available!",
      "body": "Testing... 1 2 3"
    },
    "badge": 1
  },
  "area_id": 448,
  "issue_id": 443650,
  "issue_number": 4923
}
```

Then, run `xcrun simctl push booted com.FrontPorchForum.FrontPorchForum alert.json`

(`com.FrontPorchForum.FrontPorchForum`) is our application bundle ID.

### Adding iOS devices & versions

If you need to test a specific device / iOS versions, e.g. ("iPhone 6 running iOS 12.4"):

1. Open XCode and select "Devices and Simulators" from the "Window" menu.
2. Select the "Simulator" tab.
3. Click the plus icon at the lower left corner.
4. Select "Download more simulator runtimes..." from the "OS Version" menu, and install the desired OS version.
5. Once downloaded, return to the "Simulator" tab and add the desired device/iOS version pair. You should now be able to boot it via a command like `yarn ios --simulator="iPhone 6 (12.4)"`.

### In app purchases

In app purchases for profile subscriptions are supported on iOS only (because
Apple required them for the original app submission).

Purchaseable products are configured through the App Store Connect website:
https://appstoreconnect.apple.com/apps/1458651656/appstore/addons?m=

However, the simulator does not connect to the app store, so debug only products
are also configured in `ios/Configuration.storekit`.  These products are only
shown in the simulator.
