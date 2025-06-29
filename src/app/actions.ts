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
