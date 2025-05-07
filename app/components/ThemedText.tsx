import { useColorScheme } from '@/hooks/useColorScheme';
import { Text, TextProps } from 'react-native';

export function ThemedText(props: TextProps) {
  const colorScheme = useColorScheme();
  const { style, ...otherProps } = props;

  return (
    <Text
      style={[
        {
          color: colorScheme === 'dark' ? '#FFFFFF' : '#000000',
        },
        style,
      ]}
      {...otherProps}
    />
  );
} 