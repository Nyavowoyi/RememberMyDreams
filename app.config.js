export default {
  "expo": {
    "name": "RememberMyDreams",
    "slug": "RememberMyDreams",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "RememberMyDreams",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
        "android.permission.READ_CALENDAR",
        "android.permission.WRITE_CALENDAR"
      ],
      "package": "com.nyavowoyiernest.RememberMyDreams",
      // "googleServicesFile": process.env.GOOGLE_SERVICES_JSON
      "googleServicesFile": "./google-services.json"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-calendar",
        {
          "calendarPermission": "$PRODUCT_NAME needs to access your calendar to help you recall your dreams and create reminders."
        }
      ],
      [
        "expo-dev-launcher",
        {
          "launchMode": "most-recent"
        }
      ],
      [
        "@react-native-google-signin/google-signin"
        // {
          // "iosUrlScheme": "com.googleusercontent.apps._some_id_here_"
        // }
      ],
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "b2811003-82e3-4a3b-9096-6115486e8407"
      }
    },
    "owner": "nyavowoyiernest"
  }
}
