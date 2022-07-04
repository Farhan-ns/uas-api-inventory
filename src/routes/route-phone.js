const router = require('express').Router()
const { phone } = require('../controllers')


/**
 * @openapi
 * /api/phones:
 *  get:
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: name
 *            in: formData
 *            type: string
 *      description: Retrieve all phones resources from api.
 *      responses:
 *          200:
 *              description: return a data array containing phones object.
 * 
 */
router.get('/phones', phone.getPhone)

/**
 * @openapi
 * /api/phones/:id:
 *  get:
 *      description: Retrieve a phone resource with id from api.
 *      responses:
 *          200:
 *              description: return a phone object with matching id.
 * 
 */
router.get('/phones/:id', phone.getPhoneById)

/**
 * @openapi
 * /api/phones/:
 *  post:
 *      description: Add a new phone resource to api.
 *      responses:
 *          201:
 *              description: return a newly-created phone object with generated id.
 * 
 */
router.post('/phones', phone.postPhone)

/**
 * @openapi
 * /api/phones/:id:
 *  put:
 *      description: Edit a phone resource properties with matching id.
 *      responses:
 *          200:
 *              description: return an updated phone object.
 * 
 */
router.put('/phones/:id', phone.putPhoneById)

/**
 * @openapi
 * /api/phones/:id:
 *  delete:
 *      description: Delete a phone resource with matching id
 *      responses:
 *          200:
 *              description: return a deleted phone object, which no longer exist in the api.
 * 
 */
router.delete('/phones/:id', phone.deletePhoneById)

module.exports = router