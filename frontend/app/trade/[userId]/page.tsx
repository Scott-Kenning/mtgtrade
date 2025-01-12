'use client'

import Container from "@/components/ui/container";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useUser from "@/hooks/user";

const Trade = async ({params}: {params: Promise<{ userId: string}>}) => {
    const tradingUserId = (await params).userId
    const { user } = useUser();

    const [yourCards, setYourCards] = useState([]);
    const [theirCards, setTheirCards] = useState([]);
    const [yourSelectedCards, setYourSelectedCards] = useState([]);
    const [theirSelectedCards, setTheirSelectedCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!tradingUserId || !user) return;

            try {
                const [yourData, theirData] = await Promise.all([
                    fetch(`/api/user/${user.id}`).then((res) => res.json()),
                    fetch(`/api/user/${tradingUserId}`).then((res) => res.json()),
                ]);

                setYourCards(yourData.cards || []);
                setTheirCards(theirData.cards || []);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [tradingUserId, user]);

    
    const handleCardSelection = (cardId: number, setSelectedCards: any, selectedCards: any) => {
        if (selectedCards.includes(cardId)) {
            setSelectedCards(selectedCards.filter((id: number) => id !== cardId));
        } else {
            setSelectedCards([...selectedCards, cardId]);
        }
    };

    const handleOfferTrade = async () => {
        try {
            await fetch("/api/trades", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    yourUserId: user?.id,
                    theirUserId: tradingUserId,
                    yourCards: yourSelectedCards,
                    theirCards: theirSelectedCards,
                }),
            });

            alert("Trade offered successfully!");
        } catch (error) {
            console.error("Error offering trade:", error);
            alert("Failed to offer trade.");
        }
    };

    return (
        <Container>
            <div className="flex justify-between gap-4">
                <div className="w-1/2">
                    <h2 className="text-xl font-bold">Your Cards</h2>
                    <ul className="space-y-2">
                        {yourCards.map((card: any) => (
                            <li key={card.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={yourSelectedCards.includes(card.id)}
                                    onChange={() =>
                                        handleCardSelection(card.id, setYourSelectedCards, yourSelectedCards)
                                    }
                                />
                                <span className="ml-2">{card.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-1/2">
                    <h2 className="text-xl font-bold">Their Cards</h2>
                    <ul className="space-y-2">
                        {theirCards.map((card) => (
                            <li key={card.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={theirSelectedCards.includes(card.id)}
                                    onChange={() =>
                                        handleCardSelection(card.id, setTheirSelectedCards, theirSelectedCards)
                                    }
                                />
                                <span className="ml-2">{card.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-4 text-center">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleOfferTrade}
                >
                    Offer Trade
                </button>
            </div>
        </Container>
    );
};

export default Trade;
