<script setup>
  import { Locations, CurrentWeather, NextHours, NextFive } from '@/components';
  import { useWeatherStore } from '@/stores/weatherStore'

  const weatherStore = useWeatherStore()
</script>

<template>
  <div class="bg-blue-500">
    <h1>Weather App</h1>
    <Locations />
    <CurrentWeather />
    <NextHours />
    <NextFive />
  </div>
</template>
