<script setup>
  import { Locations, CurrentWeather, NextHours, NextFive } from '@/components';
  import { useWeatherStore } from '@/stores/weatherStore'

  const weatherStore = useWeatherStore()
</script>

<template>
  <div class="bg-blue-500 py-8">
    <div class="flex justify-between items-center w-full p-4">
      <h1>Weather App</h1>
      <button 
        class="bg-white text-black px-4 py-2 rounded-md"
        @click="weatherStore.refreshWeatherData"
      >
        Refresh Data
      </button>
    </div>
    <Locations />
    <CurrentWeather />
    <NextHours />
    <NextFive />
  </div>
</template>
