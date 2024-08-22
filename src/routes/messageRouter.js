"use strict";

/* -------------------------------------------------------------------------- */
/*                                 Auth router                                */
/* -------------------------------------------------------------------------- */


const router = require('express').Router()
const {message} = require('../controllers/messageController');
const upload = require('../middlewares/upload');
const permission = require('../middlewares/permissions');
/* -------------------------------------------------------------------------- */


router.post('/send/:id',permission.isLogin,message.send) ;
router.get('/:id',permission.isLogin,message.getMessages) ;
 




/* -------------------------------------------------------------------------- */
module.exports = router;