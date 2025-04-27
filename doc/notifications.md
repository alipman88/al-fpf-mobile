## Notifications

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
