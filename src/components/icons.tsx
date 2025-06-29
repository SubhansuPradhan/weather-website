import type { LucideProps } from "lucide-react"
import { Sun, Cloud, CloudRain, Snowflake, Wind, Droplets, Thermometer, GaugeCircle, Eye } from "lucide-react"

export const Icons = {
  Sun,
  Cloudy: Cloud,
  CloudRain,
  Snowflake,
  Wind,
  Droplets,
  Thermometer,
  GaugeCircle,
  Eye,
}

export type IconName = keyof typeof Icons

interface WeatherIconProps extends LucideProps {
  name: IconName
}

export function WeatherIcon({ name, ...props }: WeatherIconProps) {
  const IconComponent = Icons[name]

  if (!IconComponent) {
    return null
  }

  return <IconComponent {...props} />
}
