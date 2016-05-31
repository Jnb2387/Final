//---------------Requiring Express and assigning router------------------//
var router = require("express").Router(),
    hikeControl = require('./hikes')

//---------------Routes for get/post/delete to mongoose------------------//   
router.route('/hikes')
    .get(hikeControl.all)
    .post(hikeControl.create)
router.route('/hikes/:id')
    .put(hikeControl.update)
    .delete(hikeControl.delete)
    .get(hikeControl.showOne)
router.route('/home')

module.exports = router