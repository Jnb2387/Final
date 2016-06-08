(function() {
    angular.module('weatherapp', [])

    .controller('navController', ['$http', '$state', '$window', '$rootScope', navControl])

    function navControl($http, $state, $window, $rootScope) {
        var nCtrl = this;

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if ($window.localStorage.getItem('token')) {
                nCtrl.loggedIn = true;
                nCtrl.loggedID = $window.localStorage.getItem('_id')
         
            }
            else {
                nCtrl.loggedIn = false;
            }
        })
    }
}());