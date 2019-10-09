package com.frontporchforum;

import java.util.Map;
import java.util.HashMap;

import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;

/**
 * Android implementation of React Native's native Settings module.
 *
 * NOTE: watch (watchKeys and clearWatch) is not supported.
 *
 * https://facebook.github.io/react-native/docs/settings
 * https://github.com/facebook/react-native/tree/master/Libraries/Settings
 */
@ReactModule(name = RCTSettingsManagerModule.NAME)
public class RCTSettingsManagerModule extends ReactContextBaseJavaModule {

  public static final String NAME = "SettingsManager";
  private static final String PREFERENCES_NAME = "react-native";

  public RCTSettingsManagerModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public Map<String, Object> getConstants() {
    WritableMap settings = Arguments.createMap();

    Map<String, ?> allEntries = getPreferences().getAll();
    for (Map.Entry<String, ?> entry : allEntries.entrySet()) {
      settings.putString(entry.getKey(), entry.getValue().toString());
    }

    Map<String, Object> result = new HashMap<String, Object>();
    result.put("settings", settings.toHashMap());
    return result;
  }

  /**
   * Set one or more values in the settings.
   */
  @ReactMethod
  public void setValues(ReadableMap data) {
    SharedPreferences.Editor editor = getEditor();
    ReadableMapKeySetIterator iter = data.keySetIterator();
    while (iter.hasNextKey()) {
      String key = iter.nextKey();
      editor.putString(key, data.getString(key)).commit();
    }
  }

  /**
   * Remove some values from the settings.
   */
  @ReactMethod
  public void deleteValues(ReadableArray keys) {
    SharedPreferences.Editor editor = getEditor();
    for (int i = 0; i < keys.size(); i++) {
      editor.remove(keys.getString(i));
    }
    editor.commit();
  }

  private SharedPreferences getPreferences() {
    return getReactApplicationContext().getSharedPreferences(
      PREFERENCES_NAME, Context.MODE_PRIVATE);
  }

  private SharedPreferences.Editor getEditor() {
    return getPreferences().edit();
  }
}
