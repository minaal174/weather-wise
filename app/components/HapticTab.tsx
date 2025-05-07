import { useColorScheme } from '@/hooks/useColorScheme';
import * as Haptics from 'expo-haptics';
import { GestureResponderEvent, Pressable } from 'react-native';

interface HapticTabProps {
  children: React.ReactNode;
  active?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
}

export function HapticTab({ children, active, onPress }: HapticTabProps) {
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={(e) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(e);
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: active
          ? colorScheme === 'dark'
            ? '#FFFFFF'
            : '#000000'
          : 'transparent',
      })}
    >
      {children}
    </Pressable>
  );
} 