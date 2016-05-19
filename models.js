var mongoose = require('mongoose')

var trailSchema = mongoose.Schema({
    city: String,
    state: String,
    country: String,
    name: String,
    directions: String,
    lat: Number,
    lon: Number,
    activity_type_name: String,
    url: String,
    length: Number,
    description: String,
    thumbnail: String,
    rating: Number
})

module.exports = mongoose.model("hike", trailSchema)