import { OfferType } from "@/types/types";

const Offer = ({ offer }: { offer: OfferType }) => {
  return <div></div>;
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
