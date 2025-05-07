import React from 'react';
import { TextProps } from 'react-native';
import Animated, {
    interpolateColor,
    useAnimatedStyle
} from 'react-native-reanimated';

interface DynamicTextProps extends TextProps {
  children: React.ReactNode;
  scrollProgress: number;
}

export function DynamicText({ children, style, scrollProgress = 0, ...props }: DynamicTextProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      scrollProgress,
      [0, 100],
      ['#2C3E50', '#FFFFFF']
    )
  }));

  return (
    <Animated.Text
      style={[style, animatedStyle]}
      {...props}
    >
      {children}
    </Animated.Text>
  );
} 