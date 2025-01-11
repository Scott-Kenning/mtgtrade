import NavBar from "@/components/nav-bar";
import Container from "@/components/ui/container";
import TradeCard from "@/components/ui/trade-card";
import Link from "next/link";

const tradeData = [
  {
    user: {},
    owned: 7,
    wanted: 5
  },
  {
    user: {},
    owned: 7,
    wanted: 5
  },
  {
    user: {},
    owned: 7,
    wanted: 5
  },
  {
    user: {},
    owned: 7,
    wanted: 5
  },
  {
    user: {},
    owned: 7,
    wanted: 5
  }
]

export default function Home() {
  return (
    <Container>
      <h2 className="text-xl font-semibold">Trade Matches</h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {tradeData.map((trade, i) => <TradeCard {...trade} key={i} />)}
      </div>
      <Link href="/trade" className="underline">View all</Link>
    </Container>
  );
}
