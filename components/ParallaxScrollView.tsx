import React from 'react';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

interface ParallaxScrollViewProps {
  children: React.ReactNode;
  contentContainerStyle?: any;
  onScroll?: (event: any) => void;
  scrollEventThrottle?: number;
  showsVerticalScrollIndicator?: boolean;
}

// Create a context to share the scroll progress
export const ScrollProgressContext = React.createContext<Animated.SharedValue<number> | null>(null);

export function useScrollProgress() {
  const context = React.useContext(ScrollProgressContext);
  if (!context) {
    throw new Error('useScrollProgress must be used within a ParallaxScrollView');
  }
  return context;
}

export function ParallaxScrollView({
  children,
  contentContainerStyle,
  onScroll,
  scrollEventThrottle = 16,
  showsVerticalScrollIndicator = false,
}: ParallaxScrollViewProps) {
  const scrollProgress = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollProgress.value = event.contentOffset.y;
    },
  });

  return (
    <ScrollProgressContext.Provider value={scrollProgress}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        contentContainerStyle={contentContainerStyle}
      >
        {children}
      </Animated.ScrollView>
    </ScrollProgressContext.Provider>
  );
}

