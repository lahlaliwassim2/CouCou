const { register, login, setAvatar, allusers } = require('../controllers/UsersController');

const router = require('express').Router()

router.post('/register',register)
router.post('/login',login)
router.post('/setAvatar/:id',setAvatar)
router.get('/allusers/:id',allusers)
 



module.exports=router;