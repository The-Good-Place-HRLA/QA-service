const router = require('express').Router();
// const controllers = require('./controllers.js');
const controllers = require('./PGcontrollers.js');



router
  .route('/sort')
  .post(controllers.sort)  
  
router
  .route('/:productID')
  .get(controllers.get)
  .post(controllers.postQ)
  .put(controllers.postAns)
  .delete(controllers.deleteItem)

router
  .route('/')
  .post(controllers.postItem)



module.exports = router;