import { WeatherIcon } from '@/components/icons';
import type { WeatherData } from '@/lib/types';

export function WeatherDisplay({ data }: { data: WeatherData }) {
  return (
    <div className="animate-in fade-in-50 duration-500">
      <div className="text-center">
        <WeatherIcon name={data.icon} className="mx-auto h-24 w-24 text-primary" />
        <h2 className="mt-4 text-5xl font-bold font-headline">{data.temperature}°C</h2>
        <p className="text-2xl text-muted-foreground">{data.description}</p>
        <p className="text-lg font-semibold">{data.location}</p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 text-center">
        <div className="rounded-lg border bg-card p-4">
          <WeatherIcon name="Droplets" className="mx-auto h-8 w-8 text-primary" />
          <p className="mt-2 text-lg font-semibold">{data.humidity}%</p>
          <p className="text-sm text-muted-foreground">Humidity</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <WeatherIcon name="Wind" className="mx-auto h-8 w-8 text-primary" />
          <p className="mt-2 text-lg font-semibold">{data.windSpeed} km/h</p>
          <p className="text-sm text-muted-foreground">Wind Speed</p>
        </div>
      </div>
    </div>
  );
}
