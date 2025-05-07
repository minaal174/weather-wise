import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';

type PowerAlertProps = {
  message: string;
  time?: string;
  onDismiss?: () => void;
  type?: 'power' | 'weather' | 'emergency';
};

// Color palettes for alerts
const ALERT_COLORS = {
  light: {
    power: {
      background: '#FFEBEE',
      border: '#FFCDD2',
      text: '#B71C1C',
      icon: '#D32F2F',
    },
    weather: {
      background: '#E0F7FA',
      border: '#B2EBF2',
      text: '#006064',
      icon: '#00838F',
    },
    emergency: {
      background: '#FFF3E0',
      border: '#FFE0B2',
      text: '#E65100',
      icon: '#EF6C00',
    },
  },
  dark: {
    power: {
      background: '#3E2A2A',
      border: '#5E2F2F',
      text: '#FFB3B3',
      icon: '#FF6B6B',
    },
    weather: {
      background: '#1A3335',
      border: '#1F4E52',
      text: '#86ECFF',
      icon: '#4FBECA',
    },
    emergency: {
      background: '#3D2E1B',
      border: '#5E421C',
      text: '#FFCC80',
      icon: '#FFA726',
    },
  },
};

export default function PowerAlert({ message, time, onDismiss, type = 'power' }: PowerAlertProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = ALERT_COLORS[colorScheme][type];
  
  // Select appropriate icon based on alert type
  const getAlertIcon = () => {
    switch (type) {
      case 'power':
        return 'flash-outline';
      case 'weather':
        return 'thunderstorm-outline';
      case 'emergency':
        return 'warning-outline';
      default:
        return 'information-circle-outline';
    }
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.background,
        borderColor: colors.border 
      }
    ]}>
      <View style={styles.iconContainer}>
        <Ionicons name={getAlertIcon()} size={20} color={colors.icon} />
      </View>
      
      <View style={styles.textContainer}>
        <ThemedText style={[styles.title, { color: colors.text }]}>
          {type.charAt(0).toUpperCase() + type.slice(1)} Alert
        </ThemedText>
        <ThemedText style={[styles.message, { color: colors.text }]}>
          {message}{time ? ` - ${time}` : ''}
        </ThemedText>
      </View>
      
      {onDismiss && (
        <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
          <Ionicons name="close" size={18} color={colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 15,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
  },
  closeButton: {
    padding: 4,
  },
}); 