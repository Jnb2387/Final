//-----------------Requiring the npm Installs---------------------------------//
var express = require('express'),
    bodyParser = require("body-parser"),
    logger = require('morgan'),
    unirest = require('unirest'),
    apiRoutes = require('./routes'),
    mongoose = require('mongoose'),
    path = require("path"),
    jwt = require('jsonwebtoken'),
//--------------- express object to use app.----------------------------------//  
    app = express();

//-------Connecting Mongoose and Naming the Database(hikingdb & users)--------//
mongoose.connect('mongodb://localhost/hikingdb', function(err) {
    if (err) console.log("Error in mongod")
})
// ------------------------------Middleware-----------------------------------//
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname, './public')))
//--------------------connecting to routing page------------------------------//
app.use('/api', apiRoutes)

//------------------------------Creating Server-------------------------------//
var port = process.env.PORT;

app.listen(port, function() {
    console.log('server is listening on ' + port);
})



//---------------------------Trail api Request---------------------------------//    
// unirest.get("https://trailapi-trailapi.p.mashape.com/?limit=2&q[city_cont]=boulder&q[state_cont]=colorado")
// .header("X-Mashape-Key", "8mlC8jrjDAmshlnwizaoY3CzX0mQp1Rav7OjsnZ8xsATTO67da")
// .header("Accept", "json")
// .end(function (result) {
//     var results = {}
//     results = result.raw_body
//     var trailName = results
//   console.log(trailName);
// });