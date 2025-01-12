import { CardType } from "@/types/types";

const Card = (props: { card: CardType }) => {
  return (
    <div className="rounded w-100">
      <h2>{props.card.name}</h2>
      <p className="text-sm text-neutral-400">{props.card.set}</p>
      <div className="aspect-[9/16] border-8 rounded-lg border-black bg-orange-950 p-4">
        <div className="aspect-square bg-gray-500" />
      </div>
    </div>
  );
};

const CardsList = ({ cards }: { cards: CardType[] }) => {
  console.log(cards);
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
      {cards.map((card: CardType) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardsList;
