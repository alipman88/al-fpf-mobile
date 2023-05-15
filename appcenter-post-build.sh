#!/usr/bin/env bash

if [ "$AGENT_JOBSTATUS" == "Succeeded" ]; then
  if [ "$BUILD_PLATFORM" == "ios" ]; then
    yarn run react-native bundle --platform ios --entry-file index.js --dev false --bundle-output \
    ios/main.jsbundle --assets-dest ios --sourcemap-output sourcemap.ios.js --sourcemap-sources-root ./
    MINIFIED_URL='http://reactnativehost/main.jsbundle'
  elif [ "$BUILD_PLATFORM" == "android" ]; then
    yarn run react-native bundle --platform android --dev false --entry-file index.js --bundle-output \
    android/index.android.bundle --assets-dest android/app/src/main/res/ --sourcemap-output \
    sourcemap.android.js --sourcemap-sources-root ./
    MINIFIED_URL='http://reactnativehost/index.android.bundle'
  else
    echo "Platform is not included in [ios, android]. Platform = $BUILD_PLATFORM"
    return 1
  fi

  curl https://api.rollbar.com/api/1/sourcemap \
    -F access_token=$ROLLBAR_SERVER_KEY \
    -F version="$APPCENTER_BUILD_ID.$BUILD_PLATFORM" \
    -F minified_url=$MINIFIED_URL \
    -F source_map="@sourcemap.$BUILD_PLATFORM.js" \
    -F index.js="@index.js"
fi
