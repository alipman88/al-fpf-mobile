# Notifications

Notifications are sent via Firebase Cloud Messaging from the Rails server to the
mobile app when new issues are published.

Requirements for notification delivery:

1. User must grant permission (which is managed later via system settings)
2. User must have notifications enabled via the `users.receive_issue_push_notifications` column
3. User's device's FCM token must be registered in the `app_sessions.fcm_token` column
4. FCM token must be registered in Firebase for the area topic (e.g. "area-448"
   for Montpelier members)

The mobile app can be in three states when a notification is received:
- quit
- background
- foreground

The OS will show a notification when the app is quit or in the background and
launch/foreground the app automatically when a notification is tapped. However,
the OS will do nothing if the app is in the foreground, and we have not implemented
additional support for showing notifications while the app is in the foreground
(because doing so requires extra code and we assume those circumstances are rare
since we send so few notifications).

Our own code in `src/App/Container.js` will process the notification:
- `getInitialNotification` will return the notification object if the app was quit
- `onNotificationOpenedApp` will return the notification object if the app was
  in the background
In either case, our code will construct a URL from the notification data and
route to that URL using react-navigation.

Docs on `@react-native-firebase/messaging` integration:
https://rnfirebase.io/messaging/usage

Docs on Firebase Cloud Messaging:
https://firebase.google.com/docs/cloud-messaging
However, note that most of the code requirements in the Firebase docs are irrelevant
(I guess because `@react-native-firebase` handles the integration).

Note that we also use the `@react-native-community/push-notification-ios` package,
but only to clear the iOS app badge, not to actually handle notifications.


## Testing Firebase Notifications

Before testing push notifications, you may wish to log out of the mobile app and
delete your app sessions, in order to start with a clean slate:

```ruby
# From the Rails console on staging
user = User.find_by(email: 'email@example.com')
user.app_sessions.delete_all
```

Then make sure you have enabled push notifications through the system settings
(on your phone) and your FPF user settings:
https://staging.frontporchforum.com/user/subscriptions

More thorough QA instructions for testing notifications:
https://docs.google.com/document/d/1iqPD4D3qKjibG_0gI4PvmhXRb1MPAzLEnlBDiICQoS4/edit?tab=t.0#heading=h.9v95q1b2k7ev

### Sending notifications from Rails

Notifications can be deliverd from the Rails console via Firebase.

First, double-check for presence of your Firebase Cloud Messaging token in the DB:

```ruby
user.app_sessions.reload.pluck(:fcm_token)
# => ['abc123']
```

Then, select an issue from an area you're subscribed to mobile notifications,
and send notifications:

(When run in a staging environment, this code will only send notifications to
users of the staging mobile application.)

```ruby
PushNotifier.send_notifications_for(issue)
```
### Sending notification from Firebase Console

Notifications can be deliverd from the Firebase web console:

1. Go to https://console.firebase.google.com/u/0/project/fpf-mobile-staging/messaging
2. Duplicate a previous campaign or click the New campaign button -> Notifications
   - Notification title: e.g. "Test"
   - Notification text: e.g. "Test"
   - Notification name: e.g. "Test 1/2/25"
   - Target: Topic
   - Message topic: topic name, e.g. "area-448" or "qa-foobar" (see custom topics below)
   - Scheduled -> Send to eligible users -> Now
   - Additional options -> Custom data
     - payload: {"area_id":448, "issue_number":6599}
3. Click Review, then Publish

### Custom topic

`PushNotifier` sends notifications to "topics" (strings) that FCM tokens are
pre-enrolled in (e.g. "area-448" for all Montpelier members). You can enroll an
FCM token in a custom topic and then send a notification to that topic:

```ruby
topic = 'qa-foobar'

# Get your FCM token from the DB (or from the mobile app's console)
token = '123abc' # or User.find(1).app_sessions.pluck(:fcm_token).first

issue = Issue.find_by!(area_id: 448, number: 6599)

# Subscribe your FCM token to a custom topic
PushNotifier.queue_subscribe_to_topics([topic], [token])

fcm = PushNotifier.initialize_fcm_connection
payload = PushNotifier.params_for_issue(issue)
payload[:topic] = topic

fcm.send_v1(payload)
```

### Testing iOS notifications

#### Via command line to simulator

iOS Notifications may be pushed directly to the simulator from the command line
using the `xcrun` utility (bypassing Firebase).

```bash
cp ios/alert.example.json ios/alert.json
# make changes as necessary to alert.json, but note that the gcm.message_id key
# is required for Firebase to recognize the notification data

xcrun simctl push booted com.FrontPorchForum.FrontPorchForum ios/alert.example.json
```

#### Via CloudKit console to device

iOS Notifications may be pushed directly to a device from Apple's CloudKit Push
Notifications console (bypassing Firebase).

You'll need the APNS token from your device, which can be logged with this code:

```javascript
messaging().getAPNSToken().then((token) => console.log(`APNS token: ${token}`))
```

1. Go to https://icloud.developer.apple.com/dashboard/notifications/teams/98D6Y5ZA64/app/com.FrontPorchForum.FrontPorchForum/notifications
2. Clone a previous notification or click the create button
   - Name: e.g. "Test"
   - Environment: Development
   - Recipient: your APNS token
   - apns-topic: com.FrontPorchForum.FrontPorchForum
   - Payload: switch to JSON view, then paste the object from `ios/alert.example.json`
     (with the `Simulator Target Bundle` key)
3. Click Send

### Testing Android notifications

#### Via command line to emulator

Theoretically something like the following should work, but doesn't, probably because
there are additional setup steps (maybe running adb as root?)

```bash
adb shell am broadcast \
  -n com.FrontPorchForum.FrontPorchForum/com.google.firebase.iid.FirebaseInstanceIdReceiver \
  -a "com.google.firebase.MESSAGING_EVENT" \
  --es "title" "Test Notification" \
  --es "body" "This is a test notification." \
  --es "data" "{\"payload\": { \"area_id\":\"448\", \"issue_number\":\"6599\"} }"

```
