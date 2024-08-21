package com.frontporchforum
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

// Module-specific imports
import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap

const val PREFERENCE_NAME = "react-native"

/**
 * A persistent key value store, using Android's Shared Preferences.
 * Used for an abridged implementation of React Native's Settings JS module.
 * (See src/common/settings/index.android.js for the JS side of the interface.)
 *
 * NOTE: watch (clearWatch and watchKeys) is not implemented.
 *
 * https://facebook.github.io/react-native/docs/settings
 * https://developer.android.com/training/data-storage/shared-preferences
 * https://reactnative.dev/docs/native-modules-android
 * https://www.digitalocean.com/community/tutorials/android-sharedpreferences-kotlin
 */
class ReactNativeSharedPreferencesModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "SharedPreferences"

  val SHARED_PREFERENCES =
    getReactApplicationContext().getSharedPreferences(PREFERENCE_NAME, Context.MODE_PRIVATE)

  val editor = SHARED_PREFERENCES.edit()

  override fun getConstants(): Map<String, Any> {
    val entries = SHARED_PREFERENCES.getAll()
    val map = Arguments.createMap()

    for ((key, value) in entries) {
      map.putString(key, value.toString())
    }

    return map.toHashMap()
  }

  @ReactMethod
  fun set(map: ReadableMap) {
    val iterator = map.keySetIterator()

    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      val value = map.getString(key)
      editor.putString(key, value)
    }

    editor.commit()
  }

}
