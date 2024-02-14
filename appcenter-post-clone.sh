#!/usr/bin/env bash

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
