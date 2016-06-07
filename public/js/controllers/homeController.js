(function() {
  angular.module('homeController', [])
    .controller('homeCtrl', homeCtrl)
    //------------------------ homeCtrl CONTROLLER for trails---------------------------//
  function homeCtrl(trailFact, $state, $stateParams, userFactory, Auth, $scope) {
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
      $state.go('firstview')
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
    hCtrl.editHike = function(id, hike) {
      trailFact.update(hike)
        .then(function(res){
          $state.go('firstview')
          console.log('Hike Edited',id)
      // hCtrl.page = "edit"
      // $state.go('edit', {
      //   id: id
      // })
      // console.log('didnt work', res)
        })
    }
    // =======add favorite trail to profile===================================
    hCtrl.favorite = function(hike) {
        Auth.getUser()
          .then(function(response) {
            hCtrl.user = response.data
            console.log(hCtrl.user)
            // console.log(response)
            console.log(hike)
          
            var favoriteTrailId = {trailsId: hike._id}
            userFactory.addFavorite(favoriteTrailId)
            .then(function(response){
              console.log('Successfully add to favorites')
            })
          })
      }
      // userFactory.getFavorites()
      // .then(function(response){
      //     hCtrl.userFav = response.data
      //     console.log('userFav',hCtrl.userFav)
      // })
      
      
      // uncomment this
// use to get user favorite and then grab weather off of city      
      userFactory.getFavorites()
      .then(function(response) {
        hCtrl.userFav = response.data
        // console.log(hCtrl.userFav)
        for (var i = 0; i < hCtrl.userFav.length; i++) {
          (function(i) {
            $.getJSON('https://api.wunderground.com/api/295fb5e72ee3f286/conditions/q/CO/'+hCtrl.userFav[i].city+'.json')
              .then(function(response) {
                hCtrl.userFav[i].weather = response.current_observation.weather
                hCtrl.userFav[i].icon = response.current_observation.icon_url
                hCtrl.userFav[i].temperature = response.current_observation.temp_f
                console.log(response)
                // console.log("da weather", hCtrl.userFav[i].weather)
                // console.log(hCtrl.userFav[i].temperature)
                $scope.$apply()
              })
          })(i)
        }
      })

  }
}());
