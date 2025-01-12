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
    // res.send('create user');
    const { email } = req.body;

    // INSERT INTO users (email) VALUES (email)
});

router.get('/', async (req, res) => {
    const user = req.query.user;
    // // res.send('find users info');
    console.log(`user: ${user}`);
    let userId = await getUserId(user);
    // ownedCards = SELECT cardId FROM owned_cards WHERE email = user
    let ownedCards = await supabase.from('owned_card').select('card_id').eq('user_id', userId);
    console.log(`ownedCards: ${ownedCards.data} from ${userId}`);
    // let ownedCards = await supabase.from('owned_cards').select('*');
    // requestedCards = SELECT cardId FROM requested_cards WHERE email = user
    let requestedCards = await supabase.from('wanted_card').select('card_id').eq('user_id', userId);
    console.log(`requestedCards: ${requestedCards.data} from ${userId}`);
    // activeTrades = SELECT * FROM trades WHERE offeree = (SELECT userId FROM users WHERE email = user) status = 'active'
    let activeTrades = await supabase.from('trades').select('*').eq('recipient', userId).eq('status', 'pending');
    console.log(`activeTrades: ${activeTrades.data} from ${userId}`);

    // console.log(`ownedCards: ${ownedCards.data}, requestedCards: ${requestedCards.data}, activeTrades: ${activeTrades.data}`);
    res.json({ 
        ownedCards: ownedCards?.data?.map(x => x.card_id),
        requestedCards: requestedCards?.data?.map(x => x.card_id), 
        activeTrades: activeTrades
    });
});

// find other users

// MUST HAVE
router.get('/topTraders', (req, res) => {
    const user = req.query.user;
    // res.send('find best matches of other users to trade with');

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
//     // res.send('find other users');
// });

// user's trades

// router.get('/trades', (req, res) => {
//     // res.send('get trades for user');
//     // SHOULD HAVE
// });

// MUST HAVE
router.post('/trade', async (req, res) => {
    // res.send('create trade for user');
    const offeror = req.query.offeror;
    const { offeree, offeredCards, requestedCards } = req.body;

    let offerorId = await getUserId(offeror);
    let offereeId = await getUserId(offeree);

    if (!offerorId || !offereeId) return;
    
    // tradeId = INSERT INTO trades (offeror, offeree)
    // let tradeId = await supabase.from('trades').insert({offeror: offerorId, offeree: offereeId}).select();
    // console.log(`tradeId: ${tradeId?.data?.map(x => x.id)} from ${offerorId} to ${offereeId}`);
    // console.log(`Trade data: ${tradeId.data}`);
    // if (!tradeId) {
    //     console.log(`tradeId not found`);
    //     return;
    // }
    let { data: insertedTrades, error } = await supabase
      .from('trade')
      .insert({ proposer: offerorId, recipient: offereeId })
      .select();

    if (error?.message) {
      console.error('Error inserting trade:', error);
      console.log(`Error inserting trade: ${error.message}`);
    //   return res.status(500).send();
    return;
    }
    if (!insertedTrades || insertedTrades.length === 0) {
        console.error('Trade insert returned no data.');
        return;
    }

    // 2) Grab the new trade's ID
    const newTrade = insertedTrades[0];
    const tradeId = newTrade.id;
    // INSERT INTO trade_cards_offered (tradeId, cardId) for each card in offeredCards
    for (let card of offeredCards) {
        console.log(`Inserting card ${card.cardId} for trade ${tradeId}`);
        let res = await supabase.from('trade_cards_offered').insert({trade_id: tradeId, card_id: card.cardId});
        console.log(`inserted: ${res.status} ${res.data} ${res?.error?.message}`);
    }
    // INSERT INTO trade_cards_requested (tradeId, cardId) for each card in requestedCards
    for (let card of requestedCards) {
        console.log(`Inserting card ${card.cardId} for trade ${tradeId}`);
        let res = await supabase.from('trade_cards_requested').insert({trade_id: tradeId, card_id: card.cardId});
        console.log(`inserted: ${res.status} ${res.data} ${res?.error?.message}`);
    }
});

// MUST HAVE
router.patch('/trade', (req, res) => {
    // res.send('update trade for user (accept, reject, etc.)');
    const user = req.query.user;
    const { tradeId, status } = req.body;

    // UPDATE trades SET status = status WHERE tradeId = tradeId
});

// ownedCards

// MUST HAVE
router.put('/ownedCards', async (req, res) => {
    // res.send('set list of users owned cards');

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
//     // res.send('get list of cards owned by user');
//     // MIGHT HAVE since topTraders already does this
//     // only would be necessary for "user" profile page
// });

// requestedCards

router.put('/requestedCards', async (req, res) => {
    // res.send('add card to list of users requested cards');
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
//     // res.send('get list of cards requested by user');
//     // MIGHT HAVE since topTraders already does this
//     // only would be necessary for "user" profile page
// });

module.exports = router;
