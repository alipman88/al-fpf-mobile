# QA

The mobile app is built via Codemagic and can be tested either through BrowserStack
or by installing it on local devices.


## BrowserStack

iOS and Android staging builds are automatically uploaded by Codemagic to BrowserStack
where they can be tested via [App Live](https://app-live.browserstack.com/).


## iOS

iOS staging builds are automatically uploaded by Codemagic to TestFlight.

### Set up a new tester

First, add the user to App Store Connect's list of users:
https://appstoreconnect.apple.com/access/users

I think there's supposed to be a "Tester" role there, but I don't see it, so the
"Customer Support" role also works.

This should send an invite to the user, who will need to accept the invite and
finish creating an account.

Then, add that user to TestFlight's list of internal testers:
https://appstoreconnect.apple.com/teams/530df0ab-49da-4d86-b055-8494f3a75419/apps/1458651656/testflight/groups/57dc7f8f-4e46-4a53-9994-477c85ae630a

This should also send an invite to the user, who will need to accept it.

The user should download the TestFlight iOS app:
https://apps.apple.com/us/app/testflight/id899247664


## Android

The Android `apk` file can be downloaded from Codemagic, though this requires a
developer user account, so we may want to find a way to host these files elsewhere.

https://codemagic.io/builds
