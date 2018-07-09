var express = require('express');
var cors = require('cors');
var router = express.Router();

router.use(cors());

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'OpenLaw Backend' });
});

module.exports = router;