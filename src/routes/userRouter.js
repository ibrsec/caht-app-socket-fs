"use strict";

/* -------------------------------------------------------------------------- */
/*                                 Routerindex                                */
/* -------------------------------------------------------------------------- */


const router = require('express').Router()
const {user} = require('../controllers/userController');
const permission = require('../middlewares/permissions');
/* -------------------------------------------------------------------------- */

router.get('/', permission.isLogin,user.getusersForSideBar);




/* -------------------------------------------------------------------------- */
module.exports = router;