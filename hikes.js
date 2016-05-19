var hikes = require("./models")

module.exports = {
  all : function(req,res) {
      hikes.find({}, function(err,collection){
        if (err) {
          res.json({message: "database error", error:err})
        }
        else {
          res.json(collection)
        }
      })
  },

  create : function(req,res) {
    var hike= new hikes (req.body);
    hike.save(function(err, hike){
      if(err) {
        res.json({message: "database error", error:err})
      }
      else {
        res.json(hike)
      }
    })
  },

  update: function(req,res){
    hikes.findOneAndUpdate({_id: req.params.id}, req.body,{new: true},
    function(err, hike){
      if(err) {
        res.json({message: "database error", error:err})
      }
      else {
        res.json(hike)
      }
    })
  },
  showOne: function(req,res){
    hikes.findOne({_id: req.params.id},
    function(err, hike){
      if(err) {
        res.json({message: "database error", error:err})
      }
      else {
        res.json(hike)
      }
    })
  },

  delete: function(req,res){
    hikes.findOneAndRemove({_id: req.params.id}, function(err, hike){
      if(err) {
        res.json({message: "database error", error:err})
      }
      else {
        res.json({message: "Deleted Hike", id: req.params.id})
      }
    })
  }

}
