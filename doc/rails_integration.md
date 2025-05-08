# Rails App Integration

## WebView URLs and Deep Links

The mobile app uses WebViews to serve content from the Rails web app.

When using a mobile browser and visiting a URL that may be served through the
mobile app, users will be prompted to open the mobile app and will be directed
to the appropriate content within the mobile app.

### Page Titles

To automatically transfer page titles from pages loaded within a WebView to the
mobile app title bar, set the WebView's `transferPageTitle` property to `true`.

### Updating Rails app URLs

When URLs used by the mobile application are added or changed, the following
files must be updated as described below. All serve related but distinct
purposes.

- `fpf-mobile/src/common/components/WebView/WebView.js`: Update the
  `whitelistedPaths` constant, and any other code used to match/parse URLs.

  This file is responsible for determining if a requested URL may served through
  a WebView in the mobile app, or if it should open a browser tab.

- `fpf-mobile/src/App/Container.js`: Update the `linking` constant.

  This file is responsible for determining which tab a deep-linked URL should
  direct to.

- `fpf-mobile/android/app/src/main/AndroidManifest.xml`: Update paths
  accordingly.

  This file is used to determine whether a URL visited in browser should open
  the Android mobile app.

- `fpf/public/.well-known/apple-app-site-association`: Update paths accordingly.

  This file is used to to determine whether a URL visited in browser should open
  the iOS app. Note that its contents may be cached:
  https://app-site-association.cdn-apple.com/a/v1/frontporchforum.com

  Note that individual devices will also cache the contents of this file upon
  app installation, and will automatically refresh once every week or so.

## Application Settings

Miscellaneous application settings are sent from the Rails app' API's
`/api/v1/settings` endpoint
(`fpf/src/controllers/api/v1/settings_controller.rb`), and received by
`src/common/appSettings`. This integration could be expanded to include bits of
data like a user's home city, which would be useful for WebView placeholders.
