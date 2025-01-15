#!/usr/bin/env bash

# Use yarn 4 instead of yarn 1
#
# https://github.com/microsoft/appcenter/issues/2134#issuecomment-1942319970
#
# Use corepack to install yarn 4
corepack enable
#
# Install dependencies here instead of the appcenter step
echo "Install dependencies"
yarn install --immutable
#
# Overwrite yarn.js to stop appcenter from calling it with wrong parameters
yarnVersion=$(corepack yarn --version)
echo "" > /Users/runner/.cache/node/corepack/yarn/$yarnVersion/yarn.js

# Install the version of CocoaPods listed in ios/Podfile.lock
# https://github.com/microsoft/appcenter/issues/95
# https://github.com/CocoaPods/CocoaPods/issues/12226
if [ "$BUILD_PLATFORM" == "ios" ]; then
  echo "Uninstalling all CocoaPods versions"
  sudo gem uninstall cocoapods --all --executables

  COCOAPODS_VER=`sed -n -e 's/^COCOAPODS: \([0-9.]*\)/\1/p' ./ios/Podfile.lock`

  echo "Installing CocoaPods version $COCOAPODS_VER"
  sudo gem install cocoapods -v $COCOAPODS_VER
fi
