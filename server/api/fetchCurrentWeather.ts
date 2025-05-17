import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const location = query.location

        if (!location) {
            throw new Error('Location parameter is required')
        }

        console.log('Fetching weather for:', location)
        const apiKey = process.env.OPENWEATHER_API_KEY
        if (!apiKey) {
            throw new Error('OpenWeather API key is not configured')
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appId=${apiKey}`
        console.log('Making request to:', url)

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`Weather API error: ${response.statusText}`)
        }

        const data = await response.json()
        console.log('Received weather data for:', location)
        return data
    } catch (error) {
        console.error('Error in fetchCurrentWeather:', error)
        return {
            error: error instanceof Error ? error.message : 'An error occurred while fetching weather data'
        }
    }
})
