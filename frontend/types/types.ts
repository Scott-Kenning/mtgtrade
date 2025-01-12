export type UserType = {
  id: number;
  name: string;
  email: string;
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
