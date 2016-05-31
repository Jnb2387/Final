(function() {
angular.module('hikeApp')
    .config(routerConfig)

  function routerConfig($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl as hCtrl'
      })
      .state('create', {
        url: '/create',
        templateUrl: 'partials/hikeform.html',
        controller: 'homeCtrl as hCtrl'
      })
      .state('edit', {
        url: '/edit/:id',
        templateUrl: 'partials/hikeform.html',
        controller: 'homeCtrl as hCtrl'
      })
      .state('firstview', {
        url: '/firstview',
        templateUrl: './partials/firstview.html',
        controller: 'homeCtrl as hCtrl'
      })
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'loginController as logCtrl',
        authenticate: false
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'partials/profile.html',
        controller: 'loginController as logCtrl',
        authenticate: true
      })
// -----------------need to add---------------------------------
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'loginController as logCtrl'
      })
      // ------------------send client to homepage------------------- //           
    $urlRouterProvider.otherwise('/')
  }
}());
