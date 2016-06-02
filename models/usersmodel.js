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
            ref: 'Hike'
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
module.exports = mongoose.model("User", userSchema)