import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWeatherStore = defineStore('weather', () => {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const locations = ref<string[]>(['Rio De Janeiro', 'Beijing', 'Los Angeles']) // TODO - to be used to add new location data in Locations.vue
    const weatherDataByLocation = ref<Record<any, any>>({}) // TODO update any to use proper type
    const isInitialized = ref(false)
    const selectedLocation = ref<string>(locations.value[0])

    const fetchWeatherData = async (location: string) => {
        loading.value = true
        error.value = null

        // we need to make two calls to get the data we need, weather and forecast
        try {
            // Initialize the location data structure if it doesn't exist
            if (!weatherDataByLocation.value[location]) {
                weatherDataByLocation.value[location] = {
                    current: null,
                    forecast: null
                }
            }
            // Fetch both current weather and forecast in parallel
            const [currentResponse, forecastResponse] = await Promise.all([
                fetch(`/api/fetchCurrentWeather?location=${location}`),
                fetch(`/api/fetchForecasts?location=${location}`)
            ])

            if (!currentResponse.ok || !forecastResponse.ok) {
                throw new Error('Weather data fetch failed')
            }

            const [currentData, forecastData] = await Promise.all([
                currentResponse.json(),
                forecastResponse.json()
            ])

            // Update the location data
            weatherDataByLocation.value[location] = {
                current: currentData,
                forecast: forecastData
            }

        } catch (err) {
            console.error('Error fetching weather data:', err)
            error.value = err instanceof Error ? err.message : 'An error occurred'
        } finally {
            loading.value = false
        }
    }

    const refreshWeatherData = async () => {
        console.log('refreshing weather data')
        const fetchPromises = locations.value.map(location => fetchWeatherData(location))
        await Promise.all(fetchPromises)
    }

    // Initialize store and fetch data
    const init = async () => {
        if (isInitialized.value) return

        isInitialized.value = true

        await refreshWeatherData()
    }

    // Call init immediately
    init()

    return {
        locations,
        loading,
        error,
        weatherDataByLocation,
        isInitialized,
        selectedLocation,
        fetchWeatherData,
        refreshWeatherData
    }
})

