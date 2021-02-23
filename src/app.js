const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');
const port = process.env.PORT || 3000;

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        color: 'purple'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        color: 'purple'
    });
});


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some help text',
        title: 'Help page',
        color: 'purple'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.searchLocation){
        return res.send({
            error: 'You must provide a location to search for'
        })
    }

    geocode(req.query.searchLocation, (error, {latitude, longitude, locationResult} = {}) => {
        if(error){
            return res.send({error});
        }
        
        forecast(latitude, longitude, (error, {forecast}) => {
            if(error){
                return res.send({error});
            }
               
            return res.send({
                forecast,
                location: locationResult,
                searchLocation: req.query.searchLocation 
            });
        });
    });
});


app.get('/help/*', (req, res) => {
    res.render('404',{
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        error: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log("Server is up and running on port " + port);
});