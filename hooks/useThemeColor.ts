/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export function useThemeColor(
  props: ThemeProps,
  colorName: string
): string {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[`${theme}Color`];

  if (colorFromProps) {
    return colorFromProps;
  }

  return theme === 'light' ? '#FFFFFF' : '#000000';
}
