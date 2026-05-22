import type { ReactElement } from 'react'
import { useCurrentWeatherQuery, useForecastQuery } from './features/weather/hooks/index.ts'
import { useWeatherStore } from './features/weather/store/index.ts'
import {
  CitySearchForm,
  CurrentWeatherCard,
  FavoritesPanel,
  ForecastSection,
  StatusView,
} from './features/weather/components/index.ts'
import './App.css'

const App = (): ReactElement => {
  const selectedCity = useWeatherStore((state) => state.selectedCity)
  const favorites = useWeatherStore((state) => state.favorites)
  const setSelectedCity = useWeatherStore((state) => state.setSelectedCity)
  const addFavorite = useWeatherStore((state) => state.addFavorite)
  const removeFavorite = useWeatherStore((state) => state.removeFavorite)

  const currentWeatherQuery = useCurrentWeatherQuery()
  const forecastQuery = useForecastQuery()

  const hasSelectedCity = selectedCity !== null && selectedCity.trim() !== ''

  const handleSearch = (cityName: string): void => {
    setSelectedCity(cityName)
  }

  const handleSelectFavoriteCity = (cityName: string): void => {
    setSelectedCity(cityName)
  }

  const isCurrentCityFavorite = (): boolean => {
    if (!currentWeatherQuery.data) {
      return false
    }

    const normalizedCurrentCity = currentWeatherQuery.data.cityName.trim().toLowerCase()

    for (let index = 0; index < favorites.length; index += 1) {
      const favoriteCity = favorites[index]
      const normalizedFavoriteCity = favoriteCity.trim().toLowerCase()

      if (normalizedFavoriteCity === normalizedCurrentCity) {
        return true
      }
    }

    return false
  }

  const getErrorMessage = (): string => {
    if (currentWeatherQuery.error instanceof Error) {
      return currentWeatherQuery.error.message
    }

    if (forecastQuery.error instanceof Error) {
      return forecastQuery.error.message
    }

    return 'Failed to load weather data.'
  }

  const renderMainContent = (): ReactElement => {
    if (!hasSelectedCity) {
      return (
        <StatusView
          title="Start with a search"
          message="Enter a city name to view current weather and forecast."
        />
      )
    }

    if (currentWeatherQuery.isLoading || forecastQuery.isLoading) {
      return <StatusView title="Loading" message="Loading weather data." />
    }

    if (currentWeatherQuery.isError || forecastQuery.isError) {
      return <StatusView title="Request failed" message={getErrorMessage()} />
    }

    if (!currentWeatherQuery.data || !forecastQuery.data) {
      return (
        <StatusView
          title="No data available"
          message="Please try again or search for another city."
        />
      )
    }

    return (
      <CurrentWeatherCard
        weather={currentWeatherQuery.data}
        isFavorite={isCurrentCityFavorite()}
        onAddFavorite={addFavorite}
        onRemoveFavorite={removeFavorite}
      />
    )
  }

  return (
    <main className="app">
      <h1 className="app__title">City Weather</h1>
      <CitySearchForm onSearch={handleSearch} />
      {currentWeatherQuery.data != null && forecastQuery.data != null && (
        <ForecastSection forecast={forecastQuery.data} />
      )}
      {renderMainContent()}
      <FavoritesPanel
        favorites={favorites}
        selectedCity={selectedCity}
        onSelectCity={handleSelectFavoriteCity}
        onRemoveFavorite={removeFavorite}
      />
    </main>
  )
}

export default App
