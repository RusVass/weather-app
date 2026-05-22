import { APP_ERROR_CODE, AppError } from '../types/app-error.ts'

const DEFAULT_WEATHER_API_BASE_URL = 'https://api.weatherapi.com/v1'

export const getWeatherApiBaseUrl = (): string => {
  return DEFAULT_WEATHER_API_BASE_URL
}

export const getWeatherApiKey = (): string => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  if (!apiKey || apiKey.trim() === '') {
    throw new AppError(
      APP_ERROR_CODE.API_KEY_MISSING,
      'VITE_WEATHER_API_KEY is missing in environment variables.',
    )
  }

  return apiKey
}
