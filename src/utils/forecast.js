const request = require("postman-request")

const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=d2164e1f11d6dd3fc9a478f632baed15&query=" + latitude + "," + longitude + ""

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service.", undefined)
            // Perché la funzione callback richiede due elementi (error, data), ma a noi l'elemento data adesso non serve.
        } else if (body.error) {
            callback("Unable to find location.", undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". Temperature: " + body.current.temperature + "C")
        }
    })

}

module.exports = forecast