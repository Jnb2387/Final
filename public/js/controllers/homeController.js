(function() {
  angular.module('homeController', [])
    .controller('homeCtrl', homeCtrl)
    //------------------------ homeCtrl CONTROLLER for trails---------------------------//
  function homeCtrl(trailFact, $state, $stateParams, userFactory, Auth) {
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
    hCtrl.editHike = function(id, res) {
      hCtrl.page = "edit"
      $state.go('edit', {
        id: id
      })
      console.log('didnt work', res)
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
      userFactory.getFavorites()
      .then(function(response){
          hCtrl.userFav = response.data
          console.log('userFav',hCtrl.userFav)
      })
      // user.findById(req.params.id).populate('favorites').exec(function(err, user) {})
      
  }
}());
