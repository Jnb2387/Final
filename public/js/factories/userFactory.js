(function(){
    angular.module("userFactory",[])
        .factory('userFactory',usersFactory)
        usersFactory.$inject = ['$http'];
        function usersFactory($http){
            var userData = {}
            
            userData.get = function(id){
                return $http.get('/api/user/' + id)
            }
            
            userData.all = function(){
                return $http.get('/api/users/')
            }
            
            userData.create = function(user){
                return $http.post('/api/users/', user)
            }
            
            userData.update = function(id, user){
                return $http.put('/api/users/' + id, user)
            }
            
            userData.delete = function(id){
                return $http.delete('/api/users/' + id)
            }
            return userData;
        }
}())