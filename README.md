# Weather App

A weather application built with Nuxt 3 that displays current weather and 5-day forecasts for multiple locations.

## Features

- Current weather display with temperature, conditions, and icons
- 5-day weather forecast
- Multiple location support
- Temperature conversion between Celsius and Fahrenheit
- Responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeather API key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd ria_weather_app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
touch .env
```

4. Add your OpenWeather API key to the `.env` file:
```
OPENWEATHER_API_KEY=your_api_key_here (provided by RIA)
```


## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`


## Project Structure

```
ria_weather_app/
├── components/          # Vue components
│   ├── CurrentWeather/ # Current weather display
│   ├── Forecast/       # Forecast components
│   └── Locations/      # Location selection
├── stores/             # Pinia stores
├── utils/              # Utility functions
├── server/             # API routes
└── assets/            # Static assets
```

## Technologies Used

- Nuxt 3
- Vue 3
- Pinia
- Typescript
- Tailwind CSS
- OpenWeather API


