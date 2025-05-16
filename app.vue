<script setup>
import CurrentWeather from './components/CurrentWeather/CurrentWeather.vue';
import Locations from './components/Locations/Locations.vue';
import NextHours from './components/Forecast/NextHours.vue';
import NextFive from './components/Forecast/NextFive.vue';
</script>

<template>
  <div>
    <h1>Weather App</h1>
    <Locations />
    <CurrentWeather />
    <Locations />
    <NextHours />
    <NextFive />
  </div>
</template>
