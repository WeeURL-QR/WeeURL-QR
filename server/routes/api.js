const express = require('express')
// import in controller
const urlController = require('../controller/urlController');
// declare router variable
const router = express.Router();

// have method to check if it exists in database
// if returns false, then go to adding it
router.post('/getURL' /* controller here */, (req, res) => {
    res.status(200).json(res.locals)
})

// get request for shortened to get long url
router.get('/something', /* controller */ (req, res) => {
    // relocate to new new long url in response. res.redirect?
})

module.exports = router;