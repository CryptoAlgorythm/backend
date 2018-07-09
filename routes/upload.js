var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var router = express.Router();

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.use(cors());

router.post('/', urlencodedParser, () => {
    try {

    } catch (er) {

    }
});

module.exports = router;