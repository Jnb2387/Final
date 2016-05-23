(function() {
  angular.module('hikeApp', ['homeController', "hikeFactory", 'ui.router'])
        .config(routerConfig)

      function routerConfig($stateProvider, $urlRouterProvider){

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


          $urlRouterProvider.otherwise('/')
      }
}());