require('dotenv').config();
const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const forecastURL = 'http://api.weatherstack.com/current?access_key=' + process.env.FORECAST_KEY + '&query=' + encodeURIComponent(latitude + ',' + longitude);
    
    request({ url: forecastURL, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to forecast service', undefined);
        }
        else if(body.error){
            callback('Unable to find location', undefined);
        }
        else{
            const weatherDesc = body.current.weather_descriptions[0];
            const currentTemp = body.current.temperature;
            const feelsLikeTemp = body.current.feelslike;
            
            const text = "The weather is expected to be " + weatherDesc + ". The current temperature is " + currentTemp + " degrees; it feels like " + feelsLikeTemp + " degrees.";

            callback(undefined, {
                forecast: text
            });
        }
    });
}

module.exports = forecast;