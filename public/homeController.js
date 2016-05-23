(function() {
  angular.module('homeController', [])
    .controller('homeCtrl', homeCtrl)

    function homeCtrl (discMob, $state,$stateParams) {
      var hCtrl = this
      hCtrl.working="controller working"
      hCtrl.page = $state.current.name
      if(hCtrl.page == 'edit'){
        discMob.showOne($stateParams.id)
        .then(function(res) {
          console.log(res);
          hCtrl.newHike= res.data
        })
      }
      // console.log($state.current);
      discMob.showAll()
        .then(function(response){
          hCtrl.discs = response.data
        })

      hCtrl.submitHike = function(hike) {
        discMob.create(hike)
          .then(function (res) {
            console.log("new hike : ", res)
          })
      }

      hCtrl.createHike = function(){
        hCtrl.page = "create"
        $state.go('create')
      }
      hCtrl.editHike = function(id, res){
        hCtrl.page = "edit"
        $state.go('edit', {id: id})
        console.log('didnt work', res)
      }
    }
}());
