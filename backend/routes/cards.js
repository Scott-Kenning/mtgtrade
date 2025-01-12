const express = require('express');
const supabase = require('../supabase');
const router = express.Router();


// Usage: cards/search/cardName
router.get('/search/:substring', async (req, res) => {
    // res.send('search for specific card based on substr');
    const { substring } = req.params;

    try {
        const cards = await supabase.from('card').select('*').ilike('name', "%" + substring + "%");
        // set count of response
        cards.count = cards.data.length;
        return res.status(200).send({ cards: cards});
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    }

});


module.exports = router;
