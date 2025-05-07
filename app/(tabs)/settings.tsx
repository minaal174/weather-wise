import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [useMetric, setUseMetric] = useState(true);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.settingItem}>
        <ThemedText>Enable Notifications</ThemedText>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
        />
      </View>
      
      <View style={styles.settingItem}>
        <ThemedText>Location Services</ThemedText>
        <Switch
          value={locationServices}
          onValueChange={setLocationServices}
        />
      </View>
      
      <View style={styles.settingItem}>
        <ThemedText>Use Metric Units</ThemedText>
        <Switch
          value={useMetric}
          onValueChange={setUseMetric}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
}); 