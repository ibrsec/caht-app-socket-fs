"use strict";

/* -------------------------------------------------------------------------- */
/*                                 Auth router                                */
/* -------------------------------------------------------------------------- */


const router = require('express').Router()
const {message} = require('../controllers/messageController');
const upload = require('../middlewares/upload');
const protectedRoute = require('../middlewares/protectedRoute');
/* -------------------------------------------------------------------------- */


router.post('/send/:id',protectedRoute,message.send) ;
router.get('/:id',protectedRoute,message.getMessages) ;
 




/* -------------------------------------------------------------------------- */
module.exports = router;