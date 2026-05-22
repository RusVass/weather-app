import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { CityName } from '../../../shared/types/weather.ts'

const FAVORITES_STORAGE_KEY = 'weather_app_favorites'

const normalizeCityName = (cityName: string): string => {
  return cityName.trim().toLowerCase()
}

const deduplicateFavoriteCities = (cities: CityName[]): CityName[] => {
  const uniqueCities: CityName[] = []
  const seenNormalizedNames = new Set<string>()

  for (let index = 0; index < cities.length; index += 1) {
    const cityName = cities[index]

    if (typeof cityName !== 'string') {
      continue
    }

    const trimmedCityName = cityName.trim()

    if (trimmedCityName === '') {
      continue
    }

    const normalizedCityName = normalizeCityName(trimmedCityName)

    if (seenNormalizedNames.has(normalizedCityName)) {
      continue
    }

    seenNormalizedNames.add(normalizedCityName)
    uniqueCities.push(trimmedCityName)
  }

  return uniqueCities
}

interface WeatherStoreState {
  selectedCity: CityName | null
  favorites: CityName[]
  setSelectedCity: (cityName: CityName | null) => void
  addFavorite: (cityName: CityName) => void
  removeFavorite: (cityName: CityName) => void
}

export const useWeatherStore = create<WeatherStoreState>()(
  persist(
    (set) => {
      return {
        selectedCity: null,
        favorites: [],
        setSelectedCity: (cityName) => {
          set({ selectedCity: cityName })
        },
        addFavorite: (cityName) => {
          set((state) => {
            const trimmedCityName = cityName.trim()

            if (trimmedCityName === '') {
              return state
            }

            const normalizedCityName = normalizeCityName(trimmedCityName)

            for (let index = 0; index < state.favorites.length; index += 1) {
              const existingCityName = state.favorites[index]
              const normalizedExistingCityName = normalizeCityName(existingCityName)

              if (normalizedExistingCityName === normalizedCityName) {
                return state
              }
            }

            return {
              favorites: [...state.favorites, trimmedCityName],
            }
          })
        },
        removeFavorite: (cityName) => {
          set((state) => {
            const normalizedCityName = normalizeCityName(cityName)
            const nextFavorites: CityName[] = []

            for (let index = 0; index < state.favorites.length; index += 1) {
              const existingCityName = state.favorites[index]
              const normalizedExistingCityName = normalizeCityName(existingCityName)

              if (normalizedExistingCityName === normalizedCityName) {
                continue
              }

              nextFavorites.push(existingCityName)
            }

            return { favorites: nextFavorites }
          })
        },
      }
    },
    {
      name: FAVORITES_STORAGE_KEY,
      storage: createJSONStorage(() => {
        return localStorage
      }),
      partialize: (state) => {
        return { favorites: state.favorites }
      },
      merge: (persistedState, currentState) => {
        const persistedData = persistedState as Partial<WeatherStoreState> | undefined
        const persistedFavorites = Array.isArray(persistedData?.favorites)
          ? persistedData.favorites
          : []

        return {
          ...currentState,
          favorites: deduplicateFavoriteCities(persistedFavorites),
        }
      },
    },
  ),
)
