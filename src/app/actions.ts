'use server';

import { z } from 'zod';
import type { WeatherData, WeatherState } from '@/lib/types';

const WeatherSchema = z.object({
  city: z.string().min(2, { message: 'City name must be at least 2 characters long.' }).max(50, { message: 'City name must be 50 characters or less.' }),
});

const mockWeatherData: Record<string, WeatherData> = {
  'london': {
    location: 'London',
    temperature: 18,
    description: 'Sunny',
    icon: 'Sun',
    humidity: 60,
    windSpeed: 10,
  },
  'paris': {
    location: 'Paris',
    temperature: 14,
    description: 'Rainy',
    icon: 'CloudRain',
    humidity: 85,
    windSpeed: 15,
  },
  'new york': {
    location: 'New York',
    temperature: 16,
    description: 'Cloudy',
    icon: 'Cloudy',
    humidity: 75,
    windSpeed: 12,
  },
  'tokyo': {
    location: 'Tokyo',
    temperature: -2,
    description: 'Snowy',
    icon: 'Snowflake',
    humidity: 80,
    windSpeed: 5,
  },
  'mumbai': {
    location: 'Mumbai',
    temperature: 32,
    description: 'Hazy Sun',
    icon: 'Sun',
    humidity: 70,
    windSpeed: 12,
  },
  'delhi': {
    location: 'Delhi',
    temperature: 35,
    description: 'Sunny',
    icon: 'Sun',
    humidity: 40,
    windSpeed: 8,
  },
  'bengaluru': {
    location: 'Bengaluru',
    temperature: 28,
    description: 'Cloudy',
    icon: 'Cloudy',
    humidity: 65,
    windSpeed: 15,
  },
  'kolkata': {
    location: 'Kolkata',
    temperature: 31,
    description: 'Cloudy',
    icon: 'Cloudy',
    humidity: 78,
    windSpeed: 11,
  },
  'chennai': {
    location: 'Chennai',
    temperature: 33,
    description: 'Sunny',
    icon: 'Sun',
    humidity: 75,
    windSpeed: 18,
  },
  'hyderabad': {
    location: 'Hyderabad',
    temperature: 30,
    description: 'Hazy Sun',
    icon: 'Sun',
    humidity: 60,
    windSpeed: 14,
  },
  'pune': {
    location: 'Pune',
    temperature: 29,
    description: 'Cloudy',
    icon: 'Cloudy',
    humidity: 70,
    windSpeed: 13,
  },
  'amaravati': { location: 'Amaravati', temperature: 34, description: 'Sunny', icon: 'Sun', humidity: 68, windSpeed: 11 },
  'itanagar': { location: 'Itanagar', temperature: 25, description: 'Cloudy', icon: 'Cloudy', humidity: 80, windSpeed: 7 },
  'dispur': { location: 'Dispur', temperature: 29, description: 'Rainy', icon: 'CloudRain', humidity: 88, windSpeed: 9 },
  'patna': { location: 'Patna', temperature: 36, description: 'Hazy Sun', icon: 'Sun', humidity: 55, windSpeed: 10 },
  'raipur': { location: 'Raipur', temperature: 33, description: 'Sunny', icon: 'Sun', humidity: 60, windSpeed: 12 },
  'panaji': { location: 'Panaji', temperature: 31, description: 'Cloudy', icon: 'Cloudy', humidity: 75, windSpeed: 18 },
  'gandhinagar': { location: 'Gandhinagar', temperature: 38, description: 'Sunny', icon: 'Sun', humidity: 45, windSpeed: 15 },
  'chandigarh': { location: 'Chandigarh', temperature: 31, description: 'Hazy Sun', icon: 'Sun', humidity: 50, windSpeed: 13 },
  'shimla': { location: 'Shimla', temperature: 22, description: 'Sunny', icon: 'Sun', humidity: 40, windSpeed: 8 },
  'ranchi': { location: 'Ranchi', temperature: 32, description: 'Cloudy', icon: 'Cloudy', humidity: 65, windSpeed: 11 },
  'thiruvananthapuram': { location: 'Thiruvananthapuram', temperature: 30, description: 'Rainy', icon: 'CloudRain', humidity: 85, windSpeed: 20 },
  'bhopal': { location: 'Bhopal', temperature: 35, description: 'Sunny', icon: 'Sun', humidity: 55, windSpeed: 14 },
  'imphal': { location: 'Imphal', temperature: 26, description: 'Cloudy', icon: 'Cloudy', humidity: 82, windSpeed: 6 },
  'shillong': { location: 'Shillong', temperature: 23, description: 'Rainy', icon: 'CloudRain', humidity: 90, windSpeed: 5 },
  'aizawl': { location: 'Aizawl', temperature: 24, description: 'Cloudy', icon: 'Cloudy', humidity: 85, windSpeed: 7 },
  'kohima': { location: 'Kohima', temperature: 23, description: 'Cloudy', icon: 'Cloudy', humidity: 83, windSpeed: 6 },
  'bhubaneswar': { location: 'Bhubaneswar', temperature: 34, description: 'Hazy Sun', icon: 'Sun', humidity: 72, windSpeed: 16 },
  'jaipur': { location: 'Jaipur', temperature: 39, description: 'Sunny', icon: 'Sun', humidity: 30, windSpeed: 17 },
  'gangtok': { location: 'Gangtok', temperature: 20, description: 'Cloudy', icon: 'Cloudy', humidity: 78, windSpeed: 4 },
  'agartala': { location: 'Agartala', temperature: 30, description: 'Rainy', icon: 'CloudRain', humidity: 87, windSpeed: 8 },
  'lucknow': { location: 'Lucknow', temperature: 37, description: 'Hazy Sun', icon: 'Sun', humidity: 50, windSpeed: 12 },
  'dehradun': { location: 'Dehradun', temperature: 28, description: 'Sunny', icon: 'Sun', humidity: 60, windSpeed: 9 },
  'port blair': { location: 'Port Blair', temperature: 30, description: 'Rainy', icon: 'CloudRain', humidity: 85, windSpeed: 22 },
  'daman': { location: 'Daman', temperature: 32, description: 'Cloudy', icon: 'Cloudy', humidity: 70, windSpeed: 19 },
  'srinagar': { location: 'Srinagar', temperature: 18, description: 'Cloudy', icon: 'Cloudy', humidity: 65, windSpeed: 10 },
  'leh': { location: 'Leh', temperature: 10, description: 'Sunny', icon: 'Sun', humidity: 35, windSpeed: 15 },
  'kavaratti': { location: 'Kavaratti', temperature: 31, description: 'Rainy', icon: 'CloudRain', humidity: 80, windSpeed: 25 },
  'pondicherry': { location: 'Pondicherry', temperature: 32, description: 'Sunny', icon: 'Sun', humidity: 77, windSpeed: 18 },
};

export async function getWeather(
  prevState: WeatherState,
  formData: FormData
): Promise<WeatherState> {
  const cityInput = formData.get('city');

  const validatedFields = WeatherSchema.safeParse({
    city: cityInput,
  });

  const cityString = typeof cityInput === 'string' ? cityInput : '';

  if (!validatedFields.success) {
    return {
      data: null,
      error: validatedFields.error.flatten().fieldErrors.city?.[0] || 'Invalid input.',
      input: cityString,
    };
  }
  
  const city = validatedFields.data.city.toLowerCase();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const weatherData = mockWeatherData[city];

  if (weatherData) {
    return { data: weatherData, error: null, input: validatedFields.data.city };
  } else {
    return {
      data: null,
      error: 'City not found. Please try a different location.',
      input: validatedFields.data.city,
    };
  }
}
