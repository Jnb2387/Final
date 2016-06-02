(function() {
angular.module('hikeApp', ['homeController','loginController', "hikeFactory", 'ui.router','authenticationService','userFactory'])
    .config(routerConfig)

  function routerConfig($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');

    $stateProvider
      // .state('home', {
      //   url: '/',
      //   templateUrl: 'partials/home.html',
      //   controller: 'homeCtrl as hCtrl',
      //   authenticate: false
      // })
      // .state('create', {
      //   url: '/create',
      //   templateUrl: 'partials/hikeform.html',
      //   controller: 'homeCtrl as hCtrl',
      //   authenticate: true
      // })
      .state('edit', {
        url: '/edit/:id',
        templateUrl: 'partials/hikeform.html',
        controller: 'homeCtrl as hCtrl',
        authenticate: true
      })
      .state('firstview', {
        url: '/firstview',
        templateUrl: './partials/firstview.html',
        controller: 'homeCtrl as hCtrl',
        authenticate: false
      })
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl as logCtrl',
        authenticate: false
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'partials/profile.html',
        controller: 'homeCtrl as hCtrl',
        authenticate: false
      })
      .state('mountains', {
        url: '/mountains',
        templateUrl: 'partials/mountains.html',
        controller: 'loginCtrl as logCtrl',
        authenticate: false
      })
      // ------------------send client to homepage------------------- //           
    $urlRouterProvider.otherwise('/firstview')
  }
}());
