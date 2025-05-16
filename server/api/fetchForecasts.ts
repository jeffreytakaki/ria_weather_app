import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        const location = query.location

        if (!location) {
            throw new Error('Location parameter is required')
        }

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appId=${process.env.OPENWEATHER_API_KEY}`
        )

        if (!response.ok) {
            throw new Error(`Forecast API error: ${response.statusText}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : 'An error occurred while fetching forecast data'
        }
    }
})
