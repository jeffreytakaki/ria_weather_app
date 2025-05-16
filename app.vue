<script setup>
  import { Locations, CurrentWeather, NextHours, NextFive } from '@/components';
</script>

<template>
  <div>
    <h1>Weather App</h1>
    <Locations />
    <CurrentWeather />
    <NextHours />
    <NextFive />
  </div>
</template>
