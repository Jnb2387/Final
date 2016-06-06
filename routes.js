//---------------Requiring Express and assigning router------------------//
var router = require("express").Router(),
    trailsCtrl = require('./controllers/trailscontroller'),
    userCtrl = require("./controllers/usercontroller"),
    jwt = require('jsonwebtoken'),
     mySpecialSecret = "boom"
// =========delete if not bringing signup or login from server.js=========== 
router.route('/login')
    .post(userCtrl.userController.login)
router.route('/hikes')
    .get(trailsCtrl.trailsController.all)
    .post(auth,trailsCtrl.trailsController.create)
router.route('/hikes/:id')
    .put(auth,trailsCtrl.trailsController.update)
    .delete(trailsCtrl.trailsController.delete)
    .get(trailsCtrl.trailsController.showOne)
router.route('/users')
    .get(userCtrl.userController.showUsers)
    .post(userCtrl.userController.signup)

router.use(auth)
    
router.route('/users/:id')
    .get(userCtrl.userController.showUser)
router.route('/favorites')
    .put(userCtrl.userController.addFavorites)
    .get(userCtrl.userController.showFavorites)
router.route('/me')
    .get(function(req, res){
        res.json(req.decoded)
    })
//---------------Routes for get/post/delete to mongoose------------------//   
// ================================
function auth(req, res, next){
// //-----------------check everywhere for users token-------------------------------------
    var token = req.body.token || req.param('token') || req.headers['x-access-token']
        // 2 - If we find a token, we will use mySpecialSecret to try and decode it
        //      - if it can't be decoded, send the user an error that they don't have the right token
    // console.log("token from client", token);
    if (token) {
        jwt.verify(token, mySpecialSecret, function(err, decoded) {
            if (err) {
                console.log(decoded)
                return res.status(403).send({
                        success: false,
                        message: "can't authenticate token"
                    })
//  ----- if it CAN be decoded, save the decoded token to the request, and we'll keep processing the request------//
            }
            else {
                // console.log('decoded',decoded)
                req.decoded = decoded;
                next()
            }
        })
    }
    else {
//----------- If we can't find a token at all, we'll just send back an error message---------------------//
        // return res.status(403).send({
        //     success: false,
        //     message: "no token provided"
        // })
    }
}
    
module.exports = router