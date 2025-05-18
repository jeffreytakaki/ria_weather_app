<script setup lang="ts">
import { useWeatherStore } from '@/stores/weatherStore'

const weatherStore = useWeatherStore()

const handleSelectLocation = (location: string) => {
    console.log(location)
    weatherStore.selectedLocation = location
}

</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div 
            v-for="location in weatherStore.locations" 
            :key="location"
            :class="[
                'rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 text-center cursor-pointer',
                weatherStore.selectedLocation === location ? 'bg-green-500 text-white' : 'bg-white'
            ]"
            @click="() => handleSelectLocation(location)"
        >
            <h2 class="text-xl font-semibold mb-2" :class="weatherStore.selectedLocation === location ? 'text-white' : 'text-gray-800'">{{ location }}</h2>
        </div>
    </div>
</template>