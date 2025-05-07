// Fallback for using MaterialIcons on Android and web.

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface IconSymbolProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

export function IconSymbol({ name, size = 24, color = '#FFFFFF', backgroundColor = 'rgba(255, 255, 255, 0.1)' }: IconSymbolProps) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
