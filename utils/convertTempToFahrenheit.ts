export const convertTempToFahrenheit = (temp: number) => {
    return `${Math.round((temp - 273.15) * 9 / 5 + 32)}°F`
}