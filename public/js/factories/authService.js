(function() {
  angular.module('authenticationService', [])
    // .run(function($rootScope, $state, $window) {
    //   $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    //     if (toState.authenticate) {
    //       if (!$window.localStorage.getItem('token')) {
    //         $state.transitionTo('login')
    //         event.preventDefault()
    //       }
    //     }
    //   })
    // })
    // function mainControl($http,$state,$window,$rootScope){
    // var mainCtrl = this;

    // $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    //   if ($window.localStorage.getItem('token')) {
    //     mainCtrl.loggedIn = true;
    //     mainCtrl.loggedID = $window.localStorage.getItem('_id')
    //   } else {
    //     mainCtrl.loggedIn = false;
    //   }
    // })
    

// auth factory to login and get information
// inject $http for communicating with the API
// inject $q to return promise objects
// inject AuthToken to manage tokens
  .factory('Auth', function($http, $q, AuthToken) {
  //-------------------create auth factory object-----------------------//
    var authFactory = {};
    //-------------------log a user in-----------------------//
    authFactory.login = function(username, password) {
//-------------return the promise object and its data-----------------------//
        return $http.post('/api/login', {
            username: username,
            password: password
          })
          .success(function(data) {
            AuthToken.setToken(data.token);
            return data;
          })
      }
//-------------------log a user out by clearing the token-----------------------//
    authFactory.logout = function() {
        //-------------------clear the token-----------------------//
        AuthToken.setToken();
      }
//-----------check if a user is logged in and there is a local token-----------------------//
    authFactory.isLoggedIn = function() {
      if (AuthToken.getToken())
        return true;
      else
        return false;
    };
//-------------------get the logged in user-----------------------//
    authFactory.getUser = function() {
      if (AuthToken.getToken())
        return $http.get('/api/me');
      else
        return $q.reject({
          message: 'User has no token'
        });
    };
//-------------------return the auth factory object-----------------------//
    return authFactory;
  })

// factory for handling tokens
// inject $window to store token client-side
  .factory('AuthToken', function($window) {
    var authTokenFactory = {};
//-------------------get the token out of local storage-----------------------//
    authTokenFactory.getToken = function() {
      return $window.localStorage.getItem('token');
    };
//function to set token or clear token
// if a token is passed, set the token
// if there is no token, clear it from local storage
    authTokenFactory.setToken = function(token) {
      if (token)
        $window.localStorage.setItem('token', token);
      else
        $window.localStorage.removeItem('token');
    }
    return authTokenFactory
  })

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
}());