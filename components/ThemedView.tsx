import { View, type ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { useThemeColor } from '../hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  animated?: boolean;
};

export function ThemedView({ 
  style, 
  lightColor, 
  darkColor, 
  animated = false, 
  ...otherProps 
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ lightColor, darkColor }, 'background');

  if (animated) {
    return <Animated.View style={[{ backgroundColor }, style]} {...otherProps} />;
  }
  
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export default ThemedView;
