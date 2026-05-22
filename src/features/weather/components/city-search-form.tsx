import { useState, type ChangeEvent, type FormEvent, type ReactElement } from 'react'
import './city-search-form.css'

interface CitySearchFormProps {
  onSearch: (cityName: string) => void
}

export const CitySearchForm = ({ onSearch }: CitySearchFormProps): ReactElement => {
  const [cityNameInput, setCityNameInput] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const trimmedCityName = cityNameInput.trim()

    if (trimmedCityName === '') {
      return
    }

    onSearch(trimmedCityName)
    setCityNameInput('')
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCityNameInput(event.target.value)
  }

  return (
    <form className="city-search-form" onSubmit={handleSubmit}>
      <label className="city-search-form__label" htmlFor="city-search-input">
        City
      </label>
      <div className="city-search-form__controls">
        <input
          id="city-search-input"
          className="city-search-form__input"
          type="text"
          placeholder="Enter city name"
          value={cityNameInput}
          onChange={handleInputChange}
        />
        <button className="city-search-form__button" type="submit">
          Search
        </button>
      </div>
    </form>
  )
}
