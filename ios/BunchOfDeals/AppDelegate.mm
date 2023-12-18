#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <RNFBDynamicLinksAppDelegateInterceptor.h>
#import <Firebase.h>
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>
#import <ReactCommon/RCTTurboModuleManager.h>
#import <React/RCTRootView.h>
#import <RNCPushNotificationIOS.h>

#import <React/RCTBridge.h>
//#import <React/RCTBundleURLProvider.h>
//#import <React/RCTRootView.h>
//#import <Firebase.h>
//#import "RNFirebaseNotifications.h"
//#import "RNFirebaseMessaging.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  //if ([FIRApp defaultApp] == nil) {
  [FIRApp configure];
   //  }
  [RNFBDynamicLinksAppDelegateInterceptor sharedInstance];
  
  
  //self.moduleName = @"BunchOfDeals";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  //self.initialProps = @{};
  
  // Define UNUserNotificationCenter
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    center.delegate = self;
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge

                                                     moduleName:@"BunchOfDeals"

                                              initialProperties:nil];



    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];



    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];

    UIViewController *rootViewController = [UIViewController new];

    rootViewController.view = rootView;

    self.window.rootViewController = rootViewController;

    [self.window makeKeyAndVisible];

    return YES;
  

  //return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  
    if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
      return YES;
    }
   
//    if ([RCTLinkingManager application:app openURL:url options:options]) {
//      return YES;
//    }
   
    return NO;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// Push Notification Start :-

-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}

//Called when a notification is delivered to a foreground app.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [FIRMessaging messaging].APNSToken = deviceToken;
  // Other APNS token handling code
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
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

@end

