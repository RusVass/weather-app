# Weather App, Test Assignment

A React application for viewing current weather and a 5-day forecast by city name.

## Features

* Search for a city by name.
* Fetch current weather data from an API.
* Display a 5-day weather forecast.
* Add cities to favorites.
* Remove cities from favorites.
* Quickly switch between favorite cities.
* `empty` state before the first search.
* `loading` state during API requests.
* `error` state when a request fails.

## Tech Stack

* React 19
* TypeScript
* Vite
* Zustand, for client state only
* TanStack Query, for server state only

## Environment Variables

The project requires a WeatherAPI key.

1. Copy `.env.example` to `.env`
2. Add your API key:

```env
VITE_WEATHER_API_KEY=your_weather_api_key
```

You can get a free API key from WeatherAPI.

After updating `.env`, restart the development server.

## Run the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Available Commands

* `npm run dev` — start development server
* `npm run build` — create production build
* `npm run preview` — preview production build locally
* `npm run lint` — run ESLint checks

## Live Demo

https://rusvass.github.io/weather-app/

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages with GitHub Actions.

1. Push code to the `main` branch.
2. In your GitHub repository, open `Settings` → `Secrets and variables` → `Actions`.
3. Add a repository secret named `VITE_WEATHER_API_KEY` with your WeatherAPI key.
4. In `Settings` → `Pages`, set `Source` to `GitHub Actions`.
5. After each push to `main`, workflow `.github/workflows/deploy.yml` will build and deploy `dist`.

## Project Structure

```text
src/
  app/
    query-client.ts
  features/
    weather/
      components/
      hooks/
      store/
  shared/
    api/
    config/
    types/
```

## Architecture Decisions

* Zustand stores only `selectedCity` and `favorites`.
* Only `favorites` are persisted in `localStorage`.
* `selectedCity` is not persisted.
* TanStack Query manages:

  * current weather
  * forecast
  * loading state
  * error state
  * caching
* API responses are mapped to internal types before being used in the UI.
