# Recipe Finder Web App

A polished recipe finder web app built with Vite + React and powered by TheMealDB API.

## Run locally

1. Install dependencies:
   npm install
2. Start dev server:
   npm run dev
3. Build for production:
   npm run build
4. Preview production build:
   npm run preview

## Features

- Explore default recipes
- Browse by categories and view category meals
- Search by recipe name or ingredient
- Recipe details view with parsed ingredients/measures
- Random trending meal spotlight
- Favorites with localStorage persistence
- Recently viewed tracking
- Responsive UI with loading, empty, and error states

## API Endpoints Used

- https://www.themealdb.com/api/json/v1/1/search.php?s=
- https://www.themealdb.com/api/json/v1/1/categories.php
- https://www.themealdb.com/api/json/v1/1/filter.php?c={category}
- https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}
- https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}
- https://www.themealdb.com/api/json/v1/1/random.php
