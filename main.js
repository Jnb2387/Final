(function() {
    angular.module('myapp', [])
    
        .controller('control', ['$http', controlFunc])

//====================WEATHER UNDERGROUND API============================

//   angular.module('weatherapp', [])
// 	.controller('weatherController', ['$http', weatherFunc])
		
// 		function weatherFunc($http){
// 			var wCtrl=this;
// 			console.log('hi')
// 				wCtrl.showWeather = function(){
// 					$http.get('http://api.wunderground.com/api/295fb5e72ee3f286/conditions/q/' + wCtrl.location + '.json')
// 					.then(function(response){
// 						wCtrl.weather = response.data.current_observation.temp_f
// 						console.log(response.data) 
// 					})
// 				}
// 		}

//=============================RECREATION API==============================
    function controlFunc($http) {
        var ctrl = this;
        console.log("Angular Working");
        ctrl.showControl = function() {
            $http.get('https://ridb.recreation.gov/api/v1/organizations/128/recareas.json?apikey=08FE636CF9354D4EB73A3CFB55C181BF')
                .then(function(response) {
                    console.log('Results =', response.data.RECDATA[0].RecAreaName)
                })
        }
    }

}());