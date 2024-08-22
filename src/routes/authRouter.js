"use strict";

/* -------------------------------------------------------------------------- */
/*                                 Auth router                                */
/* -------------------------------------------------------------------------- */


const router = require('express').Router()
const {auth} = require('../controllers/authController');
const upload = require('../middlewares/upload');
/* -------------------------------------------------------------------------- */


router.post('/signup',upload.single('image') ,auth.signUp);
router.post('/login',auth.login);
router.post('/refresh',auth.refresh);
router.get('/logout',auth.logout);




/* -------------------------------------------------------------------------- */
module.exports = router;