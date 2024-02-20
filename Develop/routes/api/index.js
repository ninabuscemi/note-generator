const router = require('express').Router();
const noteRoute = require('./noteRoute')

router.use(noteRoute);

module.exports = router;