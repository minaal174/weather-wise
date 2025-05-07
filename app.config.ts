import { ExpoConfig } from 'expo/config';

// In this example, we'll use a basic configuration
const config: ExpoConfig = {
  name: 'Weather Wise',
  slug: 'weather-wise',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'weather-wise',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.weatherwise.app'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.weatherwise.app'
  },
  web: {
    favicon: './assets/images/favicon.png'
  },
  plugins: [
    'expo-router',
    'expo-location'
  ],
  experiments: {
    typedRoutes: true
  }
};

export default config; 