 (function() {
  angular.module('loginController', [])
   .controller('loginCtrl', loginCtrl)
  loginCtrl.$inject = ['$http', '$state', '$window', '$rootScope', '$location', 'userFactory', 'Auth', 'AuthToken']
   //------------------------ LOGIN CONTROLLER for user and dashboard---------------------------//
    // if ($window.localStorage.getItem('token')) {
    //     mainCtrl.loggedIn = true;
    //     mainCtrl.loggedID = $window.localStorage.getItem('_id')
    //   } else {
    //     mainCtrl.loggedIn = false;
    //   }
    // })
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
       // console.log('User Info',logCtrl.user)
       // console.log('name is :',logCtrl.user.data.name)
       logCtrl.userName = logCtrl.user.data.name
       // console.log('userData',logCtrl.newuserData)
      });
    })
    
    //------------create login method to send user info to server----------//
   logCtrl.login = function() {
    console.log('login function')
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
       alert("Username or Password  not found")
      }
     })
   }

   // Sign up User    
   logCtrl.signup = function() {
     console.log(logCtrl.newuserData)
     userFactory.create(logCtrl.newuserData)
      .then(function(response) {
       var token = response.data.token
       console.log('response from userSignup',response)
      if (token) {
       $window.localStorage.setItem('token', token)
       console.log('New User Created')
      }
       $state.go('firstview')
      // ========delete
    })
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