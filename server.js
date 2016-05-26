//-----------------Requiring the npm Installs---------------------------------//
var express = require('express'),
    bodyParser = require("body-parser"),
    logger = require('morgan'),
    unirest = require('unirest'),
    apiRoutes = require('./routes'),
    mongoose = require('mongoose'),
    path = require("path"),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    mySpecialSecret = "boom",
    
//--------------- express object to use app.----------------------------------//  
    app = express();
    
//------------Connecting Mongoose and Naming the Database(hikingdb)-----------//
mongoose.connect('mongodb://localhost/hikingdb', function(err) {
    if (err) console.log("Error in mongod")
})
mongoose.connect('mongodb://localhost/users', function(err){
    if (err) console.log('Error in users db')
})

// ------------------------------Middleware-----------------------------------//
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, './public')))
//--------------------connecting to routing page------------------------------//
app.use('/api', apiRoutes)

// ------------------User Model and Schema--------------------------------------
var userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
})

// //--------------- Model middleware that runs before user is saved to db-----------
userSchema.pre('save', function(next) {
    var user = this
    var hashPassword = bcrypt.hashSync(user.password, 8)
    user.password = hashPassword
    console.log('Encrypting PW-------------------')
    next()
})

// // Add a method to the userSchema to validate a pw
userSchema.methods.authenticate = function(userPassword) {
    var user = this
    return bcrypt.compareSync(userPassword, user.password)
}

var User = mongoose.model('User', userSchema)

// // create my signup and login routes
app.post('/signup', function(req, res) {
    var user = new User(req.body)
    console.log('Before save-------------------')
    user.save(function(err, user) {
        if (err) {
            res.json(err)
        }
        else {
            console.log('After save-------------------')

            res.json(user)
        }
    })
})


app.post('/login', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            res.json(err)
        }
        else if (user) {
            if (user.authenticate(req.body.password)) {

                var token = jwt.sign({
                        name: user.username
                    }, mySpecialSecret, {
                        expiresIn: 1440
                    })
                    // 4 - Send back a success message with the JWT
                res.json({
                    success: true,
                    message: 'YOU get a token! YOU get a token! YOU get a token!',
                    token: token

                })

            }
            else {
                res.json({
                    message: "your password does not match!",
                    success: false
                })
            }
        }
        else {
            res.json({
                message: "could not find user: " + req.body.username,
                success: false
            })
        }
    })
})

function authorize(req, res, next) {
//-----------------check everywhere for users token-------------------------------------
    var token = req.body.token || req.param('token') || req.headers['x-access-token']
        // 2 - If we find a token, we will use mySpecialSecret to try and decode it
        //      - if it can't be decoded, send the user an error that they don't have the right token
    console.log("token from client", token);
    if (token) {
        jwt.verify(token, mySpecialSecret, function(err, decoded) {
            if (err) {
                return res.status(403).send({
                        success: false,
                        message: "can't authenticate token"
                    })
                    //      - if it CAN be decoded, save the decoded token to the request, and we'll keep processing the request
            }
            else {
                req.decoded = decoded;
                next()
            }
        })
    }
    else {

        // 3 - If we can't find a token at all, we'll just send back an error message
        return res.status(403).send({
            success: false,
            message: "no token provided"
        })
    }

}

//------------------------------Trail api Request------------------------------//    
// unirest.get("https://trailapi-trailapi.p.mashape.com/?limit=2&q[city_cont]=boulder&q[state_cont]=colorado")
// .header("X-Mashape-Key", "8mlC8jrjDAmshlnwizaoY3CzX0mQp1Rav7OjsnZ8xsATTO67da")
// .header("Accept", "json")
// .end(function (result) {
//     var results = {}

//     results = result.raw_body
    
//     var trailName = results
    
//   console.log(trailName);
// });

//------------------------------Creating Server-------------------------------//
var port = process.env.PORT;

app.listen(port, function() {
    console.log('server is listening on ' + port);
})
