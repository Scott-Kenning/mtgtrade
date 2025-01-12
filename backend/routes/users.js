const express = require('express');
const supabase = require('../supabase');
const router = express.Router();

// helper function to get user id by email
async function getUserId(email) {
    let userId = await supabase.from('users').select('id').eq('email', email);

    if (userId.data.length === 0) {
        console.log(`user ${email} not found`);
        return null;
    }
    console.log(`userId: ${userId.data?.map((x) => x.id)} from ${email}`);
    return userId.data?.map((x) => x.id)[0];
}

router.post('/', (req, res) => {
    res.send('create user');
    const { email } = req.body;

    // INSERT INTO users (email) VALUES (email)
});

router.get('/', async (req, res) => {
    const user = req.query.user;
    res.send('find users info');
    console.log(`user: ${user}`);
    let userId = await getUserId(user);
    // ownedCards = SELECT cardId FROM owned_cards WHERE email = user
    let ownedCards = await supabase.from('owned_cards').select('cardId').eq('userId', userId);
    // let ownedCards = await supabase.from('owned_cards').select('*');
    // requestedCards = SELECT cardId FROM requested_cards WHERE email = user
    let requestedCards = await supabase.from('requested_cards').select('cardId').eq('userId', userId);
    // activeTrades = SELECT * FROM trades WHERE offeree = (SELECT userId FROM users WHERE email = user) status = 'active'
    let activeTrades = await supabase.from('trades').select('*').eq('offeree', userId).eq('status', 'active');

    console.log(`ownedCards: ${ownedCards.data}, requestedCards: ${requestedCards.data}, activeTrades: ${activeTrades.data}`);
    return { 
        ownedCards: ownedCards,
        requestedCards: requestedCards, 
        activeTrades: activeTrades
    }
});

// find other users

// MUST HAVE
router.get('/topTraders', (req, res) => {
    const user = req.query.user;
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
// router.get('/', (req, res) => {
//     res.send('find other users');
// });

// user's trades

// router.get('/trades', (req, res) => {
//     res.send('get trades for user');
//     // SHOULD HAVE
// });

// MUST HAVE
router.post('/trade', (req, res) => {
    res.send('create trade for user');
    const offeror = req.query.offeror;
    const { offeree, offeredCards, requestedCards } = req.body;

    // tradeId = INSERT INTO trades (offeror, offeree)
    // INSERT INTO trade_cards_offered (tradeId, cardId) for each card in offeredCards
    // INSERT INTO trade_cards_requested (tradeId, cardId) for each card in requestedCards
});

// MUST HAVE
router.patch('/trade', (req, res) => {
    res.send('update trade for user (accept, reject, etc.)');
    const user = req.query.user;
    const { tradeId, status } = req.body;

    // UPDATE trades SET status = status WHERE tradeId = tradeId
});

// ownedCards

// MUST HAVE
router.put('/ownedCards', async (req, res) => {
    res.send('set list of users owned cards');

    const user = req.query.user;
    const { cards } = req.body;

    let ownedCards = [];

    let userId = await getUserId(user);

    if (!userId) return [];
    console.log(`userId: ${userId?.data} from ${user}`);

    // DELETE FROM owned_cards WHERE userId = userId
    let del = await supabase.from('owned_card').delete().eq('user_id', userId);
    console.log(`deleted: ${del.status} ${del.data} ${del?.error?.message}`);
    // INSERT INTO owned_cards (userId, cardId) for each card in cards
    for (let card of cards) {
        console.log(`Inserting card ${card.cardId} for user ${userId}`);
        let res = await supabase.from('owned_card').insert({user_id: userId, card_id: card.cardId});
        console.log(`inserted: ${res.status} ${res.data} ${res?.error?.message}`);
    }

    return ownedCards;
});

// router.get('/ownedCards', (req, res) => {
//     res.send('get list of cards owned by user');
//     // MIGHT HAVE since topTraders already does this
//     // only would be necessary for "user" profile page
// });

// requestedCards

router.put('/requestedCards', async (req, res) => {
    res.send('add card to list of users requested cards');
    const user = req.query.user;
    const { cards } = req.body;
    // let ownedCards = [];

    let userId = await getUserId(user);

    if (!userId) return [];
    console.log(`userId: ${userId?.data} from ${user}`);

    // DELETE FROM owned_cards WHERE userId = userId
    let del = await supabase.from('requested_card').delete().eq('user_id', userId);
    console.log(`deleted: ${del.status} ${del.data} ${del?.error?.message}`);
    // INSERT INTO owned_cards (userId, cardId) for each card in cards
    for (let card of cards) {
        console.log(`Inserting card ${card.cardId} for user ${userId}`);
        let res = await supabase.from('requested_card').insert({user_id: userId, card_id: card.cardId});
        console.log(`inserted: ${res.status} ${res.data} ${res?.error?.message}`);
    }

    // return requestedCards;

    // let userId = await getUserId(user);

    // // DELETE FROM requested_cards WHERE userId = userId
    // await supabase.from('requested_card').delete().eq('userId', userId);
    // // INSERT INTO requested_cards (userId, cardId) for each card in cards
    // for (let card of cards) {
    //     await supabase.from('requested_card').insert({userId: userId, cardId: card.cardId});
    // }
    // return ownedCards;
    // MUST HAVE
});

// router.get('/requestedCards', (req, res) => {
//     res.send('get list of cards requested by user');
//     // MIGHT HAVE since topTraders already does this
//     // only would be necessary for "user" profile page
// });

module.exports = router;
