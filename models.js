//------------------------bring in mongoose-----------------------------------------//
var mongoose = require('mongoose')
//--------Creating a Schema Model for trails to be stored in the database-----------//
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


//----------Exporting the schema with mongoose.modal to hikes.js for CRUD-------------//
module.exports = mongoose.model("hike", trailSchema)