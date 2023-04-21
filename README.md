# Front Porch Forum Mobile App

## OS Support

- iOS 12 - 16
- Android 8 - 13 (API 26 - 33) -- see `android/build.gradle`

(Last updated 4/20/23)

## Setup

Install homebrew if not already installed.

### Xcode

Install [XCode](https://itunes.apple.com/ca/app/xcode/id497799835?mt=12).

Once XCode is installed, be sure to install xcode command line tools `xcode-select --install`.

### Android Studio

For more information, see https://reactnative.dev/docs/environment-setup.

Install [Android Studio](https://developer.android.com/studio).

Install OpenJDK 11:

```
brew tap homebrew/cask-versions
brew install --cask zulu11
```

Launch Android studio, and install the latest SDK version & SDK Tools.  See
`android/build.gradle` for the currently supported SDK versions.

Ensure JDK 11 is used if running the app from within Android Studio:
Android Studio > Preferences > Build, Execution, Deployment > Build Tools > Gradle > Gradle JDK

Add to your `.bash_profile` or `.bashrc`:
```
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

### Tools

Install the following tools:

```
brew install yarn
brew install node
brew install watchman
sudo gem install cocoapods
```

If you have already installed Node on your system, make sure it matches the version
used in `fpf-mobile/.travis.yml`.

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
    - `fpf-mobile/ios/FrontPorchForum/Info.plist`
    - `fpf-mobile/ios/FrontPorchForum-tvOS/Info.plist`
    - `fpf-mobile/ios/FrontPorchForum-tvOSTests/Info.plist`
    - `fpf-mobile/ios/FrontPorchForumTests/Info.plist`
    - `fpf-mobile/android/app/build.gradle`
2. Merge `staging` to `production` (which will require a non-fast forward merge
  because the production branch includes details that can't be merged to staging)
3. Merge `staging` to `master` (if it's not already merged, which it should be)
4. In [App Center](https://appcenter.ms/), open the iOS and Android FPF apps,
  and do the following for each:
  - Switch to the Build tab
  - Select the production branch
  - Click on the wrench icon, update the release notes, and click Save.
  - If the build didn't start automatically (it should) or if it fails (it might),
    click the Build Now button
  - Wait for both the iOS and Android builds to complete successfully
5. If the build wasn't automatically sent to the app stores (it should be), click
  the Distribute button, then "Store", then the appropriate store, then Next
    - "Production (Google Play)" for Android
    - "Production (App Store)" for iOS
  After a few moments, you should see a success notification and a link to view
  the status, which should go from "processing" to "submitted".
6. If the iOS build fails store distribution due to an authentication problem,
  go to Distribute -> Stores -> and then click the "Reconnect" button.  Note the
  connection is made through the tech-admin@frontporchforum.com Apple ID; the
  credentials for that account are stored in 1Password, and there's a separate
  app-specific Apple password used by App Center to connect to Apple also stored
  in 1Password under "Apple AppCenter: Tech-Admin".
7. For the iOS build:
  - Go to [App Store Connect](https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/ng/app/1458651656)
  - Ensure that the new version is shown in the "Prepare for Submission" status
  - Enter text into the "What's New in This Version" field and click Save
  - Wait a few hours until the new build appears in the "Build" table (you might
    receive an email with the subject "Version x.y.z... has completed processing")
  - If status is "Missing Compliance", click "Manage" and in the modal titled
    "Export Compliance Information" select "None of the algorithms mentioned above"
  - Click "Add for Review"
  - Click "Submit to App Review"
  - Wait for a few days until you receive a review sucessfully completed email
8. For the Android build:
  - Go to [Google Play Console](https://play.google.com/console/u/0/developers/7669883795652962257/app/4973842490929321153/releases/overview) -> "Releases overview"
  - Ensure that the new version is shown in the "Latest releases" table with a
    release status of "Available on Google Play".  This may take a few hours.
9. Tag the release:

        git tag -a v1.2.3 -m "1.2.3 release"
        git push --tags

10. Update the Pivotal Tracker release story's release date and finish the release
11. Add the `released` label to stories in Pivotal Tracker that have the released version's label
12. Post release notes to Slack

Stores:
- [iOS App Store](https://apps.apple.com/us/app/front-porch-forum/id1458651656)
- [Google Play Store](https://play.google.com/store/apps/details?id=com.frontporchforum)

Installed version reports:
- [iOS active devices by app version](https://appstoreconnect.apple.com/analytics/app/d90/1458651656/metrics?annotationsVisible=true&chartType=singleaxis&groupDimensionKey=appVersion&measureKey=activeDevices&zoomType=week)
- [Android active devices by app version](https://play.google.com/console/u/0/developers/7669883795652962257/app/4973842490929321153/statistics?metrics=ACTIVE_DEVICES-ALL-UNIQUE-PER_INTERVAL-DAY&dimension=APP_VERSION&dimensionValues=239%2C232%2C156%2C198%2C181%2C116%2C151%2C145&dateRange=2022_9_24-2023_3_22&tab=APP_STATISTICS&ctpMetric=DAU_MAU-ACQUISITION_UNSPECIFIED-COUNT_UNSPECIFIED-CALCULATION_UNSPECIFIED-DAY&ctpDateRange=2023_2_21-2023_3_22&ctpDimension=COUNTRY&ctpDimensionValue=OVERALL&ctpPeersetKey=3%3A2689e48fc22c04ea)

### App Center configuration

#### Build configuration

App Center has access to our GitHub repository through tech@frontporchforum.com.

Each branch that can be built needs to be configured individually.  Config
setting details:

- `Build Android App Bundle`: on for Android production branch
- `Automatically increment version code`: on
- `Environment variables`: on (see below)
- `Sign builds`: on
  - For iOS, configure:
    - `Provisioning profile`: upload the "App Store" provisioning file,
      downloaded from https://developer.apple.com/account/resources/profiles/list
    - `Certificate`: upload the .p12 signing certificate file, downloaded from
      the 1Password Tech Team vault item "Apple iOS p12 Certificate"
    - `Certificate password`: see 1Password item "Apple iOS p12 Certificate Password"
  - For Android, configure:
    - `Keystore file`: upload the .keystore file, downloaded from the 1Password
      Tech Team vault item "fpf_android.keystore"
    - `Keystore password`: see 1Password item "fpf_android.keystore creds"
    - `Key alias`: "fpf_android"
    - `Key password`: see 1Password item "fpf_android.keystore creds" (same password
      as for "Keystore password" above)
- `Test on a real device`: on
- `Distribute builds`: on
  - For the staging branch, choose "Groups" and select the "QA" group
  - For the production branch, choose "Store" and select the "Production" store

The following environment variables should be configured for each branch.  Make
sure to lock any variables that store sensitive data.

- `API_HOST`: URL for FPF API, e.g. https://frontporchforum.com/api/v1
- `API_KEY`: FPF key, currently stored in `FPF_API_KEY` env var
- `BUILD_PLATFORM`: React platform, e.g. "ios" or "android"
- `ENVIRONMENT`: Rails environment name, e.g. "production"
- `GOOGLE_MAPS_API_KEY`: "mobile embed maps API key" credential configured for the
  "fpf-webapp" project at https://console.cloud.google.com/apis/credentials?project=rare-citadel-197119
- `JAVA_HOME`: sets the Java version for Android (run by App Center for the build).
  Currently we use "$(JAVA_HOME_11_X64)".  Not required for the iOS app.
- `ROLLBAR_API_KEY`: "write" token configured at https://rollbar.com/settings/accounts/FrontPorchForum/access_tokens/
- `ROLLBAR_SERVER_KEY`: same as `ROLLBAR_API_KEY`
- `WEBSITE_HOST`: URL for FPF root, e.g. https://frontporchforum.com
- `NO_FLIPPER`: "1" to disable flipper since it has a large performance impact on build time

For the staging branch, also configure the following environment variables with
production and staging2 values.  Doing so allows the staging build of the app
to optionally connected to the production and staging2 stacks.

- `PRODUCTION_API_HOST`
- `PRODUCTION_API_KEY`
- `PRODUCTION_ENVIRONMENT`
- `PRODUCTION_GOOGLE_MAPS_API_KEY`
- `PRODUCTION_ROLLBAR_API_KEY`
- `PRODUCTION_WEBSITE_HOST`
- `STAGING2_API_HOST`
- `STAGING2_API_KEY`
- `STAGING2_ENVIRONMENT`
- `STAGING2_GOOGLE_MAPS_API_KEY`
- `STAGING2_ROLLBAR_API_KEY`
- `STAGING2_WEBSITE_HOST`

#### Store configuration

App Center also needs to be configured to connect to Apple:
https://appcenter.ms/settings/accounts.

It's currently configured to use the tech-admin@frontporchforum.com account with
an app-specific password (stored in 1Password under "Apple / AppCenter password
for tech-admin@frontporchforum.com"):

- https://appleid.apple.com/account/manage
- https://support.apple.com/en-us/HT204397

Then the production App Store can be connected:
https://appcenter.ms/orgs/Front-Porch-Forum/apps/Front-Porch-Forum-iOS/distribute/distribution-stores


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

## Misc Android tips

If the app errors during build when running `yarn android`, first try increasing the Internal Storage and SD Card Storage settings to at least 4098 MB. Next, try setting your system's Java version to 11 or later.

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

## Testing

Testing resources:

- https://callstack.github.io/react-native-testing-library/docs/api-queries
- https://legacy.reactjs.org/docs/test-renderer.html
- https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
- https://github.com/testing-library/jest-native
