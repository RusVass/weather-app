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
        <div className="current-weather-card__header-right">
          <button
            className={`current-weather-card__action-button${isFavorite ? ' current-weather-card__action-button--active' : ''}`}
            type="button"
            aria-label={getFavoriteButtonLabel()}
            onClick={handleFavoriteButtonClick}
          >
            {isFavorite ? (
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M1.5 3.5h12M5 3.5V2.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v1M5.5 6.5v5M9.5 6.5v5M2.5 3.5l.9 8.6a1 1 0 001 .9h6.2a1 1 0 001-.9l.9-8.6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2v12M2 8h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            )}
          </button>
          <img
            className="current-weather-card__icon"
            src={weather.condition.iconUrl}
            alt={weather.condition.text}
            width={64}
            height={64}
          />
        </div>
      </div>

      <p className="current-weather-card__temperature">{weather.temperatureCelsius}°C</p>

      <ul className="current-weather-card__details">
        <li>Feels like, {weather.feelsLikeCelsius}°C</li>
        <li>Humidity, {weather.humidityPercent}%</li>
        <li>Wind, {weather.windSpeedKph} km/h</li>
      </ul>
    </section>
  )
}
