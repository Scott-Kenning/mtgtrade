import Link from "next/link";

const TradeCard = ({user, owned, wanted}: any) => {
    return (
        <div className="flex justify-between items-center w-full border border-neutral-600 rounded-lg p-4">
            <div className="flex flex-col">
                <p className="font-bold text-lg">Bobby McBobberson</p>
                <div className="flex flex-col">
                    <p>Owned: {owned}</p>
                    <p>Wanted: {wanted}</p>
                </div>
            </div>
            <Link href={`/trade/${user.id}`} className="bg-purple-900 font-bold px-4 py-2 rounded">Trade</Link>
        </div>
    )
}

export default TradeCard;