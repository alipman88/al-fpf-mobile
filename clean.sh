# clear Xcode derived data cache
rm -rf ~/Library/Developer/Xcode/DerivedData

# clear build cache & re-install Pods
cd ios
rm -rf .build
rm -rf Pods
pod install
cd ..

# re-install yarn packages
rm -rf node_modules 
yarn install
