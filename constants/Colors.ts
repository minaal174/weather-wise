/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    primary: '#4A90E2',
    primaryGradient: ['#5B9DE3', '#4A90E2', '#2E78CD'],
    secondary: '#34C759',
    accent: '#FF9500',
    text: '#2C3E50',
    textSecondary: '#7F8C8D',
    background: '#E3F2FD',
    backgroundSecondary: '#F5F7FA',
    card: '#FFFFFF',
    positive: '#4CAF50',
    negative: '#FF3B30',
    weatherSunny: '#FFC107',
    weatherCloudy: '#78909C',
    weatherRain: '#4FC3F7',
    shadow: 'rgba(0, 0, 0, 0.08)',
  },
  dark: {
    primary: '#2E78CD',
    primaryGradient: ['#1A4A80', '#2E78CD', '#5B9DE3'],
    secondary: '#30B350',
    accent: '#FF9F0A',
    text: '#F5F5F7',
    textSecondary: '#A7A7A7',
    background: '#1C1C1E',
    backgroundSecondary: '#2C2C2E',
    card: '#2C2C2E',
    positive: '#32CD32',
    negative: '#FF453A',
    weatherSunny: '#FFB74D',
    weatherCloudy: '#90A4AE',
    weatherRain: '#29B6F6',
    shadow: 'rgba(0, 0, 0, 0.5)',
  },
} as const;

    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
