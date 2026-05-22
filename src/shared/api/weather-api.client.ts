import { getWeatherApiBaseUrl, getWeatherApiKey } from '../config/env.ts'
import { APP_ERROR_CODE, AppError, type AppErrorCode } from '../types/app-error.ts'
import type { CityName, CurrentWeather, ForecastDay } from '../types/weather.ts'
import { mapCurrentWeather, mapForecastDay } from './weather-api.mapper.ts'
import type {
  WeatherApiCurrentResponse,
  WeatherApiErrorResponse,
  WeatherApiForecastResponse,
} from './weather-api.types.ts'

const mapApiErrorCode = (statusCode: number): AppErrorCode => {
  if (statusCode === 404 || statusCode === 400) {
    return APP_ERROR_CODE.CITY_NOT_FOUND
  }

  if (statusCode === 429) {
    return APP_ERROR_CODE.RATE_LIMIT
  }

  return APP_ERROR_CODE.UNKNOWN
}

const createApiUrl = (
  endpoint: string,
  cityName: CityName,
  days?: number,
): string => {
  const params = new URLSearchParams({
    key: getWeatherApiKey(),
    q: cityName,
    lang: 'uk',
  })

  if (typeof days === 'number') {
    params.set('days', String(days))
  }

  return `${getWeatherApiBaseUrl()}/${endpoint}?${params.toString()}`
}

const parseErrorBody = async (
  response: Response,
): Promise<WeatherApiErrorResponse | null> => {
  try {
    const errorData = (await response.json()) as WeatherApiErrorResponse
    return errorData
  } catch {
    return null
  }
}

const fetchJson = async <T>(url: string): Promise<T> => {
  let response: Response

  try {
    response = await fetch(url)
  } catch {
    throw new AppError(
      APP_ERROR_CODE.NETWORK,
      'Request failed. Please check your internet connection.',
    )
  }

  if (!response.ok) {
    const errorData = await parseErrorBody(response)
    const messageFromApi = errorData?.error?.message
    const message = messageFromApi || 'Weather service returned an error.'
    const code = mapApiErrorCode(response.status)

    throw new AppError(code, message)
  }

  const jsonData = (await response.json()) as T
  return jsonData
}

export const fetchCurrentWeather = async (
  cityName: CityName,
): Promise<CurrentWeather> => {
  const url = createApiUrl('current.json', cityName)
  const apiData = await fetchJson<WeatherApiCurrentResponse>(url)
  return mapCurrentWeather(apiData)
}

export const fetchForecast = async (
  cityName: CityName,
  days: number = 5,
): Promise<ForecastDay[]> => {
  const url = createApiUrl('forecast.json', cityName, days)
  const apiData = await fetchJson<WeatherApiForecastResponse>(url)

  const forecastDays = apiData.forecast.forecastday
  const mappedDays: ForecastDay[] = []

  for (let index = 0; index < forecastDays.length; index += 1) {
    mappedDays.push(mapForecastDay(forecastDays[index]))
  }

  return mappedDays
}
