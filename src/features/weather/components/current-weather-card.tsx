import type { ReactElement } from 'react'
import type { CurrentWeather } from '../../../shared/types/weather.ts'
import './current-weather-card.css'

interface CurrentWeatherCardProps {
  weather: CurrentWeather
  isFavorite: boolean
  onAddFavorite: (cityName: string) => void
  onRemoveFavorite: (cityName: string) => void
}

export const CurrentWeatherCard = ({
  weather,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
}: CurrentWeatherCardProps): ReactElement => {
  const handleFavoriteButtonClick = (): void => {
    if (isFavorite) {
      onRemoveFavorite(weather.cityName)
      return
    }

    onAddFavorite(weather.cityName)
  }

  const getFavoriteButtonLabel = (): string => {
    if (isFavorite) {
      return 'Remove from favorites'
    }

    return 'Add to favorites'
  }

  return (
    <section className="current-weather-card">
      <div className="current-weather-card__header">
        <div>
          <h2 className="current-weather-card__city">
            {weather.cityName}, {weather.countryName}
          </h2>
          <p className="current-weather-card__condition">{weather.condition.text}</p>
        </div>
        <img
          className="current-weather-card__icon"
          src={weather.condition.iconUrl}
          alt={weather.condition.text}
          width={64}
          height={64}
        />
      </div>

      <p className="current-weather-card__temperature">{weather.temperatureCelsius}°C</p>

      <ul className="current-weather-card__details">
        <li>Feels like, {weather.feelsLikeCelsius}°C</li>
        <li>Humidity, {weather.humidityPercent}%</li>
        <li>Wind, {weather.windSpeedKph} km/h</li>
      </ul>

      <button
        className={`current-weather-card__favorite-button${isFavorite ? ' current-weather-card__favorite-button--active' : ''}`}
        type="button"
        onClick={handleFavoriteButtonClick}
      >
        {getFavoriteButtonLabel()}
      </button>
    </section>
  )
}
