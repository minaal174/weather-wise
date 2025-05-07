// Environment configuration
const ENV = {
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  // Add any other environment variables here if needed
};

// Validate that all required environment variables are present
const requiredEnvVars = ['WEATHER_API_KEY'];

for (const envVar of requiredEnvVars) {
  if (!ENV[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export default ENV; 