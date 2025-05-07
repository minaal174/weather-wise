import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React, { useEffect, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import Animated, {
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

import DailyTips from '../../components/DailyTips';
import { DynamicText } from '../../components/DynamicText';
import EventPlanner from '../../components/EventPlanner';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { WeatherService } from '../services/weatherService';

export default function WeatherMainScreen() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollProgress = useSharedValue(0);
  const weatherIconAnimation = useSharedValue(0);
  
  // Weather state
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    condition: 'Loading...',
    humidity: 0,
    rainChance: 0,
    windSpeed: 0,
    windDirection: 'N',
    uvIndex: 0,
    feelsLike: 0,
    visibility: 0,
  });

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      const data = await WeatherService.getWeatherData();
      if (data) {
        setWeatherData(data);
      }
    };

    fetchWeather();
    // Refresh weather data every 15 minutes
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll events
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentPosition = event.nativeEvent.contentOffset.y;
    setScrollPosition(currentPosition);
    
    // Update animated value based on scroll position
    const scrollThreshold = 100; // Adjust this value to control when the color change starts
    scrollProgress.value = Math.min(currentPosition / scrollThreshold, 1) * 100;
  };

  // Animated styles
  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      scrollProgress.value,
      [0, 100],
      ['#87CEEB', '#000000']
    ),
  }));

  const weatherIconStyle = useAnimatedStyle(() => ({
    transform: [{ 
      translateY: interpolate(
        weatherIconAnimation.value,
        [0, 100],
        [0, -10]
      ) 
    }],
    opacity: interpolate(
      weatherIconAnimation.value,
      [0, 50, 100],
      [1, 0.7, 1]
    ),
  }));

  // Start weather icon animation
  useEffect(() => {
    weatherIconAnimation.value = withRepeat(
      withTiming(100, { duration: 2000 }),
      -1,
      true
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar 
        barStyle={scrollPosition > 50 ? 'light-content' : 'dark-content'} 
        translucent 
        backgroundColor="transparent" 
      />

      {/* Fixed Temperature Header */}
      <Animated.View style={[
        styles.fixedHeader,
        styles.temperatureTopContainer,
        animatedBackgroundStyle,
        { 
          borderBottomColor: 'rgba(255, 255, 255, 0.1)',
          borderBottomWidth: scrollPosition > 50 ? 1 : 0,
          paddingTop: '20%'
        }
      ]}>
        <View style={styles.temperatureRow}>
          <Animated.View style={[styles.weatherIconContainer, weatherIconStyle]}>
            <Ionicons 
              name={weatherData.condition.toLowerCase().includes('cloud') ? 'partly-sunny' : 'sunny'} 
              size={80} 
              color={weatherData.condition.toLowerCase().includes('cloud') ? 'rgba(255, 255, 255, 0.85)' : '#FFB300'} 
            />
          </Animated.View>
          <DynamicText style={styles.temperatureText} scrollProgress={scrollProgress.value}>
            {Math.round(weatherData.temperature)}°C
          </DynamicText>
        </View>
        
        <DynamicText style={styles.conditionText} scrollProgress={scrollProgress.value}>
          {weatherData.condition}
        </DynamicText>
      </Animated.View>
      
      <ScrollView
        ref={scrollViewRef}
        style={{flex: 1}}
        contentContainerStyle={{
          paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight + 200 : (StatusBar.currentHeight || 0) + 200,
          backgroundColor: 'transparent'
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        bounces={true}
        overScrollMode="always"
        decelerationRate="normal"
      >
        <Animated.View style={[
          StyleSheet.absoluteFillObject,
          animatedBackgroundStyle
        ]} />
        
        {/* Weather Details Row */}
        <View style={styles.weatherDetailsRow}>
          <View style={[styles.weatherDetailItem, { 
            backgroundColor: 'rgba(245, 245, 245, 0.15)',
            elevation: scrollPosition > 0 ? 2 : 0,
            shadowColor: scrollPosition > 0 ? '#000' : 'transparent'
          }]}>
            <Ionicons name="water-outline" size={22} color="#4FC3F7" style={styles.detailIcon} />
            <ThemedText style={{color: 'rgba(255, 255, 255, 0.85)', fontSize: 18, fontWeight: '500'}}>
              {weatherData.humidity}%
            </ThemedText>
          </View>
          
          <View style={[styles.weatherDetailItem, {
            backgroundColor: 'rgba(245, 245, 245, 0.15)',
            elevation: scrollPosition > 0 ? 2 : 0,
            shadowColor: scrollPosition > 0 ? '#000' : 'transparent'
          }]}>
            <Ionicons name="umbrella-outline" size={22} color="#1E88E5" style={styles.detailIcon} />
            <ThemedText style={{color: 'rgba(255, 255, 255, 0.85)', fontSize: 18, fontWeight: '500'}}>
              {weatherData.rainChance}%
            </ThemedText>
          </View>
          
          <View style={[styles.weatherDetailItem, {
            backgroundColor: 'rgba(245, 245, 245, 0.15)',
            elevation: scrollPosition > 0 ? 2 : 0,
            shadowColor: scrollPosition > 0 ? '#000' : 'transparent'
          }]}>
            <Ionicons name="leaf-outline" size={22} color="#66BB6A" style={styles.detailIcon} />
            <ThemedText style={{color: 'rgba(255, 255, 255, 0.85)', fontSize: 18, fontWeight: '500'}}>
              {weatherData.windSpeed} mph {weatherData.windDirection}
            </ThemedText>
          </View>
        </View>

        {/* Weather Details Section */}
        <View style={styles.additionalContent}>
          <DynamicText style={[styles.sectionTitle, { color: 'rgba(255, 255, 255, 0.85)', fontSize: 20, fontWeight: '600', marginBottom: 15 }]}>
            Weather Details
          </DynamicText>
          <View style={styles.detailsRow}>
            <View style={[styles.detailBox, { 
              backgroundColor: 'rgba(245, 245, 245, 0.15)',
              elevation: scrollPosition > 0 ? 2 : 0,
              shadowColor: scrollPosition > 0 ? '#000' : 'transparent'
            }]}>
              <Ionicons name="thermometer-outline" size={24} color="#FF5722" />
              <DynamicText style={[styles.detailLabel, { color: 'rgba(255, 255, 255, 0.85)' }]}>Feels Like</DynamicText>
              <DynamicText style={[styles.detailValue, { color: 'rgba(255, 255, 255, 0.85)' }]}>{Math.round(weatherData.feelsLike)}°</DynamicText>
            </View>
            <View style={[styles.detailBox, {
              backgroundColor: 'rgba(245, 245, 245, 0.15)',
              elevation: scrollPosition > 0 ? 2 : 0,
              shadowColor: scrollPosition > 0 ? '#000' : 'transparent'
            }]}>
              <Ionicons name="water-outline" size={24} color="#29B6F6" />
              <DynamicText style={[styles.detailLabel, { color: 'rgba(255, 255, 255, 0.85)' }]}>Humidity</DynamicText>
              <DynamicText style={[styles.detailValue, { color: 'rgba(255, 255, 255, 0.85)' }]}>{weatherData.humidity}%</DynamicText>
            </View>
            <View style={[styles.detailBox, {
              backgroundColor: 'rgba(245, 245, 245, 0.15)',
              elevation: scrollPosition > 0 ? 2 : 0,
              shadowColor: scrollPosition > 0 ? '#000' : 'transparent'
            }]}>
              <Ionicons name="eye-outline" size={24} color="#B0BEC5" />
              <DynamicText style={[styles.detailLabel, { color: 'rgba(255, 255, 255, 0.85)' }]}>Visibility</DynamicText>
              <DynamicText style={[styles.detailValue, { color: 'rgba(255, 255, 255, 0.85)' }]}>{weatherData.visibility} km</DynamicText>
            </View>
          </View>
        </View>

        {/* Feature Cards */}
        <View style={styles.featureCardsContainer}>
          <View style={styles.animatedCardContainer}>
            <ThemedView style={[styles.featureCard, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <Ionicons 
                name="umbrella-outline" 
                size={28} 
                color="#1E90FF"
                style={styles.featureIcon} 
              />
              <View style={styles.featureTextContainer}>
                <ThemedText style={{color: '#FFFFFF', fontSize: 16, fontWeight: 'bold'}}>Rain Forecast</ThemedText>
                <ThemedText style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                  {weatherData.rainChance > 50 ? 
                    `Bring an umbrella • ${weatherData.rainChance}% chance today` :
                    weatherData.rainChance > 30 ?
                    `Light rain possible • ${weatherData.rainChance}% chance` :
                    `Mostly dry • ${weatherData.rainChance}% chance of rain`
                  }
                </ThemedText>
              </View>
            </ThemedView>
          </View>

          <View style={styles.animatedCardContainer}>
            <ThemedView style={[styles.featureCard, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <Ionicons 
                name="leaf-outline" 
                size={28} 
                color="#FFC400"
                style={styles.featureIcon} 
              />
              <View style={styles.featureTextContainer}>
                <ThemedText style={{color: '#FFFFFF', fontSize: 16, fontWeight: 'bold'}}>UV & Pollen</ThemedText>
                <ThemedText style={{color: 'rgba(255, 255, 255, 0.8)'}}>
                  UV Index {weatherData.uvIndex} • Low pollen count
                </ThemedText>
              </View>
            </ThemedView>
          </View>
        </View>

        {/* Event Planning Section */}
        <View style={styles.animatedContainer}>
          <ThemedText style={[styles.sectionTitle, {color: '#FFFFFF', marginBottom: 10}]}>
            Event Planning
          </ThemedText>
          <EventPlanner 
            temperature={weatherData.temperature} 
            condition={weatherData.condition}
            rainChance={weatherData.rainChance}
          />
        </View>

        {/* Daily Tips */}
        <View style={styles.animatedContainer}>
          <ThemedText style={[styles.sectionTitle, {color: '#FFFFFF', marginBottom: 10}]}>
            Daily Tips
          </ThemedText>
          <DailyTips
            temperature={weatherData.temperature}
            condition={weatherData.condition}
            uvIndex={weatherData.uvIndex}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  temperatureTopContainer: {
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  weatherDetailsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  weatherDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailIcon: {
    marginRight: 8,
  },
  forecastContainer: {
    marginTop: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginLeft: 10,
  },
  hourItem: {
    alignItems: 'center',
    padding: 12,
    width: 80,
    marginHorizontal: 6,
    borderRadius: 12,
    justifyContent: 'center',
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 20, 
    right: 20,
    backgroundColor: '#4A90E2',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  additionalContent: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailBox: {
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: '31%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  detailLabel: {
    fontSize: 13,
    marginTop: 6,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 3,
  },
  featureCardsContainer: {
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  animatedCardContainer: {
    marginBottom: 15,
  },
  animatedContainer: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  featureCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  featureIcon: {
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
    zIndex: 1,
  },
  cardGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  temperatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherIconContainer: {
    marginRight: 10,
    marginTop: 10,
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  tipCard: {
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tipIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tipContent: {
    flex: 1,
    alignItems: 'center',
  },
  planningCard: {
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  planningIconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  planningContent: {
    flex: 1,
    alignItems: 'center',
  },
  temperatureText: {
    fontSize: 65,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 75,
    fontFamily: 'System',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6
  },
  conditionText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: -5,
    textAlign: 'center',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6
  },
});
