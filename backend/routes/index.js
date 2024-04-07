const express = require("espress");
const userrouter = require('./user')
const router = express.Router();


router.get('user', userrouter)


module.exports = router;