(function() {
  angular.module('homeController', [])
    .controller('homeCtrl', homeCtrl)
    .controller('loginController', loginCtrl) 
//------------------------ homeCtrl CONTROLLER for trails---------------------------//
  function homeCtrl(trailFact, $state, $stateParams) {
    var hCtrl = this
    hCtrl.working = "controller working"
    hCtrl.page = $state.current.name
    if (hCtrl.page == 'edit') {
      trailFact.showOne($stateParams.id)
        .then(function(res) {
          console.log(res);
          hCtrl.newHike = res.data
        })
    }
    // console.log($state.current);
    trailFact.showAll()
      .then(function(response) {
        hCtrl.trails = response.data
      })

    hCtrl.submitHike = function(hike) {
      trailFact.create(hike)
        .then(function(res) {
          console.log("new hike : ", res)
        })
    }
    hCtrl.searchHike = function(id, hike) {
      trailFact.showOne(hike)
        .then(function(res) {
          console.log("one hike : ", res)
        })
    }

    hCtrl.createHike = function() {
      hCtrl.page = "create"
      $state.go('create')
    }
    hCtrl.editHike = function(id, res) {
      hCtrl.page = "edit"
      $state.go('edit', {
        id: id
      })
      console.log('didnt work', res)
    }
  }
  
  //------------------------ LOGIN CONTROLLER for user and dashboard---------------------------//
  function loginCtrl($http, $state, $window, $rootScope, $location) {
    var logCtrl = this
    logCtrl.page = 'Login'
    $http.get('/api/hikes')
      .then(function(response) {
//----------display trails on user dashboard??----------------------//
        logCtrl.userTrails = response.data[0].city
          // console.log(response.data)
      })
//------------create login method to send user info to server----------//
    logCtrl.login = function() {
      $http.post('/login', {
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
    logCtrl.signup = function(){
      $http.post('/signup',{
          username: logCtrl.signup.username,
          password: logCtrl.signup.password
        })
        .then(function(response) {
          console.log("signup", response)
          var token = response.data.token
          if (token) {
            $window.localStorage.setItem('token', token)
            $state.go('profile')
          }
          else {
            console.log("user not created")
          }
        })
    }
// ------------------need to hide login button when logged in---------------------------//
    logCtrl.isUserLoggedIn = true
//----------------------------------Logout removes Token------------------------------//
    logCtrl.logout = function() {
        $window.localStorage.removeItem('token')
        $state.go('login')
        console.log('Logged Out')
    }
  }
}());
