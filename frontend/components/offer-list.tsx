import { CardType, OfferType } from "@/types/types";
import CardsList, { Card } from "./card-list";

const Item = ({ card }: { card: CardType }) => {
  return (
    <div>
      <div>{card.name}</div>
      <div>{card.set}</div>
      <hr></hr>
    </div>
  );
};

const Offer = ({ offer }: { offer: OfferType }) => {
  return (
    <div>
      <h2 className="">They offered</h2>
      <div>
        {offer.offeredCards.map((offered) => (
          <Item card={offered}></Item>
        ))}
      </div>

      <h2>They requested</h2>
      <div>
        {offer.requestedCards.map((requested) => (
          <Item card={requested}></Item>
        ))}
      </div>
    </div>
  );
};

const OfferList = ({ offers }: { offers: OfferType[] }) => {
  return (
    <div>
      {offers.map((offer) => (
        <Offer offer={offer} />
      ))}
    </div>
  );
};

export default OfferList;
