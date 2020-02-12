const router = require('express').Router();
const controllers = require('./controllers.js');



router
  .route('/sort')
  .post(controllers.sort)

router
  .route('/products')
  .post(controllers.post) // added post primary data per specs
  
  router
  .route('/:productID')
  .get(controllers.get)
  .post(controllers.postQ)
  .put(controllers.postAns)
  .delete(controllers.delete) // added delete primary data per specs
  .put(controllers.edit) // added edit primary data per specs
  


module.exports = router;