import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface DailyTipsProps {
  temperature: number;
  condition: string;
  rainChance: number;
}

export default function DailyTips({ temperature, condition, rainChance }: DailyTipsProps) {
  const getTips = () => {
    const tips = [];

    // Temperature based tips
    if (temperature > 30) {
      tips.push({
        icon: 'water',
        color: '#4FC3F7',
        text: 'Stay hydrated in this heat',
      });
    } else if (temperature < 10) {
      tips.push({
        icon: 'thermometer',
        color: '#FF5722',
        text: 'Dress warmly today',
      });
    }

    // Rain based tips
    if (rainChance > 50) {
      tips.push({
        icon: 'umbrella',
        color: '#1E88E5',
        text: 'Take an umbrella with you',
      });
    }

    // Condition based tips
    if (condition.toLowerCase().includes('sunny')) {
      tips.push({
        icon: 'sunny',
        color: '#FFB300',
        text: 'Use sunscreen for UV protection',
      });
    }

    // Add default tip if no specific tips
    if (tips.length === 0) {
      tips.push({
        icon: 'partly-sunny',
        color: '#78909C',
        text: 'Have a great day!',
      });
    }

    return tips;
  };

  return (
    <View style={styles.container}>
      {getTips().map((tip, index) => (
        <ThemedView key={index} style={styles.tipCard}>
          <View style={[styles.tipIconContainer, { backgroundColor: `${tip.color}20` }]}>
            <Ionicons name={tip.icon as any} size={24} color={tip.color} />
          </View>
          <View style={styles.tipContent}>
            <ThemedText style={styles.tipText}>{tip.text}</ThemedText>
          </View>
        </ThemedView>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  tipCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  tipContent: {
    flex: 1,
  },
  tipText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
}); 