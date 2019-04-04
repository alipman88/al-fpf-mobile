package com.frontporchforum;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.airbnb.android.react.maps.MapsPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.instanceid.RNFirebaseInstanceIdPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.taluttasgiran.pickermodule.ReactNativePickerModulePackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new RNDeviceInfo(),
          new MainReactPackage(),
          new SplashScreenReactPackage(),
          new MapsPackage(),
          new RNFirebasePackage(),
          new RNFirebaseMessagingPackage(),
          new RNFirebaseNotificationsPackage(),
          new RNFirebaseInstanceIdPackage(),
          new RNSensitiveInfoPackage(),
          new RNGestureHandlerPackage(),
          new ReactNativeConfigPackage(),
          new ReactNativePickerModulePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
