 (function() {
  angular.module('loginController', [])
   .controller('loginCtrl', loginCtrl)
  loginCtrl.$inject = ['$http', '$state', '$window', '$rootScope', '$location', 'userFactory', 'Auth', 'AuthToken']
   //------------------------ LOGIN CONTROLLER for user and dashboard---------------------------//
  function loginCtrl($http, $state, $window, $rootScope, $location, userFactory, Auth, AuthToken) {
   var logCtrl = this
   logCtrl.userData = {}
   logCtrl.newuserData = {}
   logCtrl.page = 'Login'
   
 // -------------------------------grab user information
   $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    logCtrl.loggedIn = Auth.isLoggedIn();
   });
   $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

     Auth.getUser()
      .then(function(response) {
       logCtrl.user = response
       console.log('User Info',logCtrl.user)
       // console.log('userData',logCtrl.newuserData)
      });
    })
    
    //------------create login method to send user info to server----------//
   logCtrl.login = function() {
    $http.post('/api/login', {
      username: logCtrl.username,
      password: logCtrl.password
     })
     .then(function(response) {
      console.log("from login route", response)
      var token = response.data.token
      if (token) {
       $window.localStorage.setItem('token', token)
       $state.go('profile')
      }
      else {
       console.log("no token found")
      }
     })
   }

   // trying to create a signup form instead of using postman    
   logCtrl.signup = function() {
     console.log(logCtrl.newuserData)
     userFactory.create(logCtrl.newuserData)
      .then(function(response) {
       console.log('New User Created')
      })
      // ========delete
     $state.go('firstview')
    }
    //----------------------------------Logout removes Token------------------------------//
   logCtrl.logout = function() {
    $window.localStorage.removeItem('token')
    $state.go('login')
    console.log('Logged Out')
   }
   logCtrl.showNewUser = false
   logCtrl.addUser = function() {
    logCtrl.showNewUser = logCtrl.showNewUser ? false : true;
   }

  }
 }());