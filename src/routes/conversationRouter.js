"use strict";

/* -------------------------------------------------------------------------- */
/*                                 Conversation router                                */
/* -------------------------------------------------------------------------- */


const router = require('express').Router()
const {conversation} = require('../controllers/conversationController');
const permission = require('../middlewares/permissions');
/* -------------------------------------------------------------------------- */

router.get('/', permission.isLogin,conversation.getConversations);




/* -------------------------------------------------------------------------- */
module.exports = router;