(function() {
  angular.module('hikeFactory', [])
    .factory('discMob', discMob)

    function discMob ($http) {
      var dMob = {}

      dMob.create = function(hike){
        console.log("from factory",hike)
          return $http.post('/api/hikes', hike)
      }
      dMob.update = function(hike, id){
          return $http.put('/api/hikes/'+id, hike)
      }
      dMob.delete = function(id){
          return $http.delete('/api/hikes/'+id)
      }
      dMob.showAll = function(){
          return $http.get('/api/hikes')
      }
      dMob.showOne = function(id){
          return $http.get('/api/hikes/'+id)
      }
      return dMob
    }


}());
