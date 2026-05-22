import type {
  WeatherApiConditionResponse,
  WeatherApiCurrentResponse,
  WeatherApiForecastDayResponse,
} from './weather-api.types.ts'
import type { CurrentWeather, ForecastDay, WeatherCondition } from '../types/weather.ts'

const normalizeIconUrl = (iconPath: string): string => {
  if (iconPath.startsWith('//')) {
    return `https:${iconPath}`
  }

  return iconPath
}

const mapCondition = (
  apiCondition: WeatherApiConditionResponse,
): WeatherCondition => {
  return {
    text: apiCondition.text,
    iconUrl: normalizeIconUrl(apiCondition.icon),
  }
}

export const mapCurrentWeather = (
  apiData: WeatherApiCurrentResponse,
): CurrentWeather => {
  return {
    cityName: apiData.location.name,
    countryName: apiData.location.country,
    temperatureCelsius: apiData.current.temp_c,
    feelsLikeCelsius: apiData.current.feelslike_c,
    humidityPercent: apiData.current.humidity,
    windSpeedKph: apiData.current.wind_kph,
    condition: mapCondition(apiData.current.condition),
    updatedAt: apiData.current.last_updated,
  }
}

export const mapForecastDay = (apiDay: WeatherApiForecastDayResponse): ForecastDay => {
  return {
    date: apiDay.date,
    minTemperatureCelsius: apiDay.day.mintemp_c,
    maxTemperatureCelsius: apiDay.day.maxtemp_c,
    condition: mapCondition(apiDay.day.condition),
  }
}
