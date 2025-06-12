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
3. Merge `master` to `staging`. This will automatically start iOS and Android
   staging builds in Codemagic.

#### BrowserStack App Live

Staging builds are automatically uploaded to BrowserStack. Its App Live service
can be used to test our mobile app on a variety of real phones through the cloud.

Authentication is configured via Noah's BrowserStack account, which has
`Username` and `Access Key` values defined here:
https://www.browserstack.com/accounts/profile/details

Those values are stored in Codemagic fpf-mobile app environment variables
in the `browserstack_credentials` group:
https://codemagic.io/app/67d05c4d6f8452bacfd85e9c/settings

Documentation:
- https://docs.codemagic.io/integrations/browserstack-integration/
- https://www.browserstack.com/app-live/rest-api

### Production deployment

1. Double-check that the version number and release notes are up-to-date
2. Merge `staging` to `production` (which will require a non-fast forward merge
   because the production branch includes details that can't be merged to staging).
   This will automatically start iOS and Android production builds in Codemagic.
3. For the iOS build, you may not need to do any of this, but in case it doesn't get
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
4. For the Android build, you may not need to do any of this, but in case it doesn't get
  automatically submitted for review:
  - Go to [Google Play Console](https://play.google.com/console/u/0/developers/7669883795652962257/app/4973842490929321153/releases/overview) -> "Releases overview"
  - Ensure that the new version is shown in the "Latest releases" table with a
    release status of "Available on Google Play".  This may take a few hours.
5. Tag the release:

        git tag -a v1.2.3 -m "1.2.3 release"
        git push --tags

6. Move all the issues with the current version tag into the `Released` status
7. Update the [release notes google doc](https://docs.google.com/document/d/1lPN1-SK39X_PIaMrJmF0BbjYv6cCirBEdBiwAa2fcfg/edit)
    to set the current date and move the "Releases" header above the now-released notes,
    then create a new subheader for the next release under the "Upcoming" header
8. Post the release notes doc link the Slack #general channel

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
