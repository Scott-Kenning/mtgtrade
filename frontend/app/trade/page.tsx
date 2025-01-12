import Container from "@/components/ui/container"
import TradeCard from "@/components/ui/trade-card"

const tradeData = [
    {
      user: {id: 1},
      owned: 7,
      wanted: 5
    },
    {
      user: {id: 1},
      owned: 7,
      wanted: 5
    },
    {
      user: {id: 1},
      owned: 7,
      wanted: 5
    },
    {
      user: {id: 1},
      owned: 7,
      wanted: 5
    },
    {
      user: {id: 1},
      owned: 7,
      wanted: 5
    },
  ]

const Trades = () => {
    return (
        <Container>
            <h2 className="text-xl font-semibold">Trade Matches</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {tradeData.map((trade, i) => <TradeCard {...trade} key={i} />)}
            </div>
        </Container>
    )
}

export default Trades