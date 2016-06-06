var jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    mySpecialSecret = "boom",
    User = require("../models/usersmodel")

module.exports = {
    userController: {
        // signup: function(req, res) {
        //     var user = new User(req.body)
        //     console.log('Before save-------------------')
        //     user.save(function(err, user) {
        //         if (err) {
        //             res.json(err)
        //         }
        //         else {
        //             console.log('After save-------------------')
        //             res.json(user)
        //         }
        //     })
        // },

        login: function(req, res) {
            User.findOne({
                username: req.body.username
            }, function(err, user) {
                if (err) {
                    res.json(err)
                }
                else if (user) {
                    if (user.authenticate(req.body.password)) {
                        var token = jwt.sign({
                                name: user.username,
                                _id: user._id
                            }, mySpecialSecret, {
                                expiresIn: 2300
                                    //60
                            })
                            //---------- Send back a success message with the JWT
                        res.json({
                            success: true,
                            message: 'Log in Successful',
                            token: token
                        })
                    }
                    else {
                        res.json({
                            message: "Password does not match.",
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
        },
        
         signup: function(req, res) {
            var user = new User(req.body)
            console.log('Before save-------------------')
            user.save(function(err, user) {
                if (err) {
                    res.json(err)
                }else{
                var token = jwt.sign({
                                name: user.username,
                                _id: user._id
                            }, mySpecialSecret, {
                                expiresIn: 2300
                                    //60
                            })
                            //---------- Send back a success message with the JWT
                        res.json({
                            success: true,
                            message: 'Log in Successful',
                            token: token
                        })
                // else {
                //     console.log('After save-------------------')
                //     res.json(user)
                }
            })
        },

        showUsers: function(req, res) {
            User.find({}, function(err, users) {
                console.log(users)
                res.json(users);
            })
        },

        showUser: function(req, res) {
            var id = req.params.id
            User.findOne({
                _id: id
            }, function(err, user) {
                console.log('show user')
                if (err) res.json(err);
                res.json(user)
            })
        },
        // ----------------------add favorite trail to user profile        
        addFavorites: function(req, res) {
            // var userId = req.body.userId;
            var trailsId = req.body.trailsId
            console.log('trailsId', trailsId)
                // var trailsIdnew =req.body.trailsId
            console.log('req.body', req.decoded)
            User.findByIdAndUpdate(req.decoded._id, {
                $push: {
                    'favorites': req.body.trailsId
                }
            }, {
                new: true
            }, function(err, user) {
                if (err) return res.json(err);
                res.json(user)
            })
        },
        // findOne: function(req, res) {
        //     User.findById(req.params.id).populate('favorites').exec(function(err, user) {
        //         if (err) return res.json({
        //             error: err
        //         });
        //         res.json(user);
        //     })
        // },
        showFavorites: function(req, res) {
            var userId = req.decoded._id;
            User.findById(userId).populate('favorites').exec(function(err, user) {
                // console.log(user)
                if (err) return res.json(err);
                res.json(user.favorites);
            });
        },
    }
}