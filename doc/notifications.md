## Testing Firebase Notifications

Before testing push notifications, you may wish to log out of the mobile app and delete your app sessions, in order to start with a clean slate:

```ruby
# From the Rails console on staging
user = User.find_by(email: 'email@example.com')
user.app_sessions.delete_all
```

To send push notifications to a simulated development device through Firebase, log into the mobile app and connect to staging. Make sure you have enabled push notifications through the application settings (on your phone) and your FPF user settings (e.g. https://staging.frontporchforum.com/user/subscriptions).

You may double-check the presence of your Firebase Cloud Messaging token:

```ruby
user.app_sessions.reload.pluck(:fcm_token)
# => ['abc123']
```

Then, select an issue from an area you're subscribed to mobile notifications, and send notifications:

(When run in a staging environment, this code will only send notifications to users of the staging mobile application.)

```ruby
PushNotifier.send_notifications_for(@issue)
```

You should receive a push notification. Opening the notification should load the appropriate issue in the mobile forum.

## Testing Command Line iOS Notifications

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
