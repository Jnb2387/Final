(function() {
  angular.module('hikeFactory', [])
    .factory('trailFact', trailFact)

    function trailFact ($http) {
      var trailFact = {}

      trailFact.create = function(hike) {
          console.log("from factory",hike)
          return $http.post('/api/hikes', hike)
      }
      trailFact.update = function(hike, id){
          return $http.put('/api/hikes/'+id, hike)
      }
      trailFact.delete = function(id){
          return $http.delete('/api/hikes/'+id)
      }
      trailFact.showAll = function(){
          return $http.get('/api/hikes')
      }
      trailFact.showOne = function(id){
          return $http.get('/api/hikes/'+id)
      }
      // ============
      // trailFact.favorite = function(){
      //     return $http.put('/api/profile')
      // }
      return trailFact
    }
}());
