//--------------------Requiring the models.js(schema)--------------------------//
var hikes = require("./models").hike
//-----------Exporting the module object functions for CRUD--------------------//
module.exports = {
  //----------------------Shows all the Hikes in hikingdb------------------------//
  all: function(req, res) {
    hikes.find({}, function(err, collection) {
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
    var hike = new hikes(req.body);
    hike.save(function(err, hike) {
      if (err) {
        res.json({
          message: "database error",
          error: err
        })
      }
      else {
        res.json(hike)
      }
    })
  },
  //-----------------updates a existing hike, find it by req.params.id-------------//
  update: function(req, res) {
    hikes.findOneAndUpdate({
        _id: req.params.id
      }, req.body, {
        new: true
      },
      function(err, hike) {
        if (err) console.log("err updating hike: ", err)
        res.json(hike)
        if (err) {
          res.json({
            message: "database error",
            error: err
          })
        }
        else {
          res.json({
            message: "trail updated",
            id: req.params.id
          })
          res.send(hike)
        }
      })
  },
  //-------------showing one individual hike, find it by req.params.id---------------//
  showOne: function(req, res) {
    hikes.findOne({
        _id: req.params.id
      },
      function(err, hike) {
        if (err) {
          res.json({
            message: "database error",
            error: err
          })
        }
        else {
          res.json(hike)
          console.log(hike)
        }
      })
  },
  //-------------deletes one individual hike, find it by req.params.id---------------//
  delete: function(req, res) {
    hikes.findOneAndRemove({
      _id: req.params.id
    }, function(err, hike) {
      if (err) {
        res.json({
          message: "database error",
          error: err
        })
      }
      else {
        res.json({
          message: "Deleted Hike",
          id: req.params.id
        })
      }
    })
  }

}
