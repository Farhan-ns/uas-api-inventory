const router = require('express').Router()
const { phone } = require('../controllers')


router.get('/phones', phone.getPhone)

router.get('/phones/:id', phone.getPhoneById)

router.post('/phones', phone.postPhone)

router.put('/phones/:id', phone.putPhoneById)

router.delete('/phones/:id', phone.deletePhoneById)

module.exports = router