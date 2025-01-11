const express = require('express');
const router = express.Router();

router.get('/search/:substring', (req, res) => {
    res.send('search for specific card based on substr');

    const { substring } = req.params;

    // SELECT * FROM cards WHERE name LIKE %substring%

    return { cards: [] };
});

module.exports = router;
