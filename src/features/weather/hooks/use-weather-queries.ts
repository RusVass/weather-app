import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchCurrentWeather, fetchForecast } from '../../../shared/api/index.ts'
import type { CurrentWeather, ForecastDay } from '../../../shared/types/weather.ts'
import { useWeatherStore } from '../store/index.ts'

const FORECAST_DAYS_COUNT = 5

const normalizeSelectedCity = (selectedCity: string | null): string => {
  if (!selectedCity) {
    return ''
  }

  return selectedCity.trim()
}

export const useCurrentWeatherQuery = (): UseQueryResult<CurrentWeather> => {
  const selectedCity = useWeatherStore((state) => state.selectedCity)
  const normalizedSelectedCity = normalizeSelectedCity(selectedCity)
  const hasSelectedCity = normalizedSelectedCity !== ''

  return useQuery({
    queryKey: ['weather', 'current', normalizedSelectedCity],
    queryFn: () => {
      return fetchCurrentWeather(normalizedSelectedCity)
    },
    enabled: hasSelectedCity,
  })
}

export const useForecastQuery = (): UseQueryResult<ForecastDay[]> => {
  const selectedCity = useWeatherStore((state) => state.selectedCity)
  const normalizedSelectedCity = normalizeSelectedCity(selectedCity)
  const hasSelectedCity = normalizedSelectedCity !== ''

  return useQuery({
    queryKey: ['weather', 'forecast', normalizedSelectedCity, FORECAST_DAYS_COUNT],
    queryFn: () => {
      return fetchForecast(normalizedSelectedCity, FORECAST_DAYS_COUNT)
    },
    enabled: hasSelectedCity,
  })
}
