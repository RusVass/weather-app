export interface WeatherApiErrorResponse {
  error?: {
    code?: number
    message?: string
  }
}

export interface WeatherApiConditionResponse {
  text: string
  icon: string
}

export interface WeatherApiLocationResponse {
  name: string
  country: string
}

export interface WeatherApiCurrentResponse {
  location: WeatherApiLocationResponse
  current: {
    temp_c: number
    feelslike_c: number
    humidity: number
    wind_kph: number
    condition: WeatherApiConditionResponse
    last_updated: string
  }
}

export interface WeatherApiForecastDayResponse {
  date: string
  day: {
    maxtemp_c: number
    mintemp_c: number
    condition: WeatherApiConditionResponse
  }
}

export interface WeatherApiForecastResponse {
  location: WeatherApiLocationResponse
  forecast: {
    forecastday: WeatherApiForecastDayResponse[]
  }
}
