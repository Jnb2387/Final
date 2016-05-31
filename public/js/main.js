(function() {
  angular.module('hikeApp', ['homeController', "hikeFactory", 'ui.router'])
  .run(function($rootScope, $state, $window) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toState.authenticate) {
        if (!$window.localStorage.getItem('token')) {
          $state.transitionTo('login')
          event.preventDefault()
        }
      }
    })
  })
//delete,  moved to homeController
  // .controller('loginController', loginCtrl)
  
    .factory('AuthInterceptor', function($q, $location, $window) {

      var interceptorFactory = {};

      //------------------ this will happen on all HTTP requests----------------------------//
      interceptorFactory.request = function(config) {

        //------------------- grab the token and puts it in local storage---------------------//
        var token = $window.localStorage.getItem('token');

        //---------------- if the token exists, add it to the header as x-access-token-------//
        if (token) {
          config.headers['x-access-token'] = token;
        }
        return config;
      };

      //-------------------- happens on response errors------------------------------------//
      interceptorFactory.responseError = function(response) {

        //------------------ if our server returns a 403 forbidden response-----------------//
        if (response.status == 403) {
          $window.localStorage.removeItem('token')
          $location.path('/login');
        }

        //------------------ return the errors from the server as a promise-----------------//
        return $q.reject(response);
      };

      return interceptorFactory;

    })
    
    //-------------------------- DELETE
// //------------------------ LOGIN CONTROLLER---------------------------//
//   function loginCtrl($http, $state, $window, $rootScope, $location) {
//     var logCtrl = this
//     logCtrl.page = 'Login'
//     $http.get('/api/hikes')
//       .then(function(response) {
//         //----------display trails on user dashboard??----------------------//
//         logCtrl.userTrails = response.data[0].city
//           // console.log(response.data)
//       })
// //------------create login method to send user info to server----------//
//     logCtrl.login = function() {
//       $http.post('/login', {
//           username: logCtrl.username,
//           password: logCtrl.password
//         })
//         .then(function(response) {
//           console.log("from login route", response)
//           var token = response.data.token
//           if (token) {
//             $window.localStorage.setItem('token', token)
//             $state.go('profile')
//           }
//           else {
//             console.log("no token found")
//           }
//         })
//     }
// // ------------------need to hide login button when logged in---------------------------//
//     logCtrl.isUserLoggedIn = true
// //----------------------------------Logout removes Token------------------------------//
//     logCtrl.logout = function() {
//         $window.localStorage.removeItem('token')
//         $state.go('login')
//         console.log('Logged Out')
//     }
//   }
}());