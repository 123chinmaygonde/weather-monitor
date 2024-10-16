const mongoose = require("mongoose")
const weatherSummarySchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    avgTemp:{
        type:Number,
        required:true
    },
    maxTemp:{
        type:Number,
        required:true
    },
    minTemp:{
        type:Number,
        required:true
    },
    dominantCondition:{
        type:String,
        required:true
    }
})
const WeatherSummary = mongoose.model('WeatherSummary',weatherSummarySchema)
module.exports = WeatherSummary