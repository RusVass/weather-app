import type { ReactElement } from 'react'
import type { ForecastDay } from '../../../shared/types/weather.ts'
import './forecast-section.css'

interface ForecastSectionProps {
  forecast: ForecastDay[]
}

export const ForecastSection = ({ forecast }: ForecastSectionProps): ReactElement => {
  return (
    <section className="forecast-section">
      <h2 className="forecast-section__title">5-Day Forecast</h2>
      <ul className="forecast-section__list">
        {forecast.map((forecastDay) => {
          return (
            <li className="forecast-section__item" key={forecastDay.date}>
              <p className="forecast-section__date">{forecastDay.date}</p>
              <img
                className="forecast-section__icon"
                src={forecastDay.condition.iconUrl}
                alt={forecastDay.condition.text}
                width={36}
                height={36}
              />
              <p className="forecast-section__temps">
                {forecastDay.minTemperatureCelsius}°C, {forecastDay.maxTemperatureCelsius}°C
              </p>
              <p className="forecast-section__condition">{forecastDay.condition.text}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
