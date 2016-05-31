//------------------------bring in mongoose---------------------------------//
var mongoose = require('mongoose')

// ------------------------user schema ------------------------------------//

var bcrypt = require('bcryptjs');


 // ------------------User Model and Schema for logging on-----------------//
var userSchema = mongoose.Schema({
        username: {
            type: String,
            unique: true
        },
        password: String,
        favorites: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'hike'
        }]
    })
//--------- Model middleware that runs before user is saved to db---------//
userSchema.pre('save', function(next) {
    var user = this
    var hashPassword = bcrypt.hashSync(user.password, 8)
    user.password = hashPassword
    console.log('Encrypting PW-------------------')
    next()
})

//--------- Add a method to the userSchema to validate a pw-------------//
userSchema.methods.authenticate = function(userPassword) {
    var user = this
    return bcrypt.compareSync(userPassword, user.password)
}

userSchema.methods.addhike = function(hike) {
    var user = this;
    user.favorites.push(hike)
    user.save()
    return user
}

// -----------------------end of user schema ---------------------------//

//-----Creating a Schema Model for trails to be stored in the database------//
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

//-------- exporting both to hikes.js and from hikes.js to routes.js and then to server.js
module.exports = {
    hike: mongoose.model("hike", trailSchema),
    User: mongoose.model('User', userSchema)
}
                // not using when exporting both user and hike schema
//----------Exporting the schema with mongoose.modal to hikes.js for CRUD-------------//
// module.exports = mongoose.model("hike", trailSchema)