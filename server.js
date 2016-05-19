//-----------------Requiring the npm Installs---------------------------------//
var express    = require('express'),
    bodyParser = require("body-parser"),
    logger     = require('morgan'),
    unirest    = require('unirest'),
    apiRoutes  = require('./routes'),
    mongoose   = require('mongoose'),
    path       = require("path"),
//--------------- express object to use app.----------------------------------//  
    app        = express();
    
//------------Connecting Mongoose and Naming the Database(hikingdb)-----------//
mongoose.connect('mongodb://localhost/hikingdb', function(err){
    if(err) console.log("Error in mongod")
})


    
// ------------------------------Middleware-----------------------------------//
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'./public')))
// Unsure right now
app.use('/api', apiRoutes)

//------------------------------Trail api Request------------------------------//    
// unirest.get("https://trailapi-trailapi.p.mashape.com/?limit=2&q[city_cont]=boulder&q[state_cont]=colorado")
// .header("X-Mashape-Key", "8mlC8jrjDAmshlnwizaoY3CzX0mQp1Rav7OjsnZ8xsATTO67da")
// .header("Accept", "json")
// .end(function (result) {
//   console.log(result.raw_body);
// });

//------------------------------Creating Server-------------------------------//
var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log('server is listening on ' + port);
})
