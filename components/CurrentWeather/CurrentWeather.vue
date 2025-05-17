<script setup lang="ts">
    import { convertTempToFahrenheit } from '@/utils/convertTempToFahrenheit'
    import { useWeatherStore } from '~/stores/weatherStore'

    const weatherStore = useWeatherStore()

    // computed - automatically tracks any reactive dependencies (like refs or other computed properties) that are used inside its function. we want this
    const weatherData = computed(() => weatherStore.weatherDataByLocation[weatherStore.selectedLocation])

    console.log('current weather data', weatherData.value)
</script>

<template>
     <Container>
        <div v-if="weatherData">
            <div class="text-center">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    {{ weatherStore.selectedLocation }}
                </h2>
                <img :src="`https://openweathermap.org/img/wn/${weatherData.current?.weather[0].icon}.png`" alt="weather icon" class="w-24 h-24 mx-auto">
                <div class="text-4xl font-bold text-blue-600 mb-2">
                    {{ convertTempToFahrenheit(weatherData.current?.main.temp) }}
                </div>
                <p class="text-gray-600 capitalize">
                    {{ weatherData.current?.weather[0].description }}
                </p>
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