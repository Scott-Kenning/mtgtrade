const TradeCard = ({user, owned, wanted}: any) => {
    return (
        <div className="flex flex-col w-full border border-neutral-600 rounded-lg p-4">
            <p className="font-bold text-lg">Bobby McBobberson</p>
            <div className="flex flex-col">
                <p>Owned: {owned}</p>
                <p>Wanted: {wanted}</p>
            </div>
        </div>
    )
}

export default TradeCard;