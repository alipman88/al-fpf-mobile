#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

// FPF additions
#import "RNCConfig.h"
#import "RNSplashScreen.h"
#import <Firebase.h>
#import <React/RCTLinkingManager.h>
#import <RNCPushNotificationIOS.h>
#import <RollbarReactNative/RollbarReactNative.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // FPF addition -- Firebase
  [FIRApp configure];

  // FPF addition -- Rollbar
  NSString *rollbarKey = [RNCConfig envFor:@"ROLLBAR_API_KEY"];
  if (rollbarKey) {
    NSDictionary *rollbarOptions = @{
      @"accessToken": rollbarKey
    };
    [RollbarReactNative initWithConfiguration:rollbarOptions];
  } else {
    NSLog(@"No Rollbar API key configured");
  }

  self.moduleName = @"FrontPorchForum";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  bool didFinish = [super application:application didFinishLaunchingWithOptions:launchOptions];

  // FPF addition -- splash screen -- must come after super call
  [RNSplashScreen show];

  return didFinish;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

// FPF additions -- deep links
// For basic deep links, needed for universal too
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}
// For universal links
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}

@end
