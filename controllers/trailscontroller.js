//--------------------Requiring the models.js(schema)--------------------------//
var Trail = require("../models/trailsmodels")
// ======delete
var $http = require('request')
//-----------Exporting the module object functions for CRUD--------------------//
module.exports = {
  //----------------------Shows all the Hikes in hikingdb------------------------//
  // =======delete if not bringing in login,signup=======
  trailsController: {


    all: function(req, res) {
      Trail.find({}, function(err, collection) {
        if (err) {
          res.json({
            message: "database error",
            error: err
          })
        }
        else {
          res.json(collection)
        }
      })
    },
    //--------------------Creating a new Hike--------------------------------------//
    create: function(req, res) {
      var trail = new Trail(req.body);
      trail.save(function(err, trail) {
        if (err) {
          res.json({
            message: "database error",
            error: err
          })
        }
        else {
          res.json(trail)
        }
      })
    },
    //-----------------updates a existing hike, find it by req.params.id-------------//
    update: function(req, res) {
      Trail.findOneAndUpdate({
          _id: req.params.id
        },req.body, 
        {new: true},
        function(err, trail) {
          if (err){
            console.log('err updating',err)
            res.json({
              message: "database error",
              error: err
            })
          }
          else {
            console.log('Updated')
            res.json({
              message: "trail updated",
              id: req.params.id
            })
            // res.send(trail)
          }
        })
    },
    //-------------showing one individual hike, find it by req.params.id---------------//
    showOne: function(req, res) {
      Trail.findOne({
          _id: req.params.id
        },
        function(err, trail) {
          if (err) {
            res.json({
              message: "database error",
              error: err
            })
          }
          else {
            res.json(trail)
            console.log(trail)
          }
        })
    },
    //-------------deletes one individual hike, find it by req.params.id---------------//
    delete: function(req, res) {
      Trail.findOneAndRemove({
        _id: req.params.id
      }, function(err, trail) {
        if (err) {
          res.json({
            message: "database error",
            error: err
          })
        }
        else {
          res.json({
            message: "Deleted trail",
            id: req.params.id
          })
        }
      })
    }
  }
}