const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('create user');
    const { email } = req.body;

    // INSERT INTO users (email) VALUES (email)
});

router.get('/:user', (req, res) => {
    res.send('find users info');

    let ownedCards = [];
    let requestedCards = [];
    let activeTrades = [];

    // ownedCards = SELECT cardId FROM owned_cards WHERE userId = userId
    // requestedCards = SELECT cardId FROM requested_cards WHERE userId = userId
    // activeTrades = SELECT * FROM trades WHERE offeree = userId AND status = 'active'

    return { 
        ownedCards: ownedCards,
        requestedCards: requestedCards, 
        activeTrades: activeTrades
    }
});

// find other users

// MUST HAVE
router.get('/:user/topTraders', (req, res) => {
    res.send('find best matches of other users to trade with');

    // select top 10 users with most cards in common (between owned_cards and requested_cards)

    // SELECT userId, COUNT(cardId) 
    // FROM owned_cards
    // WHERE cardId IN (SELECT cardId FROM requested_cards WHERE userId = userId)
    // GROUP BY userId
    // ORDER BY COUNT(cardId) DESC
    // LIMIT 10
});

// // MIGHT HAVE
// router.get('/:user', (req, res) => {
//     res.send('find other users');
// });

// user's trades

// router.get(':user/trades', (req, res) => {
//     res.send('get trades for user');
//     // SHOULD HAVE
// });

// MUST HAVE
router.post(':user/trade', (req, res) => {
    res.send('create trade for user');
    const { offeror } = req.params;
    const { offeree, offeredCards, requestedCards } = req.body;

    // tradeId = INSERT INTO trades (offeror, offeree)
    // INSERT INTO trade_cards_offered (tradeId, cardId) for each card in offeredCards
    // INSERT INTO trade_cards_requested (tradeId, cardId) for each card in requestedCards
});

// MUST HAVE
router.patch(':user/trade', (req, res) => {
    res.send('update trade for user (accept, reject, etc.)');
    const { user } = req.params;
    const { tradeId, status } = req.body;

    // UPDATE trades SET status = status WHERE tradeId = tradeId
});

// ownedCards

// MUST HAVE
router.put(':user/ownedCards', (req, res) => {
    res.send('set list of users owned cards');

    const { user } = req.params;
    const { cards } = req.body;

    let ownedCards = [];

    // DELETE FROM owned_cards WHERE userId = userId
    // INSERT INTO owned_cards (userId, cardId) for each card in cards

    return ownedCards;
});

// router.get(':user/ownedCards', (req, res) => {
//     res.send('get list of cards owned by user');
//     // MIGHT HAVE since topTraders already does this
//     // only would be necessary for "user" profile page
// });

// requestedCards

router.put(':users/requestedCards', (req, res) => {
    res.send('add card to list of users requested cards');
    const { user } = req.params;
    const { cards } = req.body;
    let ownedCards = [];

    // DELETE FROM requested_cards WHERE userId = userId
    // INSERT INTO requested_cards (userId, cardId) for each card in cards
    return ownedCards;
    // MUST HAVE
});

// router.get(':user/requestedCards', (req, res) => {
//     res.send('get list of cards requested by user');
//     // MIGHT HAVE since topTraders already does this
//     // only would be necessary for "user" profile page
// });

module.exports = router;
