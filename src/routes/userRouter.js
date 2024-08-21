"use strict";

/* -------------------------------------------------------------------------- */
/*                                 Routerindex                                */
/* -------------------------------------------------------------------------- */


const router = require('express').Router()
const {user} = require('../controllers/userController');
const protectedRoute = require('../middlewares/protectedRoute');
/* -------------------------------------------------------------------------- */

router.get('/', protectedRoute,user.getusersForSideBar);




/* -------------------------------------------------------------------------- */
module.exports = router;