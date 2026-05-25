const axios = require('axios');

async function getCurrentTemperature(city) {
  const { data } = await axios.get(
    `https://api.weather.example.com/current?city=${city}`
  );
  return data.temperature;
}

module.exports = { getCurrentTemperature };