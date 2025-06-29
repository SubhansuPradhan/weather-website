'use server';

import { z } from 'zod';
import type { WeatherData, WeatherState } from '@/lib/types';

const WeatherSchema = z.object({
  city: z.string().min(2, { message: 'City or state name must be at least 2 characters long.' }).max(50, { message: 'City or state name must be 50 characters or less.' }),
});

const stateToCapitalMap: Record<string, string> = {
  'andhra pradesh': 'amaravati',
  'arunachal pradesh': 'itanagar',
  'assam': 'dispur',
  'bihar': 'patna',
  'chhattisgarh': 'raipur',
  'goa': 'panaji',
  'gujarat': 'gandhinagar',
  'haryana': 'chandigarh',
  'himachal pradesh': 'shimla',
  'jharkhand': 'ranchi',
  'karnataka': 'bengaluru',
  'kerala': 'thiruvananthapuram',
  'madhya pradesh': 'bhopal',
  'maharashtra': 'mumbai',
  'manipur': 'imphal',
  'meghalaya': 'shillong',
  'mizoram': 'aizawl',
  'nagaland': 'kohima',
  'odisha': 'bhubaneswar',
  'punjab': 'chandigarh',
  'rajasthan': 'jaipur',
  'sikkim': 'gangtok',
  'tamil nadu': 'chennai',
  'telangana': 'hyderabad',
  'tripura': 'agartala',
  'uttar pradesh': 'lucknow',
  'uttarakhand': 'dehradun',
  'west bengal': 'kolkata',
};

