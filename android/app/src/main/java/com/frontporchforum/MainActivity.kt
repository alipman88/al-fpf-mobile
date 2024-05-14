package com.frontporchforum

// FPF addition
import android.content.pm.ActivityInfo
import android.os.Bundle
import android.widget.ImageView
import org.devio.rn.splashscreen.SplashScreen

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String {
        return "FrontPorchForum"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        // FPF addition -- splash screen
        SplashScreen.show(this, true)

        // FPF addition -- react-navigation & react-native-screens
        super.onCreate(null)

        // FPF addition -- splash screen
        if (resources.getBoolean(R.bool.portrait_only)) {
            requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
        }
    }

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
