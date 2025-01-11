const express = require('express');
const router = express.Router();

// find other users

router.get('/:user/topTraders', (req, res) => {
    res.send('find best matches of other users to trade with');
    // MUST HAVE
});

router.get('/:user', (req, res) => {
    res.send('find other users');
    // MIGHT HAVE
});

// user's trades

router.get(':user/trades', (req, res) => {
    res.send('get trades for user');
    // SHOULD HAVE
});

router.post(':user/trades', (req, res) => {
    res.send('create trade for user');
    // MUST HAVE
});

router.patch(':user/trades/:trade', (req, res) => {
    res.send('update trade for user (accept, reject, etc.)');
    // MUST HAVE
});

// ownedCards

router.get(':user/ownedCards', (req, res) => {
    res.send('get list of cards owned by user');
    // MIGHT HAVE since topTraders already does this
    // only would be necessary for "user" profile page
});

router.post(':users/ownedCards', (req, res) => {
    res.send('add card to list of users owned cards');
    // MUST HAVE
});

// requestedCards

router.get(':user/requestedCards', (req, res) => {
    res.send('get list of cards requested by user');
    // MIGHT HAVE since topTraders already does this
    // only would be necessary for "user" profile page
});

router.post(':users/requestedCards', (req, res) => {
    res.send('add card to list of users requested cards');
    // MUST HAVE
});

module.exports = router;
