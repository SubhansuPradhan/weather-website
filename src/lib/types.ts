import type { IconName } from '@/components/icons';

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  icon: IconName;
  humidity: number;
  windSpeed: number;
}

export interface WeatherState {
  data: WeatherData | null;
  error: string | null;
  input?: string;
}
