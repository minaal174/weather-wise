import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface EventPlannerProps {
  temperature: number;
  condition: string;
  rainChance: number;
  time?: string;
}

export default function EventPlanner({ temperature, condition, rainChance, time = "today" }: EventPlannerProps) {
  const [eventDescription, setEventDescription] = useState('');
  const [quickEventType, setQuickEventType] = useState('');
  const [showResult, setShowResult] = useState(false);

  const getEventFeedback = () => {
    const eventLower = (eventDescription + ' ' + quickEventType).toLowerCase();
    
    // For outdoor events, be more strict with weather conditions
    if (eventLower.includes('outdoor') || eventLower.includes('outside') || 
        eventLower.includes('park') || eventLower.includes('hike') || 
        eventLower.includes('picnic') || eventLower.includes('sports')) {
      
      if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('storm')) {
        return {
          recommendation: false,
          reason: "Rain/storm expected"
        };
      }
      
      if (rainChance > 30) {
        return {
          recommendation: false,
          reason: `${rainChance}% chance of rain`
        };
      }
      
      if (temperature > 32) {
        return {
          recommendation: false,
          reason: "Temperature too high for outdoor activities"
        };
      }
      
      if (temperature < 5) {
        return {
          recommendation: false,
          reason: "Temperature too low for outdoor activities"
        };
      }
      
      if (condition.toLowerCase().includes('wind') || condition.toLowerCase().includes('gust')) {
        return {
          recommendation: false,
          reason: "Windy conditions"
        };
      }
    }
    
    // Default to YES if no concerning conditions
    return {
      recommendation: true,
      reason: "Weather conditions are suitable"
    };
  };

  const handleCheck = () => {
    if (eventDescription.trim().length > 0 || quickEventType.length > 0) {
      setShowResult(true);
    }
  };

  const resetForm = () => {
    setEventDescription('');
    setQuickEventType('');
    setShowResult(false);
  };

  const handleQuickEvent = (type: string) => {
    setQuickEventType(type);
    setEventDescription('');
    setShowResult(true);
  };

  const feedback = getEventFeedback();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Event Planner</ThemedText>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Describe your event..."
          value={eventDescription}
          onChangeText={setEventDescription}
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
        />
      </View>

      <View style={styles.quickEventContainer}>
        <TouchableOpacity
          style={[styles.quickEventButton, quickEventType === 'Outdoor' && styles.selectedButton]}
          onPress={() => handleQuickEvent('Outdoor')}
        >
          <ThemedText>Outdoor</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickEventButton, quickEventType === 'Indoor' && styles.selectedButton]}
          onPress={() => handleQuickEvent('Indoor')}
        >
          <ThemedText>Indoor</ThemedText>
        </TouchableOpacity>
      </View>

      {showResult && (
        <View style={styles.resultContainer}>
          <ThemedText style={[
            styles.recommendation,
            { color: feedback.recommendation ? '#4CAF50' : '#FF3B30' }
          ]}>
            {feedback.recommendation ? 'Recommended' : 'Not Recommended'}
          </ThemedText>
          <ThemedText style={styles.reason}>{feedback.reason}</ThemedText>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCheck}>
          <ThemedText>Check Weather</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetForm}>
          <ThemedText>Reset</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
  },
  quickEventContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  quickEventButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 100,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  resultContainer: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    marginBottom: 16,
  },
  recommendation: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reason: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 120,
    alignItems: 'center',
  },
}); 