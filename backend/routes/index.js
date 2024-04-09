const express = require("express");
const userrouter = require('./user')
const {accountrouter} = require("./account")
const router = express.Router();

router.use('/user', userrouter)
router.use('/account', accountrouter)


module.exports = router;