const mockWeatherData: Record<string, WeatherData> = {
  'london': { location: 'London', temperature: 18, description: 'Sunny', icon: 'Sun', humidity: 60, windSpeed: 10, feelsLike: 17, pressure: 1012, visibility: 10, uvIndex: 4 },
  'paris': { location: 'Paris', temperature: 14, description: 'Rainy', icon: 'CloudRain', humidity: 85, windSpeed: 15, feelsLike: 12, pressure: 1008, visibility: 7, uvIndex: 1 },
  'new york': { location: 'New York', temperature: 16, description: 'Cloudy', icon: 'Cloudy', humidity: 75, windSpeed: 12, feelsLike: 15, pressure: 1015, visibility: 8, uvIndex: 3 },
  'tokyo': { location: 'Tokyo', temperature: -2, description: 'Snowy', icon: 'Snowflake', humidity: 80, windSpeed: 5, feelsLike: -5, pressure: 1020, visibility: 6, uvIndex: 0 },
  'mumbai': { location: 'Mumbai', temperature: 32, description: 'Hazy Sun', icon: 'Sun', humidity: 70, windSpeed: 12, feelsLike: 35, pressure: 1005, visibility: 4, uvIndex: 9 },
  'delhi': { location: 'Delhi', temperature: 35, description: 'Sunny', icon: 'Sun', humidity: 40, windSpeed: 8, feelsLike: 37, pressure: 1002, visibility: 5, uvIndex: 10 },
  'bengaluru': { location: 'Bengaluru', temperature: 28, description: 'Cloudy', icon: 'Cloudy', humidity: 65, windSpeed: 15, feelsLike: 29, pressure: 1010, visibility: 6, uvIndex: 8 },
  'kolkata': { location: 'Kolkata', temperature: 31, description: 'Cloudy', icon: 'Cloudy', humidity: 78, windSpeed: 11, feelsLike: 34, pressure: 1006, visibility: 5, uvIndex: 9 },
  'chennai': { location: 'Chennai', temperature: 33, description: 'Sunny', icon: 'Sun', humidity: 75, windSpeed: 18, feelsLike: 36, pressure: 1007, visibility: 7, uvIndex: 11 },
  'hyderabad': { location: 'Hyderabad', temperature: 30, description: 'Hazy Sun', icon: 'Sun', humidity: 60, windSpeed: 14, feelsLike: 32, pressure: 1009, visibility: 6, uvIndex: 10 },
  'pune': { location: 'Pune', temperature: 29, description: 'Cloudy', icon: 'Cloudy', humidity: 70, windSpeed: 13, feelsLike: 30, pressure: 1011, visibility: 7, uvIndex: 8 },
  'amaravati': { location: 'Amaravati', temperature: 34, description: 'Sunny', icon: 'Sun', humidity: 68, windSpeed: 11, feelsLike: 37, pressure: 1006, visibility: 6, uvIndex: 11 },
  'itanagar': { location: 'Itanagar', temperature: 25, description: 'Cloudy', icon: 'Cloudy', humidity: 80, windSpeed: 7, feelsLike: 26, pressure: 1012, visibility: 5, uvIndex: 7 },
  'dispur': { location: 'Dispur', temperature: 29, description: 'Rainy', icon: 'CloudRain', humidity: 88, windSpeed: 9, feelsLike: 31, pressure: 1008, visibility: 4, uvIndex: 6 },
  'patna': { location: 'Patna', temperature: 36, description: 'Hazy Sun', icon: 'Sun', humidity: 55, windSpeed: 10, feelsLike: 39, pressure: 1003, visibility: 5, uvIndex: 10 },
  'raipur': { location: 'Raipur', temperature: 33, description: 'Sunny', icon: 'Sun', humidity: 60, windSpeed: 12, feelsLike: 35, pressure: 1007, visibility: 6, uvIndex: 10 },
  'panaji': { location: 'Panaji', temperature: 31, description: 'Cloudy', icon: 'Cloudy', humidity: 75, windSpeed: 18, feelsLike: 34, pressure: 1009, visibility: 7, uvIndex: 9 },
  'gandhinagar': { location: 'Gandhinagar', temperature: 38, description: 'Sunny', icon: 'Sun', humidity: 45, windSpeed: 15, feelsLike: 40, pressure: 1004, visibility: 8, uvIndex: 11 },
  'chandigarh': { location: 'Chandigarh', temperature: 31, description: 'Hazy Sun', icon: 'Sun', humidity: 50, windSpeed: 13, feelsLike: 32, pressure: 1008, visibility: 7, uvIndex: 9 },
  'shimla': { location: 'Shimla', temperature: 22, description: 'Sunny', icon: 'Sun', humidity: 40, windSpeed: 8, feelsLike: 21, pressure: 1015, visibility: 10, uvIndex: 8 },
  'ranchi': { location: 'Ranchi', temperature: 32, description: 'Cloudy', icon: 'Cloudy', humidity: 65, windSpeed: 11, feelsLike: 34, pressure: 1009, visibility: 6, uvIndex: 9 },
  'thiruvananthapuram': { location: 'Thiruvananthapuram', temperature: 30, description: 'Rainy', icon: 'CloudRain', humidity: 85, windSpeed: 20, feelsLike: 33, pressure: 1008, visibility: 5, uvIndex: 8 },
  'bhopal': { location: 'Bhopal', temperature: 35, description: 'Sunny', icon: 'Sun', humidity: 55, windSpeed: 14, feelsLike: 37, pressure: 1005, visibility: 7, uvIndex: 10 },
  'imphal': { location: 'Imphal', temperature: 26, description: 'Cloudy', icon: 'Cloudy', humidity: 82, windSpeed: 6, feelsLike: 27, pressure: 1013, visibility: 5, uvIndex: 7 },
  'shillong': { location: 'Shillong', temperature: 23, description: 'Rainy', icon: 'CloudRain', humidity: 90, windSpeed: 5, feelsLike: 24, pressure: 1014, visibility: 4, uvIndex: 6 },
  'aizawl': { location: 'Aizawl', temperature: 24, description: 'Cloudy', icon: 'Cloudy', humidity: 85, windSpeed: 7, feelsLike: 25, pressure: 1013, visibility: 5, uvIndex: 7 },
  'kohima': { location: 'Kohima', temperature: 23, description: 'Cloudy', icon: 'Cloudy', humidity: 83, windSpeed: 6, feelsLike: 24, pressure: 1014, visibility: 5, uvIndex: 7 },
  'bhubaneswar': { location: 'Bhubaneswar', temperature: 34, description: 'Hazy Sun', icon: 'Sun', humidity: 72, windSpeed: 16, feelsLike: 37, pressure: 1007, visibility: 6, uvIndex: 10 },
  'jaipur': { location: 'Jaipur', temperature: 39, description: 'Sunny', icon: 'Sun', humidity: 30, windSpeed: 17, feelsLike: 41, pressure: 1001, visibility: 8, uvIndex: 11 },
  'gangtok': { location: 'Gangtok', temperature: 20, description: 'Cloudy', icon: 'Cloudy', humidity: 78, windSpeed: 4, feelsLike: 20, pressure: 1016, visibility: 6, uvIndex: 7 },
  'agartala': { location: 'Agartala', temperature: 30, description: 'Rainy', icon: 'CloudRain', humidity: 87, windSpeed: 8, feelsLike: 33, pressure: 1008, visibility: 5, uvIndex: 8 },
  'lucknow': { location: 'Lucknow', temperature: 37, description: 'Hazy Sun', icon: 'Sun', humidity: 50, windSpeed: 12, feelsLike: 39, pressure: 1004, visibility: 6, uvIndex: 10 },
  'dehradun': { location: 'Dehradun', temperature: 28, description: 'Sunny', icon: 'Sun', humidity: 60, windSpeed: 9, feelsLike: 28, pressure: 1012, visibility: 8, uvIndex: 9 },
  'port blair': { location: 'Port Blair', temperature: 30, description: 'Rainy', icon: 'CloudRain', humidity: 85, windSpeed: 22, feelsLike: 33, pressure: 1009, visibility: 5, uvIndex: 9 },
  'daman': { location: 'Daman', temperature: 32, description: 'Cloudy', icon: 'Cloudy', humidity: 70, windSpeed: 19, feelsLike: 35, pressure: 1008, visibility: 7, uvIndex: 9 },
  'srinagar': { location: 'Srinagar', temperature: 18, description: 'Cloudy', icon: 'Cloudy', humidity: 65, windSpeed: 10, feelsLike: 17, pressure: 1018, visibility: 8, uvIndex: 6 },
  'leh': { location: 'Leh', temperature: 10, description: 'Sunny', icon: 'Sun', humidity: 35, windSpeed: 15, feelsLike: 8, pressure: 1022, visibility: 12, uvIndex: 7 },
  'kavaratti': { location: 'Kavaratti', temperature: 31, description: 'Rainy', icon: 'CloudRain', humidity: 80, windSpeed: 25, feelsLike: 34, pressure: 1009, visibility: 6, uvIndex: 10 },
  'pondicherry': { location: 'Pondicherry', temperature: 32, description: 'Sunny', icon: 'Sun', humidity: 77, windSpeed: 18, feelsLike: 35, pressure: 1008, visibility: 7, uvIndex: 11 },
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
  
  const inputLower = validatedFields.data.city.toLowerCase();
  const city = stateToCapitalMap[inputLower] || inputLower;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const weatherData = mockWeatherData[city];

  if (weatherData) {
    return { data: weatherData, error: null, input: validatedFields.data.city };
  } else {
    return {
      data: null,
      error: 'Location not found. Please try a different Indian state or capital city.',
      input: validatedFields.data.city,
    };
  }
}
