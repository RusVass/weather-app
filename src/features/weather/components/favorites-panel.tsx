import type { ReactElement } from 'react'
import './favorites-panel.css'

interface FavoritesPanelProps {
  favorites: string[]
  selectedCity: string | null
  onSelectCity: (cityName: string) => void
  onRemoveFavorite: (cityName: string) => void
}

const isSameCity = (leftCityName: string, rightCityName: string | null): boolean => {
  if (!rightCityName) {
    return false
  }

  const normalizedLeft = leftCityName.trim().toLowerCase()
  const normalizedRight = rightCityName.trim().toLowerCase()

  if (normalizedLeft === normalizedRight) {
    return true
  }

  return false
}

export const FavoritesPanel = ({
  favorites,
  selectedCity,
  onSelectCity,
  onRemoveFavorite,
}: FavoritesPanelProps): ReactElement => {
  if (favorites.length === 0) {
    return (
      <section className="favorites-panel">
        <h2 className="favorites-panel__title">Favorite Cities</h2>
        <p className="favorites-panel__empty">No favorite cities yet.</p>
      </section>
    )
  }

  return (
    <section className="favorites-panel">
      <h2 className="favorites-panel__title">Favorite Cities</h2>
      <ul className="favorites-panel__list">
        {favorites.map((cityName) => {
          let activeClassName = 'favorites-panel__select-button'

          if (isSameCity(cityName, selectedCity)) {
            activeClassName =
              'favorites-panel__select-button favorites-panel__select-button--active'
          }

          const handleSelectClick = (): void => {
            onSelectCity(cityName)
          }

          const handleRemoveClick = (): void => {
            onRemoveFavorite(cityName)
          }

          return (
            <li className="favorites-panel__item" key={cityName.toLowerCase()}>
              <button
                className={activeClassName}
                type="button"
                onClick={handleSelectClick}
              >
                {cityName}
              </button>
              <button
                className="favorites-panel__remove-button"
                type="button"
                title="Remove from favorites"
                onClick={handleRemoveClick}
              >
                ×
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
