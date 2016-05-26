//NOT USED

// var mongoose = require('mongoose')
// var userSchema = mongoose.Schema({
//     username: {type: String, unique: true},
//     password: String
//   })

// //--------------- Model middleware that runs before user is saved to db-----------
// // userSchema.pre('save', function(next) {
// //     var user = this
// //     var hashPassword = bcrypt.hashSync(user.password, 8)
// //     user.password = hashPassword
// //     console.log('Encrypting PW-------------------')
// //     next()
// // })

// // // Add a method to the userSchema to validate a pw
// // userSchema.methods.authenticate = function(userPassword) {
// //     var user = this
// //     return bcrypt.compareSync(userPassword, user.password)
// // }

// var User = mongoose.model('User', userSchema)

// module.exports = mongoose.model("user", userSchema)  