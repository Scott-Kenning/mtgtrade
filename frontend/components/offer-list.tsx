import { CardType, OfferType } from "@/types/types";
import CardsList, { Card } from "./card-list";

const Item = ({ card }: { card: CardType }) => {
  return (
    <div>
      <div>
        {card.name} ({card.set})
      </div>
      {/* <div>{card.set}</div> */}
      <hr></hr>
    </div>
  );
};

type OfferProps = {
  offer: OfferType;
  isReceivedOffers: boolean;
};
const Offer = ({ offer, isReceivedOffers }: OfferProps) => {
  const liberalPronoun = isReceivedOffers ? "They" : "You";

  return (
    <div>
      <h2 className="">{liberalPronoun} offered</h2>
      <div>
        {offer.offeredCards.map((offered) => (
          <Item card={offered}></Item>
        ))}
      </div>

      <h2>{liberalPronoun} requested</h2>
      <div>
        {offer.requestedCards.map((requested) => (
          <Item card={requested}></Item>
        ))}
      </div>
    </div>
  );
};

type OfferListProps = {
  offers: OfferType[];
  isReceivedOffers: boolean;
};
const OfferList = ({ offers, isReceivedOffers }: OfferListProps) => {
  return (
    <div>
      {offers.map((offer) => (
        <Offer offer={offer} isReceivedOffers={isReceivedOffers} />
      ))}
    </div>
  );
};

export default OfferList;
