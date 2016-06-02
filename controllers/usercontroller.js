var jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    mySpecialSecret = "boom",
    User = require("../models/usersmodel")

module.exports = {
    userController: {
        signup: function(req, res) {
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
        },

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
                                name: user.username
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
                if (err) res.json(err);
                res.json(user)
            })
        }
    }
}