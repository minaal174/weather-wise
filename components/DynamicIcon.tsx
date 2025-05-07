import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import Animated, { interpolateColor, useAnimatedProps } from 'react-native-reanimated';
import { scrollViewColorProgress } from './ParallaxScrollView';

interface DynamicIconProps {
  name: any;
  size: number;
  style?: any;
}

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

export function DynamicIcon({ name, size, style }: DynamicIconProps) {
  // Create animated props for the icon color
  const animatedProps = useAnimatedProps(() => {
    // Interpolate color from dark (#2C3E50) to light (#FFFFFF) based on scroll
    const iconColor = interpolateColor(
      scrollViewColorProgress.value,
      [0, 1],
      ['#2C3E50', '#FFFFFF']
    );
    
    return {
      color: iconColor,
    };
  });

  return (
    <AnimatedIonicons
      name={name}
      size={size}
      style={style}
      animatedProps={animatedProps}
    />
  );
} 