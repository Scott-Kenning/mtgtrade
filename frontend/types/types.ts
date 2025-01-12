export type UserType = {
  id: number;
  name: string;
  email: string;

  ownedCards: CardType[];
  requestedCards: CardType[];
  activeTrades: TradeType[];
};

export type CardType = {
  id: number;
  name: string;
  set: string;
};

export type OfferType = {
  id: number; // offer id

  offeringUserId: number;
  offeredCards: CardType[];
  requestedCards: CardType[];
};

export type TradeType = {
  //TODO:
};
