import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface DailyTipsProps {
  temperature: number;
  condition: string;
  uvIndex: number;
}

export default function DailyTips({ temperature, condition, uvIndex }: DailyTipsProps) {
  const getTips = () => {
    const tips = [];

    // Temperature-based tips
    if (temperature > 30) {
      tips.push('Stay hydrated and avoid prolonged sun exposure');
    } else if (temperature < 10) {
      tips.push('Dress warmly and protect against cold weather');
    }

    // Weather condition tips
    if (condition.toLowerCase().includes('rain')) {
      tips.push('Carry an umbrella and wear water-resistant clothing');
    } else if (condition.toLowerCase().includes('snow')) {
      tips.push('Drive carefully and wear appropriate footwear');
    }

    // UV index tips
    if (uvIndex >= 6) {
      tips.push('Use sunscreen and wear protective clothing');
    }

    return tips.length > 0 ? tips : ['Enjoy the weather!'];
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.header}>Daily Tips</ThemedText>
      {getTips().map((tip, index) => (
        <ThemedText key={index} style={styles.tip}>• {tip}</ThemedText>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tip: {
    fontSize: 14,
    marginVertical: 4,
  },
}); 