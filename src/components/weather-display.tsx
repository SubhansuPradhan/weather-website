import { WeatherIcon, type IconName } from '@/components/icons';
import type { WeatherData } from '@/lib/types';

function WeatherDetailItem({
  icon,
  label,
  value,
}: {
  icon: IconName;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-card p-4 flex flex-col items-center justify-center text-center">
      <WeatherIcon name={icon} className="mx-auto h-8 w-8 text-primary" />
      <p className="mt-2 text-lg font-semibold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function WeatherDisplay({ data }: { data: WeatherData }) {
  return (
    <div className="animate-in fade-in-50 duration-500">
      <div className="text-center">
        <WeatherIcon name={data.icon} className="mx-auto h-24 w-24 text-primary" />
        <h2 className="mt-4 text-5xl font-bold font-headline">{data.temperature}°C</h2>
        <p className="text-2xl text-muted-foreground">{data.description}</p>
        <p className="text-lg font-semibold">{data.location}</p>
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        <WeatherDetailItem icon="Thermometer" label="Feels Like" value={`${data.feelsLike}°C`} />
        <WeatherDetailItem icon="Droplets" label="Humidity" value={`${data.humidity}%`} />
        <WeatherDetailItem icon="Wind" label="Wind Speed" value={`${data.windSpeed} km/h`} />
        <WeatherDetailItem icon="GaugeCircle" label="Pressure" value={`${data.pressure} hPa`} />
        <WeatherDetailItem icon="Eye" label="Visibility" value={`${data.visibility} km`} />
        <WeatherDetailItem icon="Sun" label="UV Index" value={data.uvIndex} />
      </div>
    </div>
  );
}
