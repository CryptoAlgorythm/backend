const express = require('express');
const cors = require('cors');
const router = express.Router();

router.use(cors());

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Backend' });
});

module.exports = router;
