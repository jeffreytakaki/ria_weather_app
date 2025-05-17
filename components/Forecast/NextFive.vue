<script setup lang="ts">
    import { useWeatherStore } from '@/stores/weatherStore'
    import { formatDate } from '@/utils/convertDate'
    import { convertTempToFahrenheit } from '@/utils/convertTempToFahrenheit'

    const weatherStore = useWeatherStore()
    const weatherData = computed(() => weatherStore.weatherDataByLocation[weatherStore.selectedLocation])
</script>

<template>
    <Container>
        <div v-if="weatherData?.forecast"">
            <h1 class="text-2xl font-bold text-blue-500 mb-4">Next 5 days</h1>        
            <div v-for="(day, index) in weatherData.forecast.list.filter((_, i) => i % 8 === 0)" :key="day.dt">
                <div class="flex items-center justify-between">
                    <div class="text-gray-600">{{ formatDate(day.dt_txt) }}</div>
                    <div class="text-gray-600">{{ day.weather[0].description }}</div>
                    <img :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`" alt="weather icon" class="w-10 h-10">
                    <div class="text-blue-600">{{ convertTempToFahrenheit(day.main.temp_min) }}</div>
                    <div class="text-blue-600">{{ convertTempToFahrenheit(day.main.temp_max) }}</div>
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