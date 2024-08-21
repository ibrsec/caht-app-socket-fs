"use strict";

/* -------------------------------------------------------------------------- */
/*                                 Routerindex                                */
/* -------------------------------------------------------------------------- */


const router = require('express').Router()
/* -------------------------------------------------------------------------- */

router.use('/documents',require('./documentRouter'));
router.use('/auth',require('./authRouter'));
router.use('/messages',require('./messageRouter'));
router.use('/users',require('./userRouter'));




/* -------------------------------------------------------------------------- */
module.exports = router;