<script setup lang="ts">
    import { useWeatherStore } from '@/stores/weatherStore'
    import { formatDate } from '@/utils/convertDate'
    import { convertTempToFahrenheit } from '@/utils/convertTempToFahrenheit'

    const weatherStore = useWeatherStore()
    const weatherData = computed(() => weatherStore.weatherDataByLocation[weatherStore.selectedLocation])

    const nextFiveDays = computed(() => {
        if (!weatherData.value?.forecast?.list) return []
        /*
            we only have access to /forecast endpoint for 5 days by 3 hour intervals
            break the list into 5 separate arrays of 8 items each (3hours x 8 = 24 hours)

            calculate the lowest and highest temperatures for each day
        */
        const days = []
        for (let i = 0; i < 40; i += 8) {
            const chunk = weatherData.value.forecast.list.slice(i, i + 8)
            
            // Find min and max temperatures for this chunk
            const temps = chunk.map(item => ({
                min: item.main.temp_min,
                max: item.main.temp_max,
                dt_txt: item.dt_txt,
                weather: item.weather[0]
            })) 

            const minTemp = Math.min(...temps.map(t => t.min))
            const maxTemp = Math.max(...temps.map(t => t.max))

            days.push({
                dt: chunk[0].dt,
                dt_txt: chunk[0].dt_txt,
                temp_min: minTemp,
                temp_max: maxTemp,
                weather: chunk[4].weather[0] // use midday weather as representative
            })
        }

        return days
    })
</script>

<template>
    <Container>
        <div v-if="nextFiveDays.length">
            <h1 class="text-2xl font-bold text-blue-500 mb-4">Next 5 days</h1>        
            <div v-for="day in nextFiveDays" :key="day.dt">
                <div class="grid grid-cols-3 gap-4 mb-4 p-4 items-center">
                    <img :src="`https://openweathermap.org/img/wn/${day.weather.icon}.png`" alt="weather icon" class="w-24 h-24 col-span-1">
                    <div class="col-span-1">
                        <div class="text-gray-600">{{ formatDate(day.dt_txt) }}</div>
                        <div class="text-gray-600">{{ day.weather.description }}</div>
                    </div>
                    <div class="flex flex-row items-center justify-center gap-4 col-span-1">
                        <div class="text-blue-600">{{ convertTempToFahrenheit(day.temp_min) }}</div>
                        <div class="text-blue-600">{{ convertTempToFahrenheit(day.temp_max) }}</div>
                    </div>
                    
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-else-if="weatherStore.loading" class="text-center text-gray-600">
            Loading weather data...
        </div>
        
        <!-- Error State -->
        <div v-else-if="weatherStore.error" class="text-center text-red-600">
            {{ weatherStore.error }}
        </div>
    </Container>
</template>