const { register } = require('../controllers/UsersController');

const router = require('express').Router()

router.post('/register',register)

module.exports=router;