# Front Porch Forum Mobile App

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


## Deploy

### Staging deployment

1. Update the version number in the following files and commit:
    - `fpf-mobile/ios/FrontPorchForum/Info.plist`
    - `fpf-mobile/ios/FrontPorchForum-tvOS/Info.plist`
    - `fpf-mobile/ios/FrontPorchForum-tvOSTests/Info.plist`
    - `fpf-mobile/ios/FrontPorchForumTests/Info.plist`
    - `fpf-mobile/android/app/build.gradle`
2. Update the release notes in `release_notes.json` and commit (see for more info:
  https://docs.codemagic.io/yaml-notification/publish-release-notes/)
3. Merge `master` to `staging`
4. In [Codemagic](https://codemagic.io/apps), click "Start new build" which opens
  the "Specify build configuration" modal
5. Select the staging branch
6. Select "iOS Staging App" or "Android Staging App"
7. Click "Start new build"

TODO LATER: document how QA should access iOS and Android staging builds

### Production deployment

1. Double-check that the version number and release notes are up-to-date
2. Merge `staging` to `production` (which will require a non-fast forward merge
  because the production branch includes details that can't be merged to staging)
3. In [Codemagic](https://codemagic.io/apps), click "Start new build" which opens
  the "Specify build configuration" modal
4. Select the staging branch
5. Select "iOS Production App" or "Android Production App"
6. Click "Start new build"
7. For the iOS build, you may not need to do any of this, but in case it doesn't get
  automatically submitted for review:
  - Go to [App Store Connect](https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/ng/app/1458651656)
  - Ensure that the new version is shown in the "Prepare for Submission" status
  - Enter text into the "What's New in This Version" field and click Save
  - Potentially wait a few hours until the new build appears in the "Build" table (you might
    receive an email with the subject "Version x.y.z... has completed processing")
  - If status is "Missing Compliance", click "Manage" and in the modal titled
    "Export Compliance Information" select "None of the algorithms mentioned above"
  - Click "Add for Review"
  - Click "Submit to App Review"
  - Wait for a few days until you receive a review sucessfully completed email
8. For the Android build, you may not need to do any of this, but in case it doesn't get
  automatically submitted for review:
  - Go to [Google Play Console](https://play.google.com/console/u/0/developers/7669883795652962257/app/4973842490929321153/releases/overview) -> "Releases overview"
  - Ensure that the new version is shown in the "Latest releases" table with a
    release status of "Available on Google Play".  This may take a few hours.
9. Tag the release:

        git tag -a v1.2.3 -m "1.2.3 release"
        git push --tags

10. Move all the issues with the current version tag into the `Released` status
11. Update the [release notes google doc](https://docs.google.com/document/d/1lPN1-SK39X_PIaMrJmF0BbjYv6cCirBEdBiwAa2fcfg/edit)
    to set the current date and move the "Releases" header above the now-released notes,
    then create a new subheader for the next release under the "Upcoming" header
12. Post the release notes doc link the Slack #general channel

Stores:
- [iOS App Store](https://apps.apple.com/us/app/front-porch-forum/id1458651656)
- [Google Play Store](https://play.google.com/store/apps/details?id=com.frontporchforum)

Installed version reports:
- [iOS active devices by app version](https://appstoreconnect.apple.com/analytics/app/d90/1458651656/metrics?annotationsVisible=true&chartType=singleaxis&groupDimensionKey=appVersion&measureKey=activeDevices&zoomType=week)
- [Android active devices by app version](https://play.google.com/console/u/0/developers/7669883795652962257/app/4973842490929321153/statistics?metrics=ACTIVE_DEVICES-ALL-UNIQUE-PER_INTERVAL-DAY&dimension=APP_VERSION&dimensionValues=239%2C232%2C156%2C198%2C181%2C116%2C151%2C145&dateRange=2022_9_24-2023_3_22&tab=APP_STATISTICS&ctpMetric=DAU_MAU-ACQUISITION_UNSPECIFIED-COUNT_UNSPECIFIED-CALCULATION_UNSPECIFIED-DAY&ctpDateRange=2023_2_21-2023_3_22&ctpDimension=COUNTRY&ctpDimensionValue=OVERALL&ctpPeersetKey=3%3A2689e48fc22c04ea)

### Distribution build configuration

#### iOS certificate and profile

- List of certificates: https://developer.apple.com/account/resources/certificates/list
- List of profiles: https://developer.apple.com/account/resources/profiles/list

To generate a new iOS distribution certificate .p12 file:
1. Open Xcode
2. Go to Xcode > Settings and then the Accounts tab.
3. In the Team list, select Front Porch Forum and click "Manage Certificates".
4. In the popup, click the + icon and select the certificate type, either Development or Distribution.
   Use Distribution for staging and production builds.
5. Once the certificate has been generated, right click and select "Export Certificate".
6. Save the certificate with the password stored in 1Password at "Apple iOS distribution certificate p12".
7. Upload the .p12 certificate to 1Password at "Apple iOS distribution certificate p12 Certificates.p12".

To update a provisioning profile:
1. Go to https://developer.apple.com/account/resources/profiles/list
2. Click on an existing App Store (not ad hoc) profile and click edit or add a new one
3. Select the latest distribution certificate and all relevant devices and save

#### Codemagic configuration

Most of the Codemagic configuration is stored at `codemagic.yaml`, and the rest is
configured via the following pages:
- https://codemagic.io/teams/67d9e2474633391b5ff2f59d
- https://codemagic.io/app/67d05c4d6f8452bacfd85e9c/settings

The following documentation was helpful for configuration:
- https://docs.codemagic.io/specs-macos/xcode-16-2/
- https://docs.codemagic.io/specs/versions-linux/#java-versions
- https://docs.codemagic.io/troubleshooting/common-android-issues/
- https://docs.codemagic.io/yaml-basic-configuration/configuring-environment-variables/
- https://docs.codemagic.io/yaml-basic-configuration/environment-variables/
- https://docs.codemagic.io/yaml-code-signing/signing-android/
- https://docs.codemagic.io/yaml-notification/publish-release-notes/
- https://docs.codemagic.io/yaml-publishing/app-store-connect/
- https://docs.codemagic.io/yaml-publishing/google-play/
- https://docs.codemagic.io/yaml-quick-start/building-a-native-android-app/
- https://docs.codemagic.io/yaml-quick-start/building-a-react-native-app/
- https://docs.codemagic.io/yaml-quick-start/codemagic-sample-projects/
- https://docs.codemagic.io/yaml-quick-start/migrating-from-app-center/
- https://github.com/codemagic-ci-cd/cli-tools/blob/master/docs/app-store-connect/get-latest-build-number.md
- https://github.com/orgs/codemagic-ci-cd/discussions/2359
- https://github.com/island-is/island.is/blob/main/codemagic.yaml

##### Team integrations

https://codemagic.io/teams/67d9e2474633391b5ff2f59d => Team integrations tab

The GitHub integration provides access to the code and is configured to use Noah's
`noahfpf` GH user account. LATER: update this to not use an individual's account.

The Apple Developer Portal integration provides access to Apple's Developer portal
and App Store Connect to get certificates, profiles, and manage builds. This
integration uses App Store Connect API key:
- App Store Connect API key name: `codemagic`
- Issuer ID: `530df0ab-49da-4d86-b055-8494f3a75419`
- Key ID: `XWLN296M83`
- API key: .p8 file stored in 1Password in an entry named "Codemagic Apple App Store Connect API key"
- Created at https://appstoreconnect.apple.com/access/integrations/api when logged in
  as tech-admin@frontporchforum.com

##### Code signing identities

https://codemagic.io/teams/67d9e2474633391b5ff2f59d => Code signing identities tab

iOS certificates:
- Certificate file: .p12 file stored in 1Password in an entry named "Apple iOS distribution certificate p12"
- Certificate password: see the same 1Password entry
- Reference name: Apple iOS distribution certificate p12 - 2024-12-16

iOS provisioning profiles:
- "Codemagic App Store profile 2024-12-17", added to Codemagic by clicking the "Fetch profiles button"

Android keystores:
- Keystore file: `fpf_android.keystore`, stored in 1Password in an entry named "fpf_android.keystore"
- Keystore password: stored in 1Password in an entry named "fpf_android.keystore creds"
- Key alias: `fpf_android` (called the "username" in the 1Password entry)
- Key password: same as keystore password
- Reference name: `keystore_reference`

##### Secure environment variables

https://codemagic.io/app/67d05c4d6f8452bacfd85e9c/settings => Environment variables tab

Secure environment variables should be stored using the `staging`, `production`,
and `google_credentials` variable group names.

Staging:
- `API_KEY`: FPF key, currently stored in `FPF_API_KEY` env var
- `BASIC_AUTH_PASSWORD`: staging-only basic auth password (see 1Password)
- `GOOGLE_MAPS_API_KEY`: "mobile embed maps API key" credential configured for the
  "fpf-webapp" project at https://console.cloud.google.com/apis/credentials?project=rare-citadel-197119
- `ROLLBAR_API_KEY`: "write" token configured at https://rollbar.com/settings/accounts/FrontPorchForum/access_tokens/
- `PRODUCTION_API_KEY`
- `PRODUCTION_GOOGLE_MAPS_API_KEY`
- `PRODUCTION_ROLLBAR_API_KEY`
- `STAGING2_API_KEY`
- `STAGING2_BASIC_AUTH_PASSWORD`
- `STAGING2_GOOGLE_MAPS_API_KEY`
- `STAGING2_ROLLBAR_API_KEY`

(The `PRODUCTION_*` and `STAGING2_*` environment variables allow the staging build
to connect to staging, staging2, or production).

Production:
- `API_KEY`:
- `GOOGLE_MAPS_API_KEY`
- `ROLLBAR_API_KEY`

Google Cloud Console / Google Play:
The `google_credentials` variable group is used to store a JSON file that provides
API authentication. It's stored under both of the following environment variable names
because Codemagic documentation is not clear on which is used (I think the former is
deprecated and the latter is newer, but I'm not certain):
- `GCLOUD_SERVICE_ACCOUNT_CREDENTIALS`
- `GOOGLE_PLAY_SERVICE_ACCOUNT_CREDENTIALS`
The JSON file was created from a Service Account here:
https://console.cloud.google.com/iam-admin/serviceaccounts/details/106817272144638381470?project=rare-citadel-197119
- email: codemagic@rare-citadel-197119.iam.gserviceaccount.com
- key file: rare-citadel-197119-ead52010395b.json
Documentation: https://docs.codemagic.io/yaml-publishing/google-play/

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

To send push notifications to a simulated development device through Firebase, log in to the mobile app and connect to staging.

Connect to a staging ECS container, boot the rails console, and run the following script, adjusting the user email and device per your login account and device.

```ruby
# initialize a Firebase connection 
fcm = PushNotifier.initialize_fcm_connection

# find the Firebase token for your app session
user = User.find_by(email: 'email@example.com')
app_session = user.app_sessions.find_by(device_name: 'Apple iPhone 15')
token = app_session.fcm_token

# pick some sent issue
issue = Area.find_by(name: 'New Trial').issues.sent.last

# build the notification content
payload = PushNotifier.params_for_issue(issue).merge(token:)

# send the notification to your device
fcm.send_v1(payload)
```

Additionally, iOS Notifications may be pushed directly from the command line using the xcrun utility (bypassing Firebase) – Save the following JSON to an `alert.json` file in the project's root directory:

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
