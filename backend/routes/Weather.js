const express = require("express")
const axios = require("axios")
const WeatherSummary = require('../models/WeatherSummary')
const router = express.Router()
const {f19ab85bc069cc96acbc45e57221fd5b}= process.env;

const cities = ['Delhi','Mumbai','Chennai','Bangalore','Kolkata','Hyderabad']

const getWeatherData = async()=>{
    const weatherData = [];
    for(const city of cities){
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${f19ab85bc069cc96acbc45e57221fd5b}`)
            const {main,weather,dt} = response.data
            const tempC = main.temp - 273.15;
            const feelsLikeC = main.feels_like - 273.15
            weatherData.push({city,temp:tempC,feels_like:feelsLikeC,condition:weather[0].main,dt})
        } catch (error) {
            console.looe('error fetching weather data',error)
        }
    }
    return weatherData
}
const rollupWeatherData = async () => {
    const weatherData = await getWeatherData();
    
};

setInterval(rollupWeatherData, 5 * 60 * 1000); // Call every 5 minutes

router.get('/summary', async (req, res) => {
    try {
        const summaries = await WeatherSummary.find({});
        res.json(summaries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;