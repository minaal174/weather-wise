import * as Location from 'expo-location';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  rainChance: number;
  windSpeed: number;
  windDirection: string;
  uvIndex: number;
  feelsLike: number;
  visibility: number;
}

export class WeatherService {
  static async getCurrentLocation(): Promise<Location.LocationObject | null> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        return null;
      }

      const location = await Location.getCurrentPositionAsync({});
      return location;
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  }

  static async getWeatherData(): Promise<WeatherData> {
    // Mock weather data with realistic values
    return {
      temperature: 22,
      condition: 'Partly cloudy',
      humidity: 65,
      rainChance: 30,
      windSpeed: 8,
      windDirection: 'NE',
      uvIndex: 5,
      feelsLike: 23,
      visibility: 10,
    };
  }

  // Helper function to get random weather data for testing different conditions
  static async getRandomWeatherData(): Promise<WeatherData> {
    const conditions = [
      'Sunny',
      'Partly cloudy',
      'Cloudy',
      'Light rain',
      'Heavy rain',
      'Thunderstorm',
      'Clear'
    ];

    const windDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    return {
      temperature: Math.floor(Math.random() * (35 - 10) + 10), // Temperature between 10-35°C
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      humidity: Math.floor(Math.random() * (90 - 40) + 40), // Humidity between 40-90%
      rainChance: Math.floor(Math.random() * 100), // Rain chance 0-100%
      windSpeed: Math.floor(Math.random() * (30 - 0) + 0), // Wind speed 0-30 mph
      windDirection: windDirections[Math.floor(Math.random() * windDirections.length)],
      uvIndex: Math.floor(Math.random() * (11 - 0) + 0), // UV index 0-11
      feelsLike: Math.floor(Math.random() * (35 - 10) + 10), // Feels like temperature
      visibility: Math.floor(Math.random() * (15 - 5) + 5), // Visibility 5-15 km
    };
  }
} 