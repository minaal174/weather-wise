import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Explore</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  headerSection: {
    marginBottom: 8,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  todayCard: {
    marginBottom: 8,
  },
  todayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  todayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  todayDate: {
    fontSize: 16,
  },
  todayContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todayLeft: {
    alignItems: 'center',
  },
  todayCondition: {
    fontSize: 16,
  },
  todayRight: {
    alignItems: 'flex-end',
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  todayHigh: {
    fontSize: 40,
    fontWeight: '300',
  },
  todayLow: {
    fontSize: 26,
    fontWeight: '300',
    opacity: 0.7,
    marginLeft: 8,
  },
  todayDetails: {
    flexDirection: 'row',
    gap: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
  },
  smallDetailText: {
    fontSize: 12,
  },
  forecastList: {
    marginBottom: 8,
    gap: 4,
  },
  forecastDay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 0,
  },
  forecastDayLeft: {
    flex: 2,
  },
  forecastDayCenter: {
    flex: 1,
    alignItems: 'center',
  },
  forecastDetails: {
    marginTop: 6,
  },
  forecastDayRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  day: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 14,
    opacity: 0.7,
  },
  highTemp: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  lowTemp: {
    opacity: 0.7,
    fontSize: 18,
  },
  alertSection: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  alertContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoDetails: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  forecastSummary: {
    fontSize: 14,
    lineHeight: 20,
  },
});
