const express = require('express');
const router = express.Router();

router.get('/search/:substring', (req, res) => {
    res.send('search for specific card based on substr');
});

module.exports = router;
