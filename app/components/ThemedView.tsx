import { useColorScheme } from '@/hooks/useColorScheme';
import { View, ViewProps } from 'react-native';

export function ThemedView(props: ViewProps) {
  const colorScheme = useColorScheme();
  const { style, ...otherProps } = props;

  return (
    <View
      style={[
        {
          backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#FFFFFF',
        },
        style,
      ]}
      {...otherProps}
    />
  );
} 