var router = require("express").Router(),
    hikeControl = require('./hikes')
    
router.route('/hikes')
    .get(hikeControl.all)
    .post(hikeControl.create)
router.route('/hikes/:id')
    .get(hikeControl.update)
    .delete(hikeControl.delete)
    .get(hikeControl.showOne)
    
module.exports = router