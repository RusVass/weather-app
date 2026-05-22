export type CityName = string

export interface WeatherCondition {
  text: string
  iconUrl: string
}

export interface CurrentWeather {
  cityName: string
  countryName: string
  temperatureCelsius: number
  feelsLikeCelsius: number
  humidityPercent: number
  windSpeedKph: number
  condition: WeatherCondition
  updatedAt: string
}

export interface ForecastDay {
  date: string
  minTemperatureCelsius: number
  maxTemperatureCelsius: number
  condition: WeatherCondition
}
