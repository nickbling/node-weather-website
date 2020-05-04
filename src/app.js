const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Ricordati che nodemon continua ad aggiornare la pagina quando effettui modifiche.

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Andrew Mead"
    })
    // Questo è il rimando HBS per l'index.
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Andrew Mead"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "Ciao ciao vaffanculoooooooooo",
        name: "Andrew Mead"

    })
})

app.get("/weather", (req, res) => { 
    
    if (!req.query.address) {
        return res.send({
            error: "You must insert an address!"
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        // Qui proviamo a lanciare lo script geocode come su app.js di weather-app, ma con il formato per il web server.

        // ELSE

        // Qui abbiamo bisogno dei valori latitude e longitude ricavati con la funzione geocode appena lanciata.

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
            return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })    

    })

})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term!"
        })
    }
    
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Andrew Mead",
        errorMessage: "Help article not found."
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Andrew Mead",
        errorMessage: "Page not found."
    })
})

// È con il res.render("404") che dico che pagina deve andare a prendere. Consiste nella pagina 404.hbs presente in templates/views.

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})